export const Whitespaces = {
    skipWhitespace() {
        while (this.pos < this.input.length) {
            if (this.input[this.pos] !== ' ') break
            this.pos++
        }
    }
}
