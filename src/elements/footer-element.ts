import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement('footer-element')
export class FooterElement extends LitElement {
    static override styles = css`
    
    .element {
        /* width: 75vw; */
        padding: 10px
    }
    `;

    @property({ type: String })
    testProperty = '';
    override render() {
        return html`

        <div class="element">
            <a>Made with lit!</a>
        </div>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'footer-element': FooterElement;
    }
}