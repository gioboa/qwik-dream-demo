import { type RemoteData } from './remotes';

export const getTargetUrl = (request, remote: RemoteData) => {
	return remote.url + request.url.split(`/${remote.name}/`)[1];
};
