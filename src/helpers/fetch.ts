import { IApiResponseModel } from "../models/api-response.model";
import { ISocialModel } from "../models/social.model";

export async function fetchWrapper<T>(url: string): Promise<T> {
    if (!navigator.onLine) {
        return await offlineMock<T>(url) as T;
    }

    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json() as T;
}

const SOCIALS_MOCK: IApiResponseModel<ISocialModel[]> = {
    data: [{ id: "", name: "Mock 1" + new Date().getSeconds(), url: "" },]
}

async function offlineMock<T>(url: string): Promise<T> {
    console.log("Test", url)

    switch (url) {
        case "https://99sxsqgh.directus.app/items/Socials":
            return SOCIALS_MOCK as any;
        case "https://99sxsqgh.directus.app/items/LandingPage":
        default:
            throw new Error("Failed to mock " + url)
    }

}