export interface RemoteData {
	name: string;
	url: string;
	urlLocal: string;
	secondsOfDelay: number;
	seamsColor: string;
	hideLabel?: true;
	defaultQueryParam?: string;
}

export const remotes: Record<string, RemoteData> = {
	menu: {
		name: 'menu',
		url: 'https://qwik-dream-menu.pages.dev/menu/',
		urlLocal: 'http://localhost:5003/menu/',
		secondsOfDelay: 0,
		seamsColor: '#007d81',
	},
	hero: {
		name: 'hero',
		url: 'https://qwik-dream-hero.pages.dev/hero/',
		urlLocal: 'http://localhost:5002/hero/',
		secondsOfDelay: 0,
		seamsColor: '#800006',
		defaultQueryParam: 'qwik',
	},
	product: {
		name: 'product',
		url: 'https://qwik-dream-product.pages.dev/product/',
		urlLocal: 'http://localhost:5004/product/',
		secondsOfDelay: 0,
		seamsColor: '#0031ff',
	},
	reviews: {
		name: 'reviews',
		url: 'https://qwik-dream-reviews.pages.dev/reviews/',
		urlLocal: 'http://localhost:5005/reviews/',
		secondsOfDelay: 0,
		seamsColor: '#bc0000',
	},
	cart: {
		name: 'cart',
		url: 'https://qwik-dream-cart.pages.dev/cart/',
		urlLocal: 'http://localhost:5006/cart/',
		secondsOfDelay: 0,
		seamsColor: '',
		hideLabel: true,
	},
};
