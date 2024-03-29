/* eslint-disable no-console */
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import StarIcon from '../components/icons/StarIcon';
import { Review } from '../types';

export const useReviewsData = routeLoader$(async () => {
	const reviews = [
		{
			id: 1,
			title: 'I love it!',
			rating: 5,
			content: '\n' +
				'              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n' +
				'            ',
			author: 'Miško H',
			date: 'May 25, 2022',
			datetime: '2022-05-25'
		},
		{
			id: 2,
			title: 'Awesome product',
			rating: 5,
			content: '\n' +
				'              <p>Ornare quam viverra orci sagittis eu volutpat odio. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Ultrices tincidunt arcu non sodales neque.</p> \n' +
				'              <p>Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Pellentesque diam volutpat commodo sed egestas egestas fringilla. Sodales ut etiam sit amet nisl purus in mollis nunc. Turpis egestas integer eget aliquet nibh praesent tristique magna. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Justo laoreet sit amet cursus sit amet.</p>\n' +
				'            ',
			author: 'Adam B',
			date: 'May 24, 2022',
			datetime: '2022-05-24'
		},
		{
			id: 3,
			title: 'Really happy with this purchase',
			rating: 5,
			content: '\n' +
				'              <p>Nisi est sit amet facilisis magna etiam tempor orci eu.</p> \n' +
				'              <p>Elit duis tristique sollicitudin nibh sit amet commodo. Dolor sit amet consectetur adipiscing elit. Lorem dolor sed viverra ipsum nunc. Accumsan tortor posuere ac ut consequat semper. Augue mauris augue neque gravida in fermentum et sollicitudin ac.</p>\n' +
				'            ',
			author: 'Steve S',
			date: 'May 24, 2022',
			datetime: '2022-05-24'
		}
	];
	return reviews as Review[];
});

export default component$(() => {
	const reviewsData = useReviewsData();

	return (
		<div class="p-16">
			<h2 class="text-center text-3xl font-bold">Recent reviews</h2>
			<div class="mt-6 pb-10 border-t border-gray-200 divide-y divide-gray-200 space-y-10">
				{reviewsData.value.map(review => (
					<div key={review.id} class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
						<div class="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
							<div class="flex items-center xl:col-span-1">
								<div class="flex items-center">
									{[0, 1, 2, 3, 4].map(rating => (
										<div key={rating}>
											<StarIcon rating={rating} review={review} />
										</div>
									))}
								</div>
								<p class="ml-3 text-sm text-gray-700">
									{review.rating}
									<span class="sr-only"> out of 5 stars</span>
								</p>
							</div>

							<div class="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
								<h3 class="text-sm font-medium text-gray-900">{review.title}</h3>

								<div
									class="mt-3 space-y-6 text-sm text-gray-500"
									dangerouslySetInnerHTML={review.content}
								/>
							</div>
						</div>

						<div class="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
							<p class="font-medium text-gray-900">{review.author}</p>
							<time
								dateTime={review.datetime}
								class="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
							>
								{review.date}
							</time>
						</div>
					</div>
				))}
			</div>
		</div>
	);
});
