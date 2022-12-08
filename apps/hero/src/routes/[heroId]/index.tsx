import { component$, Resource, useResource$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { getBuilderSearchParams, getContent, RenderContent } from '@builder.io/sdk-qwik';

export default component$(() => {
	const location = useLocation();
	const builderContentRsrc = useResource$<any>(() => {
		return getContent({
			model: 'page',
			apiKey: import.meta.env.VITE_BUILDER_PUBLIC_API_KEY || '',
			options: getBuilderSearchParams(location.query),
			userAttributes: {
				urlPath: location.pathname || '/',
			},
		});
	});

	return (
		<div class="my-4 mx-auto">
			<Resource
				value={builderContentRsrc}
				onPending={() => <div>Loading...</div>}
				onResolved={content =>
					content ? (
						<RenderContent
							model="page"
							content={content}
							apiKey={import.meta.env.VITE_BUILDER_PUBLIC_API_KEY || ''}
						/>
					) : (
						<div>your content here</div>
					)
				}
			/>
		</div>
	);
});
