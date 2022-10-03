import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import RemoteSsr from '~/components/remote-ssr';

export default component$(() => {
	return (
		<>
			<RemoteSsr name='menu' path='http://localhost:5001' />
			<RemoteSsr name='hero' path='http://localhost:5002' />
		</>
	);
});

export const head: DocumentHead = {
	title: 'Welcome to Qwik',
};
