export const ADD_PROJECT = "ADD_PROJECT";

export const addProject = (project: any) => {
    return {
        type: ADD_PROJECT,
        project: project
    }
}

const INITIAL_STATE: { projects: any[] } = {
    projects: []
}


export const projectsReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.project]
            }
        default:
            return state;
    }
}