import { readdir } from 'fs/promises'
import path from 'path'

export class FileScanner {
    constructor({ include, filter }) {
        this.include = (dirName) => dirName !== 'node_modules' && (include?.(dirName) ?? true)
        this.filter = filter
    }

    async scan() {
        const result = new Map()
        await this.scanDir(result, path.join(process.cwd()))
        return result
    }

    async scanDir(result, dirPath) {
        const entries = await readdir(dirPath, { withFileTypes: true })

        const promises = []
        for (const entry of entries) {
            if (entry.isDirectory() && this.include(entry.name)) {
                promises.push(this.scanDir(result, path.join(dirPath, entry.name)))
            } else if (entry.isFile()) {
                const key = this.filter(entry.name)

                if (key) {
                    result.set(key, path.join(dirPath, entry.name))
                }
            }
        }

        await Promise.all(promises)
    }
}
