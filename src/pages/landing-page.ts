import { LitElement, html, css, PropertyValueMap, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import '../elements/button-element';
import { store } from '../redux/store';

import '../elements/blob-element';
import '../elements/blob3d-element';
import { appear, appearSlideUp, slideUp } from '../styles/animations.style';
import { textStyle } from '../styles/text.style';
import { animate } from '@lit-labs/motion';
import { IReduxState } from '../models/redux-state.model';
import { ISocialModel } from '../models/social.model';
import { ILandingPageModel } from '../models/landing-page.model';
import { LANDING_PAGE_CMS_RETRYIFY, SOCIALS_FETCH_RETRYIFY } from '../helpers/retryify';


@customElement('landing-page')
export class LandingPage extends connect(store)(LitElement) {
    @property({ type: Boolean })
    simpleBlob = false;

    @property({ type: Boolean })
    changingCms = false;

    @property({ type: Boolean })
    changingBlob = false;


    static override styles = [textStyle, appearSlideUp, slideUp, appear, css`
    .element {
        display: flex;
        align-items: center;
        justify-content: space-around;
        /* animation: appearSlideUp 1s ease; */
    }

    blob3d-element {
        animation: appear 2s ease;
    }


    .main-text, .sub-text, .bot-text {
        animation: appear 1s ease;
    }

    .social-link {
        animation: appear 1s ease;
    }


    .hide-cms {
        opacity: 0.75;
    }

    .hide-blob {
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



    @property({ type: Array })
    socials: ISocialModel[] = [];

    @property({ type: Object })
    landingPage?: ILandingPageModel;

    protected override firstUpdated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);



        SOCIALS_FETCH_RETRYIFY().start().then(() => console.log('fetched socials!')).catch((e) => console.log('socials error', e));
        LANDING_PAGE_CMS_RETRYIFY().start().then(() => console.log('fetched cms!')).catch((e) => console.log('cms error', e));

    }

    override stateChanged(_state: IReduxState): void {
        super.stateChanged(_state);

        if (!_state.socialsReducer.error) {
            this.socials = _state.socialsReducer.socials;
        }

        // TODO: Check logic
        if (!_state.landingPageReducer.error) {
            this.landingPage = _state.landingPageReducer.landingPage;
        }  
        



    }

    blobClick() {
        this.changingBlob = true;

        setTimeout(() => {
            this.simpleBlob = !this.simpleBlob;
            this.changingBlob = false;
        }, 500);

    }



    override render() {
        return html`

        <div class="element">
        

        ${this.landingPage ? html` <div style="display: flex; flex-direction: column;">

<a class="main-text testje">${this.landingPage?.mainText}</a>
    <a class="sub-text testje">${this.landingPage?.subText}</a>
    <a class="bot-text testje">${this.landingPage?.botText}</a>
    
    <div class="socials">
        ${['Projects', 'Blog', 'Projects/ts'].map((link: string) => {
        return html`<a class="social-link" href="${link}">${link}</a>`;
    })}
        ${this.socials.map((social) => {
        return html`<a class="social-link" href="${social.url}">${social.name}</a>`;
    })}



    </div>



</div>` : nothing}
           
        
            <blob3d-element .useSimpleMaterial="${this.simpleBlob}" class="${this.changingBlob ? 'hide-blob' : ''}" ${animate()} @click="${() => this.blobClick()}" blobSpeed="0.0003" lightColor="0xf6f6f2" size="300" blobColor="0xc2edce" blobSpikeness="1.75" ></blob3d-element>
        </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'landing-page': LandingPage;
    }
}