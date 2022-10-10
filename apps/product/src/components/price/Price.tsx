import { component$ } from '@builder.io/qwik';
import { formatPrice } from '~/utils';

export default component$<{
	priceWithTax: number | undefined;
	forcedClassName?: string;
}>(({ priceWithTax, forcedClassName }: any) => {
	const currencyCode = 'USD';
	if (priceWithTax == null) {
		return <div></div>;
	}
	if (typeof priceWithTax === 'number') {
		return (
			<div className={forcedClassName}>
				{formatPrice(priceWithTax, currencyCode)}
			</div>
		);
	}
	if ('value' in priceWithTax) {
		return (
			<div className={forcedClassName}>
				{formatPrice(priceWithTax.value, currencyCode)}
			</div>
		);
	}
	if (priceWithTax.min === priceWithTax.max) {
		return (
			<div className={forcedClassName}>
				{formatPrice(priceWithTax.min, currencyCode)}
			</div>
		);
	}
	return (
		<div className={forcedClassName}>
			{formatPrice(priceWithTax.min, currencyCode)} -{' '}
			{formatPrice(priceWithTax.max, currencyCode)}
		</div>
	);
});
