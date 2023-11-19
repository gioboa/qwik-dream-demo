import {
	SSRStream,
	SSRStreamBlock,
	Signal,
	StreamWriter,
	component$,
	useContext,
	useSignal,
	useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { RemoteData } from '@qwikdream/shared';
import { Base64 } from 'js-base64';
import { GlobalAppState } from '../../store';

export interface Props {
	remote: RemoteData;
	fetchOnScroll?: true;
}

export default component$(({ remote, fetchOnScroll }: Props) => {
	const location = useLocation();
	const store = useContext(GlobalAppState);
	const { hideLabel } = remote;
	const url = `${remote.url}${
		remote.defaultQueryParam
			? location.url.searchParams.get('query') || remote.defaultQueryParam || ''
			: ''
	}`;

	const scrollElementRef = useFetchOnScroll(!!fetchOnScroll, url, store.user);

	return (
		<div
			class={{
				'remote-component mb-6': true,
				'z-10': remote.name === 'cart',
				'pb-2': remote.name !== 'cart' && remote.name !== 'menu',
			}}
			style={{ '--seams-color': '#000000' }}
		>
			{!hideLabel && (
				<a target="blank" href={url} class="remote-label">
					{url}
				</a>
			)}
			{fetchOnScroll ? (
				<div ref={scrollElementRef} class="text-center text-3xl font-bold">
					Loading...
				</div>
			) : (
				<SSRStreamBlock>
					<SSRStream>{getSSRStreamFunction(url, store.user)}</SSRStream>
				</SSRStreamBlock>
			)}
		</div>
	);
});

export function useFetchOnScroll(enabled: boolean, url: string, user: Readonly<Signal<string>>) {
	const scrollElementRef = useSignal<Element>();

	useVisibleTask$(({ track }) => {
		track(() => scrollElementRef.value);

		if (scrollElementRef.value && enabled) {
			const observer = new IntersectionObserver(
				async ([element]) => {
					if (element.isIntersecting) {
						const response = await fetchRemote(url, user);
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

export function fetchRemote(url: string, user: Readonly<Signal<string>>): Promise<Response> {
	const remoteUrl = new URL(url);
	if (remoteUrl) {
		remoteUrl.searchParams.append('loader', 'false');
	}
	return fetch(remoteUrl, { headers: { accept: 'text/html', user: Base64.btoa(user.value) } });
}

export function getSSRStreamFunction(remoteUrl: string, user: Readonly<Signal<string>>) {
	const decoder = new TextDecoder();

	return async (stream: StreamWriter) => {
		const reader = (await fetchRemote(remoteUrl, user)).body!.getReader();
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
			// console.log('FOUND', base);
			return match;
		});
		html = html.replace(/="(\/src\/([^"]+))"/gm, (match, path) => {
			// console.log('REPLACE', path);
			return '="' + base + path + '"';
		});
		html = html.replace(/"\\u0002(\/src\/([^"]+))"/gm, (match, path) => {
			// console.log('REPLACE', path);
			return '"\\u0002' + base + path + '"';
		});
	}
	return { html, base };
}
