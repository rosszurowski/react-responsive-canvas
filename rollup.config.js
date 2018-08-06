import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const config = {
  input: 'src/index.js',
  output: {
    name: 'react-responsive-canvas',
    exports: 'default',
    format: 'umd',
    file: './index.js',
    globals: {
      react: 'React',
    },
    banner: `/*! ${pkg.name} v${pkg.version} | (c) ${new Date().getFullYear()} Ross Zurowski | ${pkg.license} License | https://github.com/${pkg.repository} !*/`,
  },
  external: [
    'react',
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify());
}

export default config;
