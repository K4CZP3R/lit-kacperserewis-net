import { ILandingPageModel } from '../../models/landing-page.model';

export interface ILandingPageRepository {
    getLandingPage(): Promise<ILandingPageModel>;
}