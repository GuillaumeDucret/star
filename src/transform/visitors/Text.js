export function Text(node, context) {
    context.state.text.push(node.raw)
}
