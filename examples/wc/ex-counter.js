import { signal, effect } from '@webreflection/signal';

class Test extends HTMLElement {
	constructor() {
		super();
		this.count = signal(0);
		this.name = 'ssdd</scrip ';
	}

	inc(num) {
		this.count.value += num;
	}

	connectedCallback() {
		const root = this.attachShadow({ mode: "open" });

		root.innerHTML = TEMPLATE + STYLE;

		const elem_1 = root.firstChild;
		const elem_2 = root.firstChild.firstChild.nextSibling;
		const elem_3 = root.firstChild.firstChild.nextSibling;
		const elem_4 = root.firstChild.firstChild.nextSibling;
		const elem_5 = root.firstChild.nextSibling.firstChild;
		const elem_6 = root.firstChild.nextSibling.nextSibling.nextSibling;
		const text_1 = elem_1.firstChild;
		const text_2 = elem_4.firstChild;
		const text_3 = elem_5.firstChild;
		const text_4 = elem_6.firstChild;

		effect(() => {
			text_1.textContent = `aaadd ${this.count.value} bb`;
		});

		effect(() => {
			elem_2.setAttribute('name', this.count.value)
		});

		effect(() => {
			text_2.textContent = `click ${this.count.value}`;
		});

		effect(() => {
			text_3.textContent = `helloxxsss ${this.count.value} stufsf ${this.count.value}ss`;
		});

		effect(() => {
			text_4.textContent = `after ${this.count.value}`;
		});

		elem_3.onclick = () => {
			this.inc(3)
		};
	}
}

const TEMPLATE = '<div> <button> </button></div><p><span> </span></p><!><div title="efe ef"> </div><slot>slot</slot>';
const STYLE = '<style>div{color:red}</style>';

customElements.define('ex-counter', Test);