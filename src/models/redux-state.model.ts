import { ISnackbarMessage, showSnackbarFunction } from '../redux/reducers/snackbar.reducer';
import { IPageModel } from './page.model';
import { IPostModel } from './post.model';
import { IProjectModel } from './project.model';
import { ISocialModel } from './social.model';

export interface IReduxState {
    projectsReducer: { projects: IProjectModel[]; currentProject: IProjectModel, error: string | undefined };
    blogReducer: { posts: IPostModel[]; error: string | undefined };
    socialsReducer: { socials: ISocialModel[]; error: string | undefined; };

    locationReducer: { title: string; description: string; location: string; };
    pageReducer: { pages: IPageModel[]; error: string | undefined; };
    snackbarReducer: {imported: boolean; element: HTMLElement; queue: ISnackbarMessage[], showSnackbar: showSnackbarFunction}
}