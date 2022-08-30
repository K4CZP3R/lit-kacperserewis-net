import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Router } from '@vaadin/router';

@customElement('button-element')
export class ButtonElement extends LitElement {

    @property({ type: String })
    path?: string;

    static override styles = css`

    .button {
        border-radius: 5px;
        background: var(--secondary-color);
        border: 0;
        color: var(--background-color)  ;
        padding: 10px;
            /* 388087, 6fb3b8, badfe7, c2edce, f6f6f2 */
    }

    .button:hover {
        background: var(--primary-color);
    }
    
    `;

    @property({ type: String })
    testProperty = '';
    override render() {
        return html`
            <button class="button" @click="${() => Router.go(this.path ?? '/')}" class="element">
                <slot></slot>
            </button>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'button-element': ButtonElement;
    }
}