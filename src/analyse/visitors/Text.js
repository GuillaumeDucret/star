export function Text(node, context) {
    context.state.fragment.push(node.raw)
}
