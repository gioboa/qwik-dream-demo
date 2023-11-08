import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getContent, RenderContent, getBuilderSearchParams } from '@builder.io/sdk-qwik';

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

export default component$(() => {
	const builderContentRsrcSig = useBuilderContent();

	return (
		<div class="my-4 mx-auto">
			<RenderContent
				model="page"
				content={builderContentRsrcSig.value}
				apiKey={import.meta.env.VITE_BUILDER_PUBLIC_API_KEY || ''}
			/>
		</div>
	);
});
