import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import styles from '~/routes/tailwind.css';
import Header from '../components/header/header';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
