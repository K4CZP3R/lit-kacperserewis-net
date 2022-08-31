import type { PropertyValueMap } from 'lit';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './elements/header-element';
import './elements/footer-element';

import { Router } from '@vaadin/router';
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import { changeLocation, setMeta } from './redux/reducers/location.reducer';
import type { IReduxState } from './models/redux-state.model';
import { DependencyProviderService } from './services/dependency-provider.service';
import type { IFetchService } from './services/interfaces/fetch.service.interface';
import { FETCH_SERVICE, LANDING_PAGE_REPOSITORY, POST_REPOSITORY, PROJECTS_REPOSITORY, SOCIALS_REPOSITORY } from './helpers/di-names.helper';
import { FetchOnlineService } from './services/fetch-online.service';
import type { IProjectRepository } from './repositories/interfaces/project.repository.interface';
import { ProjectApiRepository } from './repositories/project-api.repository';
import type { ISocialRepository } from './repositories/interfaces/social.repository.interface';
import { SocialApiRepository } from './repositories/social-api.repository';
import type { ILandingPageRepository } from './repositories/interfaces/landing-page.repository.interface';
import { LandingPageApiRepository } from './repositories/landing-page-api.repository';
import { Logging } from './services/logging.service';
import type { IPostRepository } from './repositories/interfaces/post.repository.interface';
import { PostApiRepository } from './repositories/post-api.repository';

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
        padding: 10px;

    }

    
    `;

    constructor() {
        super();

        Logging.log('Patched!');

        DependencyProviderService.setImpl<IFetchService>(FETCH_SERVICE, new FetchOnlineService());
        DependencyProviderService.setImpl<IProjectRepository>(PROJECTS_REPOSITORY, new ProjectApiRepository());
        DependencyProviderService.setImpl<ISocialRepository>(SOCIALS_REPOSITORY, new SocialApiRepository());
        DependencyProviderService.setImpl<ILandingPageRepository>(LANDING_PAGE_REPOSITORY, new LandingPageApiRepository());
        DependencyProviderService.setImpl<IPostRepository>(POST_REPOSITORY, new PostApiRepository());
    }

    protected override firstUpdated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        if(!this.shadowRoot) {
            Logging.log('Shadow root is null');
            return;
        }
        this.router = new Router(this.shadowRoot.getElementById('outlet'));

        this.router.setRoutes([
            {
                path: '/', component: 'landing-page', action: async () => {
                    this.onLocationChanged('/', 'kacperserewis.net', 'My personal website'); await import('./pages/landing-page');
                }
            },
            {
                path: '/blog', component: 'blog-page', action: async () => {
                    this.onLocationChanged('/blog', 'blog - kacperserewis.net', 'My blog with things I made.'); await import('./pages/blog-page');
                }
            },
            {
                path: '/projects', component: 'projects-page', action: async () => {
                    this.onLocationChanged('/projects', 'projects - kacperserewis.net', 'My projects.'); await import('./pages/projects-page');
                }
            },
            {
                path: '/projects/:name', component: 'project-page', action: async () => {
                    this.onLocationChanged('/projects/:name', 'project - kacperserewis.net', 'My project.'); await import('./pages/project-page');
                }
            },
            {
                path: '(.*)', component: 'notfound-page', action: async () => {
                    this.onLocationChanged('.*', 'fallback - kacperserewis.net', 'Fallback page for unknown paths'); store.dispatch(changeLocation('.*'));
                }
            },
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
