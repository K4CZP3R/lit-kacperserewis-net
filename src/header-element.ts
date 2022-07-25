import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('header-element')
export class HeaderElement extends LitElement {
    static override styles = css`
    
    .element {
        width: 100vw;
        padding: 10px
    }
    `;

    @property({ type: String })
    testProperty = '';
    override render() {
        return html`
        
        <div class="element">
            <a>Icoontje</a>
            <a>kacperserewis.net</a>
        
        </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'header-element': HeaderElement;
    }
}