import { component$ } from '@builder.io/qwik';
import Root from './routes';

import './global.css';

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCity> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Dont remove the `<head>` and `<body>` elements.
	 */
	return (
		<Root />
		// <QwikCity>
		// 	<head>
		// 		<meta charSet='utf-8' />
		// 		<RouterHead />
		// 	</head>
		// 	<body lang='en'>
		// 		<Root />
		// 	</body>
		// </QwikCity>
	);
});
