import {
    buildAssignmentStatement,
    buildMemberExpression,
    buildTemplateLiteral,
    buildEffect,
    buildIdentifier,
    buildMemberExpression2,
    buildVariableDeclaration
} from '../../builders'

export function Fragment(node, context) {
    let state = {
        text: [],
        expressions: []
    }

    let textPos = 0
    let elmStmt

    for (const child of node.nodes) {
        switch (child.type) {
            case 'Text':
            case 'ExpressionTag':
                context.visit(child, state)
                break
            default:
                finalize()
                context.visit(child)
                break
        }
    }
    finalize()

    function finalize() {
        if (state.text.length == 0) {
            textPos++
            return
        }

        if (state.expressions.length === 0) {
            // no expression
            context.state.template.push(state.text.join(''))
        } else {
            if (!elmStmt) {
                elmStmt = buildVariableDeclaration('el1', pathStmt(context.path))
                context.state.init.push(elmStmt)
            }

            const text1 = buildVariableDeclaration(
                'text1',
                buildMemberExpression2(
                    buildMemberExpression('el1', 'firstChild'),
                    'firstSibling',
                    textPos
                )
            )

            context.state.init.push(text1)

            const stmt = buildEffect([
                buildAssignmentStatement(
                    buildMemberExpression('text1', 'textContent'),
                    buildTemplateLiteral(state.text, state.expressions)
                )
            ])
            context.state.template.push(' ')
            context.state.effects.push(stmt)
        }

        state = {
            text: [],
            expressions: []
        }

        textPos += 2
    }
}

function pathStmt(path) {
    let stmt
    let parent

    for (const node of path) {
        if (node.type === 'Fragment') {
            if (!parent) {
                parent = node
                stmt = buildIdentifier('root')
                continue
            }
            parent = node
            continue
        }

        if (node.type === 'Element') {
            stmt = buildMemberExpression2(stmt, 'firstChild')

            let index = parent.nodes.indexOf(node)
            while (index-- > 0) {
                stmt = buildMemberExpression2(stmt, 'nextSibling')
            }
        }
    }

    return stmt
}
