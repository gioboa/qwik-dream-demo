import { component$, PrefetchGraph, Slot } from '@builder.io/qwik';
import { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ cacheControl }) => {
	cacheControl({ staleWhileRevalidate: 60 * 60 * 24 * 7, maxAge: 5 });
};

export default component$(() => {
	return (
		<>
			<Slot />
			<PrefetchGraph base="/reviews/build/" />
		</>
	);
});
