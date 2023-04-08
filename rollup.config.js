import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [{
  input: ['./src/shell.ts', './src/views/todo.js', './node_modules/@leofcoin/storage/exports/browser-store.js'],
  output: [{
    dir: 'www',
    format: 'es'
  }],
  plugins: [
    nodeResolve(),
    typescript()
  ]
}]