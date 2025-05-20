import { walk } from 'zimmerframe'
import { Program } from './visitors/Program'
import { Identifier } from './visitors/Identifier'
import { ExpressionTag } from './visitors/ExpressionTag'
import { Template } from './visitors/template'
import { MethodDefinition } from './visitors/MethodDefinition'
import { Element } from './visitors/Element'
import { Text } from './visitors/Text'
import { Fragment } from './visitors/Fragment'

const templateVisitors = {
    Template,
    Identifier,
    ExpressionTag,
    Element,
    Text,
    Fragment
}

const visitors = {
    Program,
    MethodDefinition
}

export function transform(ast, analysis) {
    //console.log(JSON.stringify(ast.template, undefined, 2))

    const template = walk(ast.template, {}, templateVisitors)

    //console.log(JSON.stringify(template, undefined, 2))

    const state = {
        analysis,
        template
    }

    return walk(ast.script.content, state, visitors)
}

export function transformTemplate(template) {
    const state = {}

    return walk(template, state, templateVisitors)
}
