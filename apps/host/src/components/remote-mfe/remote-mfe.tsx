import {
	component$,
	SSRStream,
	SSRStreamBlock,
	StreamWriter,
	useVisibleTask$,
	useSignal,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { RemoteData } from "@qwikdream/shared";

export interface Props {
	remote: RemoteData;
	fetchOnScroll?: true;
}

export default component$(({ remote, fetchOnScroll }: Props) => {
	const location = useLocation();
	const { seamsColor, extraStyles, hideLabel } = remote;
	const url = `${remote.url}${location.url.searchParams.get(remote.name) || remote.defaultQueryParam || ''}`;

	const scrollElementRef = useFetchOnScroll(!!fetchOnScroll, url);

	return (
		<div class="remote-component mb-4" style={{ '--seams-color': seamsColor, ...(extraStyles ?? {}) }}>
			{!hideLabel && (
				<a target="blank" href={url} class="remote-label">
					{url}
				</a>
			)}
			{fetchOnScroll ? (
				<div ref={scrollElementRef}>loading...</div>
			) : (
				<SSRStreamBlock>
					<SSRStream>{getSSRStreamFunction(url)}</SSRStream>
				</SSRStreamBlock>
			)}
		</div>
	);
});

export function useFetchOnScroll(enabled: boolean, url: string) {
	const scrollElementRef = useSignal<Element>();

	useVisibleTask$(({ track }) => {
		track(() => scrollElementRef.value);

		if (scrollElementRef.value && enabled) {
			const observer = new IntersectionObserver(
				async ([element]) => {
					if (element.isIntersecting) {
						const response = await fetchRemote(url);
						if (response.ok) {
							const rawHtml = await response.text();
							const { html } = fixRemoteHTMLInDevMode(rawHtml);
							scrollElementRef.value!.innerHTML = html;
							observer.disconnect();
						}
					}
				},
				{ rootMargin: '150px' },
			);
			observer.observe(scrollElementRef.value!);
			return () => {
				observer.unobserve(scrollElementRef.value!);
			};
		}
	});

	return scrollElementRef;
}

export function fetchRemote(url: string): Promise<Response> {
	return fetch(url, { headers: { accept: 'text/html' } });
}

export function getSSRStreamFunction(remoteUrl: string) {
	const decoder = new TextDecoder();

	return async (stream: StreamWriter) => {
		const reader = (await fetchRemote(remoteUrl)).body!.getReader();
		let fragmentChunk = await reader.read();
		let base = '';
		while (!fragmentChunk.done) {
			const rawHtml = decoder.decode(fragmentChunk.value);
			const fixedHtmlObj = fixRemoteHTMLInDevMode(rawHtml, base);
			base = fixedHtmlObj.base;
			stream.write(fixedHtmlObj.html);
			fragmentChunk = await reader.read();
		}
	};
}

/**
 * This function is a hack to work around the fact that in dev mode the remote html is failing to prefix the base path.
 */
export function fixRemoteHTMLInDevMode(rawHtml: string, base = ''): { html: string; base: string } {
	let html = rawHtml;
	if (import.meta.env.DEV) {
		html = html.replace(/q:base="\/(\w+)\/build\/"/gm, (match, child) => {
			base = '/' + child;
			console.log('FOUND', base);
			return match;
		});
		html = html.replace(/="(\/src\/([^"]+))"/gm, (match, path) => {
			console.log('REPLACE', path);
			return '="' + base + path + '"';
		});
		html = html.replace(/"\\u0002(\/src\/([^"]+))"/gm, (match, path) => {
			console.log('REPLACE', path);
			return '"\\u0002' + base + path + '"';
		});
	}
	return { html, base };
}
