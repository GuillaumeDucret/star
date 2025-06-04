import { readdirSync } from 'fs'
import path from 'path'

export function walk(dirPath, state, handle) {
    const entries = readdirSync(dirPath, { withFileTypes: true })

    for (const entry of entries) {
        if (entry.isDirectory() && entry.name !== 'node_modules') {
            walk(path.join(entry.parentPath, entry.name), state, handle)
        } else if (entry.isFile()) {
            handle(entry, state)
        }
    }
}
