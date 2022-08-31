import { IPostModel } from '../../models/post.model';

export interface IPostRepository {
    getAllPosts(): Promise<IPostModel[]>;
    getPostBy(key: string, val: string): Promise<IPostModel[]>;
}