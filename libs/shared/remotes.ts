export interface RemoteData {
	name: string;
	url: string;
}
export const remotes: Record<string, RemoteData> = {
	menu: {
		name: 'menu',
		url: 'http://localhost:5003/menu/',
	},
	hero: {
		name: 'hero',
		url: 'http://localhost:5002/hero/',
	},
	product: {
		name: 'product',
		url: 'http://localhost:5004/product/',
	},
	reviews: {
		name: 'reviews',
		url: 'http://localhost:5005/reviews/',
	},
	cart: {
		name: 'cart',
		url: 'http://localhost:5001/cart/',
	},
};
