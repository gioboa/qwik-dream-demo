import { remotes } from "@qwikdream/shared";

export async function onRequest() {
	return await fetch(remotes.reviews.url);
}
