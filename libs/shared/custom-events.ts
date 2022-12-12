export const SESSION_TOKEN_KEY = 'vendure-session-token';
export const ORDER_CHANGE_EVENT = 'ORDER_CHANGE_EVENT';
export const CART_QUANTITIES_CHANGED_EVENT = 'CART_QUANTITIES_CHANGED_EVENT';
export const SESSION_TOKEN_RECEIVED_EVENT = 'SESSION_TOKEN_RECEIVED_EVENT';

export const cartQuantitiesChangedEvent = (productVariantQuantities: Record<number, number>) =>
	new CustomEvent(CART_QUANTITIES_CHANGED_EVENT, { detail: productVariantQuantities });

export const sessionTokenReceivedEvent = (sessionToken: string) =>
	new CustomEvent(SESSION_TOKEN_RECEIVED_EVENT, { detail: { sessionToken } });

export const orderChangeEvent = () => new CustomEvent(ORDER_CHANGE_EVENT);
