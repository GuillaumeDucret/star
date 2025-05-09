import {print} from 'esrap'


export function transform() {


    const ast = JSON.parse(
'{"type":"Program","start":0,"end":45,"body":[{"type":"ClassDeclaration","start":0,"end":45,"id":{"type":"Identifier","start":6,"end":15,"name":"Component"},"superClass":null,"body":{"type":"ClassBody","start":16,"end":45,"body":[{"type":"MethodDefinition","start":17,"end":44,"static":false,"computed":false,"key":{"type":"Identifier","start":17,"end":22,"name":"click"},"kind":"method","value":{"type":"FunctionExpression","start":22,"end":44,"id":null,"expression":false,"generator":false,"async":false,"params":[],"body":{"type":"BlockStatement","start":25,"end":44,"body":[{"type":"ExpressionStatement","start":26,"end":43,"expression":{"type":"CallExpression","start":26,"end":43,"callee":{"type":"MemberExpression","start":26,"end":37,"object":{"type":"Identifier","start":26,"end":33,"name":"console"},"property":{"type":"Identifier","start":34,"end":37,"name":"log"},"computed":false,"optional":false},"arguments":[{"type":"Literal","start":38,"end":42,"value":"ha","raw":"\\"ha\\""}],"optional":false}}]}}}]}}],"sourceType":"script"}')

return print(ast)
}