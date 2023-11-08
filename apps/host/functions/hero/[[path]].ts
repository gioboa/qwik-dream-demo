import { RequestEvent } from "@builder.io/qwik-city";
import { getTargetUrl } from "@qwikdream/shared";
import { remotes } from "@qwikdream/shared";

export async function onRequest({ request }: {request: RequestEvent}) {
	return await fetch(getTargetUrl(request, remotes.hero));
}
