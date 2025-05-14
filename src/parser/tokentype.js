/**
 * @typedef {Object} TokenType
 * @property {string} label
 * @property {Array<number>} [charCodes]
 * @property {(char: number) => boolean} [test]
 */

/**
 *
 * @param {string} label
 * @param {Array<number>} charCodes
 * @returns {TokenType}
 */
function charTT(label, charCodes) {
    return { label, charCodes }
}

/**
 *
 * @param {string} label
 * @param {(char: number) => boolean} test
 * @returns {TokenType}
 */
function stringTT(label, test) {
    return { label, test }
}

export const TokenTypes = {
    name: stringTT('name', name),
    string: stringTT('name', string),
    lte: charTT('<', [60]),
    gte: charTT('>', [62]),
    slashGte: charTT('/>', [47, 62]),
    lteSlash: charTT('</', [60, 47])
}

function name(code) {
    if (code < 48) return false
    if (code < 58) return true
    if (code < 65) return false
    if (code < 91) return true
    if (code < 123) return true
    return false
}

function string(code) {
    if (code === 10) return true
    if (code < 48) return false
    if (code < 58) return true
    if (code < 65) return false
    if (code < 91) return true
    if (code < 123) return true
    return false
}
