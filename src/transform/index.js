import { walk } from 'zimmerframe'
import { Program } from './visitors/Program.js'
import { Identifier } from './visitors/Identifier.js'
import { ExpressionTag } from './visitors/ExpressionTag.js'
import { Template } from './visitors/Template.js'
import { MethodDefinition } from './visitors/MethodDefinition.js'
import { Element } from './visitors/Element.js'
import { Text } from './visitors/Text.js'
import { Fragment } from './visitors/Fragment.js'
import { Style } from './visitors/Style.js'
import { Attribute } from './visitors/Attribute.js'
import { ClassBody } from './visitors/ClassBody.js'

const templateVisitors = {
    Template,
    Identifier,
    ExpressionTag,
    Element,
    Text,
    Fragment,
    Style,
    Attribute
}

const visitors = {
    Program,
    MethodDefinition,
    ClassBody
}

export function transform(ast, analysis) {
    //console.log(JSON.stringify(ast.template, undefined, 2))

    const template = walk(ast.template, {analysis}, templateVisitors)

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
