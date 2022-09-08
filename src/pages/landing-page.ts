import { LitElement, html, css, PropertyValueMap, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import '../elements/button-element';
// import '../elements/blob3d-element';
// import '../elements/blob-element';
import { store } from '../redux/store';

import { appear, appearSlideUp, slideUp } from '../styles/animations.style';
import { textStyle } from '../styles/text.style';
import { animate } from '@lit-labs/motion';
import { IReduxState } from '../models/redux-state.model';
import { ISocialModel } from '../models/social.model';
import { PAGE_FETCH_LANDING_RETRYIFY, SOCIALS_FETCH_RETRYIFY } from '../helpers/retryify';
import { Logging } from '../services/logging.service';
import { addToQueue } from '../redux/reducers/snackbar.reducer';
import { IPageModel } from '../models/page.model';


@customElement('landing-page')
export class LandingPage extends connect(store)(LitElement) {
    @property({ type: Boolean })
    simpleBlob = false;

    @property({ type: Boolean })
    changingCms = false;

    @property({ type: Boolean })
    changingBlob = false;

    @property({type: Boolean})
    blobLoaded = false;


    static override styles = [textStyle, appearSlideUp, slideUp, appear, css`
    .element {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .content {
        display: flex; flex-direction: column;
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
        /* padding-left: 1%; */
        min-height: 40px;
        animation: appear 1s ease;
        flex-wrap: wrap;
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

        .content {
            align-items: center;
        }

        .socials {
            /* display: none */
            justify-content: space-evenly;
        }

        .sub-text {
            display: none
        }

        .bot-text {
        text-align: center;
    }
    }


    `];



    @property({ type: Array })
    socials: ISocialModel[] = [];

    @property({ type: Object })
    landingPage?: IPageModel;

    @property({type: Number})
    blobColor?: number;
    

    constructor(){
        super();
        import('../elements/blob3d-element').then(() => this.blobLoaded = true);

    }

    protected override firstUpdated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);



        SOCIALS_FETCH_RETRYIFY().start().then(() => console.log('fetched socials!')).catch(() => store.dispatch(addToQueue('Can\'t fetch social links.')));
        PAGE_FETCH_LANDING_RETRYIFY().start().then(() => console.log('fetched cms!')).catch(() => store.dispatch(addToQueue('Can\'t fetch CMS content.')));
        


        window.addEventListener('resize', () => {
            this.blobScreenWidthCheck();
        });

        this.blobScreenWidthCheck();

        const blobColor = getComputedStyle(document.documentElement).getPropertyValue('--blob-color');
        this.blobColor = Number(blobColor.toString().replace('#', '0x'));
        Logging.log('Blob color is ' + this.blobColor);

    }

    blobScreenWidthCheck() {
        if(this.changingBlob) return;

        if(window.innerWidth < 768 && !this.simpleBlob) {
            this.blobToggleTo(true);
        } else if(window.innerWidth > 768 && this.simpleBlob) {
            this.blobToggleTo(false);
        }
    }

    override stateChanged(_state: IReduxState): void {
        super.stateChanged(_state);

        if (!_state.socialsReducer.error) {
            this.socials = _state.socialsReducer.socials;
        }


        // TODO: Check logic!
        const foundPage = _state.pageReducer.pages.find(p => p.pageId === 'landing-page');
        if(foundPage) {
            this.landingPage = foundPage;
            // this.changingCms = true;
            // setTimeout(() => {
            //     this.landingPage = foundPage;
            //     this.changingCms = false;
            // }, 125);
        }
        



    }


    blobToggleTo(shouldBeSimple: boolean) {
        this.changingBlob = true;

        setTimeout(() => {
            this.simpleBlob = shouldBeSimple;
            this.changingBlob = false;
        }, 125);
    }
    blobClick() {
        this.changingBlob = true;

        setTimeout(() => {
            this.simpleBlob = !this.simpleBlob;
            this.changingBlob = false;
        }, 125);

    }



    override render() {
        return html`

        <div class="element">
        

        ${this.landingPage ? html` <div ${animate()} class="content">

    <a class="main-text">${this.landingPage?.mainText}</a>
    <a class="sub-text">${this.landingPage?.subText}</a>
    <a class="bot-text">${this.landingPage?.botText}</a>
    
    <div class="socials">
        ${['Projects', 'Blog'].map((link: string) => {
        return html`<button-element class="social-link" .path="${link}">${link}</button-element>`;
    })}
        ${this.socials.map((social) => {
        return html`<button-element class="social-link" .externalPath="${true}" .path="${social.url}">${social.name}</button-element>`;
    })}
    </div>



</div>` : nothing}
           

        ${this.blobLoaded ? 
        html`<blob3d-element .useSimpleMaterial="${this.simpleBlob}" class="${this.changingBlob ? 'hide-blob' : ''}" ${animate()} @click="${() => this.blobClick()}" .blobSpeed="${0.0003}" .lightColor="${0xf6f6f2}" .size="${300}" .blobColor="${this.blobColor ?? 0xff0000}" .blobSpikeness="${1.75}" ></blob3d-element> ` : nothing}
            
            

        </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'landing-page': LandingPage;
    }
}