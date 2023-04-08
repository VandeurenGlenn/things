import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { readdir, unlink } from "fs/promises";
import { join } from 'path'

const cleanWWW = () => ({
  name: 'cleanWWW',
  buildStart: async () => {
    const paths = await readdir('www')

    for (const path of paths) {
      if (!path.includes('index.html') && !path.includes('manifest.json') && !path.includes('assets')) await unlink(join('www', path))
    }
  }
})

export default [{
  input: ['./src/shell.ts', './src/views/todo.js', './node_modules/@leofcoin/storage/exports/browser-store.js'],
  output: [{
    dir: 'www',
    format: 'es'
  }],
  plugins: [
    cleanWWW(),
    nodeResolve(),
    typescript()
  ]
}]