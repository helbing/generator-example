# generator-example

This is an example of Yeoman generator with implement by TypeScript. It will not publish to [npmjs.com](https://www.npmjs.com/). You can test in local with the following commands.

```shell
git clone https://github.com/helbing/generator-example.git
pnpm install
pnpm run build
npm link
npx yo --generators
npx yo example
npm uninstall --global generator-example
```

You can also test with unit-tests.

```shell
pnpm run test
```

You can learn:

- how to write yeoman generator in [index.ts](./src/app/index.ts).
- how to write unit-tests of generator in [index.test.ts](./src/app/index.test.ts).
