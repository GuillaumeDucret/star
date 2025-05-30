#! /usr/bin/env node

import { readFile, writeFile } from 'fs/promises'
import { FileScanner } from '../utils/files.js'
import { compile } from '../compiler/index.js'

const FILE_SCANNER = new FileScanner({
    filter: (fileName) => fileName.match(/^([^\.]*)\.html$/)?.[1],
    include: undefined
})

const files = await FILE_SCANNER.scan()

console.log(files)

for (const [name, path] of files.entries()) {
    if (name === 'index') continue

    console.log(`compile ${name}`)
    const input = await readFile(path, { encoding: 'utf8' })

    const result = compile(input)
    const resPath = path.replace('.html', '.js')
    await writeFile(resPath, result.code)
}