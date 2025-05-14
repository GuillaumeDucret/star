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

    console.log(name)
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
    while (!p.peakToken([TokenTypes.lteSlash])) {
        const lteToken = p.peakToken([TokenTypes.lte])
        const nameToken = p.peakToken([TokenTypes.name], lteToken)

        if (nameToken?.value === 'script') {
            throw new Error('invalid script position')
        }
        if (nameToken?.value === 'style') {
            throw new Error('invalid style position')
        }

        if (nameToken) {
            nodes.push(parseElement(p))
        } else {
            nodes.push(parseText(p))
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
    p.expectToken([TokenTypes.name])
    return { type: 'Text', start: p.start, end: p.end, raw: p.value }
}
