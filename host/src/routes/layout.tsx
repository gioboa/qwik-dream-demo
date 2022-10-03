import {
	component$,
	Slot,
	useContextProvider,
	useStore,
} from '@builder.io/qwik';
import { AppState, GlobalAppState } from './constants';

export default component$(() => {
	const store = useStore<AppState>({
		showSeams: false,
	});
	useContextProvider(GlobalAppState, store);
	return (
		<main data-seams={store.showSeams}>
			<Slot />
		</main>
	);
});
