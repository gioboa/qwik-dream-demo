import { component$, useSignal } from '@builder.io/qwik';
import { RemoteData } from '../../../../../libs/shared/remotes';

export interface Props {
	remote: RemoteData;
}

export default component$<Props>(({ remote }) => {
	const elementRef = useSignal<Element>();
	const isLoaded = useSignal<boolean>(false);

	return (
		<div
			window:onScroll$={async () => {
				if (!isLoaded.value && elementRef.value) {
					const rect = elementRef.value.getBoundingClientRect();
					const DELTA = 150;
					const isGoingToBeVisible =
						rect.top >= 0 &&
						rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + DELTA;
					if (isGoingToBeVisible) {
						isLoaded.value = true;
						const response = await fetch(`/${remote.name}/`);
						if (response.ok && !!elementRef.value) {
							const rawHtml = await response.text();
							elementRef.value.innerHTML = rawHtml;
						}
					}
				}
			}}
			class="remote-component"
		>
			<p class="remote-label">{remote.url}</p>
			<div ref={elementRef}>loading...</div>
		</div>
	);
});
