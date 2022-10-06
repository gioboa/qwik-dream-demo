import {
	component$,
	Slot,
	useContextProvider,
	useStore
} from '@builder.io/qwik';
import { AppState, GlobalAppState } from './constants';

export default component$(() => {
	const store = useStore<AppState>({
		showSeams: true,
	});
	useContextProvider(GlobalAppState, store);
	return (
		<main data-seams={store.showSeams}>
			<Slot />
			<footer>
				<button onClick$={() => store.showSeams = !store.showSeams}>Show Seams</button>
			</footer>
		</main>
	);
});
