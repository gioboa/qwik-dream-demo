import { component$ } from '@builder.io/qwik';
import Price from '../products/Price';

export default component$<{
	cart: any;
}>(({ cart }) => {
	return (
		<div class="flow-root">
			<ul class="-my-6 divide-y divide-gray-200">
				{(cart?.lines || []).map((line: any, key: number) => (
					<li key={key} class="py-6 flex">
						<div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
							<img
								src={line.featuredAsset.preview + '?preset=thumb'}
								alt="Hi-Top Basketball Shoe"
								class="w-full h-full object-center object-cover"
								width={80}
								height={80}
							/>
						</div>

						<div class="ml-4 flex-1 flex flex-col">
							<div>
								<div class="flex justify-between text-base font-medium text-gray-900">
									<h3>{line.productVariant.name}</h3>
									<Price priceWithTax={line.linePriceWithTax} forcedClass="ml-4"></Price>
								</div>
							</div>
							<div class="flex-1 flex items-center text-sm">
								<div class="text-gray-800">
									<span class="mr-1">Quantity</span>
									<span class="font-medium">{line.quantity}</span>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
});
