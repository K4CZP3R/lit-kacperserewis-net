import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Router } from '@vaadin/router';

@customElement('button-element')
export class ButtonElement extends LitElement {

    @property({ type: String })
    path?: string;

    @property({type: Boolean})
    externalPath = false;

    static override styles = css`



/* From uiverse.io by @alexmaracinaru */
.cta {
 position: relative;
 margin: auto;
 padding: 12px 18px;
 transition: all 0.2s ease;
 border: none;
 background: none;
}

.cta:before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 display: block;
 border-radius: 50px;
 background: var(--primary-color-light);
 width: 45px;
 height: 45px;
 transition: all 0.3s ease;
}

.cta span {
 position: relative;
 font-family: "Ubuntu", sans-serif;
 font-size: 18px;
 font-weight: 700;
 letter-spacing: 0.05em;
 color: var(--primary-color);
}

.cta svg {
 position: relative;
 top: 0;
 margin-left: 10px;
 fill: none;
 stroke-linecap: round;
 stroke-linejoin: round;
 stroke: var(--primary-color);
 stroke-width: 2;
 transform: translateX(-5px);
 transition: all 0.3s ease;
}



.cta:hover:before {
 width: 100%;
}


.cta:hover svg {
 transform: translateX(0);
}

.cta:active {
 transform: scale(0.95);
}
    
    `;

    @property({ type: String })
    testProperty = '';
    override render() {
        return html`
            <!-- <button class="button" @click="${() => Router.go(this.path ?? '/')}" class="element">
                <slot></slot>
            </button> -->

            <button class="cta" @click="${() => this.externalPath ? location.href = this.path ?? '' : Router.go(this.path ?? '/')}">
  <span><slot></slot></span>
  <svg viewBox="0 0 13 10" height="10px" width="15px">
    <path d="M1,5 L11,5"></path>
    <polyline points="8 1 12 5 8 9"></polyline>
  </svg>
</button>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'button-element': ButtonElement;
    }
}