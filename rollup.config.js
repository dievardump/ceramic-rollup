import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-polyfills';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true,
	// this is to add global before files
	// intro: 'var global = typeof self !== undefined ? self : this;'
	},
	plugins: [
		builtins(),
		resolve({
			preferBuiltins: false
		}), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
	/*
		// this is to remove exports bug
		replace({
			'Object.defineProperty(exports, "__esModule", { value: true });': '\n',
			delimiters: ['\n', '\n']
		}),
		*/
		json(),
		production && terser() // minify, but only in production
	]
};
