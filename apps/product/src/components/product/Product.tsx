import { $, component$, useOnDocument, useStore } from '@builder.io/qwik';
import {
	CART_QUANTITIES_CHANGED_EVENT,
	dispatchOrderChangeEvent,
	graphQlQuery,
} from '@qwikdream/shared';
import { ADD_ITEM_TO_ORDER } from '../../components/product/Product.graphql';
import { ProductType } from '../../types';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import CheckIcon from '../icons/CheckIcon';
import HeartIcon from '../icons/HeartIcon';
import Price from '../price/Price';
import StockLevelLabel from '../stock-level-label/StockLevelLabel';

export default component$(({ product }: { product: ProductType }) => {
	const state = useStore<{
		selectedVariantId: string;
		cartQuantities: { [productVariantId: string]: number };
	}>({
		selectedVariantId: product.variants[0].id,
		cartQuantities: {},
	});

	useOnDocument(
		CART_QUANTITIES_CHANGED_EVENT,
		$(event => {
			state.cartQuantities = (event as CustomEvent).detail;
		}),
	);

	const findVariantById = (id: string) => product.variants.find(v => v.id === id);
	const selectedVariant = () => findVariantById(state.selectedVariantId);
	const addItemToOrder = $(() =>
		graphQlQuery(ADD_ITEM_TO_ORDER, {
			productVariantId: state.selectedVariantId,
			quantity: 1,
		}).then(() => {
			dispatchOrderChangeEvent();
		}),
	);
	return (
		<div>
			<h2 class="tracking-tight text-gray-900 my-8 text-3xl font-bold">
				{product.name}
			</h2>
			<Breadcrumbs
				items={product.collections[product.collections.length - 1]?.breadcrumbs ?? []}
			></Breadcrumbs>
			<div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
				<div class="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
					<span class="rounded-md overflow-hidden">
						<div class="w-full h-full object-center object-cover rounded-lg">
							<img
								src={product.featuredAsset.preview + '?w=600'}
								alt={product.name}
								class="w-full h-96 object-center object-cover rounded-lg"
								width="600"
								height="600"
							/>
						</div>
					</span>
				</div>
				<div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
					<div class="">
						<h3 class="sr-only">Description</h3>
						<div class="text-base text-gray-700" dangerouslySetInnerHTML={product.description} />
					</div>
					{1 < product.variants.length && (
						<div class="mt-4">
							<label class="block text-sm font-medium text-gray-700">Select option</label>
							<select
								class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
								value={state.selectedVariantId}
								onChange$={(_, el) => (state.selectedVariantId = el.value)}
							>
								{product.variants.map(variant => (
									<option
										key={variant.id}
										value={variant.id}
										selected={state.selectedVariantId === variant.id}
									>
										{variant.name}
									</option>
								))}
							</select>
						</div>
					)}
					<div class="mt-10 flex sm:flex-row sm:items-center">
						<Price
							priceWithTax={selectedVariant()?.priceWithTax}
							forcedClass="text-3xl text-gray-900 mr-4"
						></Price>
						<div class="flex sm:flex-col1 align-baseline">
							<button
								class={`max-w-xs flex-1 bg-green-600 active:bg-green-700 hover:bg-green-700 transition-colors border 
								  border-transparent rounded-md py-3 px-8 flex items-center 
									justify-center text-base font-medium text-white focus:outline-none sm:w-full`}
								onClick$={() => addItemToOrder()}
							>
								{state.cartQuantities[state.selectedVariantId] ? (
									<span class="flex items-center">
										<CheckIcon />
										{state.cartQuantities[state.selectedVariantId]} in cart
									</span>
								) : (
									`Add to cart`
								)}
							</button>

							<button
								type="button"
								class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
							>
								<HeartIcon />
								<span class="sr-only">Add to favorites</span>
							</button>
						</div>
					</div>
					<div class="mt-2 flex items-center space-x-2">
						<span class="text-gray-500">{selectedVariant()?.sku}</span>
						<StockLevelLabel stockLevel={selectedVariant()?.stockLevel} />
					</div>

					<section class="mt-12 pt-12 border-t text-xs">
						<h3 class="text-gray-600 font-bold mb-2">Shipping & Returns</h3>
						<div class="text-gray-500 space-y-1">
							<p>Standard shipping: 3 - 5 working days. Express shipping: 1 - 3 working days.</p>
							<p>
								Shipping costs depend on delivery address and will be calculated during checkout.
							</p>
							<p>
								Returns are subject to terms. Please see the{' '}
								<span class="underline">returns page</span> for further information.
							</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
});
