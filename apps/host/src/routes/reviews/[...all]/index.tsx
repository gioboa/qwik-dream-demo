import { RequestHandler } from '@builder.io/qwik-city';
import { remotes } from '@qwikdream/shared';

export const onRequest: RequestHandler = async ({ text, url }) => {
	const remoteName = 'reviews';
	const pathName = url.pathname.replace(`/${remoteName}/`, '');
	const remoteUrl = pathName
		? remotes[remoteName].url.replace(`${remoteName}/`, '')
		: remotes[remoteName].url;
	const response = await fetch(remoteUrl + pathName + url.search);
	text(200, await response.text());
};
