export function getCallerName(depth = 2): string {
    let errorStack = (new Error()).stack?.split("\n")[depth].trim();
    let foundCaller = errorStack?.match(/at\s+(.*)\s+\(/);
    if (foundCaller) {
        return foundCaller[1];
    }

    return getCallerName(depth + 1);
}