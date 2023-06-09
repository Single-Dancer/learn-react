import path from 'path'
import fs from 'fs'
import ts from 'rollup-plugin-typescript2'
import cjs from '@rollup/plugin-commonjs'

const pkgPath = path.resolve(__dirname, '../../packages')
const distPath = path.resolve(__dirname, '../../dist/node_modules')

export function getPackageJSON(pkgName) {
  const path = `${resolvePkgPath(pkgName)}/package.json`
  const s = fs.readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(s)
}

export function resolvePkgPath(pkgName, isDist) {
  return `${isDist ? distPath : pkgPath}/${pkgName}`
}

export function getBaseRollupPlugins(tsconfig = {}) {
  return [cjs(), ts(tsconfig)]
}
