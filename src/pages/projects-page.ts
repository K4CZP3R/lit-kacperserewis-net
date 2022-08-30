import { LitElement, html, css, PropertyValueMap, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { appearSlideUp } from '../styles/animations.style';
import { textStyle } from '../styles/text.style';

import '../elements/card.element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store';

import { IReduxState } from '../models/redux-state.model';
import { IProjectModel } from '../models/project.model';
import { repeat } from 'lit/directives/repeat.js';
import { IButtonModel } from '../models/button.model';

import '../elements/button-element';
import { PROJECTS_FETCH_RETYFIY } from '../helpers/retryify';
import { Logging } from '../services/logging.service';


@customElement('projects-page')
export class ProjectsPage extends connect(store)(LitElement) {
    static override styles = [textStyle, appearSlideUp, css`    
    .element {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 50px;
        justify-content: space-around;
        animation: appearSlideUp 1s ease


    }

    .list {
        display: flex;
        flex-direction: column;
        /* flex-wrap: wrap; */
        justify-content: center;
        gap: 25px;
        max-width: 95vw;
        /* animation: slideUp 1s ease; */

    }




    `];

    @property({ type: Array })
    projects: IProjectModel[] = [];

    @property({ type: Boolean })
    projectsError = false;


    protected override firstUpdated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        PROJECTS_FETCH_RETYFIY().start().then(() => Logging.log('fetched projects!')).catch((e) => Logging.log('projects error', e));
    }

    override stateChanged(_state: IReduxState): void {
        super.stateChanged(_state);


        if (!_state.projectsReducer.error) {
            this.projects = _state.projectsReducer.projects;
        }

    }

    renderWithProjects() {
        return html`
        <div class="element">
        
            <a class="main-text">Projects</a>
        
            <div class="list">
        
                ${repeat(this.projects, (project: IProjectModel) => html`
        
        
                <card-element .cardTitle="${project.title}" .cardSubtitle="${project.date_created}">
        
        
                    <div style="display: flex; gap: 10px;flex-direction: column;">
                        ${project.description}
        
        
        
                        <div style="display: flex; gap: 5px;">
        
                            ${repeat(project.buttons, (button: IButtonModel) => html`
        
                            <button-element>${button.name}</button-element>
        
                            `)}
                        </div>
                    </div>
        
        
                </card-element>
                `)}
        
        
        
        
            </div>
        
        
        </div>`;
    }

    override render() {

        if (this.projects.length > 0) {
            return this.renderWithProjects();
        }
        if (this.projectsError) {
            return html`<div class="element">

    <a class="main-text">Projects</a>
    <p>Can't fetch projects</p>
</div>`;
        }

        return nothing;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'projects-page': ProjectsPage;
    }
}