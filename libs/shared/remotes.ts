export interface RemoteData {
	name: string;
	url: string;
	secondsOfDelay: number;
}

export const remotes: Record<string, RemoteData> = {
	menu: {
		name: 'menu',
		url: 'http://localhost:5003/menu/',
		secondsOfDelay: 0,
	},
	hero: {
		name: 'hero',
		url: 'http://localhost:5002/hero/',
		secondsOfDelay: 2,
	},
	product: {
		name: 'product',
		url: 'http://localhost:5004/product/',
		secondsOfDelay: 5,
	},
	reviews: {
		name: 'reviews',
		url: 'http://localhost:5005/reviews/',
		secondsOfDelay: 1,
	},
	cart: {
		name: 'cart',
		url: 'http://localhost:5006/cart/',
		secondsOfDelay: 0,
	},
};
