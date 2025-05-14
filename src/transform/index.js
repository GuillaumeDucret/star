import { walk } from 'zimmerframe';
import { Program } from './visitors/Program';

const visitors = {
    Program
}

export function transform(ast, analysis) {

    const state = {
        analysis
    }

    return walk(ast.script.content, state, visitors)
}