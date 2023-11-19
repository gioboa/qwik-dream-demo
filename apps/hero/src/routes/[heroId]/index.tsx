import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { RenderContent, getBuilderSearchParams, getContent } from '@builder.io/sdk-qwik';

export const BUILDER_MODEL = 'page';

export const useBuilderContent = routeLoader$(async ({ url, error }) => {
	const isPreviewing = url.searchParams.has('builder.preview');

	const builderContent = getContent({
		model: 'page',
		apiKey: import.meta.env.VITE_BUILDER_PUBLIC_API_KEY || '',
		options: getBuilderSearchParams(url.searchParams),
		userAttributes: {
			urlPath: url.pathname || '/',
		},
	});

	// If there's no content, throw a 404.
	// You can use your own 404 component here
	if (!builderContent && !isPreviewing) {
		throw error(404, 'Page not found');
	}
	// return content fetched from Builder, which is JSON
	return builderContent;
});

export const useUser = routeLoader$(async ({ url }) => {
	const user = url.searchParams.get('user');
	return user || '';
});

export default component$(() => {
	const userSig = useUser();
	const builderContentRsrcSig = useBuilderContent();

	return (
		<div>
			<div class="flex flex-col w-full items-center">
				<div class="text-[50px] text-blue-600 mb-2">Welcome back {userSig.value || 'user'}!</div>
				<div class="text-2xl text-gray-700 mb-6">
					Based on your orders, we selected a special product per you.
				</div>
			</div>
			<RenderContent
				model="page"
				content={builderContentRsrcSig.value}
				apiKey={import.meta.env.VITE_BUILDER_PUBLIC_API_KEY || ''}
			/>
		</div>
	);
});
