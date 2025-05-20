import { describe, it } from 'vitest'
import { compile } from '../src/compiler'

const source = `  
<script>
    const div = root.querySelector('')

    effect(() => {
        const str = this.count.value
    })

    class MyElement extends HTMLElement {
  
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        console.log("Custom element added to page.");
    }
}

</script>
<template>
    <div>aa {count} ss<b>h</b>{count} bb</div> 
</template>
`

describe('.test()', {}, () => {
    it('test', {}, () => { 
        console.log('/'.charCodeAt(0))
        const result = compile(source)
        console.log(result)
    })
})
  