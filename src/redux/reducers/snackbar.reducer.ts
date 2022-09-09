import { AnyAction, Dispatch } from 'redux';
import { createSnackbarFragment } from '../../helpers/snackbar-fragment.helper';
import { Logging } from '../../services/logging.service';
import { RootState } from '../store';

export type  showSnackbarFunction = (settings: {container: HTMLElement, template: DocumentFragment}) => void


export interface ISnackbarMessage {
    id: number;
    content: string;
    shown: boolean;
}

interface ActionAddToQueue extends AnyAction {
    type: 'ADD_TO_QUEUE',
    message: ISnackbarMessage
}


interface ActionDisplaySnackbar extends AnyAction {
    type: 'DISPLAY_SNACKBAR',
    id: number
}

interface ActionInitializeElement extends AnyAction {
    type: 'INITIALIZE_ELEMENT',
    showSnackbar: showSnackbarFunction,
    container: HTMLElement
}

type Action = ActionDisplaySnackbar | ActionInitializeElement | ActionAddToQueue



export const initializeElement = (element: HTMLElement, showSnackbar: showSnackbarFunction) => {
    Logging.log('Initializing snackbar!');
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: 'INITIALIZE_ELEMENT',
            showSnackbar: showSnackbar,
            container: element
        });
    };
};

export const addToQueue = (content: string) => {
    Logging.log('Adding to queue', content);
    return function (dispatch: Dispatch<Action>, getState: () => RootState) {
        const lastId = getState().snackbarReducer.queue.length > 0 ? getState().snackbarReducer.queue[getState().snackbarReducer.queue.length - 1].id : 0;
        dispatch({
            type: 'ADD_TO_QUEUE',
            message: {
                content: content,
                shown: false,
                id: lastId + 1
            }
        });
    };
};

export const displayFromQueue = () => {
    return function (dispatch: Dispatch<Action>, getState: () => RootState) {
        const {snackbarReducer} = getState();

        if(!snackbarReducer.imported || !snackbarReducer.showSnackbar || !snackbarReducer.element) {
            Logging.log('Not yet imported!');
            return;
        }

        for(const message of snackbarReducer.queue.filter(q => !q.shown)) {
            Logging.log('Showing', message);
            snackbarReducer.showSnackbar({
                container: snackbarReducer.element,
                template: createSnackbarFragment(message.content)
            });

            dispatch({
                type: 'DISPLAY_SNACKBAR',
                id: message.id
            });
        }
    };

    
};
function matchShowSnackbar(action: AnyAction): action is ActionDisplaySnackbar {
    return action.type === 'DISPLAY_SNACKBAR';
}
function matchInitializeElement(action: AnyAction): action is ActionInitializeElement {
    return action.type === 'INITIALIZE_ELEMENT';
}
function matchAddToQueue(action: AnyAction): action is ActionAddToQueue{
    return action.type === 'ADD_TO_QUEUE';
}
 
const INITIAL_STATE: {imported: boolean, element?: HTMLElement, queue: ISnackbarMessage[], showSnackbar?: showSnackbarFunction} = {
    imported: false,
    element: undefined,
    showSnackbar: undefined,
    queue: []
};

export const snackbarReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(matchInitializeElement(action)) {
        return {...state, element:action.container, showSnackbar: action.showSnackbar, imported: true};
    }
    if(matchShowSnackbar(action)) {
        return {...state, queue: state.queue.map(q => q.id === action.id ? {...q, shown: true} : q)};
    }
    if(matchAddToQueue(action)) {
        return {...state, queue: [...state.queue, action.message]};
    }


    return state;
};