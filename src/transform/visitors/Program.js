import * as b from '../../builders.js'

export function Program(node, ctx) {
    ctx.next()

    if (ctx.state.template.template.length > 0) {
        const stmt = b.declaration('TEMPLATE', b.literal(ctx.state.template.template.join('')))
        node.body.unshift(stmt)
    }

    if (ctx.state.template.css) {
        const style = `<style>${ctx.state.template.css}</style>`
        const stmt = b.declaration('STYLE', b.literal(style))
        node.body.unshift(stmt)
    }

    return node
}
