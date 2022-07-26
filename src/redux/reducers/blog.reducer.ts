export const ADD_POST = "ADD_POST";

export const addPost = (post: any) => {
    return {
        type: ADD_POST,
        post: post
    }
}

const INITIAL_STATE: { posts: any[] } = {
    posts: []
}


export const blogReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        default:
            return state;
    }
}