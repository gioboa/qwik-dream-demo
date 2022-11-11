/* eslint-disable no-console */
import { component$, Resource } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import { ProductType } from '~/types';
import { remotes } from '../../../../libs/shared/remotes';
import { forcedDelay } from '../../../../libs/shared/utils';
import Product from '../components/product/Product';
import { graphQlQuery } from "../../../../libs/shared/graphql-api";

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
	await forcedDelay(remotes.product.secondsOfDelay);
	const response = await graphQlQuery(`
		  query product($slug: String, $id: ID) {
    product(slug: $slug, id: $id) {
      ...DetailedProduct
    }
  }

  fragment DetailedProduct on Product {
    id
    name
    description
    collections {
      id
      slug
      name
      breadcrumbs {
        id
        name
        slug
      }
    }
    facetValues {
      facet {
        id
        code
        name
      }
      id
      code
      name
    }
    featuredAsset {
      id
      preview
    }
    assets {
      id
      preview
    }
    variants {
      id
      name
      priceWithTax
      currencyCode
      sku
      stockLevel
      featuredAsset {
        id
        preview
      }
    }
  }
	`, { slug: 'runx-running-shoe' });
	return response.data.product;
};
