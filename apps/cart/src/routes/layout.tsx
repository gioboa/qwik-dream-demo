import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import styles from '~/routes/tailwind.css';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Slot />
    </>
  );
});
