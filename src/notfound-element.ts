import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';


import "./button-element"

@customElement('notfound-element')
export class NotFoundElement extends LitElement {
    static override styles = css``;

    @property({ type: String })
    testProperty = '';
    override render() {
        return html`
                <div>
                    Not found!
                
                    <button-element .path="${"/"}">Go back</button-element> </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'notfound-element': NotFoundElement;
    }
}