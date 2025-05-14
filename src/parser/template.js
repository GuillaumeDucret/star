import { parseElement, parseText } from './element'
import { Parser } from './parser'
import { parseStyle } from './style'
import { TokenTypes } from './tokentype'

/**
 *
 * @param {Parser} p
 */
export function parseTemplate(p) {
    const start = p.pos
    p.expectToken([TokenTypes.lte])
    p.expectToken([TokenTypes.name])
    const name = p.value
    p.skipWhitespaces()
    p.expectToken([TokenTypes.gte])

    console.log(name)

    const template = {
        type: 'Template',
        fragment: {
            type: 'Fragment',
            nodes: []
        }
    }

    p.skipWhitespaces()
    while (!p.peakToken([TokenTypes.lteSlash])) {
        const lteToken = p.peakToken([TokenTypes.lte])
        const nameToken = p.peakToken([TokenTypes.name], lteToken)

        if (nameToken?.value === 'style') {
            template.style = parseStyle(p)
        } else if (nameToken) {
            template.fragment.nodes.push(parseElement(p))
        } else {
            template.fragment.nodes.push(parseText(p))
        }
        p.skipWhitespaces()
    }

    p.expectToken([TokenTypes.lteSlash])
    p.expectToken([TokenTypes.name])
    const tagNameClose = p.value
    p.skipWhitespaces()
    p.expectToken([TokenTypes.gte])

    if (name !== tagNameClose) throw new Error('wrong closing tag')

    return {...template, end: p.pos }
}
