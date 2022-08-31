import { Router } from '@vaadin/router';
import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import { IProjectModel } from '../models/project.model';
import { IReduxState } from '../models/redux-state.model';
import { fetchProject } from '../redux/reducers/projects.reducer';
import { store } from '../redux/store';


@customElement('project-page')
export class ProjectPage extends connect(store)(LitElement) {
    static override styles = css``;

    @property({ type: String })
    projectName?: string;

    @property({ type: Object })
    project?: IProjectModel;

    location?: {params: {[key:string]: unknown}};

    protected override firstUpdated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        if (!this.location?.params.name) {
            Router.go('/Projects');
        } else {
            this.projectName = this.location.params.name as string ?? '';
        }
    }


    protected override updated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);

        if (_changedProperties.has('projectName')) {
            this.loadProject();
        }
    }

    override stateChanged(_state: IReduxState): void {
        super.stateChanged(_state);

        if (!_state.projectsReducer.error) {
            this.project = _state.projectsReducer.currentProject;
        }
    }


    loadProject() {
        if (!this.projectName) return;
        store.dispatch(fetchProject(this.projectName));
    }


    override render() {
        return html`
        
        ${this.project ? html`
        
        <h1>${this.project.title}</h1>
        <p>${this.project.description}</p>
        
        ` : html`<p>Loading...</p>
        `}
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'project-page': ProjectPage;
    }
}