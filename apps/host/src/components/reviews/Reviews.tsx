import { component$, useClientEffect$, useRef } from '@builder.io/qwik';
import { remotes } from '../../../../../libs/shared/remotes';

export default component$(() => {
	const reviewsRef = useRef();
	useClientEffect$(async () => {
		const response = await fetch(`/${remotes.reviews.name}/`);
		if (response.ok && !!reviewsRef.current) {
			const rawHtml = await response.text();
			reviewsRef.current.innerHTML = rawHtml;
		}
	});
	return (
		<div class='remote-component'>
			<p class='remote-label'>{remotes.reviews.url}</p>
			<div ref={reviewsRef}>loading...</div>
		</div>
	);
});
