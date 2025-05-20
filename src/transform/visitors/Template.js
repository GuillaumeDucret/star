

export function Template(node, {next}) {

    const state = {
        template: [],
        effects: [],
        selector: '',
        init: []
    }

    next(state)
    return {type: 'TemplateMod', ...state}
}