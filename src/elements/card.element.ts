import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { textStyle } from '../styles/text.style';


@customElement('card-element')
export class CardElement extends LitElement {
    static override styles = [textStyle, css`
    .element {
        color: var(--card-fg);
        background-color: var(--card-bg);
        border: 2px solid var(--card-fg);
        padding: 0px 25px 25px 25px;
        border-radius: 10px;
    }

    .subtitle {
        color: gray;
        margin-top: 0px;
    }

    .title {
        margin-bottom: 0px;
    }
    
    
    `];

    @property({ type: String })
    cardTitle?: string;

    @property({ type: String })
    cardSubtitle?: string;


    override render() {
        return html`<div class="element">

    <div>
        <h1 class="title">${this.cardTitle}</h1>
        <p class="subtitle">${this.cardSubtitle}</p>
    </div>


    <div>
        <slot></slot>
    </div>


</div>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'card-element': CardElement;
    }
}