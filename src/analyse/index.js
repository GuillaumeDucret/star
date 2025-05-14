import { walk } from 'zimmerframe';
import { Element } from './visitors/Element';
import { Text } from './visitors/Text';

const visitors = {
    Element,
    Text
}

export function analyse(ast) {

    const state = {
        fragment: []
    }

    walk(ast, state, visitors)

    return state
}