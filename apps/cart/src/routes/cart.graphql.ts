import { ORDER_DETAIL_FRAGMENT } from "@qwikdream/shared";

export const ACTIVE_ORDER = /* GraphQL  */ `
  query ActiveOrder {
    activeOrder {
      ...OrderDetail 
    }
  }
  ${ORDER_DETAIL_FRAGMENT}
`;
