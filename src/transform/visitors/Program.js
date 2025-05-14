
export function Program(node, {state}) {
    const {analysis} = state

    if (analysis.fragment) {

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
                "value": analysis.fragment.join('')
              }
            }
          ],
          "kind": "let"
        }

        node.body.push(stmt)
        return node
    }
}