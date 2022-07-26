import { projectsReducer } from "./reducers/projects.reducer";
import { blogReducer } from "./reducers/blog.reducer";
import { socialsReducer } from "./reducers/socials.reducer";
import { configureStore } from "@reduxjs/toolkit";
import { locationReducer } from "./reducers/location.reducer";


export const store = configureStore({
    reducer: {
        projectsReducer, blogReducer, socialsReducer, locationReducer
    }
})