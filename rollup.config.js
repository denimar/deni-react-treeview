import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const globals = {
  classnames: 'classnames',
  react: 'React',
  axios: 'axios'
};

export default {
  input: './src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies),
  ],
  output: [
    {
      file: `./dist/${pkg.main}`,
      format: 'cjs',
      globals,
      sourcemap: true,
    },
    {
      file: `./dist/${pkg.module}`,
      format: 'es',
      globals,
      sourcemap: true,
    },
    {
      file: `./dist/${pkg.browser}`,
      format: 'umd',
      name: 'lib',
      globals,
      sourcemap: true,
    },
  ],
  plugins: [commonjs(), postcss(), typescript(), terser()],
};