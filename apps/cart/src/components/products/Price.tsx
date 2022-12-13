import { component$ } from '@builder.io/qwik';
import { formatPrice } from '../../utils';

export default component$<{
	priceWithTax: number | undefined;
	forcedClass?: string;
}>(({ priceWithTax, forcedClass }: any) => {
	const currencyCode = 'USD';
	return (
		<div>
			{typeof priceWithTax === 'number' ? (
				<div class={forcedClass}>{formatPrice(priceWithTax, currencyCode)}</div>
			) : 'value' in priceWithTax ? (
				<div class={forcedClass}>{formatPrice(priceWithTax.value, currencyCode)}</div>
			) : priceWithTax.min === priceWithTax.max ? (
				<div class={forcedClass}>{formatPrice(priceWithTax.min, currencyCode)}</div>
			) : (
				<div class={forcedClass}>
					{formatPrice(priceWithTax.min, currencyCode)} -{' '}
					{formatPrice(priceWithTax.max, currencyCode)}
				</div>
			)}
		</div>
	);
});
