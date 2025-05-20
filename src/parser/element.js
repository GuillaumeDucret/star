import { parseIfBlock } from './block'
import { parseExpressionTag } from './expression'
import { Parser } from './parser'
import { TokenTypes } from './tokentype'

/**
 *
 * @param {Parser} p
 * @returns
 */
export function parseElement(p) {
    const start = p.pos
    p.expectToken([TokenTypes.lte])
    p.expectToken([TokenTypes.name])
    const name = p.value
    p.skipWhitespaces()
    p.expectToken([TokenTypes.gte, TokenTypes.slashGte])

    if (p.type === TokenTypes.gte) {
        const fragment = parseFragment(p)

        p.expectToken([TokenTypes.lteSlash])
        p.expectToken([TokenTypes.name])
        const tagNameClose = p.value
        p.skipWhitespaces()
        p.expectToken([TokenTypes.gte])

        if (name !== tagNameClose) throw new Error('wrong closing tag')

        return { type: 'Element', name, fragment, start, end: p.pos }
    }
    return { type: 'Element', name, start, end: p.pos }
}

/**
 *
 * @param {Parser} p
 * @returns
 */
export function parseFragment(p) {
    const nodes = []

    p.skipWhitespaces()
    while (!p.peakToken([TokenTypes.lteSlash, TokenTypes.braceLSlash, TokenTypes.braceLColumn])) {
        const punctToken = p.peakToken([TokenTypes.lte, TokenTypes.braceLHash, TokenTypes.braceL])
        const nameToken = p.peakToken([TokenTypes.name], punctToken)

        switch (punctToken?.type) {
            case TokenTypes.lte:
                if (nameToken?.value === 'script') throw new Error('invalid script position')
                if (nameToken?.value === 'style') throw new Error('invalid style position')

                nodes.push(parseElement(p))
                break

            case TokenTypes.braceLHash:
                if (nameToken?.value === 'if') {
                    nodes.push(parseIfBlock(p))
                    break
                }
                throw new Error(`unknown block ${nameToken?.value}`)

            case TokenTypes.braceL:
                nodes.push(parseExpressionTag(p))
                break
            default:
                nodes.push(parseText(p))
                break
        }
        p.skipWhitespaces()
    }

    return { type: 'Fragment', nodes }
}

/**
 *
 * @param {Parser} p
 * @returns
 */
export function parseText(p) {
    p.expectToken([TokenTypes.text])
    console.log(p.value)
    return { type: 'Text', start: p.start, end: p.end, raw: p.value }
}
