import { Parser } from 'acorn'

export function test() {
    const exp = 'function dostuff() {let aa = 2; aa = 3}'

    var tokens = [...Parser.tokenizer(exp, { ecmaVersion: 2020 })]

    var ast = Parser.parse(exp, { ecmaVersion: 2020 })

    console.log(JSON.stringify(tokens, null, 2))
    console.log(JSON.stringify(ast, null, 2))
    console.log('<'.charCodeAt(0))
}

interface Token {
    type: TokenType
    start: number
    end: number
    value?: string
}

class TokenType {
    constructor(label: string, charCodes?: number[]) {
        this.label = label
        this.charCodes = charCodes
    }

    label: string
    charCodes: number[]
}

const TokenTypes = {
    name: new TokenType('name'),
    lte: new TokenType('<', [60]),
    gte: new TokenType('>', [62]),
    slashGte: new TokenType('/>', [47, 62]),
    lteSlash: new TokenType('</', [60, 47])
}

export class Parser2 {
    input = '<div  >  ss <d /> fff </div>'
    //input = '<script>class Component {click() {console.log("ha")}}</script>'
    start = 0
    end = 0
    pos = 0
    type: TokenType
    value = ''

    parseElement() {
        const start = this.pos
        this.expectToken([TokenTypes.lte])
        this.expectToken([TokenTypes.name])
        const name = this.value
        this.skipWhitespace()
        this.expectToken([TokenTypes.gte, TokenTypes.slashGte])

        console.log(name)
        if (this.type === TokenTypes.gte) {
            this.skipWhitespace()

            const fragment = this.parseFragment()

            this.expectToken([TokenTypes.lteSlash])
            this.expectToken([TokenTypes.name])
            const tagNameClose = this.value
            this.skipWhitespace()
            this.expectToken([TokenTypes.gte])

            if (name !== tagNameClose) throw new Error('wrong closing tag')

            return { type: 'Element', name, fragment, start, end: this.pos }
        }
        return { type: 'Element', name, start, end: this.pos }
    }

    parseAttribute() {
        this.expectToken([TokenTypes.name])
    }

    parseFragment() {
        const nodes = []
        while (!this.peakToken([TokenTypes.lteSlash])) {
            this.skipWhitespace()
            nodes.push(this.parseAny())
            this.skipWhitespace()
        }

        return { type: 'Fragment', nodes }
    }

    parseText(): Text {
        this.expectToken([TokenTypes.name])
        return { type: 'Text', start: this.start, end: this.end, raw: this.value }
    }

    parseAny() {
        const lteToken = this.peakToken([TokenTypes.lte])
        if (lteToken) {
            const nameToken = this.peakToken([TokenTypes.name], lteToken)
            if (nameToken?.value === 'script') {
                return this.parseScript()
            }
            return this.parseElement()
        }
        return this.parseText()
    }

    parseScript() {
        const start = this.pos
        this.expectToken([TokenTypes.lte])
        this.expectToken([TokenTypes.name])
        const name = this.value

        this.skipWhitespace()
        this.expectToken([TokenTypes.gte])

        const content = this.parseProgram()

        this.expectToken([TokenTypes.lteSlash])
        this.expectToken([TokenTypes.name])
        const tagNameClose = this.value
        this.skipWhitespace()
        this.expectToken([TokenTypes.gte])

        if (name !== tagNameClose) throw new Error('wrong closing tag')

        return { type: 'Script', content, start, end: this.pos }
    }

    parseProgram() {
        const start = this.pos
        this.skipCode()
        return Parser.parse(this.input.slice(start, this.pos), { ecmaVersion: 2020 })
    }

    peekTokenType() {
        const char = this.input[this.pos]
        if (char === '<' || char === '>') {
            return 'char'
        }
        return 'word'
    }

    peakToken(expect: TokenType[], after?: Token) {
        for (const type of expect) {
            if (type.charCodes) {
                return this.peakCharToken(type, after)
            } else {
                return this.peakWordToken(type, after)
            }
        }
    }

    expectToken(expect: TokenType[]) {
        for (const type of expect) {
            if (type.charCodes) {
                if (this.readCharToken(type)) return
            } else {
                if (this.readWordToken(type)) return
            }
        }
        throw new Error(`unexpected token at ${this.pos}`)
    }

    readToken(expect: TokenType[]) {
        for (const type of expect) {
            if (type.charCodes) {
                if (this.readCharToken(type)) return true
            } else {
                if (this.readWordToken(type)) return true
            }
        }
        return false
    }

    readWordToken(type: TokenType) {
        const start = this.pos
        while (this.pos < this.input.length) {
            if (!isIdentifierChar(this.input.charCodeAt(this.pos))) break
            this.pos++
        }

        if (this.pos !== start) {
            this.type = type
            this.start = start
            this.end = this.pos
            this.value = this.input.substring(this.start, this.end)
            return true
        }
        return false
    }

    peakWordToken(type: TokenType, after?: Token): Token {
        const start = after?.end ?? this.pos
        let pos = start
        while (pos < this.input.length) {
            if (!isIdentifierChar(this.input.charCodeAt(pos))) break
            pos++
        }

        if (pos !== start) {
            return {
                type,
                start,
                end: pos,
                value: this.input.substring(start, pos)
            }
        }
    }

    readCharToken(type: TokenType) {
        if (this.isCharToken(type)) {
            this.type = type
            this.start = this.pos
            this.pos += type.charCodes.length
            this.end = this.pos
            return true
        }
        return false
    }

    peakCharToken(type: TokenType, after?: Token): Token {
        const pos = after?.end ?? this.pos
        if (this.isCharToken(type, pos)) {
            return {
                type,
                start: pos,
                end: pos + type.charCodes.length
            }
        }
    }

    isCharToken(type: TokenType, pos?: number) {
        assert(type.charCodes)

        pos ??= this.pos
        return (
            this.input.charCodeAt(pos) === type.charCodes[0] &&
            (type.charCodes[1] ? this.input.charCodeAt(pos + 1) === type.charCodes[1] : true) &&
            (type.charCodes[2] ? this.input.charCodeAt(pos + 2) === type.charCodes[2] : true)
        )
    }

    readCharToken2(code: number) {
        if (this.input.charCodeAt(this.pos) === code) {
            //this.type = 'char'
            //this.value = char
            this.pos++
            return
        }
        // throw new Error(`no char ${char}`)
    }

    skipWhitespace() {
        while (this.pos < this.input.length) {
            if (this.input[this.pos] !== ' ') break
            this.pos++
        }
    }

    skipCode() {
        while (this.pos < this.input.length) {
            if (this.isCharToken(TokenTypes.lteSlash)) break
            this.pos++
        }
    }

    nextCodeToken() {
        //this.type = this.input.charAt(this.pos)
        this.value = this.input.charAt(this.pos)
    }
}

function assert(test) {
    if (!test) throw new Error('assert error')
}

function isIdentifierChar(code) {
    if (code < 48) return false
    if (code < 58) return true
    if (code < 65) return false
    if (code < 91) return true
    if (code < 123) return true
    return false
}

export interface BaseNode {
    type: string
    start: number
    end: number
}

export interface Fragment extends BaseNode {
    type: 'Fragment'
    nodes: Array<Text | Element>
}

export interface Element extends BaseNode {
    type: 'Element'
    name: string
    fragment: Fragment
}

export interface Text extends BaseNode {
    type: 'Text'
    raw: string
}
