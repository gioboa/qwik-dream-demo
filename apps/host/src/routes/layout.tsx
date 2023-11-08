import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { AppState, GlobalAppState } from '../store';
import { RequestHandler } from '@builder.io/qwik-city';
import { setCookie } from '../utils/cookie';

export const onGet: RequestHandler = async ({ cacheControl }) => {
	cacheControl({ staleWhileRevalidate: 60 * 60 * 24 * 7, maxAge: 5 });
};

export default component$(() => {
	const store = useStore<AppState>({
		showSeams: false,
	});
	useContextProvider(GlobalAppState, store);
	return (
		<div data-seams={store.showSeams}>
			<div class="flex gap-3">
				<button
					class="flex mt-3 ml-3 p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
					onClick$={() => (store.showSeams = !store.showSeams)}
				>
					Show Worker URLs
				</button>
				<button
					class="flex mt-3 p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
					onClick$={() => setCookie('USER', 'Giorgio')}
				>
					User Giorgio
				</button>
				<button
					class="flex mt-3 p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
					onClick$={() => setCookie('USER', 'Miško')}
				>
					User Miško
				</button>
			</div>
			<Slot />
		</div>
	);
});
