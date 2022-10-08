/* eslint-disable no-console */
import { component$, Resource } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import { Hero } from '~/components/hero/Hero';

export type HeroSlide = {
	title: string;
	subTitle: string;
	imageUrl: string;
};

export default component$(() => {
	const heroData = useEndpoint<typeof onGet>();

	return (
		<Resource
			value={heroData}
			// onPending={() => <>Loading...</>}
			onRejected={(error) => <>Error: {error.message}</>}
			onResolved={(slides) => <Hero slides={slides} />}
		/>
	);
});

export const onGet: RequestHandler<HeroSlide[]> = async ({}) => {
	const endPoint = 'https://mocki.io/v1/df5224a7-d8ee-448c-869c-6216a1c5ad83';
	const response = await fetch(endPoint);
	return response.ok
		? await response.json()
		: [{ name: 'fetch error', slug: 'error' }];
};
