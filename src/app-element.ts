import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';


import "./elements/header-element"
import "./elements/footer-element"

import { Router } from '@vaadin/router';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import { changeLocation, setMeta } from './redux/reducers/location.reducer';
import { IReduxState } from './models/redux-state.model';
import { DependencyProviderService } from './services/dependency-provider.service';
import { IFetchService } from './services/interfaces/fetch.service.interface';
import { FETCH_SERVICE, LANDING_PAGE_REPOSITORY, PROJECTS_REPOSITORY, SOCIALS_REPOSITORY } from './helpers/di-names.helper';
import { FetchOnlineService } from './services/fetch-online.service';
import { IProjectRepository } from './repositories/interfaces/project.repository.interface';
import { ProjectApiRepository } from './repositories/project-api.repository';
import { ISocialRepository } from './repositories/interfaces/social.repository.interface';
import { SocialApiRepository } from './repositories/social-api.repository';
import { ILandingPageRepository } from './repositories/interfaces/landing-page.repository.interface';
import { LandingPageApiRepository } from './repositories/landing-page-api.repository';
import { Logging } from './services/logging.service';


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

    constructor() {
        super();

        Logging.log("Patched!")

        DependencyProviderService.setImpl<IFetchService>(FETCH_SERVICE, new FetchOnlineService());
        DependencyProviderService.setImpl<IProjectRepository>(PROJECTS_REPOSITORY, new ProjectApiRepository());
        DependencyProviderService.setImpl<ISocialRepository>(SOCIALS_REPOSITORY, new SocialApiRepository());
        DependencyProviderService.setImpl<ILandingPageRepository>(LANDING_PAGE_REPOSITORY, new LandingPageApiRepository());

    }





    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties)
        this.router = new Router(this.shadowRoot!.getElementById('outlet'));

        this.router.setRoutes([
            { path: '/', component: 'landing-page', action: async () => { this.onLocationChanged("/", "kacperserewis.net", "My personal website"); await import("./pages/landing-page") } },
            { path: '/blog', component: 'blog-page', action: async () => { this.onLocationChanged("/blog", "blog - kacperserewis.net", "My blog with things I made."); await import("./pages/blog-page") } },
            { path: '/projects', component: 'projects-page', action: async () => { this.onLocationChanged("/projects", "projects - kacperserewis.net", "My projects."); await import("./pages/projects-page") } },
            { path: '(.*)', component: 'notfound-page', action: async () => { this.onLocationChanged(".*", "fallback - kacperserewis.net", "Fallback page for unknown paths"); store.dispatch(changeLocation(".*")) } }
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