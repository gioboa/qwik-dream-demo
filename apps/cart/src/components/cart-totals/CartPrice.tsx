import { component$ } from '@builder.io/qwik';
import { formatPrice } from '~/utils';

export default component$<{ amount: number; forcedClass: string }>(({ amount, forcedClass }) => {
	return <div class={forcedClass}>{formatPrice(amount, 'USD')}</div>;
});
