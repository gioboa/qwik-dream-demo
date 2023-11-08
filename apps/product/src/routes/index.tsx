/* eslint-disable no-console */
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { graphQlQuery, PRODUCT_DETAIL_FRAGMENT } from '@qwikdream/shared';
import Product from '../components/product/Product';
import { ProductType } from '../types';

export const useProductData = routeLoader$(async () => {;
	const response = await graphQlQuery(
		`
		  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
    }
  }
	${PRODUCT_DETAIL_FRAGMENT}
	`,
		{ slug: 'grey-fabric-sofa' },
	);
	return response.data.product as ProductType;
});

export default component$(() => {
	const productDataSig = useProductData();
	return (
		<div class="px-16">
			<Product product={productDataSig.value} />
		</div>
	);
});
