import { print } from 'esrap'
import { parse } from '../parser'
import { analyse } from '../analyse'
import { transform } from '../transform'

export function compile(source) {
    const ast = parse(source)
    console.log(JSON.stringify(ast, undefined, 2))
    const analysis = analyse(ast)
    const result = transform(ast, analysis)
    console.log(JSON.stringify(result, undefined, 2))
    return print(result) 
}
