import { describe, it } from 'vitest'
import { compile } from '../src/compiler'

const source = `  
<script>
    let a = 'a'
</script>
<template>
    <div>aa</div>
    <style>div {color: red}</style>
    dd
</template>
`

describe('.test()', {}, () => {
    it('test', {}, () => {
        const result = compile(source)
        console.log(result)
    })
})
 