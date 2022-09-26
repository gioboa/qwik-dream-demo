import { component$ } from '@builder.io/qwik';
import { Menu } from '../components/menu/menu';

export default component$(() => {
	return (
		<>
			<main>
				<Menu />
			</main>
		</>
	);
});
