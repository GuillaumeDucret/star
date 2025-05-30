export function MethodDefinition(node, ctx) {
    ctx.next()

    ctx.state.methods.push(node.key.name)
}
