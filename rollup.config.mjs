/**
 * NOTE: There is currently an open issue for adding 'use client' directive
 * https://github.com/rollup/rollup/issues/4699
 */
import typescript from 'rollup-plugin-typescript2'
// @ts-ignore
import { fileURLToPath } from 'node:url';
// @ts-ignore
import { createRequire } from 'node:module';

import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import analyze from 'rollup-plugin-analyzer';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import path from 'path';
// import css from "rollup-plugin-import-css";
import tailwindcss from 'tailwindcss';
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image';



// @ts-ignore
const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tailwindConfig = require('./tailwind.config.js');

/**
 * Used for generating external dependencies
 * Credit: Mateusz Burzyński (https://github.com/Andarist)
 * Source: https://github.com/rollup/rollup-plugin-babel/issues/148#issuecomment-399696316
 */
const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

const babelRuntimeVersion = pkg.dependencies['@babel/runtime'].replace(/^[^0-9]*/, '');

const outputOptions = {
  exports: 'named',
  preserveModules: true,
  // Ensures that CJS default exports are imported properly (based on __esModule)
  // If needed, can switch to 'compat' which checks for .default prop on the default export instead
  // see https://rollupjs.org/configuration-options/#output-interop
  interop: 'auto',
  banner: `/*
 * Rollup Library Starter
 * {@link https://github.com/mryechkin/rollup-library-starter}
 * @copyright Mykhaylo Ryechkin (@mryechkin)
 * @license MIT
 */`,
};

console.log('Building library...', path.resolve(__dirname, './dist/emogo.css'));

const config = {
  input: 'index.ts',
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      ...outputOptions,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      ...outputOptions,
    },
  ],
  external: makeExternalPredicate([
    // Handles both dependencies and peer dependencies so we don't have to manually maintain a list
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]),
  plugins: [
    image(),
    postcss({
      extract: true,
  // Or with custom file name, it will generate file relative to bundle.js in v3
    extract: 'index.css',
    plugins: [
      tailwindcss(tailwindConfig)
    ]
  }),
    // css({
    //   output: "mini.css"
    // }),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    alias({
      entries: {
        src: fileURLToPath(new URL('src', import.meta.url)),
      },
    }),
    nodeResolve(),
    commonjs({ include: ['node_modules/**'] }),
    babel({
      babelHelpers: 'runtime',
      exclude: /node_modules/,
      plugins: [['@babel/plugin-transform-runtime', { version: babelRuntimeVersion }]],
      presets: [
        ['@babel/preset-env', { targets: 'defaults' }],
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    }),
    preserveDirectives(),
    terser(),
    analyze({
      hideDeps: true,
      limit: 0,
      summaryOnly: true,
    }),
  ],
  // Ignore warnings when using "use client" directive
  onwarn(warning, warn) {
    if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
      warn(warning);
    }
  },
};

export default config;
