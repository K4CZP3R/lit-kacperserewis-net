export async function fetchWrapper<T>(url: string): Promise<T> {

    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(await response.text())
    }

    return await response.json() as T;

}