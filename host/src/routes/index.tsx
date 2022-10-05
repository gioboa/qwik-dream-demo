import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import RemoteSsr from '~/components/remote-ssr';
import { Reviews } from '~/components/reviews/Reviews';

export default component$(() => {
	return (
		<>
			<RemoteSsr name='menu' path='http://localhost:5001' />
			<RemoteSsr name='hero' path='http://localhost:5002' />
			<div style='height: 1000px;background-color: red;' />
			<Reviews />
		</>
	);
});

export const head: DocumentHead = {
	title: 'Welcome to Qwik',
};
