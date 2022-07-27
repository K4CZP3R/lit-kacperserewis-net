import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slideUp } from './styles/animations.style';
import { textStyle } from './styles/text.style';

import "./card.element"
import { connect } from 'pwa-helpers';
import { store } from './redux/store';

import { IReduxState } from './models/redux-state.model';
import { fetchProjects } from './redux/reducers/projects.reducer';
import { IProjectModel } from './models/project.model';
import { repeat } from 'lit/directives/repeat.js';
import { IButtonModel } from './models/button.model';


@customElement('projects-element')
export class ProjectsElement extends connect(store)(LitElement) {
    static override styles = [textStyle, slideUp, css`    
    .element {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 50px;
        justify-content: space-around;


    }

    .list {
        display: flex;
        flex-direction: column;
        /* flex-wrap: wrap; */
        justify-content: center;
        gap: 25px;
        max-width: 95vw;
        animation: slideUp 1s ease;

    }


    `];

    @property({ type: Array })
    projects: IProjectModel[] = [];

    protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties)
        store.dispatch(fetchProjects());
    }

    override stateChanged(_state: IReduxState): void {
        super.stateChanged(_state)


        if (_state.projectsReducer.error) {
            setTimeout(() => {
                store.dispatch(fetchProjects());
            }, 1000)
        } else {
            this.projects = _state.projectsReducer.projects;
        }
    }

    override render() {
        return html`<div class="element">
    <a class="main-text">Projects</a>
    <div class="list">

        ${repeat(this.projects, (project: IProjectModel) => html`


        <card-element .cardTitle="${project.title}" .cardSubtitle="${project.date_created}">


            <div style="display: flex; gap: 10px;flex-direction: column;">
                ${project.description}



                <div>

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
}
declare global {
    interface HTMLElementTagNameMap {
        'projects-element': ProjectsElement;
    }
}