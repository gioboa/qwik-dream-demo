/* eslint-disable no-console */
import { component$, Resource, useClientEffect$ } from "@builder.io/qwik";
import { useEndpoint } from "@builder.io/qwik-city";
import QwikIcon from "~/components/icons/QwikIcon";
import { remotes } from "../../../../libs/shared/remotes";
import { forcedDelay } from "../../../../libs/shared/utils";
import { graphQlQuery } from "../../../../libs/shared/graphql-api";
import { arrayToTree } from "~/utils/array-to-tree";


export default component$(() => {
	const menuData = useEndpoint<typeof onGet>();
	useClientEffect$(() => {
		console.log("menu is working");
	});

	return (
		<>
			<header
				class={`bg-gradient-to-r from-blue-700 to-indigo-900 shadow-lg transform shadow-xl sticky top-0 z-10 animate-dropIn`}
			>
				<div className="max-w-6xl mx-auto p-4 flex items-center space-x-4">
					<h1 className="text-white w-10">
						<a href="/">
							<QwikIcon />
						</a>
					</h1>
					<Resource
						value={menuData}
						// onPending={() => <>Loading...</>}
						onRejected={(error) => <>Error: {error.message}</>}
						onResolved={(root) => (
							<div className="flex space-x-4 hidden sm:block">
								{root.children.map((item) => (
									<div class="group inline-block relative">
										<a
											class="text-gray-200 hover:text-white py-2 px-4 inline-flex items-center"
											href={"/collections/" + item.slug}
										>
											{item.name}
											{!!item.children?.length && (
												<svg
													class="fill-current h-6 w-6 pt-1"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
												>
													<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
												</svg>
											)}
										</a>
										<div class="absolute hidden text-gray-200 hover:text-white pt-1 group-hover:block right-0 left-0">
											{!!item.children?.length &&
												item.children.map((subItem, i, list) => (
													<a
														class={`${
															i === 0
																? "rounded-t"
																: i === list.length - 1
																	? "rounded-b"
																	: ""
														} bg-blue-700 hover:bg-indigo-900 py-2 px-4 block whitespace-no-wrap`}
														href={"/collections/" + subItem.slug}
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
					<div className="flex-1 md:pr-8">{/* <SearchBar /> */}</div>
				</div>
			</header>
		</>
	);
});

export const onGet = async () => {
	await forcedDelay(remotes.menu.secondsOfDelay);
	const response = await graphQlQuery(`
			query collections {
			   collections {
			     items {
			       id
			       name
			       slug
			       parent {
			         id
			         name
			       }
			     }
			   }
			 }`);
	return arrayToTree<{ id: string; name: string; slug: string; }>(response.data.collections.items);
};

