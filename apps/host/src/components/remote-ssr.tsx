import { component$, SSRStream, SSRStreamBlock } from '@builder.io/qwik';
import type { RemoteData } from '../../../../libs/shared/remotes';

export interface Props {
	remote: RemoteData;
}

export default component$((props: Props) => {
	const { url } = props.remote;
	const decoder = new TextDecoder();
	return (
		<SSRStreamBlock>
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
		</SSRStreamBlock>
	);
});
