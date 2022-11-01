import { component$, useStyles$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet } from '@builder.io/qwik-city';

import styles from './global.css?inline';

export default component$(() => {
	useStyles$(styles);
	return (
		<QwikCity>
			<div />
			<RouterOutlet />
		</QwikCity>
	);
});
