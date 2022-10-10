import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import RemoteSsr from '~/components/remote-ssr';
import Reviews from '~/components/reviews/Reviews';
import { getTargetFromRemoteName } from '~/utils';

export default component$(() => {
	return (
		<>
			<RemoteSsr name='menu' path={getTargetFromRemoteName('menu')} />
			<RemoteSsr name='hero' path={getTargetFromRemoteName('hero')} />
			<RemoteSsr name='product' path={getTargetFromRemoteName('product')} />
			<Reviews />
		</>
	);
});

export const head: DocumentHead = {
	title: 'Qwik dream Demo',
};
