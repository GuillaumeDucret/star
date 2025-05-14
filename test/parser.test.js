import { describe, it } from 'vitest'
import { parse } from '../src/parser'

const input = `<script>let a = 'a'</script><template><div>aa</div><style>div {color: red}</style>dd</template>`

describe('parse()', {}, () => {
    it('simple', {}, () => {
        console.log(JSON.stringify(parse(input), undefined, 2)) 
    })
})
