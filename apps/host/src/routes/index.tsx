import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import RemoteMfe from '../components/remote-mfe/remote-mfe';
import { remotes } from '../../../../libs/shared/remotes';

export default component$(() => {
	return (
		<main>
			<RemoteMfe remote={remotes.cart} />
			<RemoteMfe remote={remotes.menu} />
			<RemoteMfe remote={remotes.hero} />
			<RemoteMfe remote={remotes.product} />
			<RemoteMfe remote={remotes.reviews} fetchOnScroll={true} />
		</main>
	);
});

export const head: DocumentHead = {
	title: 'Qwik dream Demo',
};
