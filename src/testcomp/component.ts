
import {signal, effect} from '@webreflection/signal';

const template = `
<template id="my-element">
<style>
  p {
    color: white;
    background-color: #666;
    padding: 5px;
  }
</style>
<p>
  <slot name="my-text">My default text</slot>
  <slot></slot>
  <span></span>
  <button>update</button>
</p>
</template>
`


document.body.insertAdjacentHTML('beforeend', template)


export class MyElement extends HTMLElement {

    constructor() {
        super();
        let template = document.getElementById("my-element") as HTMLTemplateElement;
        let templateContent = template.content;
  
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));

        const span = shadowRoot.querySelector('span')
        const button = shadowRoot.querySelector('button')

        effect(() => {
            span.textContent = this.name.value
            button.onclick = () => {
                this.update()
            }
        })
      }

      name = signal('guillaume')


      update() {
        if (this.name.value === 'guillaume')
            this.name.value = 'Nastya'
        else
            this.name.value = 'guillaume'
      }
}

customElements.define("my-element", MyElement);