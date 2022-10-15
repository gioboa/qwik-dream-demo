import { component$, SSRStream } from '@builder.io/qwik';
import type { RemoteData } from '../../../../libs/shared/remotes';

export interface Props {
	path: string;
}

export default component$((props: { remote: RemoteData }) => {
	const { url } = props.remote;
	const decoder = new TextDecoder();
	return (
		<div class='remote-component'>
			<p class='remote-label'>{url}</p>
			<SSRStream>
				{async (stream) => {
					const fragment = await fetch(url);
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
