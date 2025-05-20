export function buildEffect(body) {
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

export function templateEffectStmt(right) {
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
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    operator: '=',
                                    left: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: 'span'
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'textContent'
                                        },
                                        computed: false,
                                        optional: false
                                    },
                                    right
                                }
                            }
                        ]
                    }
                }
            ],
            optional: false
        }
    }
}

export function symbolValueStmt(name) {
    return {
        type: 'MemberExpression',
        object: {
            type: 'MemberExpression',
            object: {
                type: 'ThisExpression'
            },
            property: {
                type: 'Identifier',
                name
            },
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

export function nodeDefinition(name, querySelector) {
    return {
        type: 'VariableDeclaration',
        declarations: [
            {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name
                },
                init: {
                    type: 'CallExpression',
                    callee: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'root'
                        },
                        property: {
                            type: 'Identifier',
                            name: 'querySelector'
                        },
                        computed: false,
                        optional: false
                    },
                    arguments: [
                        {
                            type: 'Literal',
                            raw: `"${querySelector}"`
                        }
                    ],
                    optional: false
                }
            }
        ],
        kind: 'const'
    }
}

export function variableDeclaration(init) {
    return {
        type: 'VariableDeclaration',
        declarations: [
            {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'str'
                },
                init
            }
        ],
        kind: 'const'
    }
}

export function buildVariableDeclaration(name, init) {
    return {
        type: 'VariableDeclaration',
        declarations: [
            {
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name
                },
                init
            }
        ],
        kind: 'const'
    }
}

export function buildTemplateLiteral(text, expressions) {
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

export function buildAssignmentStatement(left, right) {
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

export function buildMemberExpression(objectName, propertyName) {


    return {
        type: 'MemberExpression',
        object: {
            type: 'Identifier',
            name: objectName
        },
        property: {
            type: 'Identifier',
            name: propertyName
        },
        computed: false,
        optional: false
    }
}

export function buildMemberExpression2(object, name, repeat = 1) {
    let stmt = object

    while (repeat-- > 0) {
        stmt = {
            type: 'MemberExpression',
            object: stmt,
            property: {
                type: 'Identifier',
                name
            },
            computed: false,
            optional: false
        }
    }

    return stmt
}

export function buildIdentifier(name) {
    return {
        type: 'Identifier',
        name
    }
}
