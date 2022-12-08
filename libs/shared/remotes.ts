export interface RemoteData {
	name: string;
	url: string;
	secondsOfDelay: number;
	seamsColor: string;
	extraStyles?: Record<string, string | number>;
	hideLabel?: true;
	defaultQueryParam?: string;
}

export const remotes: Record<string, RemoteData> = {
	menu: {
		name: 'menu',
		url: 'https://qwik-dream-menu.pages.dev/menu/',
		secondsOfDelay: 0,
		seamsColor: '#007d81',
	},
	hero: {
		name: 'hero',
		url: 'https://qwik-dream-hero.pages.dev/hero/',
		secondsOfDelay: 0,
		seamsColor: '#800006',
		defaultQueryParam: 'qwik',
	},
	product: {
		name: 'product',
		url: 'https://qwik-dream-product.pages.dev/product/',
		secondsOfDelay: 0,
		seamsColor: '#0031ff',
	},
	reviews: {
		name: 'reviews',
		url: 'https://qwik-dream-reviews.pages.dev/reviews/',
		secondsOfDelay: 0,
		seamsColor: '#bc0000',
	},
	cart: {
		name: 'cart',
		url: 'https://qwik-dream-cart.pages.dev/cart/',
		secondsOfDelay: 0,
		seamsColor: '',
		extraStyles: { 'z-index': 10 },
		hideLabel: true,
	},
};
