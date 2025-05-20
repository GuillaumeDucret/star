export function ExpressionTag(node, { state, next }) {
    node = next() ?? node
    state.expressions.push(node.expression)
}
