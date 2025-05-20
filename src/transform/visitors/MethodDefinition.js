

export function MethodDefinition(node, context) {
    const template = context.state.template

console.log('METHDEF')
    if (node.key.name === 'connectedCallback') {

        for (const init of template.init) {

            node.value.body.body.push(init)
        }


        for (const effect of template.effects) {

            node.value.body.body.push(effect)
        }
    }
    return node
}