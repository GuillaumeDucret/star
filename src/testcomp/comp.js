const div = root.querySelector('');\n" +
    '\n' +
    'effect(() => {\n' +
    '\tconst str = this.count.value;\n' +
    '});\n' +
    '\n' +
    'class MyElement extends HTMLElement {\n' +
    '\tconstructor() {\n' +
    '\t\tsuper();\n' +
    '\n' +
    '\t\tconst shadowRoot = this.attachShadow({ mode: "open" });\n' +
    '\n' +
    '\t\tshadowRoot.innerHTML = TEMPLATE;\n' +
    '\t}\n' +
    '\n' +
    '\tconnectedCallback() {\n' +
    '\t\tconsole.log("Custom element added to page.");\n' +
    '\n' +
    '\t\tconst elem_1 = root.firstChild;\n' +
    '\t\tconst text_1 = elem_1.firstChild;\n' +
    '\t\tconst text_2 = elem_1.firstChild.firstSibling.firstSibling;\n' +
    '\n' +
    '\t\teffect(() => {\n' +
    '\t\t\ttext_1.textContent = `${this.count.value}`;\n' +
    '\t\t});\n' +
    '\n' +
    '\t\teffect(() => {\n' +
    '\t\t\ttext_2.textContent = `${this.count.value}bb`;\n' +
    '\t\t});\n' +
    '\t}\n' +
    '}\n' +
    '\n' +
    "const TEMPLATE = '<div> <b>h</b> </div>';