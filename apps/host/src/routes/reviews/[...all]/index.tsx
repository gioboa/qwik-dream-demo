import { RequestHandler } from '@builder.io/qwik-city';
import { remotes } from '@qwikdream/shared';

export const onRequest: RequestHandler = async ({ redirect, url }) => {
	const remoteName = 'reviews';
	const pathName = url.pathname.replace(`/${remoteName}/`, '');
	const remoteUrl = pathName ? remotes[remoteName].url.replace(`${remoteName}/`, '') : remotes[remoteName].url;
	throw redirect(308, remoteUrl + pathName + url.search);
};
