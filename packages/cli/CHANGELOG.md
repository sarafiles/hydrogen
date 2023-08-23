# @shopify/cli-hydrogen

## 5.2.1

### Patch Changes

- Hydrogen is now compatible with TypeScript v5. ([#1240](https://github.com/Shopify/hydrogen/pull/1240)) by [@frandiox](https://github.com/frandiox)

  If you have `typescript` as a dev dependency in your app, it is recommended to change its version as follows:

  ```diff
    "devDependencies": {
      ...
  -   "typescript": "^4.9.5",
  +   "typescript": "^5.1.6",
    },
  ```

  After installing the new version of TypeScript, you may need to update the version used in your IDE. For example, in VSCode, you can do this by clicking on the `{ }` icon in the bottom-right toolbar next to the language mode (generally, `{ } TypeScript JSX` when editing a `.tsx` file).

- Updated dependencies [[`06516ee9`](https://github.com/Shopify/hydrogen/commit/06516ee91f20153902c2b8ef79c0f6690ba385bb)]:
  - @shopify/hydrogen-react@2023.7.3

## 5.2.0

### Minor Changes

- Support Remix Hot Module Replacement (HMR) and Hot Data Revalidation (HDR). ([#1187](https://github.com/Shopify/hydrogen/pull/1187)) by [@frandiox](https://github.com/frandiox)

  Start using it with the following changes to your project:

  1. Upgrade to the latest Hydrogen version and Remix 1.19.1.

  2. Enable the v2 dev server in `remix.config.js`:

  ```diff
  // ...
  future: {
  + v2_dev: true,
    v2_meta: true,
    v2_headers: true,
    // ...
  }
  ```

  3. Add Remix' `<LiveReload />` component if you don't have it to your `root.jsx` or `root.tsx` file:

  ```diff
  import {
    Outlet,
    Scripts,
  + LiveReload,
    ScrollRestoration,
  } from '@remix-run/react';

  // ...

  export default function App() {
    // ...

    return (
      <html>
        <head>
         {/* ...  */}
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
  +       <LiveReload />
        </body>
      </html>
    );
  }

  export function ErrorBoundary() {
    // ...

    return (
      <html>
        <head>
          {/* ... */}
        </head>
        <body>
          Error!
          <Scripts />
  +       <LiveReload />
        </body>
      </html>
    );
  }
  ```

### Patch Changes

- Avoid development server crash on unhandled promise rejection. ([#1244](https://github.com/Shopify/hydrogen/pull/1244)) by [@frandiox](https://github.com/frandiox)

- Fix build command when `public` directory is missing. ([#1224](https://github.com/Shopify/hydrogen/pull/1224)) by [@frandiox](https://github.com/frandiox)

- Use nonce from CSP header in MiniOxygen's auto-reload script. ([#1251](https://github.com/Shopify/hydrogen/pull/1251)) by [@frandiox](https://github.com/frandiox)

- Add default exported route to enable the error to be caught in the root.tsx ErrorBoundary ([#1215](https://github.com/Shopify/hydrogen/pull/1215)) by [@josh-sanger](https://github.com/josh-sanger)

- Improve error handling when failing to get remote environment variables. ([#1225](https://github.com/Shopify/hydrogen/pull/1225)) by [@frandiox](https://github.com/frandiox)

- Fix GraphQL Codegen throwing error related to Git on Windows. ([#1253](https://github.com/Shopify/hydrogen/pull/1253)) by [@frandiox](https://github.com/frandiox)

- Add shouldRevalidate export to limit root loaders revalidation on mutations only ([#1237](https://github.com/Shopify/hydrogen/pull/1237)) by [@juanpprieto](https://github.com/juanpprieto)

- Removed quantityAvailable field from skeleton PDP graphql query so that it works with default Storefront API permissions. ([#1236](https://github.com/Shopify/hydrogen/pull/1236)) by [@abecciu](https://github.com/abecciu)

- Updated dependencies [[`e9e1736a`](https://github.com/Shopify/hydrogen/commit/e9e1736ace6bd981e8109e38402eb405f7c865c1), [`1a0e858d`](https://github.com/Shopify/hydrogen/commit/1a0e858d94ea7d14f3f37ca32d288b33436038b0)]:
  - @shopify/hydrogen-react@2023.7.2

## 5.1.2

### Patch Changes

- Update @shopify/oxygen-workers-types dependencies ([#1208](https://github.com/Shopify/hydrogen/pull/1208)) by [@juanpprieto](https://github.com/juanpprieto)

- Updated dependencies [[`21eb9dac`](https://github.com/Shopify/hydrogen/commit/21eb9dac935722fd8d0d385b00c3bbcfb4693baa), [`d80c4ada`](https://github.com/Shopify/hydrogen/commit/d80c4ada051dd5530c12720cb7d8e8c6dda19c98)]:
  - @shopify/remix-oxygen@1.1.3
  - @shopify/hydrogen-react@2023.7.1

## 5.1.1

### Patch Changes

- Update to Remix v1.19.1. ([#1172](https://github.com/Shopify/hydrogen/pull/1172)) by [@frandiox](https://github.com/frandiox)

  See changes for [1.18](https://github.com/remix-run/remix/releases/tag/remix%401.18.0) and [1.19](https://github.com/remix-run/remix/releases/tag/remix%401.19.0).

- Fix the starter template cart aside to cover everything on larger pages ([#1163](https://github.com/Shopify/hydrogen/pull/1163)) by [@QuentinGibson](https://github.com/QuentinGibson)

- Skip Oxygen requirement checks of `remix.config.js` when `@shopify/remix-oxygen` is not installed. ([#1137](https://github.com/Shopify/hydrogen/pull/1137)) by [@frandiox](https://github.com/frandiox)

- Warn in development when Remix packages are out of sync. ([#1173](https://github.com/Shopify/hydrogen/pull/1173)) by [@frandiox](https://github.com/frandiox)

- Updated dependencies [[`b7a8ecf6`](https://github.com/Shopify/hydrogen/commit/b7a8ecf6a687e72de7745a78c61c1a78a9a52629)]:
  - @shopify/remix-oxygen@1.1.2

## 5.1.0

### What’s new

⭐️ Check out our [blog post](https://hydrogen.shopify.dev/updates) with all the latest updates on Hydrogen, and what’s coming on the roadmap.

Shopify CLI now gives you [more options](https://shopify.dev/docs/custom-storefronts/hydrogen/getting-started/quickstart) when creating a new Hydrogen app on the command line:

- Create a new Shopify storefront and connect it to the local project, or use [Mock.shop](https://mock.shop).
- Pick your styling method: Tailwind, CSS Modules, Vanilla Extract, PostCSS.
- URL strategies to support language and currency options with Shopify Markets.
- Automatically scaffold standard Shopify routes.

### Minor Changes

- The onboarding process when creating new Hydrogen apps has been reworked. ([#913](https://github.com/Shopify/hydrogen/pull/913)) by [@frandiox](https://github.com/frandiox)

- Add `login` and `logout` commands. Rework how other commands interact with auth. ([#1022](https://github.com/Shopify/hydrogen/pull/1022)) by [@frandiox](https://github.com/frandiox)

- Reload environment variables in the development server when `.env` file is updated. Show injected variables when project is not linked to any storefront. ([#997](https://github.com/Shopify/hydrogen/pull/997)) by [@frandiox](https://github.com/frandiox)

- Support creating new storefronts from the `link` command. ([#1022](https://github.com/Shopify/hydrogen/pull/1022)) by [@frandiox](https://github.com/frandiox)

### Patch Changes

- Stop checking `/products` and `/discount` routes in `h2 check routes` command. ([#1141](https://github.com/Shopify/hydrogen/pull/1141)) by [@frandiox](https://github.com/frandiox)

- Show proper error message when Hydrogen App isn't installed on Shop ([#1075](https://github.com/Shopify/hydrogen/pull/1075)) by [@aswamy](https://github.com/aswamy)

- Improve warning and error format for known Hydrogen messages in development. ([#1093](https://github.com/Shopify/hydrogen/pull/1093)) by [@frandiox](https://github.com/frandiox)

- Add `--codegen-unstable` flag to `build` command. ([#1049](https://github.com/Shopify/hydrogen/pull/1049)) by [@frandiox](https://github.com/frandiox)

- Updated dependencies [[`c39411e0`](https://github.com/Shopify/hydrogen/commit/c39411e0454750697d580a1ef4858800c494980f), [`0d2e5ffb`](https://github.com/Shopify/hydrogen/commit/0d2e5ffb68096f1dc48ade8793e6ef53088af6da), [`4bee03df`](https://github.com/Shopify/hydrogen/commit/4bee03df3cc8203510f6b05522c1268aa5e5f2f4), [`11ab64a8`](https://github.com/Shopify/hydrogen/commit/11ab64a88966dd7b90522f15836abfff6f5d595f), [`7a7456a5`](https://github.com/Shopify/hydrogen/commit/7a7456a5ab073559aef37f043e8aa47570639b96)]:
  - @shopify/hydrogen-react@2023.4.6

## 5.0.2

### Patch Changes

- Add more context on MiniOxygen local dev server startup ([#1005](https://github.com/Shopify/hydrogen/pull/1005)) by [@gfscott](https://github.com/gfscott)

- Fix `--sourcemap` flag for build command. ([#1032](https://github.com/Shopify/hydrogen/pull/1032)) by [@frandiox](https://github.com/frandiox)

- Fix `dev --codegen-unstable` flag, which was removed by mistake in the previous release. ([#1018](https://github.com/Shopify/hydrogen/pull/1018)) by [@frandiox](https://github.com/frandiox)

- Updated dependencies [[`b8f41ad7`](https://github.com/Shopify/hydrogen/commit/b8f41ad7174056f304301022a2aa77cecfdf0824)]:
  - @shopify/hydrogen-react@2023.4.5

## 5.0.1

### Patch Changes

- Update Remix to the latest version (`1.17.1`). ([#852](https://github.com/Shopify/hydrogen/pull/852)) by [@frandiox](https://github.com/frandiox)

  When updating your app, remember to also update your Remix dependencies to `1.17.1` in your `package.json` file:

  ```diff
  -"@remix-run/react": "1.15.0",
  +"@remix-run/react": "1.17.1",

  -"@remix-run/dev": "1.15.0",
  -"@remix-run/eslint-config": "1.15.0",
  +"@remix-run/dev": "1.17.1",
  +"@remix-run/eslint-config": "1.17.1",
  ```

- Updated dependencies [[`f29e178a`](https://github.com/Shopify/hydrogen/commit/f29e178ada608ef3797c5049fd498afeed272152)]:
  - @shopify/remix-oxygen@1.1.1

## 5.0.0

### Patch Changes

- Remove `--codegen-unstable` flag from scripts when transpiling projects from TypeScript to JavaScript. ([#937](https://github.com/Shopify/hydrogen/pull/937)) by [@frandiox](https://github.com/frandiox)

- Allow disabling sourcemaps with `shopify hydrogen build --no-sourcemap` ([#975](https://github.com/Shopify/hydrogen/pull/975)) by [@blittle](https://github.com/blittle)

- Allow the CLI route generate to work in non-oxygen deploys ([#976](https://github.com/Shopify/hydrogen/pull/976)) by [@blittle](https://github.com/blittle)

- Hidden flag removed from new CLI commands ([#995](https://github.com/Shopify/hydrogen/pull/995)) by [@graygilmore](https://github.com/graygilmore)

  You can now link your local Hydrogen storefront to a storefront you have created in the Shopify admin. This allows you to pull your environment variables into your local environment or have them be automatically injected into your runtime when you run `dev`.

- Updated dependencies [[`7b4afea2`](https://github.com/Shopify/hydrogen/commit/7b4afea29a050f9c77482540e321d9bc60351b2e), [`32515232`](https://github.com/Shopify/hydrogen/commit/32515232aa03077b542f5fcf95f38a715af09327), [`7d6a1a7c`](https://github.com/Shopify/hydrogen/commit/7d6a1a7cd3adb6ee0cf4cf242b72d5650509639b), [`442f602a`](https://github.com/Shopify/hydrogen/commit/442f602a45902beeb188575a85151f45b8be23ca), [`be912b2f`](https://github.com/Shopify/hydrogen/commit/be912b2ff7f4bc7a45688ff96d76f482b164efe5), [`b9ab8eb7`](https://github.com/Shopify/hydrogen/commit/b9ab8eb70f1506ab7516804ea69ecb9a693c420a), [`d3817b9c`](https://github.com/Shopify/hydrogen/commit/d3817b9c5e15db0c997089387fd9d43ab0fae027), [`93a7c3c6`](https://github.com/Shopify/hydrogen/commit/93a7c3c65fc10c8b1a16cee5fa57ad932d278dc8), [`6b8537ba`](https://github.com/Shopify/hydrogen/commit/6b8537ba1b4ce320a6b59a398ca12df731f97483)]:
  - @shopify/hydrogen-react@2023.4.4
  - @shopify/remix-oxygen@1.1.0
  - @shopify/hydrogen-codegen@0.0.2

## 4.2.1

### Patch Changes

- Fix release ([#926](https://github.com/Shopify/hydrogen/pull/926)) by [@blittle](https://github.com/blittle)

- Updated dependencies [[`7aaa4e86`](https://github.com/Shopify/hydrogen/commit/7aaa4e86739e22b2d9a517e2b2cfc20110c87acd)]:
  - @shopify/hydrogen-codegen@0.0.1
  - @shopify/hydrogen-react@2023.4.3
  - @shopify/remix-oxygen@1.0.7

## 4.2.0

### Minor Changes

- Add **UNSTABLE** support for GraphQL Codegen to automatically generate types for every Storefront API query in the project via `@shopify/hydrogen-codegen`. ([#707](https://github.com/Shopify/hydrogen/pull/707)) by [@frandiox](https://github.com/frandiox)

  > Note: This feature is unstable and subject to change in patch releases.

  How to use it while unstable:

  1. Write your queries/mutations in `.ts` or `.tsx` files and use the `#graphql` comment inside the strings. It's important that every query/mutation/fragment in your project has a **unique name**:

     ```ts
     const UNIQUE_NAME_SHOP_QUERY = `#graphql
       query unique_name_shop { shop { id } }
     `;
     ```

     If you use string interpolation in your query variables (e.g. for reusing fragments) you will need to specify `as const` after each interpolated template literal. This helps TypeScript infer the types properly instead of getting a generic `string` type:

     ```ts
     const UNIQUE_NAME_SHOP_FRAGMENT = `#graphql
       fragment unique_name_shop_fields on Shop { id name }
     `;

     const UNIQUE_NAME_SHOP_QUERY = `#graphql
       query unique_name_shop { shop { ...unique_name_shop_fields } }
       ${UNIQUE_NAME_SHOP_FRAGMENT}
     ` as const;
     ```

  2. Pass the queries to the Storefront client and do not specify a generic type value:

     ```diff
     -import type {Shop} from '@shopify/hydrogen/storefront-api-types';
     // ...
     -const result = await storefront.query<{shop: Shop}>(UNIQUE_NAME_SHOP_QUERY);
     +const result = await storefront.query(UNIQUE_NAME_SHOP_QUERY);
     ```

  3. Pass the flag `--codegen-unstable` when running the development server, or use the new `codegen-unstable` command to run it standalone without a dev-server:

     ```bash
     npx shopify hydrogen dev --codegen-unstable # Dev server + codegen watcher
     npx shopify hydrogen codegen-unstable # One-off codegen
     npx shopify hydrogen codegen-unstable --watch # Standalone codegen watcher
     ```

  As a result, a new `storefrontapi.generated.d.ts` file should be generated at your project root. You don't need to reference this file from anywhere for it to work, but you should commit it every time the types change.

  **Optional**: you can tune the codegen configuration by providing a `<root>/codegen.ts` file (or specify a different path with the `--codegen-config-path` flag) with the following content:

  ```ts
  import type {CodegenConfig} from '@graphql-codegen/cli';
  import {preset, pluckConfig, schema} from '@shopify/hydrogen-codegen';

  export default <CodegenConfig>{
    overwrite: true,
    pluckConfig,
    generates: {
      ['storefrontapi.generated.d.ts']: {
        preset,
        schema,
        documents: ['*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
      },
    },
  };
  ```

  Feel free to add your custom schemas and generation config here or read from different document files. Please, report any issue you find in our repository.

### Patch Changes

- Add command to list environments from a linked Hydrogen storefront. ([#889](https://github.com/Shopify/hydrogen/pull/889)) by [@graygilmore](https://github.com/graygilmore)

- Update dev command to automatically injected environment variables from a linked Hydrogen storefront ([#861](https://github.com/Shopify/hydrogen/pull/861)) by [@graygilmore](https://github.com/graygilmore)

- Adds the ability to specify an Environment's branch name to interact with Hydrogen storefront environment variables ([#883](https://github.com/Shopify/hydrogen/pull/883)) by [@graygilmore](https://github.com/graygilmore)

- Fixes issue where routes that begin with the url `/events` could not be created because an internal handler had claimed those routes already. The internal handler now listens at `/__minioxygen_events` so hopefully that doesn't conflict with anyone now. :) ([#915](https://github.com/Shopify/hydrogen/pull/915)) by [@frehner](https://github.com/frehner)

- Updated dependencies [[`112ac42a`](https://github.com/Shopify/hydrogen/commit/112ac42a095afc5269ae75ff15828f27b90c9687), [`2e1e4590`](https://github.com/Shopify/hydrogen/commit/2e1e45905444ab04fe1fe308ecd2bd00a0e8fce1)]:
  - @shopify/hydrogen-codegen@0.0.0
  - @shopify/hydrogen-react@2023.4.2

## 4.1.2

### Patch Changes

- Add command to pull environment variables from a Hydrogen storefront defined in the Shopify Admin ([#809](https://github.com/Shopify/hydrogen/pull/809)) by [@graygilmore](https://github.com/graygilmore)

- Update docs links on successful project creation ([#810](https://github.com/Shopify/hydrogen/pull/810)) by [@gfscott](https://github.com/gfscott)

- New `--debug` flag for the `dev` command that attaches a Node inspector to the development server. ([#869](https://github.com/Shopify/hydrogen/pull/869)) by [@frandiox](https://github.com/frandiox)

- Ensure request logs are shown in MiniOxygen during development. ([#836](https://github.com/Shopify/hydrogen/pull/836)) by [@frandiox](https://github.com/frandiox)

  Provide [custom Oxygen headers](https://shopify.dev/docs/custom-storefronts/oxygen/worker-runtime-apis#custom-headers) in local MiniOxygen.

- Add new commands for merchants to be able to list and link Hydrogen storefronts on Shopify ([#784](https://github.com/Shopify/hydrogen/pull/784)) by [@graygilmore](https://github.com/graygilmore)

- Updated dependencies [[`025385b6`](https://github.com/Shopify/hydrogen/commit/025385b6f9f58a76ffb15d9f505dfbf2b5e21427), [`0a009a3b`](https://github.com/Shopify/hydrogen/commit/0a009a3ba06dadd8f9d799575d7f88590f82a966)]:
  - @shopify/remix-oxygen@1.0.6
  - @shopify/hydrogen-react@2023.4.1

## 4.1.1

### Patch Changes

- Fix the `check routes` command to match optional segments. ([#774](https://github.com/Shopify/hydrogen/pull/774)) by [@frandiox](https://github.com/frandiox)

- Updated dependencies [[`82b6af7`](https://github.com/Shopify/hydrogen/commit/82b6af71cafe1f88c24630178e61cd09e5a59f5e), [`361879e`](https://github.com/Shopify/hydrogen/commit/361879ee11dfe8f1ee916b022165b1e7f0e45964)]:
  - @shopify/hydrogen-react@2023.4.0

## 4.1.0

### Minor Changes

- Updated CLI prompts. It's recommended to update your version of `@shopify/cli` to `3.45.0` when updating `@shopify/cli-hydrogen`. ([#733](https://github.com/Shopify/hydrogen/pull/733)) by [@frandiox](https://github.com/frandiox)

  ```diff
  "dependencies": {
  -  "@shopify/cli": "3.x.x",
  +  "@shopify/cli": "3.45.0",
  }
  ```

- Added a new `shortcut` command that creates a global `h2` alias for the Hydrogen CLI: ([#679](https://github.com/Shopify/hydrogen/pull/679)) by [@frandiox](https://github.com/frandiox)

  ```sh
  $> npx shopify hydrogen shortcut
  ```

  After that, you can run commands using the new alias:

  ```sh
  $> h2 generate route home
  $> h2 g r home # Same as the above
  $> h2 check routes
  ```

### Patch Changes

- Add support for the Remix future flags `v2_meta`, `v2_errorBoundary` and `v2_routeConvention` to the `generate` command. If these flags are enabled in your project, the new generated files will follow the v2 conventions. ([#756](https://github.com/Shopify/hydrogen/pull/756)) by [@frandiox](https://github.com/frandiox)

- Update virtual route to use Remix V2 route name conventions ([#792](https://github.com/Shopify/hydrogen/pull/792)) by [@DavidWittness](https://github.com/DavidWittness)

- Bump internal Remix dependencies to 1.15.0. ([#728](https://github.com/Shopify/hydrogen/pull/728)) by [@wizardlyhel](https://github.com/wizardlyhel)

  Recommendations to follow:

  - Upgrade all the Remix packages in your app to 1.15.0.
  - Enable Remix v2 future flags at your earliest convenience following [the official guide](https://remix.run/docs/en/1.15.0/pages/v2).

- Improve type safety in SEO data generators. ([#763](https://github.com/Shopify/hydrogen/pull/763)) by [@davidhousedev](https://github.com/davidhousedev)

- Updated dependencies [[`85ae63a`](https://github.com/Shopify/hydrogen/commit/85ae63ac37e5c4200919d8ae6c861c60effb4ded), [`5e26503`](https://github.com/Shopify/hydrogen/commit/5e2650374441fb5ae4840215fefdd5d547a378c0), [`1f8526c`](https://github.com/Shopify/hydrogen/commit/1f8526c750dc1d5aa7ea02e196fffdd14d17a536)]:
  - @shopify/hydrogen-react@2023.1.8
  - @shopify/remix-oxygen@1.0.5

## 4.0.9

### Patch Changes

- 1. Update Remix to 1.14.0 ([#599](https://github.com/Shopify/hydrogen/pull/599)) by [@blittle](https://github.com/blittle)

  1. Add `Cache-Control` defaults to all the demo store routes

- Fixed a typo in the install deps flag. The flag is now SHOPIFY_HYDROGEN_FLAG_INSTALL_DEPS. ([#672](https://github.com/Shopify/hydrogen/pull/672)) by [@cartogram](https://github.com/cartogram)

- Display warning for deprecated flags. ([#609](https://github.com/Shopify/hydrogen/pull/609)) by [@cartogram](https://github.com/cartogram)

- Fix bug in CLI not recognising the --install-deps flag when creating projects ([#644](https://github.com/Shopify/hydrogen/pull/644)) by [@cartogram](https://github.com/cartogram)

- Fix `check routes` command to correctly check the standard route `/discount/<code>` instead of `/discounts/<code>`. ([#601](https://github.com/Shopify/hydrogen/pull/601)) by [@frandiox](https://github.com/frandiox)

- Stop hydrating with `requestIdleCallback` ([#667](https://github.com/Shopify/hydrogen/pull/667)) by [@juanpprieto](https://github.com/juanpprieto)

- Updated dependencies [[`c78f441`](https://github.com/Shopify/hydrogen/commit/c78f4410cccaf99d93b2a4e4fbd877fcaa2c1bce), [`7fca5d5`](https://github.com/Shopify/hydrogen/commit/7fca5d569be1d6749fdfa5ada6723d8186f0d775)]:
  - @shopify/hydrogen-react@2023.1.7
  - @shopify/remix-oxygen@1.0.4

## 4.0.8

### Patch Changes

- Improve rate limit error messages when creating new projects. ([#553](https://github.com/Shopify/hydrogen/pull/553)) by [@frandiox](https://github.com/frandiox)

- Show better errors when initial build fails, and recover when fixing it. ([#514](https://github.com/Shopify/hydrogen/pull/514)) by [@frandiox](https://github.com/frandiox)

## 4.0.7

### Patch Changes

- Use woff2 format instead of ttf in onboarding routes to reduce download size of font files. ([#538](https://github.com/Shopify/hydrogen/pull/538)) by [@lordofthecactus](https://github.com/lordofthecactus)

- Show available upgrades for CLI when creating new projects. ([#518](https://github.com/Shopify/hydrogen/pull/518)) by [@frandiox](https://github.com/frandiox)

## 4.0.6

### Patch Changes

- Fix CLI flags for init command, and add `--install-deps`. ([#516](https://github.com/Shopify/hydrogen/pull/516)) by [@frandiox](https://github.com/frandiox)

- Fix template download on Windows during project creation. ([#528](https://github.com/Shopify/hydrogen/pull/528)) by [@tchalabi](https://github.com/tchalabi)

- Fix template imports to only reference `@shopify/hydrogen`, not `@shopify/hydrogen-react` ([#523](https://github.com/Shopify/hydrogen/pull/523)) by [@blittle](https://github.com/blittle)

- Fix pathnames on Windows when running the development server. ([#520](https://github.com/Shopify/hydrogen/pull/520)) by [@frandiox](https://github.com/frandiox)

- Onboarding fonts and styles ([#533](https://github.com/Shopify/hydrogen/pull/533)) by [@lordofthecactus](https://github.com/lordofthecactus)

- Corrects links referred to in Onboarding Route. ([#509](https://github.com/Shopify/hydrogen/pull/509)) by [@benjaminsehl](https://github.com/benjaminsehl)

- Improve onboarding style and links ([#525](https://github.com/Shopify/hydrogen/pull/525)) by [@lordofthecactus](https://github.com/lordofthecactus)

- Updated dependencies [[`ff9d729`](https://github.com/Shopify/hydrogen/commit/ff9d7297bf6cb814ac4593cb20402872ef7c30eb)]:
  - @shopify/remix-oxygen@1.0.3

## 4.0.5

### Patch Changes

- Fix missing assets in virtual routes. ([#503](https://github.com/Shopify/hydrogen/pull/503)) by [@frandiox](https://github.com/frandiox)

## 4.0.4

### Patch Changes

- Fix pathnames in Windows when creating projects and generating routes. ([#495](https://github.com/Shopify/hydrogen/pull/495)) by [@frandiox](https://github.com/frandiox)

## 4.0.3

### Patch Changes

- Fix initialization a new Hydrogen project on Windows ([#478](https://github.com/Shopify/hydrogen/pull/478)) by [@pepicrft](https://github.com/pepicrft)

## 4.0.2

### Patch Changes

- Add license files and readmes for all packages ([#463](https://github.com/Shopify/hydrogen/pull/463)) by [@blittle](https://github.com/blittle)

- Updated dependencies [[`517f0f7`](https://github.com/Shopify/hydrogen/commit/517f0f72531effbe9028e293c77aac1a20828573)]:
  - @shopify/remix-oxygen@1.0.2

## 4.0.1

### Patch Changes

- Initial release
