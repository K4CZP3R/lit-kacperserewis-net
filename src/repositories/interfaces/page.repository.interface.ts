import { IPageModel } from '../../models/page.model';

export interface IPageRepository {
    getPage(pageId: string): Promise<IPageModel>;
}