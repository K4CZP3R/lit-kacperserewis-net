import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';


import { marked } from 'marked';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';


@customElement('markdown-element')
export class MarkdownElement extends LitElement {
    static override styles = css``;

    @property({ type: String })
    output = '';

    @property({ type: String })
    input = '# xD Hello, world!\r\nThis is my code:\n\n```js\nSystem.out.println("Hello, world!");\r\n```\n\n';



    protected override firstUpdated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        hljs.registerLanguage('javascript', javascript);
        hljs.registerLanguage('typescript', typescript);
        hljs.registerLanguage('bash', bash);

        marked.setOptions({
            highlight: (code: string, lang: string) => {
                const ret = hljs.highlight(code, { language: lang });
                return `<pre><code class="hljs">${ret.value}</code></pre>`;
            }

        });


    }

    protected override updated(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);
        this.output = marked(this.input);
    }

    getStyle() {
        return '<style>@import "assets/a11y-dark.css";</style>';
    }

    override render() {
        return html`
        ${unsafeHTML(this.getStyle())}
        ${unsafeHTML(this.output)}`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'markdown-element': MarkdownElement;
    }
}