import { projectsReducer } from './reducers/projects.reducer';
import { blogReducer } from './reducers/blog.reducer';
import { socialsReducer } from './reducers/socials.reducer';
import { configureStore } from '@reduxjs/toolkit';
import { locationReducer } from './reducers/location.reducer';
import { snackbarReducer } from './reducers/snackbar.reducer';
import { pageReducer } from './reducers/page.reducer';


export const store = configureStore({
    reducer: {
        pageReducer,
        snackbarReducer, projectsReducer, blogReducer, socialsReducer, locationReducer
    }
});  

export type RootState = ReturnType<typeof store.getState>