import { type RemoteData } from './remotes';
import { RequestEvent } from "@builder.io/qwik-city";

export const getTargetUrl = (request: RequestEvent, remote: RemoteData) => {
	return remote.url.replace(`${remote.name}/`, '') + request.url.toString().split(`/${remote.name}/`)[1];
};
