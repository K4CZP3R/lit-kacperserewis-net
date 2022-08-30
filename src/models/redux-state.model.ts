import { ILandingPageModel } from './landing-page.model';
import { IPostModel } from './post.model';
import { IProjectModel } from './project.model';
import { ISocialModel } from './social.model';

export interface IReduxState {
    projectsReducer: { projects: IProjectModel[]; currentProject: IProjectModel, error: string | undefined };
    blogReducer: { posts: IPostModel[]; error: string | undefined };
    socialsReducer: { socials: ISocialModel[]; error: string | undefined; };

    locationReducer: { title: string; description: string; location: string; };
    landingPageReducer: { landingPage: ILandingPageModel; error: string | undefined; default: boolean };
}