import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { AppState, GlobalAppState } from '../store';

export default component$(() => {
	const store = useStore<AppState>({
		showSeams: false,
	});
	useContextProvider(GlobalAppState, store);
	return (
		<div data-seams={store.showSeams}>
			<button
				class="flex m-2 p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
				onClick$={() => (store.showSeams = !store.showSeams)}
			>
				Show Worker URLs
			</button>
			<Slot />
		</div>
	);
});
