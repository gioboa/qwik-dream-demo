export const formatPrice = (value: number, currency: any) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(value / 100);
};

export const ITEM_PRICE = 16800;
