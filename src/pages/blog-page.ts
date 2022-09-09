import { html, css, LitElement, PropertyValueMap, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { connect } from 'pwa-helpers';
import { IPostModel } from '../models/post.model';
import { store } from '../redux/store';
import { POSTS_FETCH_RETRYFIY } from '../helpers/retryify';
import { Logging } from '../services/logging.service';
import { repeat } from 'lit/directives/repeat.js';

import '../elements/card.element';
import { IReduxState } from '../models/redux-state.model';


@customElement('blog-page')
export class BlogPage extends connect(store)(LitElement) {
    static override styles = css``;

    @property({ type: Array })
    posts: IPostModel[] = [];

    @property({ type: Boolean })
    postsError = false;

    protected override firstUpdated(_changedProperties: PropertyValueMap<{[key:string]: unknown}> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        POSTS_FETCH_RETRYFIY().start().then(() => Logging.log('fetched posts!')).catch((e) => Logging.log('posts error', e));
    }

    override stateChanged(_state: IReduxState): void {
        super.stateChanged(_state);

        // if (!_state.postsReducer.error) {
        //     this.posts = _state.postsReducer.posts;
        // }
    }


    renderWithPosts() {
        return html`
        <div class="element">
        
            <a class="main-text">Posts</a>
        
            <div class="list">
        
                ${repeat(this.posts, (post: IPostModel) => html`
        
        
                <card-element .cardTitle="${post.title}" .cardSubtitle="${'Subtitle'}">
        
        
                    <div style="display: flex; gap: 10px;flex-direction: column;">
                        ${post.content}
        
        
    
                    </div>
        
        
                </card-element>
                `)}
        
        
        
        
            </div>
        
        
        </div>`;
    }


    @property({ type: String })
    testProperty = '';
    override render() {
        if (this.posts.length > 0) {
            return this.renderWithPosts();
        }
        return nothing;
    }

    onClick() {
        // store.dispatch(addTodo("This is a task!"))
    }

}
declare global {
    interface HTMLElementTagNameMap {
        'blog-page': BlogPage;
    }
}

