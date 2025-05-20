

export function Element(node, context) {
    context.state.template.push(`<${node.name}>`)
    context.next()
    context.state.template.push(`</${node.name}>`)
}