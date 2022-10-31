import { component$, useStore } from '@builder.io/qwik';
import ShoppingBagIcon from '~/components/icons/ShoppingBagIcon';

export interface CartItem {
	name: string;
	price: number;
	quantity: number;
}

export interface Store {
	isOpen: boolean;
	items: CartItem[];
}

export const formatPrice = (amount: number) => {
	return new Intl.NumberFormat('en-us', {
		style: 'currency',
		currency: 'usd',
	}).format(amount);
};

export default component$(() => {
	const state = useStore<Store>(
		{
			isOpen: true,
			items: [],
		},
		{ recursive: true }
	);

	return (
		<>
			<div className='fixed z-50' style='right: 20px;top: 50px;'>
				<button
					className='relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1'
					onClick$={() => (state.isOpen = !state.isOpen)}
				>
					<ShoppingBagIcon />
					{state.items.length ? (
						<div className='absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6'>
							{state.items.length}
						</div>
					) : null}
				</button>
			</div>
			{/* {state.isOpen && <Cart closeCart={closeCart} />} */}
		</>
	);
});
