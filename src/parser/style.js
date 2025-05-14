import { parse } from 'css-tree'
import { TokenTypes } from './tokentype'
import { Parser } from './parser'

/**
 *
 * @param {Parser} p
 * @returns
 */
export function parseStyle(p) {
    const start = p.pos
    p.expectToken([TokenTypes.lte])
    p.expectToken([TokenTypes.name])
    const name = p.value

    p.skipWhitespaces()
    p.expectToken([TokenTypes.gte])

    const content = parseCSS(p)

    p.expectToken([TokenTypes.lteSlash])
    p.expectToken([TokenTypes.name])
    const tagNameClose = p.value
    p.skipWhitespaces()
    p.expectToken([TokenTypes.gte])

    if (name !== tagNameClose) throw new Error('wrong closing tag')

    return { type: 'Style', content, start, end: p.pos }
}

/**
 *
 * @param {Parser} p
 */
function parseCSS(p) {
    const start = p.pos
    skipCSS(p)
    return parse(p.input.slice(start, p.pos))
}

/**
 *
 * @param {Parser} p
 */
function skipCSS(p) {
    while (p.pos < p.input.length) {
        if (p.isCharToken(TokenTypes.lteSlash)) break
        p.pos++
    }
}
