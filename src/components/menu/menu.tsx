/* eslint-disable no-console */
import { component$, Resource, useResource$, useStore } from '@builder.io/qwik';

type MenuItem = {
	slug: string;
	name: string;
	subMenus?: MenuItem[];
};

export const Menu = component$(() => {
	const trigger = useStore({ value: '' });
	const menuResource = useResource$<MenuItem[]>(({ track }) => {
		track(trigger, 'value');
		return getMenu();
	});

	return (
		<>
			<header
				class={`bg-gradient-to-r from-blue-700 to-indigo-900 shadow-lg transform shadow-xl sticky top-0 z-10 animate-dropIn`}
			>
				<div className='max-w-6xl mx-auto p-4 flex items-center space-x-4'>
					<h1 className='text-white w-10'>
						<a href='/'>
							<svg
								width='180'
								height='50'
								viewBox='0 0 167 53'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								role='img'
								aria-label='Qwik Logo'
								class='pr-10'
							>
								<path
									d='M40.973 52.5351L32.0861 43.6985L31.9503 43.7179V43.621L13.0511 24.9595L17.708 20.4637L14.9721 4.76715L1.99103 20.8513C-0.220992 23.0798 -0.628467 26.7036 0.962635 29.3778L9.07337 42.8265C10.3152 44.9 12.566 46.1402 14.9915 46.1208L19.0081 46.082L40.973 52.5351Z'
									fill='#18B6F6'
								></path>
								<path
									d='M45.8232 20.5411L44.038 17.2468L43.1066 15.5609L42.738 14.902L42.6992 14.9408L37.8094 6.47238C36.587 4.34075 34.2974 3.02301 31.8137 3.04239L27.5255 3.15865L14.7384 3.19741C12.313 3.21679 10.101 4.49577 8.87853 6.56927L1.09766 21.9945L15.0101 4.72831L33.2496 24.7656L30.0091 28.0406L31.9495 43.7178L31.9689 43.679V43.7178H31.9301L31.9689 43.7565L33.4824 45.2293L40.8364 52.4187C41.1469 52.7094 41.6514 52.3606 41.4379 51.9924L36.8975 43.0589L44.8142 28.4282L45.0664 28.1375C45.1634 28.0212 45.2604 27.905 45.3381 27.7887C46.8904 25.6764 47.1038 22.8472 45.8232 20.5411Z'
									fill='#AC7EF4'
								></path>
								<path
									d='M33.3076 24.6882L15.0099 4.74774L17.61 20.3668L12.9531 24.882L31.9105 43.6985L30.203 28.0794L33.3076 24.6882Z'
									fill='white'
								></path>
							</svg>
						</a>
					</h1>
					<Resource
						value={menuResource}
						onPending={() => <>Loading...</>}
						onRejected={(error) => <>Error: {error.message}</>}
						onResolved={(menu) => (
							<div className='flex space-x-4 hidden sm:block'>
								{menu.map((item) => (
									<div class='group inline-block relative'>
										<a
											class='text-gray-200 hover:text-white py-2 px-4 inline-flex items-center'
											href={'/collections/' + item.slug}
										>
											{item.name}
											{!!item.subMenus?.length && (
												<svg
													class='fill-current h-6 w-6 pt-1'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
												>
													<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
												</svg>
											)}
										</a>
										<div class='absolute hidden text-gray-200 hover:text-white pt-1 group-hover:block right-0 left-0'>
											{!!item.subMenus?.length &&
												item.subMenus.map((subItem, i, list) => (
													<a
														class={`${
															i === 0
																? 'rounded-t'
																: i === list.length - 1
																? 'rounded-b'
																: ''
														} bg-blue-700 hover:bg-indigo-900 py-2 px-4 block whitespace-no-wrap`}
														href={'/collections/' + subItem.slug}
													>
														{subItem.name}
													</a>
												))}
										</div>
									</div>
								))}
							</div>
						)}
					/>
					<div className='flex-1 md:pr-8'>{/* <SearchBar /> */}</div>
					<div className=''>
						{/* <button
								className='relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1'
								onClick$={() => (appState.showCart = !appState.showCart)}
							>
								<ShoppingBagIcon />
								{totalQuantity ? (
									<div className='absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6'>
										{totalQuantity}
									</div>
								) : (
									''
								)}
							</button> */}
					</div>
				</div>
			</header>
			<input
				class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				type='text'
				placeholder='fill me to trigger useResource$'
				value={trigger.value}
				onKeyUp$={(ev) =>
					(trigger.value = (ev.target as HTMLInputElement).value)
				}
			/>
		</>
	);
});

export async function getMenu(): Promise<MenuItem[]> {
	return [
		{
			name: 'Electronics',
			slug: 'electronics',
			subMenus: [
				{ name: 'Computers', slug: 'computers' },
				{ name: 'Camera photo', slug: 'camera-photo' },
			],
		},
		{
			name: 'Home & Garden',
			slug: 'home-garden',
			subMenus: [
				{ name: 'Furniture', slug: 'furniture' },
				{ name: 'Plants', slug: 'plants' },
			],
		},
		{
			name: 'Sports & Outdoor',
			slug: 'sports-outdoor',
			subMenus: [],
		},
		{
			name: 'Equipment',
			slug: 'equipment',
			subMenus: [],
		},
		{
			name: 'Footwear',
			slug: 'footwear',
			subMenus: [
				{ name: 'Nike', slug: 'nike' },
				{ name: 'Adidas', slug: 'adidas' },
			],
		},
	];
}
