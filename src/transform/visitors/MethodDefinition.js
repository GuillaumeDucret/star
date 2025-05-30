import * as b from '../../builders.js'

export function MethodDefinition(node, ctx) {
    if (node.kind === 'constructor') {
        return node
    }

    if (node.key.name === 'connectedCallback') {
        const stmts1 = [
            b.declaration('root', b.attachShadow()),
            b.assignment(b.innerHTML('root'), b.binary('+', b.id('TEMPLATE'), b.id('STYLE')))
        ]

        node.value.body.body.push(...stmts1)

        const stmts = [
            ...ctx.state.template.init.elem,
            ...ctx.state.template.init.text,
            ...ctx.state.template.effects,
            ...ctx.state.template.handlers,
        ]

        node.value.body.body.push(...stmts)
        return node
    }
}
