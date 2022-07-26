import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import { store } from "./redux/store"



@customElement('blog-element')
export class BlogElement extends connect(store)(LitElement) {
    static override styles = css``;


    override stateChanged(_state: any): void {
        super.stateChanged(_state);

        console.log(_state);
    }


    @property({ type: String })
    testProperty = '';
    override render() {
        return html`
                <div class="element layout">
                    <div>
                        <h1>Hi!</h1>
                        <p>My name is Kacper</p>
                        <button @click="${this.onClick}">Click me!</button>
                    </div>
                
                </div>
        
        `;
    }

    onClick() {
        // store.dispatch(addTodo("This is a task!"))
    }

}
declare global {
    interface HTMLElementTagNameMap {
        'blog-element': BlogElement;
    }
}