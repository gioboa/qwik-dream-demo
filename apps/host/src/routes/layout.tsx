import { $, component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { RequestHandler, routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { AppState, GlobalAppState } from '../store';
import { setCookie } from '../utils/cookie';

export const onGet: RequestHandler = async ({ cacheControl }) => {
	cacheControl({ staleWhileRevalidate: 60 * 60 * 24 * 7, maxAge: 5 });
};

export const useUser = routeLoader$(({ cookie }) => cookie.get('user')?.value || 'user');

export default component$(() => {
	const store = useStore<AppState>({
		showSeams: false,
		user: useUser().value,
	});
	useContextProvider(GlobalAppState, store);

	const setUser = $((user: string) => {
		localStorage.clear();
		setCookie('user', user);
		store.user = user;
		const newUrl = new URL(location.origin);
		newUrl.searchParams.append('t', new Date().getTime().toString())
		location.href = newUrl.href
	});

	return (
		<div data-seams={store.showSeams}>
			<div class="flex gap-3 mt-6 mb-4 ml-3">
				<button
					class="flex p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
					onClick$={() => (store.showSeams = !store.showSeams)}
				>
					Show Worker URLs
				</button>
				<button
					class="flex p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
					onClick$={() => setUser('Giorgio')}
				>
					User Giorgio
				</button>
				<button
					class="flex p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
					onClick$={() => setUser('Miško')}
				>
					User Miško
				</button>
			</div>
			<Slot />
		</div>
	);
});
