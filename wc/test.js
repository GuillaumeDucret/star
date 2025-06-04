import { signal, effect } from '@webreflection/signal';
import * as b from '../test/dep.js';

class Test extends HTMLElement {
	constructor() {
		super();
		this.count = signal(0);
	}

	inc(num) {
		this.count.value += num;
	}

	connectedCallback() {
		const root = this.attachShadow({ mode: "open" });

		root.innerHTML = TEMPLATE + STYLE;

		const elem_1 = root.firstChild;
		const elem_2 = root.firstChild;
		const elem_3 = root.firstChild.nextSibling;
		const elem_4 = root.firstChild.nextSibling.nextSibling.nextSibling;
		const text_1 = elem_3.firstChild;
		const text_2 = elem_4.firstChild;

		effect(() => {
			elem_1.setAttribute('name', this.count.value)
		});

		effect(() => {
			text_1.textContent = `helloxxsss${this.count.value}stufsf`;
		});

		effect(() => {
			text_2.textContent = `after${this.count.value}`;
		});

		elem_2.onclick = () => {
			this.inc(3)
		};
	}
}

const TEMPLATE = '<button>click</button><div> </div><!><div> </div>';
const STYLE = '<style>div{color:red}</style>';

customElements.define('test', Test);