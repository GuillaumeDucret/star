
export function Program(node, {state, next}) {
    

    next()

    if (state.template.template) {

        const stmt = {
          "type": "VariableDeclaration",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "id": {
                "type": "Identifier",
                "name": "fragment"
              },
              "init": {
                "type": "Literal",
                "value": state.template.template.join('')
              }
            }
          ],
          "kind": "let"
        }

        node.body.push(stmt)
        return node
    }
}