import { component$, Resource, useStore } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';

export interface CartItem {
  name: string,
  price: number,
  quantity: number
}

export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-us", {
    style: 'currency',
    currency: 'usd'
  }).format(amount)
}

export default component$(() => {
  const itemsValue = useEndpoint<typeof onGet>();
  const state = useStore({
    isOpen: true
  })

  return (<>
    <button class="bg-yellow-300 text-yellow-900 px-4 py-2 relative" onClick$={() => state.isOpen = !state.isOpen}>View Cart</button>
    <article class={`absolute bg-white grid gap-2 p-2 ${state.isOpen ? 'sr-only' : ''}`}>
      <Resource
        value={itemsValue}
        onPending={() => <>Loading...</>}
        onResolved={({ items }) => {
          return <ul>
            {items.map((item, idx) => (
              <li key={idx} class="grid py-4 px-2 gap-1">
                <header class="inline-flex gap-2 justify-between align-center">
                  <span class="text-lg font-bold">{item.name}</span>
                  <span class="text-gray-800">{formatPrice(item.price)}</span>
                </header>
                <label class="inline-flex gap-2 justify-between">
                  <span class="font-black text-gray-400">Quantity</span>
                  <input type="number" name="qty" id="qty" class="text-right" min={1} value={item.quantity} onInput$={(e) => console.log((e.target as HTMLInputElement).valueAsNumber)} />
                </label>
                <label class="inline-flex gap-2 justify-between">
                  <span class="font-black text-gray-400">Subtotal</span>
                  <output class="font-bold" for="qty price">{formatPrice(item.price * item.quantity)}</output>
                </label>
              </li>
            ))}
          </ul>
        }}
      />
      <a class="bg-blue-900 text-blue-100 text-center inline-block px-4 py-2" href="/checkout">Checkout</a>
    </article>
  </>
  );
});

export const onGet: RequestHandler<{ items: CartItem[] }> = () => {
  return {
    items: [{
      name: "Giorgio Feather Boa",
      price: 25,
      quantity: 2
    }, {
      name: "Black & Becker Toaster",
      price: 30,
      quantity: 1
    }]
  }
}