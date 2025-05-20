import { parseExpressionAt } from 'acorn'
import { Parser } from './parser'
import { TokenTypes } from './tokentype'

/**
 *
 * @param {Parser} p
 * @returns
 */
export function parseExpressionTag(p) {
    p.expectToken([TokenTypes.braceL])

    const start = p.pos
    skipCode(p)
    const expression = parseExpressionAt(p.input.slice(start, p.pos), 0, { ecmaVersion: 2020 })
    p.expectToken([TokenTypes.braceR])

    return { type: 'ExpressionTag', expression }
}

/**
 *
 * @param {Parser} p
 */
function skipCode(p) {
    while (p.pos < p.input.length) {
        if (p.isCharToken(TokenTypes.braceR)) break
        p.pos++
    }
}
