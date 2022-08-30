import { LitElement, html, css, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';


import './button-element';
import { store } from '../redux/store';
import { IReduxState } from '../models/redux-state.model';

@customElement('header-element')
export class HeaderElement extends connect(store)(LitElement) {
    static override styles = css`
    
    .element {
        padding: 15px
    }
    `;

    @property({ type: String })
    currentLocation = '/';

    protected override firstUpdated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
    }

    override stateChanged(_state: IReduxState): void {
        super.stateChanged(_state);
        this.currentLocation = _state.locationReducer.location;
    }


    override render() {
        return html`
        
        <div class="element">
            <b>kacperserewis.net</b>
        </div>
        
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'header-element': HeaderElement;
    }
}