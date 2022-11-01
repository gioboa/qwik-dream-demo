import { component$ } from '@builder.io/qwik';
import { formatPrice } from '~/utils';

export default component$<{ amount: number; forcedClassName: string }>(
	({ amount, forcedClassName }) => {
		return <div className={forcedClassName}>{formatPrice(amount, 'USD')}</div>;
	}
);
