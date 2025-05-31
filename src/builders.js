export function effect(body) {
    return {
        type: 'ExpressionStatement',
        expression: {
            type: 'CallExpression',
            callee: {
                type: 'Identifier',
                name: 'effect'
            },
            arguments: [
                {
                    type: 'ArrowFunctionExpression',
                    id: null,
                    expression: false,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body
                    }
                }
            ],
            optional: false
        }
    }
}

export function attachShadow() {
    return {
        type: 'CallExpression',
        callee: {
            type: 'MemberExpression',
            object: { type: 'ThisExpression' },
            property: {
                type: 'Identifier',
                name: 'attachShadow'
            },
            computed: false,
            optional: false
        },
        arguments: [
            {
                type: 'ObjectExpression',
                properties: [
                    {
                        type: 'Property',
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                            type: 'Identifier',
                            name: 'mode'
                        },
                        value: {
                            type: 'Literal',
                            value: 'open',
                            raw: '"open"'
                        },
                        kind: 'init'
                    }
                ]
            }
        ],
        optional: false
    }
}

export function insertAdjacentHTML(object, value) {
    if (typeof object === 'string') {
        object = { type: 'Identifier', name: object }
    }

    return {
        type: 'CallExpression',
        callee: {
            type: 'MemberExpression',
            object,
            property: {
                type: 'Identifier',
                name: 'insertAdjacentHTML'
            },
            computed: false,
            optional: false
        },
        arguments: [
            {
                type: 'Literal',
                value: 'beforeend'
            },
            value
        ],
        optional: false
    }
}

export function symbol(id) {
    return {
        type: 'MemberExpression',
        object: {
            type: 'MemberExpression',
            object: {
                type: 'ThisExpression'
            },
            property: id,
            computed: false,
            optional: false
        },
        property: {
            type: 'Identifier',
            name: 'value'
        },
        computed: false,
        optional: false
    }
}

export function declaration(id, init) {
    if (typeof id === 'string') {
        id = { type: 'Identifier', name: id }
    }

    return {
        type: 'VariableDeclaration',
        declarations: [
            {
                type: 'VariableDeclarator',
                id,
                init
            }
        ],
        kind: 'const'
    }
}

export function connectedCallback(body = []) {
    return {
        type: 'MethodDefinition',
        static: false,
        computed: false,
        key: {
            type: 'Identifier',
            name: 'connectedCallback'
        },
        kind: 'method',
        value: {
            type: 'FunctionExpression',
            id: null,
            expression: false,
            generator: false,
            async: false,
            params: [],
            body: {
                type: 'BlockStatement',
                body
            }
        }
    }
}

export function literal(value) {
    return { type: 'Literal', value }
}

export function binary(operator, left, right) {
    return {
        type: 'BinaryExpression',
        operator,
        left,
        right
    }
}

export function template(text, expressions) {
    if (text.length === expressions.length) {
        // template literals must start and end with a text
        text.push('')
    }

    const quasis = text.map((raw) => ({
        type: 'TemplateElement',
        value: { raw }
    }))

    return {
        type: 'TemplateLiteral',
        quasis,
        expressions
    }
}

export function assignment(left, right) {
    return {
        type: 'ExpressionStatement',
        expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left,
            right
        }
    }
}

export function textContent(object) {
    if (typeof object === 'string') {
        object = { type: 'Identifier', name: object }
    }

    return {
        type: 'MemberExpression',
        object,
        property: {
            type: 'Identifier',
            name: 'textContent'
        },
        computed: false,
        optional: false
    }
}

export function member(object, property) {
    if (typeof object === 'string') {
        object = { type: 'Identifier', name: object }
    }

    if (typeof property === 'string') {
        property = { type: 'Identifier', name: property }
    }

    return {
        type: 'MemberExpression',
        object,
        property,
        computed: false,
        optional: false
    }
}

export function innerHTML(object) {
    if (typeof object === 'string') {
        object = { type: 'Identifier', name: object }
    }

    return {
        type: 'MemberExpression',
        object,
        property: {
            type: 'Identifier',
            name: 'innerHTML'
        },
        computed: false,
        optional: false
    }
}

export function setAttribute(object, name, value) {
    return {
        type: 'CallExpression',
        callee: {
            type: 'MemberExpression',
            object,
            property: {
                type: 'Identifier',
                name: 'setAttribute'
            },
            computed: false,
            optional: false
        },
        arguments: [
            {
                type: 'Literal',
                value: name
            },
            value
        ],
        optional: false
    }
}

export function arrowFunc(body) {
    return {
        type: 'ArrowFunctionExpression',
        id: null,
        expression: false,
        generator: false,
        async: false,
        params: [],
        body: {
            type: 'BlockStatement',
            body: [body]
        }
    }
}

export function child(object) {
    if (typeof object === 'string') {
        object = { type: 'Identifier', name: object }
    }

    return {
        type: 'MemberExpression',
        object,
        property: {
            type: 'Identifier',
            name: 'firstChild'
        },
        computed: false,
        optional: false
    }
}

export function sibling(object, count) {
    let stmt = object
    while (count-- > 0) {
        stmt = {
            type: 'MemberExpression',
            object: stmt,
            property: {
                type: 'Identifier',
                name: 'nextSibling'
            },
            computed: false,
            optional: false
        }
    }
    return stmt
}

export function id(name) {
    return { type: 'Identifier', name }
}

export function thisExp() {
    return { type: 'ThisExpression' }
}
