#! /usr/bin/env node

import path from 'path'
import { readFileSync, watch, writeFileSync, existsSync, mkdirSync } from 'fs'
import { walk } from '../utils/files.js'
import { compile } from '../compiler/index.js'
import { startDevServer } from '@web/dev-server'
import * as argv from './argv.js'

const command = argv.command()

switch (command) {
    case 'build':
        build()
        break
    case 'test':
        const srcDir = argv.option('srcDir') ?? './src'
        const outDir = argv.option('outDir') ?? './wc'
        const srcPath = path.join(process.cwd(), srcDir)
        const outPath = path.join(process.cwd(), outDir)

        console.log(path.relative(outPath, srcPath))
        break
    default:
        build()
        dev()
        break
}

function build() {
    const srcDir = argv.option('srcDir') ?? './src'
    const outDir = argv.option('outDir') ?? './wc'
    const srcPath = path.join(process.cwd(), srcDir)
    const outPath = path.join(process.cwd(), outDir)

    walk(srcPath, {}, (file) => {
        if (!file.name.endsWith('.html')) return

        const srcFilePath = path.join(file.parentPath, file.name)
        const source = readFileSync(srcFilePath, { encoding: 'utf8' })

        const outParentPath = path.join(outPath, path.relative(srcPath, file.parentPath))
        const outFileName = file.name.replace('.html', '.js')
        const outFilePath = path.join(outParentPath, outFileName)

        const importShift = path.relative(outParentPath, file.parentPath)

        const customElementName = path.basename(file.name, '.html')
        const result = compile(source, { customElementName, importShift })

        if (!existsSync(outParentPath)) {
            mkdirSync(outParentPath, { recursive: true })
        }
        writeFileSync(outFilePath, result.code)
    })
}

function dev() {
    const srcDir = argv.option('srcDir') ?? './src'
    const outDir = argv.option('outDir') ?? './wc'
    const srcPath = path.join(process.cwd(), srcDir)
    const outPath = path.join(process.cwd(), outDir)


    watch(srcPath, { recursive: true }, (_, fileName) => {
        if (!fileName.endsWith('.html')) return

        const srcFileName = path.basename(fileName)
        const srcFilePath = path.join(srcPath, fileName)
        const srcParentPath = path.dirname(srcFilePath)
        const source = readFileSync(srcFilePath, { encoding: 'utf8' })

        const outParentPath = path.join(outPath, path.relative(srcPath, srcParentPath))
        const outFileName = srcFileName.replace('.html', '.js')
        const outFilePath = path.join(outParentPath, outFileName)

        const importShift = path.relative(outParentPath, srcParentPath)

        const customElementName = path.basename(fileName, '.html')
        const result = compile(source, { customElementName, importShift })



        if (!existsSync(outParentPath)) {
            mkdirSync(outParentPath, { recursive: true })
        }
        writeFileSync(outFilePath, result.code)
    })

    startDevServer({
        config: {
            rootDir: process.cwd(),
            port: 3000,
            watch: true,
            open: true,
            nodeResolve: true
        },
        readCliArgs: false,
        readFileConfig: false
    })
}
