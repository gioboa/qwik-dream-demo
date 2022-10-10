import { component$, SSRStream } from '@builder.io/qwik';

export interface Props {
	name: string;
	path: string;
}

export default component$(({ name, path }: Props) => {
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
						const withStyleWorkaround = rawHtml.replace(
							'<link rel="stylesheet" href="/',
							`<link rel="stylesheet" href="${path}/`
						);
						stream.write(withStyleWorkaround);
						fragmentChunk = await reader.read();
					}
				}}
			</SSRStream>
		</div>
	);
});
