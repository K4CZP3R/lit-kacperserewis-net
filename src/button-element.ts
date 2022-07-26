import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@lion/button/define';
import { Router } from '@vaadin/router';

@customElement('button-element')
export class ButtonElement extends LitElement {

    @property({ type: String })
    path?: string;

    static override styles = css`

    .element {
        border-radius: 5px;
    }
    
    `;

    @property({ type: String })
    testProperty = '';
    override render() {
        return html`
            <lion-button @click="${() => Router.go(this.path ?? "/")}" class="element">
                <slot></slot>
            </lion-button>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'button-element': ButtonElement;
    }
}