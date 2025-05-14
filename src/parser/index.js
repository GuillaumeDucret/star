import { Parser } from './parser'

/**
 * 
 * @param {string} input 
 * @returns 
 */
export function parse(input) {
    return new Parser(input).parse()
}
