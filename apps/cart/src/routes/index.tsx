import { component$, useServerMount$, useStore } from '@builder.io/qwik';

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

	useServerMount$(() => {
		state.items = stubItems;
	});

	return (
		<>
			<button
				class='max-w-xs flex-1 bg-yellow-300 hover:bg-yellow-400 transition-colors border border-transparent rounded-md py-3 px-8 flex items-center 
									justify-center text-base font-medium text-yellow-900 focus:outline-none 
									focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-yellow-500 sm:w-full relative'
				onClick$={() => (state.isOpen = !state.isOpen)}
			>
				View Cart
				{state.items.length > 0 ? (
					<span class='absolute top-0 right-0 bg-white rounded-full w-[3ch] h-[3ch] grid place-items-center'>
						{state.items.length}
					</span>
				) : null}
			</button>
			<article
				class={`absolute bg-white grid gap-2 p-2 ${
					state.isOpen ? 'sr-only' : ''
				}`}
				document:onadditem$={(ev: CustomEvent<CartItem>) => {
					console.log('onadditem');
					state.items.push(ev.detail);
					document.dispatchEvent(new CustomEvent('itemAdded'));
				}}
			>
				<h2 class='uppercase font-black text-sm tracking-widest text-gray-400 text-center'>
					Your Cart
				</h2>
				<ul>
					{state.items.map((item, idx) => (
						<li key={idx} class='grid py-4 px-2 gap-1'>
							<header class='inline-flex gap-2 justify-between align-center'>
								<span class='text-lg font-bold'>{item.name}</span>
								<span class='text-gray-800'>{formatPrice(item.price)}</span>
							</header>
							<label class='inline-flex gap-2 justify-between'>
								<span class='font-black text-gray-400'>Quantity</span>
								<input
									type='number'
									name='qty'
									id='qty'
									class='text-right'
									min={0}
									value={item.quantity}
									onInput$={(e) => {
										const qty = (e.target as HTMLInputElement).valueAsNumber;
										if (qty === 0) {
											state.items = state.items.filter((_, i) => i !== idx);
											return;
										}
										state.items[idx].quantity = qty;
									}}
								/>
							</label>
							<label class='inline-flex gap-2 justify-between'>
								<span class='font-black text-gray-400'>Subtotal</span>
								<output class='font-bold' for='qty price'>
									{formatPrice(item.price * item.quantity)}
								</output>
							</label>
						</li>
					))}
				</ul>
				<a
					class='max-w-xs flex-1 bg-blue-900 hover:bg-blue-600 transition-colors border border-transparent rounded-md py-3 px-8 flex items-center 
									justify-center text-base font-medium text-blue-100 focus:outline-none 
									focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-600 sm:w-full relative'
					href='/checkout'
				>
					Checkout
				</a>
			</article>
		</>
	);
});

export const stubItems = [
	{
		name: 'Giorgio Feather Boa',
		price: 25,
		quantity: 2,
	},
	{
		name: 'Black & Becker Toaster',
		price: 30,
		quantity: 1,
	},
];
