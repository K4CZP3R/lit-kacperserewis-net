import { projectsReducer } from "./reducers/projects.reducer";
import { blogReducer } from "./reducers/blog.reducer";
import { socialsReducer } from "./reducers/socials.reducer";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        projectsReducer, blogReducer, socialsReducer
    }
})