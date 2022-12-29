import { component$, useClientEffect$, useSignal } from '@builder.io/qwik';
import { RemoteData } from '../../../../../libs/shared/remotes';

export interface Props {
	remote: RemoteData;
}

export default component$<Props>(({ remote }) => {
	const elementRef = useSignal<Element>();

	useClientEffect$(() => {
			const observer = new IntersectionObserver(
				async ([element]) => {
					if (element.isIntersecting) {
						const response = await fetch(`/${remote.name}/`);
						if (response.ok) {
							const rawHtml = await response.text();
							elementRef.value!.innerHTML = rawHtml;
							observer.disconnect();
						}
					}
				},
				{ rootMargin: '150px' }
			)
			observer.observe(elementRef.value!)
	})

	return (
		<div
			class="remote-component"
		>
			<p class="remote-label">{remote.url}</p>
			<div ref={elementRef}>loading...</div>
		</div>
	);
});
