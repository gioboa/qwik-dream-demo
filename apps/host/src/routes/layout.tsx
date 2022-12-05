import {
	component$,
	Slot,
	useContextProvider,
	useStore
} from '@builder.io/qwik';
import { AppState, GlobalAppState } from '../store';

export default component$(() => {
	const store = useStore<AppState>({
		showSeams: false,
	});
	useContextProvider(GlobalAppState, store);
	return (
		<div data-seams={store.showSeams}>
			<button onClick$={() => (store.showSeams = !store.showSeams)}>
				Show Seams
			</button>
			<Slot />
		</div>
	);
});
