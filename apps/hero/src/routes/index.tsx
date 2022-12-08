/* eslint-disable no-console */
import { component$, Resource } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import Hero from '~/components/hero/Hero';
import { remotes } from '../../../../libs/shared/remotes';
import { forcedDelay } from '../../../../libs/shared/utils';

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
			onPending={() => <div>Loading...</div>}
			onRejected={error => <div>Error: {error.message}</div>}
			onResolved={slides => (
				<div class="py-8">
					<Hero slides={slides} />
				</div>
			)}
		/>
	);
});

export const onGet: RequestHandler<HeroSlide[]> = async () => {
	const endPoint = 'https://mocki.io/v1/d69531ee-0548-4a9d-a554-7fa0df3c237d';
	await forcedDelay(remotes.hero.secondsOfDelay);
	const response = await fetch(endPoint);
	return response.ok ? await response.json() : [{ name: 'fetch error', slug: 'error' }];
};
