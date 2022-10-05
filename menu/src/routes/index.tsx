/* eslint-disable no-console */
import { component$, Resource } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import { QwikIcon } from '~/components/icons/QwikIcon';

type MenuItem = {
	slug: string;
	name: string;
	subMenus?: MenuItem[];
};

export default component$(() => {
	const menuData = useEndpoint<typeof onGet>();

	return (
		<>
			<header
				class={`bg-gradient-to-r from-blue-700 to-indigo-900 shadow-lg transform shadow-xl sticky top-0 z-10 animate-dropIn`}
			>
				<div className='max-w-6xl mx-auto p-4 flex items-center space-x-4'>
					<h1 className='text-white w-10'>
						<a href='/'>
							<QwikIcon />
						</a>
					</h1>
					<Resource
						value={menuData}
						// onPending={() => <>Loading...</>}
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
		</>
	);
});

export const onGet: RequestHandler<MenuItem[]> = async ({}) => {
	const endPoint = 'https://mocki.io/v1/a80ad7e4-f320-4946-85a5-3976a67d322f';
	const response = await fetch(endPoint);
	return response.ok
		? await response.json()
		: [{ name: 'fetch error', slug: 'error' }];
};
