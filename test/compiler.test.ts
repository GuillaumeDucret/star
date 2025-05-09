import { describe, expect, it } from 'vitest'
import {test, Parser2} from '../src/compiler/parser'
import {transform} from '../src/compiler/transformer'
import {analyse, analyse2} from '../src/compiler/analyse'

describe('.test()', {}, () => {
    it('test', {}, () => {
        //test()

        console.log('/'.charCodeAt(0))

        const parser = new Parser2()
        //console.log(JSON.stringify(parser.parseAny(), undefined, 2))

        //analyse(parser.parseAny())

        analyse2()

        //console.log(transform())
        console.log('>'.charCodeAt(0))
    })
})