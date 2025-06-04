import { walk } from 'zimmerframe';
import { AssignmentExpression } from './visitors/AssignmentExpression.js';
import { MethodDefinition } from './visitors/MethodDefinition.js';
import { CallExpression } from './visitors/CallExpression.js';
import { ClassDeclaration } from './visitors/ClassDeclaration.js';

const visitors = {
    AssignmentExpression,
    MethodDefinition,
    CallExpression,
    ClassDeclaration
}

export function analyse(ast) {

    const state = {
        signals: [],
        methods: []
    }

    walk(ast, state, visitors)

    return state
}