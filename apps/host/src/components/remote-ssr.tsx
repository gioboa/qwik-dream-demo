import { component$, SSRStream } from '@builder.io/qwik';

export interface Props {
	path: string;
}

export default component$(({ path }: Props) => {
	const decoder = new TextDecoder();
	return (
		<div class='remote-component'>
			<p class='remote-label'>{path}</p>
			<SSRStream>
				{async (stream) => {
					const fragment = await fetch(path);
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
