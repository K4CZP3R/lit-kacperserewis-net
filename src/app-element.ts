import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';


import "./header-element"
import "./footer-element"
import "./notfound-element"

import { Router } from '@vaadin/router';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import { changeLocation, setMeta } from './redux/reducers/location.reducer';
import { IReduxState } from './models/redux-state.model';



@customElement('app-element')
export class AppElement extends connect(store)(LitElement) {

    @property({ type: Object })
    router?: Router;

    static override styles = css`
    .main-sections {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100vh;


    }

    .main-sections > * {
        max-width: 100%;
        width: 65vw;
        
    }

    /* Responsive */
    @media (max-width: 1072px) {
        .main-sections > * {
            width: 75vw;
        }
    }

    @media (max-width: 768px) {
        .main-sections > * {
            width: 85vw;
        }
    }

    .header {
        /* border: 1px solid black; */
        width: 100vw;
    }


    .footer {
        /* border: 1px solid black; */
        width: 100vw;

    }


    /* 388087, 6fb3b8, badfe7, c2edce, f6f6f2 */
    
    `;

    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties)
        this.router = new Router(this.shadowRoot!.getElementById('outlet'));

        this.router.setRoutes([
            { path: '/', component: 'landing-element', action: async () => { this.onLocationChanged("/", "kacperserewis.net", "My personal website"); await import("./landing-element") } },
            { path: '/blog', component: 'blog-element', action: async () => { this.onLocationChanged("/blog", "blog - kacperserewis.net", "My blog with things I made."); await import("./blog-element") } },
            { path: '/projects', component: 'projects-element', action: async () => { this.onLocationChanged("/projects", "projects - kacperserewis.net", "My projects."); await import("./projects-element") } }, { path: '(.*)', component: 'notfound-element', action: async () => { this.onLocationChanged(".*", "fallback - kacperserewis.net", "Fallback page for unknown paths"); store.dispatch(changeLocation(".*")) } }
        ]);


    }

    private onLocationChanged(newLocation: string, title: string, description: string) {
        store.dispatch(changeLocation(newLocation));
        store.dispatch(setMeta(title, description));
    }


    override stateChanged(_state: IReduxState): void {

        super.stateChanged(_state);

        document.title = _state.locationReducer.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', _state.locationReducer.description);
        document.querySelector('meta[name="og:title"]')?.setAttribute('content', _state.locationReducer.description);


    }

    override connectedCallback() {
        super.connectedCallback();
    }

    override render() {
        return html`
       
        <div class="main-sections">
            <header-element class="header"> </header-element>
            <div id="outlet"></div>
            <footer-element class="footer"></footer-element>
        </div>
        </div>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'app-element': AppElement;
    }
}