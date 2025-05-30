export function AssignmentExpression(node, ctx) {
    ctx.next()

    if (isMember(node.left, isThis, isId) && isCall(node.right, isSignal)) {
        ctx.state.signals.push(node.left.property.name)
    }
}

function isId(node) {
    return node.type === 'Identifier'
}

function isThis(node) {
    return node.type === 'ThisExpression'
}

function isMember(node, objectTest, propertyTest) {
    return (
        node.type === 'MemberExpression' && objectTest(node.object) && propertyTest(node.property)
    )
}

function isCall(node, calleeTest) {
    return node.type === 'CallExpression' && calleeTest(node.callee)
}

function isSignal(node) {
    return node.type === 'Identifier' && node.name === 'signal'
}
