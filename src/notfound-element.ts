import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';


import "./button-element"
import "./blob3d-element"
import { appear, slideUp } from './styles/animations.style';
import { textStyle } from './styles/text.style';

@customElement('notfound-element')
export class NotFoundElement extends LitElement {
    static override styles = [appear, textStyle, slideUp, css`
        .element {
        display: flex;
        align-items: center;
        justify-content: space-around;

        animation: slideUp 1.4s ease;
    }

    blob3d-element {
        animation: appear 5s ease;
    }




    @media (max-width: 768px) {
        blob3d-element {
            position: absolute;
            z-index: -1;
        }
    }

    
    `];

    @property({ type: String })
    testProperty = '';
    override render() {
        return html`
                <div class="element">
                    <div style="display: flex; flex-direction: column;gap: 10px;">
                        <a class="main-text">Page not found</a>
                        <a class="sub-text">This page does not exist.</a>
                        <button-element path="/">Go back</button-element>
                    </div>
                    <blob3d-element blobColorEmission="0.5" lightColorEmission="1" blobSpeed="0.0003" lightColor="0xff0000" size="300"
                        blobColor="0xc2edce" blobSpikeness="3">
                    </blob3d-element>
                </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'notfound-element': NotFoundElement;
    }
}