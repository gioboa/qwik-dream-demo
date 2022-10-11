import { remotes } from './remotes';

export const getTargetUrl = (request, remote: typeof remotes.menu) => {
	return (
		remote.url.replace(`${remote.name}/`, '') +
		request.url.split(`/${remote.name}/`)[1]
	);
};
