import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';


import "./header-element"
import "./footer-element"
import "./notfound-element"

import { Router } from '@vaadin/router';



@customElement('app-element')
export class AppElement extends LitElement {

    @property({ type: Object })
    router?: Router;

    static override styles = css`
    .main-sections {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100vh;


    }

    .main-sections > * {
        /* max-width: 1072px; */
        width: 65vw;
    }

    /* Responsive */
    @media (max-width: 1072px) {
        .main-sections > * {
            width: 75vw;
        }
    }

    @media (max-width: 768px) {
        .main-sections > * {
            width: 85vw;
        }
    }

    .header {
        border: 1px solid black;
        width: 100vw;

    }

    .content {
        border: 1px solid black;



    }

    .footer {
        border: 1px solid black;
        width: 100vw;

    }


    /* 388087, 6fb3b8, badfe7, c2edce, f6f6f2 */
    
    `;

    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties)
        this.router = new Router(this.shadowRoot!.getElementById('outlet'));
        this.router.setRoutes([
            { path: '/', component: 'landing-element', action: async () => { await import("./landing-element") } },
            { path: '/blog', component: 'blog-element', action: async () => { await import("./blog-element") } },
            { path: '(.*)', component: 'notfound-element' }
        ]);
    }

    override connectedCallback() {
        super.connectedCallback();






    }

    override render() {
        return html`
       
        <div class="main-sections">
        
            <header-element class="header"> </header-element>
            <div class="content" id="outlet"></div>
            <footer-element class="footer"></footer-element>
        </div>
        </div>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'app-element': AppElement;
    }
}