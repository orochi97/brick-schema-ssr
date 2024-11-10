import { RenderSdk } from '@brick/solid';

import '../index.css';

const init = async () => {
  const schemas = await fetch('/api/schemas').then(res => res.json());

  const startTime = performance.now();

  const $root = document.getElementById('root');

  if ($root && schemas) {
    const sdk = new RenderSdk({ schemas });
    if (process.env.RENDER_TYPE === 'csr') {
      sdk.createRoot($root);
    } else if (process.env.RENDER_TYPE === 'ssr') {
      sdk.hydrateRoot($root);
    }
  }

  console.info(`render in ${process.env.RENDER_TYPE}, cost time: ${performance.now() - startTime} ms`);
}

init();