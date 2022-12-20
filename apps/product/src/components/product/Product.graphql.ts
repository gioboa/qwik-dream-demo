import { ORDER_DETAIL_FRAGMENT } from "@qwikdream/shared";

export const ADD_ITEM_TO_ORDER = /* GraphQL  */ `
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderDetail
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
  ${ORDER_DETAIL_FRAGMENT}
`;
