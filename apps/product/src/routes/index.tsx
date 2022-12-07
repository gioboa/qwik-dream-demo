/* eslint-disable no-console */
import { component$, Resource } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import { ProductType } from '~/types';
import { PRODUCT_DETAIL_FRAGMENT } from '../../../../libs/shared/fragments.graphql';
import { graphQlQuery } from '../../../../libs/shared/graphql-client';
import { remotes } from '../../../../libs/shared/remotes';
import { forcedDelay } from '../../../../libs/shared/utils';
import Product from '../components/product/Product';

export default component$(() => {
	const productData = useEndpoint<typeof onGet>();

	return (
		<Resource
			value={productData}
			onPending={() => <div>Loading...</div>}
			onRejected={error => <div>Error: {error.message}</div>}
			onResolved={product => (
				<div class="px-16">
					<Product product={product} />
				</div>
			)}
		/>
	);
});

export const onGet: RequestHandler<ProductType> = async () => {
	await forcedDelay(remotes.product.secondsOfDelay);
	const response = await graphQlQuery(
		`
		  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
    }
  }
	${PRODUCT_DETAIL_FRAGMENT}
	`,
		{ slug: 'runx-running-shoe' },
	);
	return response.data.product;
};
