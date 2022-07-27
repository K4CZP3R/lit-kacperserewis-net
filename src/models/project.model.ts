import { IButtonModel } from "./button.model";

export interface IProjectModel {
    id: string;
    status: string;
    date_created: string;
    date_updated: string;
    title: string;
    description: string;
    buttons: IButtonModel[];
}