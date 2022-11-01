import { component$ } from '@builder.io/qwik';
import { formatPrice } from '~/utils';

export default component$<{
	priceWithTax: number | undefined;
	forcedClassName?: string;
}>(({ priceWithTax, forcedClassName }: any) => {
	if (priceWithTax == null) {
		return <div></div>;
	}
	if (typeof priceWithTax === 'number') {
		return (
			<div className={forcedClassName}>{formatPrice(priceWithTax, 'USD')}</div>
		);
	}
	if ('value' in priceWithTax) {
		return (
			<div className={forcedClassName}>
				{formatPrice(priceWithTax.value, 'USD')}
			</div>
		);
	}
	if (priceWithTax.min === priceWithTax.max) {
		return (
			<div className={forcedClassName}>
				{formatPrice(priceWithTax.min, 'USD')}
			</div>
		);
	}
	return (
		<div className={forcedClassName}>
			{formatPrice(priceWithTax.min, 'USD')} -{' '}
			{formatPrice(priceWithTax.max, 'USD')}
		</div>
	);
});
