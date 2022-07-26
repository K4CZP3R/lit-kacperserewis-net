import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';

import "./button-element"
import { fetchSocials } from './redux/reducers/socials.reducer';
import { store } from './redux/store';

@customElement('landing-element')
export class LandingElement extends connect(store)(LitElement) {
    static override styles = css`
    
    .avatar {
        /* Round */
        border-radius: 50%;
    }
    
    .element {
        width: 75vw;
    }
    
    .layout {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 50px;
    }
    
    .box {
      position: absolute;
      width: 100px;
      height: 100px;
      background: steelblue;
      top: 100px;
      border-radius: 50%;
    }

    @keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.fade-in-text {
  animation: fadeIn 2s;
}

    `;


    @property({ type: Boolean })
    shifted = false;

    @property({ type: Array })
    socials: any[] = [];

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
            <img width=" 30%" height="30%" class="avatar"
                src="https://strapi.kacperserewis.net/uploads/avatar_7651e491b0.webp?updated_at=2022-02-02T22:13:34.574Z">
            <div>
                <h1>Hi!</h1>
                <p>My name is Kacper</p>
        
                <div style="min-height: 40px">
        
                    ${this.socials.map(social => html`
                    <button-element class="fade-in-text">${social.name}</button-element>`)}
        
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