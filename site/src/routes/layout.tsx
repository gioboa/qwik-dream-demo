import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import Header from '../components/header/header';
import { AppState, GlobalAppState } from './constants';

export default component$(() => {
  const store = useStore<AppState>({
    showSeams: false
  });
  useContextProvider(GlobalAppState, store)
  return (
    <>
      <Header />
      <main data-seams={store.showSeams}>
        <Slot />
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
        <button onClick$={() => store.showSeams = !store.showSeams}>Show Seams</button>
      </footer>
    </>
  );
});
