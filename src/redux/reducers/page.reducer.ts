import { AnyAction, Dispatch } from 'redux';
import { IPageModel } from '../../models/page.model';
import { DependencyProviderService } from '../../services/dependency-provider.service';
import {IPageRepository} from '../../repositories/interfaces/page.repository.interface';
import { PAGE_REPOSITORY } from '../../helpers/di-names.helper';

interface ActionFetchPage extends AnyAction { 
    type: 'FETCH_PAGE';
    payload: IPageModel
}
interface ActionFetchPageError extends AnyAction {
    type: 'FETCH_PAGE_ERROR';
    error: string;
}

function matchFetchPage(action: AnyAction): action is ActionFetchPage {
    return action.type === 'FETCH_PAGE';
}

function matchFetchPageError(action: AnyAction): action is ActionFetchPageError {
    return action.type === 'FETCH_PAGE_ERROR';
}

type Action = ActionFetchPage | ActionFetchPageError;

export const fetchPage = (pageId: string) => {
    return async function (dispatch: Dispatch<Action>) {
        try {
            const data = await DependencyProviderService.getImpl<IPageRepository>(PAGE_REPOSITORY).getPage(pageId);
            dispatch({
                type: 'FETCH_PAGE',
                payload: data
            });
        }
        catch (e: unknown) {
            dispatch({ type: 'FETCH_PAGE_ERROR', error: e as string });
        }
    };
};


const INITIAL_STATE: { pages: IPageModel[]; error: string | undefined;  } = {
    pages: [],
    error: undefined
};

export const pageReducer = (state= INITIAL_STATE, action: AnyAction) => {
    if(matchFetchPage(action)){
        return {...state, pages: [...state.pages, action.payload], error: undefined};

    }
    if(matchFetchPageError(action)){
        return {...state,  error: action.error};
    }
    return state;
};