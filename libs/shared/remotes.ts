export interface RemoteData {
	name: string,
	url: string,
	port: number
}
export const remotes: Record<string, RemoteData> = {
	menu: { name: 'menu', url: 'https://qwik-dream-menu.pages.dev/menu/', port: 5001 },
	hero: { name: 'hero', url: 'https://qwik-dream-hero.pages.dev/hero/', port: 5002 },
	product: {
		name: 'product',
		url: 'https://qwik-dream-product.pages.dev/product/',
		port: 5003
	},
	reviews: {
		name: 'reviews',
		url: 'https://qwik-dream-reviews.pages.dev/reviews/',
		port: 5004
	},
};

export const host = { name: 'host', url: 'https://qwik-dream-demo.pages.dev/' };
