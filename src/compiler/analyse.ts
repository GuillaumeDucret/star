import { walk } from 'zimmerframe';
import { BlockStatement, Parser } from 'acorn'

export function analyse(ast) {

    console.log(JSON.stringify(ast, undefined, 2))

    const state = {}

    const res = walk(ast, state, {_, Text})

    console.log(JSON.stringify(res, undefined, 2))
}

export function analyse2() {

    const exp = 'class Component {mount() {const aa = 2}}'
    var ast = Parser.parse(exp, { ecmaVersion: 2020 })

    const res = walk(ast, {}, {_, BlockStatement})

    console.log(JSON.stringify(res, undefined, 2))
}

export function _(node, {next}) {
    console.log('visit')
    next()
}

function Text(node, {next}) {
    return null
}

function BlockStatement(node: BlockStatement, {next}) {

const newNode = {
    "type": "VariableDeclarator",
    "id": {
      "type": "Identifier",
      "name": "template"
    },
    "init": {
      "type": "Literal",
      "value": "hello",
      "raw": "hello"
    }
  }

    node.body.push(newNode as any)
    return node
}