import { ORDER_DETAIL_FRAGMENT } from "../../../../libs/shared/fragments.graphql";

export const ACTIVE_ORDER = /* GraphQL  */ `
  query ActiveOrder {
    activeOrder {
      ...OrderDetail 
    }
  }
  ${ORDER_DETAIL_FRAGMENT}
`;
