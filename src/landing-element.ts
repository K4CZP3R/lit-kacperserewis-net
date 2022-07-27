import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import "./button-element"
import { fetchSocials } from './redux/reducers/socials.reducer';
import { store } from './redux/store';

import "./blob-element"
import "./blob3d-element"
import { appear, slideUp } from './styles/animations.style';
import { textStyle } from './styles/text.style';
import {animate} from '@lit-labs/motion';


@customElement('landing-element')
export class LandingElement extends connect(store)(LitElement) {
    @property({type: Boolean})
    simpleBlob =false;


    @property({type: Boolean})
    changing = false;


    static override styles = [textStyle, slideUp, appear ,css`
    .element {
        display: flex;
        align-items: center;
        justify-content: space-around;
        animation: slideUp 1s ease;
    }

    blob3d-element {
        animation: appear 1s ease;
    }

    .hide {
        opacity: 0.5;
    }


    


    .socials {
        display: flex;
        gap: 10px;
        margin-top: 3%;
        padding-left: 1%;
        min-height: 40px;
        animation: appear 1s ease;
    }
    .socials > a {
        text-decoration: none;
        color: var(--color-primary);
        text-decoration: underline;
    }



    @media (max-width: 768px) {
        blob3d-element {
            position: absolute;
            z-index: -1;
        }
     
    }


    `];


    @property({ type: Boolean })
    shifted = false;

    @property({ type: Array })
    socials: { name: string; url: string }[] = [];

    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties)
        this.shifted = true;


        store.dispatch(fetchSocials());



    }

    override stateChanged(_state: any): void {
        super.stateChanged(_state);


        this.socials = _state.socialsReducer.socials;

        console.log(_state);
    }

    blobClick() {
        this.changing = true;
        
        setTimeout(() => {
            this.simpleBlob = !this.simpleBlob;
            this.changing = false;
        },500)

    }


    @property({ type: String })
    testProperty = '';
    override render() {
        return html`

        <div class="element">
        
            <div style="display: flex; flex-direction: column;">
                <a class="main-text">Kacper Serewiś</a>
                <a class="sub-text">Junior software developer</a>
                <a class="bot-text">Fontys student, working part-time as developer at Stofloos..</a>
        
        
        
                <div class="socials">
                    ${["Projects", "Blog"].map((link: any) => {
                        return html`<a href="${link}">${link}</a>`
                    })}
                    ${this.socials.map((social) => {
                        return html`<a href="${social.url}">${social.name}</a>`
                    })}
        
        
        
                </div>
        
        
        
            </div>
        
            <blob3d-element .useSimpleMaterial="${this.simpleBlob}" class="${this.changing ? 'hide' : ''}" ${animate()} @click="${(_e: any) => this.blobClick()}" blobSpeed="0.0003" lightColor="0xf6f6f2" size="300" blobColor="0xc2edce" blobSpikeness="1.75" ></blob3d-element>
        </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'landing-element': LandingElement;
    }
}