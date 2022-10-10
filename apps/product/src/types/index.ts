export type ProductType = {
	id: string;
	name: string;
	slug?: string;
	description: string;
	collections: Collection[];
	facetValues: FacetValue[];
	featuredAsset: FeaturedAsset;
	assets: Asset[];
	variants: Variant[];
};

export type Collection = {
	id: string;
	slug: string;
	name: string;
	breadcrumbs?: Breadcrumb[];
	parent?: { name: '__root_collection__' };
	featuredAsset?: { id: string; preview: string };
	children: any[];
};

type Breadcrumb = {
	id: string;
	name: string;
	slug: string;
};

type Facet = {
	id: string;
	code: string;
	name: string;
};

type Asset = {
	id: string;
	preview: string;
};

export type Variant = {
	id: string;
	name: string;
	priceWithTax: number;
	currencyCode: 'USD';
	sku: string;
	stockLevel: string;
	featuredAsset?: any;
};

type FacetValue = {
	facet: Facet;
	id: string;
	code: string;
	name: string;
};

type FeaturedAsset = {
	id: string;
	preview: string;
};

export type Line = {
	id: string;
	unitPriceWithTax: number;
	linePriceWithTax: number;
	quantity: number;
	featuredAsset: FeaturedAsset;
	productVariant: ProductVariant;
};

type ProductVariant = {
	id: string;
	name: string;
	price: number;
	product: ProductType;
};
