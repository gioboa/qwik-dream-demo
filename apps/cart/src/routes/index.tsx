import { $, component$, useClientEffect$, useOnDocument, useStore } from "@builder.io/qwik";
import CartContents from "~/components/cart-contents/CartContents";
import CartPrice from "~/components/cart-totals/CartPrice";
import CloseIcon from "~/components/icons/CloseIcon";
import ShoppingBagIcon from "~/components/icons/ShoppingBagIcon";
import {
	cartQuantitiesChangedEventId,
	orderChangeEventId,
	sessionTokenReceivedEventId
} from "../../../../libs/shared/custom-events";
import { graphQlQuery, setSessionToken } from "../../../../libs/shared/graphql-client";
import { ACTIVE_ORDER } from "~/routes/cart.graphql";

export function updateActiveOrder(state: { cart: any }) {
	return graphQlQuery(ACTIVE_ORDER)
		.then(({ data }) => {
			state.cart = data.activeOrder;
			const productVariantQuantities = data.activeOrder.lines.reduce((result: any, line: any) => ({
				...result,
				[line.productVariant.id]: line.quantity
			}), {});
			document.dispatchEvent(new CustomEvent(cartQuantitiesChangedEventId, { detail: productVariantQuantities }));
		});
}

export default component$(() => {
	const state = useStore({
		isOpen: false,
		cart: undefined as any
	});
	useClientEffect$(() => {
		// Fetch the active order on resume
		updateActiveOrder(state);
	});
	useOnDocument(sessionTokenReceivedEventId, $((event) => {
		setSessionToken((event as any).detail.sessionToken);
	}));
	useOnDocument(orderChangeEventId, $(() => {
		updateActiveOrder(state);
	}));

	const toggleMenu = $(async () => {
		state.isOpen = !state.isOpen;
	});

	return (
		<>
			{!state.isOpen ? (
				<div
					className="fixed z-50"
					style="right: 20px;top: -60px;position: absolute;"
				>
					<button
						className="w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
						onClick$={toggleMenu}
					>
						<ShoppingBagIcon />
						{!!state.cart?.totalQuantity && (
							<div className="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
								{state.cart?.totalQuantity}
							</div>
						)}
					</button>
				</div>
			) : (
				<div class="fixed inset-0 overflow-hidden z-20">
					<div class="absolute inset-0 overflow-hidden">
						<div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity opacity-100"></div>
						<div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
							<div class="w-screen max-w-md translate-x-0">
								<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
									<div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
										<div class="flex items-start justify-between">
											<h2 class="text-lg font-medium text-gray-900">
												Shopping cart
											</h2>
											<div class="ml-3 h-7 flex items-center">
												<button
													type="button"
													class="-m-2 p-2 text-gray-400 hover:text-gray-500"
													onClick$={toggleMenu}
												>
													<span class="sr-only">Close panel</span>
													<CloseIcon />
												</button>
											</div>
										</div>
										<div className="mt-8">
											{!!state.cart?.totalQuantity ? (
												<CartContents cart={state.cart} />
											) : (
												<div className="flex items-center justify-center h-48 text-xl text-gray-400">
													Your cart is empty
												</div>
											)}
										</div>
									</div>
									{!!state.cart?.totalQuantity && (
										<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>Subtotal</p>
												<p>
													<CartPrice
														forcedClassName={"subTotalWithTax"}
														amount={state.cart?.totalWithTax}
													/>
												</p>
											</div>
											<p className="mt-0.5 text-sm text-gray-500">
												Shipping will be calculated at checkout.
											</p>
											<div className="mt-6">
												<button
													className="disabled flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 w-full">
													Checkout
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
});
