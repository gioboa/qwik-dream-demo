import { component$, SSRStream } from '@builder.io/qwik';
import type { RemoteData } from '../../../../libs/shared/remotes';

export interface Props {
	remote: RemoteData;
}

export default component$((props: Props) => {
	const { url, port, name } = props.remote;
	const mfeUrl = import.meta.env.DEV
		? `http://localhost:${port}/${name}/`
		: url;
	console.log(mfeUrl);
	const decoder = new TextDecoder();
	return (
		<div class='remote-component'>
			<p class='remote-label'>{mfeUrl}</p>
			<SSRStream>
				{async (stream) => {
					const fragment = await fetch(mfeUrl);
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
