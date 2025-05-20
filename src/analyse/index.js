import { walk } from 'zimmerframe';

const visitors = {
    
}

export function analyse(ast) {

    const state = {
        fragment: []
    }

    walk(ast, state, visitors)

    return state
}