import { ISocialModel } from "../../models/social.model";

export interface ISocialRepository {
    getAllSocials(): Promise<ISocialModel[]>;
}