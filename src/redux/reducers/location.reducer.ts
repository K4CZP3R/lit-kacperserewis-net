import { AnyAction, Dispatch } from 'redux';
import { Logging } from '../../services/logging.service';

interface ActionUpdateLocation extends AnyAction {
    type: 'UPDATE_LOCATION';
    newLocation: string;
}

interface ActionSetMeta extends AnyAction {
    type: 'SET_META';
    title: string;
    description: string;
}

function matchUpdateLocation(action: AnyAction): action is ActionUpdateLocation {
    return action.type === 'UPDATE_LOCATION';
}

function matchSetMeta(action: AnyAction): action is ActionSetMeta {
    return action.type === 'SET_META';
}

type Action = ActionUpdateLocation | ActionSetMeta;

export const setMeta = (title: string, description: string) => {
    Logging.log('Setting meta', title, description);

    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: 'SET_META',
            title,
            description
        });
    };
};

export const changeLocation = (newLocation: string) => {
    Logging.log('Changing location', newLocation);

    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: 'UPDATE_LOCATION',
            newLocation
        });
    };
};

const INITIAL_STATE: { location: string; title: string; description: string } = {
    location: '/',
    title: 'kacperserewis.net',
    description: 'My personal website'
};

export const locationReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(matchUpdateLocation(action)) {
        return {...state, location: action.newLocation};
    }
    if(matchSetMeta(action)) {
        return {...state, title: action.title, description: action.description};
    }
    return state;
};