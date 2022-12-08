/* eslint-disable no-console */
import { component$, Resource } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import StarIcon from '~/components/icons/StarIcon';
import { Review } from '~/types';
import { remotes } from '../../../../libs/shared/remotes';
import { forcedDelay } from '../../../../libs/shared/utils';

export default component$(() => {
	const reviewsData = useEndpoint<typeof onGet>();

	return (
		<Resource
			value={reviewsData}
			onPending={() => <div>Loading...</div>}
			onRejected={error => <div>Error: {error.message}</div>}
			onResolved={reviews => (
				<div className="p-16">
					<h2 className="text-lg font-medium text-gray-900">Recent reviews</h2>
					<div className="mt-6 pb-10 border-t border-gray-200 divide-y divide-gray-200 space-y-10">
						{reviews.map(review => (
							<div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
								<div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
									<div className="flex items-center xl:col-span-1">
										<div className="flex items-center">
											{[0, 1, 2, 3, 4].map(rating => (
												<div key={rating}>
													<StarIcon rating={rating} review={review} />
												</div>
											))}
										</div>
										<p className="ml-3 text-sm text-gray-700">
											{review.rating}
											<span className="sr-only"> out of 5 stars</span>
										</p>
									</div>

									<div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
										<h3 className="text-sm font-medium text-gray-900">{review.title}</h3>

										<div
											className="mt-3 space-y-6 text-sm text-gray-500"
											dangerouslySetInnerHTML={review.content}
										/>
									</div>
								</div>

								<div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
									<p className="font-medium text-gray-900">{review.author}</p>
									<time
										dateTime={review.datetime}
										className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
									>
										{review.date}
									</time>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		/>
	);
});

export const onGet: RequestHandler<Review[]> = async () => {
	const endPoint = 'https://mocki.io/v1/9eeeec1a-4494-428d-81da-0db85e6b5b37';
	await forcedDelay(remotes.reviews.secondsOfDelay);
	const response = await fetch(endPoint);
	return response.ok ? await response.json() : [{ name: 'fetch error', slug: 'error' }];
};
