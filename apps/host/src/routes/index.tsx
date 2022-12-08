import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import ComponentLoader from '~/components/component-loader/ComponentLoader';
import RemoteSsr from '~/components/remote-ssr';
import { remotes } from '../../../../libs/shared/remotes';

export default component$(() => {
	return (
		<main>
			<RemoteSsr remote={remotes.menu} />
			<RemoteSsr remote={remotes.cart} />
			<RemoteSsr remote={remotes.hero} />
			<RemoteSsr remote={remotes.product} />
			<ComponentLoader remote={remotes.reviews} />
		</main>
	);
});

export const head: DocumentHead = {
	title: 'Qwik dream Demo',
};
