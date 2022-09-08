import {  PropertyValueMap } from 'lit';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './elements/header-element';
import './elements/footer-element';

import './pages/landing-page';

 
import { connect } from 'pwa-helpers';
import { store } from './redux/store';
import { changeLocation, setMeta } from './redux/reducers/location.reducer';
import type { IReduxState } from './models/redux-state.model';
import { DependencyProviderService } from './services/dependency-provider.service';
import type { IFetchService } from './services/interfaces/fetch.service.interface';
import { FETCH_SERVICE, PAGE_REPOSITORY, POST_REPOSITORY, PROJECTS_REPOSITORY, SOCIALS_REPOSITORY } from './helpers/di-names.helper';
import { FetchOnlineService } from './services/fetch-online.service';
import type { IProjectRepository } from './repositories/interfaces/project.repository.interface';
import { ProjectApiRepository } from './repositories/project-api.repository';
import type { ISocialRepository } from './repositories/interfaces/social.repository.interface';
import { SocialApiRepository } from './repositories/social-api.repository';
import { Logging } from './services/logging.service';
import type { IPostRepository } from './repositories/interfaces/post.repository.interface';
import { PostApiRepository } from './repositories/post-api.repository';
import {  displayFromQueue, initializeElement } from './redux/reducers/snackbar.reducer';
import { IPageRepository } from './repositories/interfaces/page.repository.interface';
import { PageApiRepository } from './repositories/page-api.repository';
import { appear } from './styles/animations.style';
@customElement('app-element')
export class AppElement extends connect(store)(LitElement) {
    @property({ type: Object })
    router?: any;

    @property({type: Boolean})
    isImporting = false;

    @property({type: Boolean})
    routerImported = false;

    @property({type: Boolean})
    showLandingWhileLoading = window.location.href.endsWith('/');

    static override styles = [appear, css`
    .main-sections {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100vh;
        padding: 10px;

    }

    #snackbar-container {
        z-index: 1;
        position: fixed;
        bottom: 0;
        display: flex;
        flex-direction: column;
        padding: 10px;
        gap: 5px;
    }

    #first {
        animation: appear 1s ease; 
    }

    
    `];

    constructor() {
        super();

        Logging.log('Patched!');

        DependencyProviderService.setImpl<IFetchService>(FETCH_SERVICE, new FetchOnlineService());
        DependencyProviderService.setImpl<IProjectRepository>(PROJECTS_REPOSITORY, new ProjectApiRepository());
        DependencyProviderService.setImpl<ISocialRepository>(SOCIALS_REPOSITORY, new SocialApiRepository());
        DependencyProviderService.setImpl<IPageRepository>(PAGE_REPOSITORY, new PageApiRepository());
        DependencyProviderService.setImpl<IPostRepository>(POST_REPOSITORY, new PostApiRepository());


    }

    // private async importPage(func: Promise<any>): Promise<void> {
    //     this.isImporting = true;
    
    //     await func.catch((e) =>{ Logging.log('Failed to import page!'), console.log(e);});
    //     this.isImporting = false;
    // }

    protected override firstUpdated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        if(!this.shadowRoot) {
            Logging.log('Shadow root is null');
            return;
        }


        import('@vaadin/router').then(async (router) => {
            Logging.log('Router imported');
            this.routerImported = true;
            if(!this.shadowRoot) {
                Logging.log('Shadow root is null');
                return;
            }



            // Wait until element with id "outlet" is available
            await this.updateComplete;
            


            this.router = new router.Router(this.shadowRoot.getElementById('outlet'));
        
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


        });


        



        import('weightless/snackbar/show-snackbar').then((imported: any) => {
            const showSnackbar = imported.showSnackbar;


            const container = this.shadowRoot?.getElementById('snackbar-container');
            if(!container) {
                Logging.log('Can\'t get snackbar container!');
                return;
            }

            store.dispatch(initializeElement(container, showSnackbar));


        }).catch((e) => {
            Logging.log('Failed to import snackbar', e);
        });




  
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

        if(_state.snackbarReducer.queue.filter(f => !f.shown).length > 0) {
            store.dispatch(displayFromQueue());
        }



    }

    override connectedCallback() {
        super.connectedCallback();
    }

    override render() {
        return html`
       
       <div id="snackbar-container"></div>
        <div class="main-sections">
            <header-element class="header"> </header-element>

            ${!this.showLandingWhileLoading || this.routerImported  ? html`<div id="outlet"></div>` : html`<landing-page id="first"></landing-page>`}


            <footer-element class="footer"></footer-element>
        </div>
       


        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'app-element': AppElement;
    }
}
