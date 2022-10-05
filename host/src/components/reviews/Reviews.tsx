import { component$, useClientEffect$, useRef } from '@builder.io/qwik';

export const Reviews = component$(() => {
	const reviewsRef = useRef();
	useClientEffect$(async () => {
		const response = await fetch('/reviews/');
		if (response.ok && !!reviewsRef.current) {
			const bareHtml = await response.text();
			reviewsRef.current.innerHTML = bareHtml.replace(
				'<link rel="stylesheet" href="/',
				`<link rel="stylesheet" href="/reviews/`
			);
		}
	});
	return <div ref={reviewsRef}>loading...</div>;
});
