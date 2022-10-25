import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import RemoteSsr from '~/components/remote-ssr';
import Reviews from '~/components/reviews/Reviews';
import { remotes } from '../../../../libs/shared/remotes';

export default component$(() => {
	return (
		<>
			<RemoteSsr path={remotes.menu.url} />
			<RemoteSsr path={"http://localhost::5005"} />
			<RemoteSsr path={remotes.hero.url} />
			<RemoteSsr path={remotes.product.url} />
			<Reviews />
		</>
	);
});

export const head: DocumentHead = {
	title: 'Qwik dream Demo',
};
