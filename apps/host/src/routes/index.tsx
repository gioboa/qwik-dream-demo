import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { remotes } from '@qwikdream/shared';
import RemoteMfe from '../components/remote-mfe/remote-mfe';

export default component$(() => {
	return (
		<main>
			<RemoteMfe remote={remotes.menu} />
			<RemoteMfe remote={remotes.cart} />
			<div class="h-40" />
			<RemoteMfe remote={remotes.hero} />
			<div id="my-child">
				<template shadowRootMode="open">
					<RemoteMfe remote={remotes.product} />
				</template>
				<div
					dangerouslySetInnerHTML={`
					(window.qwikevents || window.qwikevents=[]).push(getElementById('my-child').shadowRoot);
				`}
				></div>
			</div>
			<div class="h-40" />
			<RemoteMfe remote={remotes.reviews} fetchOnScroll={true} />
		</main>
	);
});

export const head: DocumentHead = {
	title: 'Qwik dream Demo',
};
