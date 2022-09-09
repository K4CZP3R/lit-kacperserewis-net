import { Action } from 'redux';


export interface IReduxAction<T> extends Action<string> {
    type: string;
    payload?: T;
    error?: string;   
}

export default IReduxAction;