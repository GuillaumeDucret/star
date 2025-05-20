import { symbolValueStmt } from "../../builders";

export function Identifier(node, context) {
    return symbolValueStmt(node.name)
}