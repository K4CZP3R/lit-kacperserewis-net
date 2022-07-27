import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import "./button-element"
import { fetchSocials } from './redux/reducers/socials.reducer';
import { store } from './redux/store';

import "./blob-element"
import "./blob3d-element"


@customElement('landing-element')
export class LandingElement extends connect(store)(LitElement) {


    static override styles = css`


    .element {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    





    .name-text {
        font-size: 6em;
        font-weight: bold;
    }

    .function-text {
        font-size: 3em;
    }

    .current-text {
        font-style: italic;
    }

    .socials {
        display: flex;
        gap: 10px;
        margin-top: 3%;
        padding-left: 1%;
        min-height: 40px;
    }
    .socials > a {
        text-decoration: none;
        color: var(--color-primary);
        text-decoration: underline;
    }


    /* responsive */
    @media (max-width: 1200px) {
        .name-text {
            font-size: 4em;
        }
        .function-text {
            font-size: 2em;
        }
    }
    @media (max-width: 768px) {
        blob3d-element {
            position: absolute;
            z-index: -1;
        }
        .name-text {
            font-size: 3em;
        }
        .function-text {
            font-size: 1.5em;
        }
        .current-text {
            font-size: 1em;
        }
    }
    @media (max-width: 480px) {
        .name-text {
            font-size: 3em;
        }
        .function-text {
            font-size: 2em;
        }
        .current-text {
            font-size: 1em;
        }
    }

    `;


    @property({ type: Boolean })
    shifted = false;

    @property({ type: Array })
    socials: { name: string; url: string }[] = [];

    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties)
        this.shifted = true;


        store.dispatch(fetchSocials());



    }

    override stateChanged(_state: { projectsReducer: { projects: any[]; }; locationReducer: { location: string }; blogReducer: { posts: any[]; }; socialsReducer: { socials: any; }; }): void {
        super.stateChanged(_state);


        this.socials = _state.socialsReducer.socials;

        console.log(_state);
    }


    @property({ type: String })
    testProperty = '';
    override render() {
        return html`

        <div class="element">
        
            <div style="display: flex; flex-direction: column;">
                <a class="name-text">Kacper Serewiś</a>
                <a class="function-text">Junior software developer</a>
                <a class="current-text">Fontys student, working part-time as developer at Stofloos..</a>
        
        
        
                <div class="socials">
                    ${["Projects", "Blog"].map((link: any) => {
                        return html`<a href="${link}">${link}</a>`
                    })}
                    ${this.socials.map((social) => {
                        return html`<a href="${social.url}">${social.name}</a>`
                    })}
        
        
        
                </div>
        
        
        
            </div>
        
            <blob3d-element blobSpeed="0.0003" lightColor="0xf6f6f2" size="300" blobColor="0xc2edce" blobSpikeness="1.75" ></blob3d-element>
        </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'landing-element': LandingElement;
    }
}