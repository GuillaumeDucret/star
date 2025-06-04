import * as b from '../../builders.js'

export function Fragment(node, ctx) {
    let text = []
    let expressions = []
    let index = 0
    let rootId

    for (const child of node.nodes) {
        switch (child.type) {
            case 'Text':
            case 'ExpressionTag':
                ctx.visit(child, { text, expressions, analysis: ctx.state.analysis })
                break
            default:
                finalize()
                ctx.visit(child)
                break
        }
    }
    finalize()

    function finalize() {
        if (text.length == 0) {
            // no text or expression
            index++
            return
        }

        if (expressions.length === 0) {
            // no expression
            ctx.state.template.push(text.join(''))

            text = []
            expressions = []
            index += 2
            return
        }

        // reactive
        if (!rootId) {
            rootId = nextElementId(ctx)
            const rootStmt = b.declaration(rootId, fromPath(ctx))
            ctx.state.init.elem.push(rootStmt)
        }

        const textId = nextTextId(ctx)
        const textStmt = b.declaration(textId, b.sibling(b.child(rootId), index))
        ctx.state.init.text.push(textStmt)

        const effectStmt = b.effect([
            b.assignment(b.textContent(textId), b.template(text, expressions))
        ])
        ctx.state.template.push(' ')
        ctx.state.effects.push(effectStmt)

        text = []
        expressions = []
        index += 2
    }
}

export function fromPath(ctx) {
    let stmt
    let fragment

    for (const node of ctx.path) {
        switch (node.type) {
            case 'Fragment':
                stmt ??= b.id('root')
                fragment = node
                break
            case 'Element':
                stmt = b.sibling(b.child(stmt), siblingCount(fragment, node))
                break
        }
    }
    return stmt
}

function siblingCount(fragment, node) {
    let count = 0
    let previousSibling

console.log(fragment)

    for (const sibling of fragment.nodes) {
        if (sibling === node) break
        if (
            (previousSibling?.type === 'ExpressionTag' || previousSibling?.type === 'Text') &&
            (sibling?.type === 'ExpressionTag' || sibling?.type === 'Text')
        ) {
            continue
        }

        count++
        previousSibling = sibling
    }
    return count
}

export function nextElementId(ctx) {
    return b.id(`elem_${ctx.state.init.elem.length + 1}`)
}

function nextTextId(ctx) {
    return b.id(`text_${ctx.state.init.text.length + 1}`)
}
