import { type RemoteData } from './remotes';

export const getTargetUrl = (request, remote: RemoteData) => {
	return remote.url.replace(`${remote.name}/`, '') + request.url.split(`/${remote.name}/`)[1];
};
