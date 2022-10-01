import { renderToStream } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const base = url.searchParams.has('base')
			? url.searchParams.get('base') + 'build/'
			: undefined;

		const { writable, readable } = new TransformStream();
		const writer = writable.getWriter();

		const response = new Response(readable, {
			headers: {
				'Content-Type': 'text/html; charset=utf-8',
			},
		});

		renderToStream(<Root />, {
			streaming: {
				inOrder: {
					strategy: 'auto',
				},
			},
			stream: {
				write: (chunk) => {
					if (typeof chunk === 'string') {
						const encoder = new TextEncoder();
						writer.write(encoder.encode(chunk));
					} else {
						writer.write(chunk);
					}
				},
			},
			manifest,
			containerTagName: 'body',
			qwikLoader: { include: 'auto' },
			base,
		}).finally(() => {
			writer.close();
		});

		return response;
	},
};

// ORIGINAL ONE

// export default function (opts: RenderToStreamOptions) {
// 	return renderToStream(<Root />, {
// 		manifest,
// 		...opts,
// 		prefetchStrategy: {
// 			implementation: {
// 				linkInsert: null,
// 				workerFetchInsert: null,
// 				prefetchEvent: 'always',
// 			},
// 		},
// 	});
// }
