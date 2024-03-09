import { RequestHandler } from '@builder.io/qwik-city';
import { remotes } from '@qwikdream/shared';

export const onRequest: RequestHandler = async ({ send, url }) => {
	const remoteName = 'menu';
	const pathName = url.pathname.replace(`/${remoteName}/`, '');
	const remoteUrl = pathName
		? remotes[remoteName].url.replace(`${remoteName}/`, '')
		: remotes[remoteName].url;

	const response = await fetch(remoteUrl + pathName + url.search);
	const content = await response.text();
	send(
		new Response(content, {
			status: 200,
			headers: {
				'Content-Type': response.headers.get('Content-Type') || 'application/javascript',
			},
		}),
	);
};
