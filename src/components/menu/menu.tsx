/* eslint-disable no-console */
import { component$, useResource$, useStore } from '@builder.io/qwik';

export const Menu = component$(() => {
	const github = useStore({
		org: 'BuilderIO',
	});

	const reposResource = useResource$<string[]>(({ track, cleanup }) => {
		// We need a way to re-run fetching data whenever the `github.org` changes.
		// Use `track` to trigger re-running of this data fetching function.
		track(github, 'org');

		// A good practice is to use `AbortController` to abort the fetching of data if
		// new request comes in. We create a new `AbortController` and register a `cleanup`
		// function which is called when this function re-runs.
		const controller = new AbortController();
		cleanup(() => controller.abort());

		// Fetch the data and return the promises.
		return getRepositories(github.org, controller);
	});

	console.log('Render');
	return (
		<>
			<header
				class={`bg-gradient-to-r from-blue-700 to-indigo-900 shadow-lg transform shadow-xl sticky top-0 z-10 animate-dropIn`}
			>
				<div className='max-w-6xl mx-auto p-4 flex items-center space-x-4'>
					<h1 className='text-white w-10'>
						<a href='/'>
							<img
								src={`/cube-logo-small.webp`}
								width={40}
								height={31}
								alt='Vendure logo'
							/>
						</a>
					</h1>
					<div className='flex space-x-4 hidden sm:block'>
						{[
							{ id: 1, slug: 'Electronics', name: 'Electronics' },
							{ id: 2, slug: 'Home & Garden', name: 'Home & Garden' },
							{ id: 3, slug: 'Sports & Outdoor', name: 'Sports & Outdoor' },
						].map((collection) => (
							<a
								className='text-sm md:text-base text-gray-200 hover:text-white'
								href={'/collections/' + collection.slug}
								key={collection.id}
							>
								{collection.name}
							</a>
						))}
					</div>
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
			{/* <Cart /> */}
		</>
		// 	<span>
		// 		GitHub username:
		// 		<input
		// 			value={github.org}
		// 			onKeyUp$={(ev) =>
		// 				(github.org = (ev.target as HTMLInputElement).value)
		// 			}
		// 		/>
		// 	</span>
		// 	<div>
		// 		<Resource
		// 			value={reposResource}
		// 			onPending={() => <>Loading...</>}
		// 			onRejected={(error) => <>Error: {error.message}</>}
		// 			onResolved={(repos) => (
		// 				<ul>
		// 					{repos.map((repo) => (
		// 						<li>
		// 							<a href={`https://github.com/${github.org}/${repo}`}>
		// 								{repo}
		// 							</a>
		// 						</li>
		// 					))}
		// 				</ul>
		// 			)}
		// 		/>
		// 	</div>
		// </div>
	);
});

export async function getRepositories(
	username: string,
	controller?: AbortController
): Promise<string[]> {
	console.log('FETCH', `https://api.github.com/users/${username}/repos`);
	const resp = await fetch(`https://api.github.com/users/${username}/repos`, {
		signal: controller?.signal,
	});
	console.log('FETCH resolved');
	const json = await resp.json();
	return Array.isArray(json)
		? json.map((repo: { name: string }) => repo.name)
		: Promise.reject(json);
}
