import { getCallerName } from "../helpers/stack.helper";
export class Logging {
    static log(...args: any[]): void {
        const scope = getCallerName(3);
        console.log(`%c[${scope}]:%c %s`, "background: #222; color: #bada55;", "", ...args)
    }

}