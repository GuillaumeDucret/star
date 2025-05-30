import { Parser } from './parser.js'
import { parseScript } from './script.js'
import { parseTemplate } from './template.js'
import { TokenTypes } from './tokentype.js'

/**
 * @param {Parser} p
 * @returns
 */
export function parseRoot(p) {
    const root = {type: 'Root'}

    p.skipWhitespaces()
    while (!p.isEOF()) {
        const lteToken = p.peakToken([TokenTypes.lte])
        const nameToken = p.peakToken([TokenTypes.name], lteToken)

        if (nameToken?.value === 'script') {
            root.script = parseScript(p)
            p.skipWhitespaces()
            continue
        }
        if (nameToken?.value === 'template') {
            root.template = parseTemplate(p)
            p.skipWhitespaces()
            continue
        }

        console.log(lteToken)
        console.log(nameToken)
        console.log(p.input.charCodeAt(p.pos))

        throw new Error('Unknown tag at pos' + p.pos)
    }

    return root
}
