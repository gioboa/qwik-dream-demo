/* eslint-disable no-console */
import { component$, Resource } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import { ProductType } from '~/types';
import { remotes } from '../../../../libs/shared/remotes';
import { forcedDelay } from '../../../../libs/shared/utils';
import Product from '../components/product/Product';

export default component$(() => {
	const productData = useEndpoint<typeof onGet>();

	return (
		<Resource
			value={productData}
			// onPending={() => <>Loading...</>}
			onRejected={(error) => <>Error: {error.message}</>}
			onResolved={(product) => (
				<div class='px-16'>
					<Product product={product} />
				</div>
			)}
		/>
	);
});

export const onGet: RequestHandler<ProductType> = async ({}) => {
	const endPoint = 'https://mocki.io/v1/f85b9e7a-f0a3-4592-8be3-3123ebaabb6c';
	await forcedDelay(remotes.product.secondsOfDelay);
	const response = await fetch(endPoint);
	return response.ok
		? await response.json()
		: [{ name: 'fetch error', slug: 'error' }];
};
