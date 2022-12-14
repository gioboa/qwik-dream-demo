import { component$, SSRStream, SSRStreamBlock } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { RemoteData } from '../../../../../libs/shared/remotes';

export interface Props {
	remote: RemoteData;
}

export default component$(({ remote }: Props) => {
	const localtion = useLocation();
	const { seamsColor, extraStyles, hideLabel } = remote;
	const url = `${remote.url}${localtion.query[remote.name] || remote.defaultQueryParam || ''}`;
	const decoder = new TextDecoder();
	return (
		<SSRStreamBlock>
			<div class="remote-component" style={{ '--seams-color': seamsColor, ...(extraStyles ?? {}) }}>
				{!hideLabel && (
					<a target="blank" href={url} class="remote-label">
						{url}
					</a>
				)}
				<SSRStream>
					{async stream => {
						const fragment = await fetch(url, { headers: { accept: 'text/html' } });
						const reader = fragment.body!.getReader();
						let fragmentChunk = await reader.read();
						let base: string = '';
						while (!fragmentChunk.done) {
							let rawHtml = decoder.decode(fragmentChunk.value);
							if (import.meta.env.DEV) {
								// TODO: These regexes are a hack to work around the fact that the streamed content is failing to prefix base path.
								rawHtml = rawHtml.replace(/q:base="\/(\w+)\/build\/"/gm, (match, child) => {
									base = '/' + child;
									console.log('FOUND', base);
									return match;
								});
								rawHtml = rawHtml.replace(/="(\/src\/([^"]+))"/gm, (match, path) => {
									console.log('REPLACE', path);
									return '="' + base + path + '"';
								});
								rawHtml = rawHtml.replace(/"\\u0002(\/src\/([^"]+))"/gm, (match, path) => {
									console.log('REPLACE', path);
									return '"\\u0002' + base + path + '"';
								});
							}
							stream.write(rawHtml);
							fragmentChunk = await reader.read();
						}
					}}
				</SSRStream>
			</div>
		</SSRStreamBlock>
	);
});
