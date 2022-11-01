import { component$ } from '@builder.io/qwik';
import { ITEM_PRICE } from '~/utils';
import Price from '../products/Price';

export default component$<{
	quantity: number;
}>(({ quantity }) => {
	return (
		<div className='flow-root'>
			<ul className='-my-6 divide-y divide-gray-200'>
				<li className='py-6 flex'>
					<div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
						<img
							src='https://demo.vendure.io/assets/preview/3c/xavier-teo-469050-unsplash__preview.jpg?preset=thumb'
							alt='Hi-Top Basketball Shoe'
							className='w-full h-full object-center object-cover'
						/>
					</div>

					<div className='ml-4 flex-1 flex flex-col'>
						<div>
							<div className='flex justify-between text-base font-medium text-gray-900'>
								<h3>Hi-Top Basketball Shoe Size 46</h3>
								<Price priceWithTax={ITEM_PRICE} forcedClassName='ml-4'></Price>
							</div>
						</div>
						<div className='flex-1 flex items-center text-sm'>
							<div className='text-gray-800'>
								<span className='mr-1'>Quantity</span>
								<span className='font-medium'>{quantity}</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
});
