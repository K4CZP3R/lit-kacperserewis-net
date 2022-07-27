import { ILandingPageModel } from "./landing-page.model";
import { IProjectModel } from "./project.model";

export interface IReduxState {
    projectsReducer: { projects: IProjectModel[]; error: string | undefined };
    blogReducer: { posts: any[]; };
    socialsReducer: { socials: any; error: string | undefined; };

    locationReducer: { title: string; description: any; location: string; };
    landingPageReducer: { landingPage: ILandingPageModel; error: string | undefined; default: boolean };
}