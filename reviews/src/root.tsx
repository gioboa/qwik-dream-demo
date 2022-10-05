import { component$ } from '@builder.io/qwik';
import {
	QwikCity,
	RouterOutlet,
	ServiceWorkerRegister,
} from '@builder.io/qwik-city';

import './global.css';

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCity> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Dont remove the `<head>` and `<body>` elements.
	 */
	return (
		<QwikCity>
			<RouterOutlet />
			<ServiceWorkerRegister />
		</QwikCity>
	);
});
