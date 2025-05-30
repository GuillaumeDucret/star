import { walk } from 'zimmerframe';
import { AssignmentExpression } from './visitors/AssignmentExpression.js';
import { MethodDefinition } from './visitors/MethodDefinition.js';

const visitors = {
    AssignmentExpression,
    MethodDefinition
}

export function analyse(ast) {

    const state = {
        signals: [],
        methods: []
    }

    walk(ast, state, visitors)

    return state
}