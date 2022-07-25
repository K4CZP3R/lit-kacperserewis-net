import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';


import "./header-element"
import "./footer-element"

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

        background-color: beige;

    }

    .header {
        border: 1px solid black;

    }

    .content {
        border: 1px solid black;

    }

    .footer {
        border: 1px solid black;

    }
    
    `;

    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties)
        this.router = new Router(this.shadowRoot!.getElementById('outlet'));
        this.router.setRoutes([
            { path: '/', component: 'header-element' },
            { path: '/header', component: 'header-element' },
            { path: '/footer', component: 'footer-element' },
        ]);
    }

    override connectedCallback() {
        super.connectedCallback();






    }

    override render() {
        return html`
        <div class="main-sections">
            <header-element class="header"> </header-element>
            <a href="/header">Header go</a>
            <a href="/footer">Footer go</a>
            <button @click="${() => Router.go("/header")}">Header go</button> <div id="outlet" class="content">
        </div>
        
        
        <footer-element class="footer">Footer</footer-element>
        </div>v>
        </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'app-element': AppElement;
    }
}