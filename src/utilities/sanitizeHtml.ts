// A lightweight sanitiser using DOMPurify.
// DOMPurify works in the browser and in Node via jsdom. We initialise
// a singleton instance depending on the environment.

import createDOMPurify from 'dompurify'

// DOMPurify may run both in browser and on the server.  The server
// version requires a fake `window` provided by `jsdom`, but we must
// avoid importing `jsdom` at the top level because it drags in Node
// builtins (net/http/etc.) that cannot be resolved in the client
// bundle.  Instead we lazily require it only when executing in a
// Node environment.

// use the return type of createDOMPurify to keep types in sync with
// the library; the DOMPurify exported namespace sometimes conflicts
// with the actual constructor type.
let purify: ReturnType<typeof createDOMPurify>

if (typeof window !== 'undefined') {
  // client side – use the real browser window
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  purify = createDOMPurify(window as any)
} else {
  // server side – require jsdom dynamically so the bundler ignores it
  // when building for the browser.  This code will only run during
  // SSR/Node execution.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { JSDOM } = require('jsdom')
  const { window } = new JSDOM('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  purify = createDOMPurify(window as any)
}

// allowed tags and attributes mirror the previous custom whitelist. Links
// are permitted with href/class/target, break tags with optional class.
// The configuration is intentionally untyped to avoid mismatches
// between the various DOMPurify type declarations that can be pulled in
// during development vs runtime.  We cast to `any` when calling
// `sanitize` below.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'span', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'u', 'i', 'a',
    'cite', 'p', 'b', 'small', 'mark'
  ],
  ALLOWED_ATTR: ['href', 'class', 'target', 'rel'],
  RETURN_TRUSTED_TYPE: false,
} as any

export const sanitizeHTML = (input: string | undefined | null): string => {
  if (!input) return ''
  // the typings in DOMPurify allow TrustedHTML when RETURN_TRUSTED_TYPE
  // is enabled; we always disable that flag above so this is safe.  Cast
  // via unknown to convince the checker.
  return purify.sanitize(String(input), PURIFY_CONFIG) as unknown as string
}

export default sanitizeHTML;
