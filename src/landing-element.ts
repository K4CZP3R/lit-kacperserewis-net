import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import "./button-element"
import { fetchSocials } from './redux/reducers/socials.reducer';
import { store } from './redux/store';

import "./blob-element"


@customElement('landing-element')
export class LandingElement extends connect(store)(LitElement) {
    static override styles = css`
    

    
    
    .layout {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 50px;
    }
    



    @keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.fade-in-text {
  animation: fadeIn 2s;
}



    .name-text {
        font-size: 6em;
        font-weight: bold;
    }

    .function-text {
        font-size: 3em;
        /* font-weight: bold; */
    }

    .current-text {
        font-style: italic;
    }

    .socials {
        display: flex;
        gap: 10px;
        margin-top: 2%;
        padding-left: 5%;
        min-height: 40px;
    }
    .socials > a {
        text-decoration: none;
        color: var(--color-primary);
        text-decoration: underline;
    }



    blob-element {
        position: absolute;
        z-index: -1;
        top: 10%;
        left: 35%;
        width: 40%;
    }

        /* Responsive */
        @media (max-width: 1072px) {
       blob-element {
        width: 60%;

       }
    }

    @media (max-width: 768px) {
        blob-element {

        width: 70%;
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

    override stateChanged(_state: { projectsReducer: { projects: any[]; }; blogReducer: { posts: any[]; }; socialsReducer: { socials: any; }; }): void {
        super.stateChanged(_state);


        this.socials = _state.socialsReducer.socials;

        console.log(_state);
    }


    @property({ type: String })
    testProperty = '';
    override render() {
        return html`
        <div class="element layout">
        
        
            <div style="display: flex; flex-direction: column;" class="fade-in-text">
        
                <blob-element></blob-element>
        
                <a class="name-text">Kacper Serewiś</a>
                <a class="function-text">Junior software developer</a>
                <a class="current-text">Fontys student, working part-time as developer at Stofloos..</a>
        
        
                <!-- <button-element path="/projects">Projects</button-element>
                                                                                                                                                                                                                                                                <button-element path="/blog">Blog</button-element> -->
        
                <div class="socials">
                    ${this.socials.map((social) => {
        return html`<a href="${social.url}">${social.name}</a>`
        })}
        
                </div>
        
        
        
            </div>
        
        
        </div>
        </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'landing-element': LandingElement;
    }
}