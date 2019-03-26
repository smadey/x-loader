import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'xLoader',
      file: 'dist/x-loader.js',
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      buble(),
    ],
  },
  {
    input: 'src/main.js',
    output: {
      name: 'xLoader',
      file: 'dist/x-loader.min.js',
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      buble(),
      uglify.uglify(),
    ],
  },
]
