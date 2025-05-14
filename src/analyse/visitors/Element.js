

export function Element(node, context) {
console.log('vis')
    context.state.fragment.push(`<${node.name}>`)
    context.next()
    context.state.fragment.push(`</${node.name}>`)
}