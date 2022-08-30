import { POST_REPOSITORY } from '../../helpers/di-names.helper';
import { IPostRepository } from '../../repositories/interfaces/post.repository.interface';
import { DependencyProviderService } from '../../services/dependency-provider.service';
import { Logging } from '../../services/logging.service';
import { IPostModel } from '../../models/post.model';
import { AnyAction, Dispatch } from 'redux';


interface ActionFetchPosts  extends AnyAction {
    type: 'FETCH_POSTS';
    payload: IPostModel[];
}
interface ActionFetchPostsError extends AnyAction  {
    type: 'FETCH_POSTS_ERROR'
    error: string;
}


function matchFetchPosts(action: AnyAction): action is ActionFetchPosts {
    return action.type === 'FETCH_POSTS';
}

function matchFetchPostsError(action: AnyAction): action is ActionFetchPostsError {
    return action.type === 'FETCH_POSTS_ERROR';
}

type Action = ActionFetchPosts | ActionFetchPostsError;


export const fetchPosts = () => {
    Logging.log('Fetching posts');
    return async function (dispatch: Dispatch<Action>) {
        try {
            const data = await DependencyProviderService.getImpl<IPostRepository>(POST_REPOSITORY).getAllPosts();

            dispatch({
                type: 'FETCH_POSTS',
                payload: data
            });
        } catch (e: unknown) {
            dispatch({ type: 'FETCH_POSTS_ERROR', error: e as string });
        }
    };
};
const INITIAL_STATE: { posts: IPostModel[], error: string | undefined } = {
    posts: [],
    error: undefined
};


export const blogReducer = (state = INITIAL_STATE, action: AnyAction ) => {
    if(matchFetchPosts(action)) {
        return {...state, posts: action.payload, error: undefined};
    }
    if(matchFetchPostsError(action)) {
        return {...state, posts: [], error: action.error};
    }
    return state;

};