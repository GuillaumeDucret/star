
/**
 * @mixin Tokenize
 */
export const Tokenize = {
    peakToken(expect, after) {
        for (const type of expect) {
            if (type.charCodes) {
                return this.peakCharToken(type, after)
            } else {
                return this.peakWordToken(type, after)
            }
        }
    },

    expectToken(expect) {
        for (const type of expect) {
            if (type.charCodes) {
                if (this.readCharToken(type)) return
            } else {
                if (this.readWordToken(type)) return
            }
        }
        throw new Error(`unexpected token at ${this.pos}`)
    },

    readToken(expect) {
        for (const type of expect) {
            if (type.charCodes) {
                if (this.readCharToken(type)) return true
            } else {
                if (this.readWordToken(type)) return true
            }
        }
        return false
    },

    readWordToken(type) {
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
    },

    peakWordToken(type, after) {
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
    },

    readCharToken(type) {
        if (this.isCharToken(type)) {
            this.type = type
            this.start = this.pos
            this.pos += type.charCodes.length
            this.end = this.pos
            return true
        }
        return false
    },

    peakCharToken(type, after) {
        const pos = after?.end ?? this.pos
        if (this.isCharToken(type, pos)) {
            return {
                type,
                start: pos,
                end: pos + type.charCodes.length
            }
        }
    },

    isCharToken(type, pos) {
        assert(type.charCodes)

        pos ??= this.pos
        return (
            this.input.charCodeAt(pos) === type.charCodes[0] &&
            (type.charCodes[1] ? this.input.charCodeAt(pos + 1) === type.charCodes[1] : true) &&
            (type.charCodes[2] ? this.input.charCodeAt(pos + 2) === type.charCodes[2] : true)
        )
    }
}
