export function getCallerName(depth = 2): string {
    const fullErrorStack = (new Error()).stack;

    if(!fullErrorStack) {
        return '';
    }

    const stackLines = fullErrorStack.split('\n');
    
    if(stackLines.length < depth + 1) {
        return '';
    }

    const callerLine = stackLines[depth].trim();

    const caller = callerLine.match(/at\s+(.*)\s+\(/);
    if(!caller || !caller[1]) {
        return getCallerName(depth + 1);
    }
    return caller[1];

}