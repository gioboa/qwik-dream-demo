import { component$, SSRStream } from '@builder.io/qwik';
import type { RemoteData } from '../../../../libs/shared/remotes';

export interface Props {
	remote: RemoteData;
}

export default component$((props: Props) => {
	const { url, port } = props.remote;
	console.log(import.meta.env);
	const mfe_url = import.meta.env.DEV
		? `http://localhost:${port}/`
		: url
		;
	const decoder = new TextDecoder();
	return (
		<div class='remote-component'>
			<p class='remote-label'>{mfe_url}</p>
			<SSRStream>
				{async (stream) => {
					const fragment = await fetch(mfe_url);
					const reader = fragment.body!.getReader();
					let fragmentChunk = await reader.read();
					while (!fragmentChunk.done) {
						const rawHtml = decoder.decode(fragmentChunk.value);
						stream.write(rawHtml);
						fragmentChunk = await reader.read();
					}
				}}
			</SSRStream>
		</div>
	);
});
