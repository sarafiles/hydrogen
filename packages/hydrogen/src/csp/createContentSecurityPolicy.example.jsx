import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  generateNonce,
  HydrogenServerProvider,
  createCSPHeader,
} from '@shopify/hydrogen';

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext,
) {
  const nonce = generateNonce();
  const body = await renderToReadableStream(
    <HydrogenServerProvider nonce={nonce}>
      <RemixServer context={remixContext} url={request.url} />
    </HydrogenServerProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set(
    'Content-Security-Policy',
    createCSPHeader(nonce, {
      // pass a custom directive to load content from a third party domain
      styleSrc: [
        "'self'",
        'https://cdn.shopify.com',
        'https://some-custom-css.cdn',
      ],
    }),
  );

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
