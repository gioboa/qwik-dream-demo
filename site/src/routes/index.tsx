import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import RemoteSsr from '~/components/remote-ssr';

export default component$(() => {
  return (
    <>
      <h1>
        Qwik City Dream Demo <span class="lightning">⚡️</span>
      </h1>

      <RemoteSsr name="google" path="https://www.google.com"></RemoteSsr>
      <RemoteSsr name="body" path="https://qwik-multi-worker-body.devdash.workers.dev"></RemoteSsr>
    </>
  )
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
