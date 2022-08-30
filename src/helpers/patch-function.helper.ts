export function patchLogWith(modifier: (...args: unknown[]) => unknown[]) {
    const LOG_PREFIX = new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear() + ' / ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    const log = console.log;

    console.log = function (...args) {

        // 1. Convert args to a normal array
        // let args = Array.from(arguments);

        // OR you can use: Array.prototype.slice.call( arguments );

        // 2. Prepend log prefix log string
        args.unshift(LOG_PREFIX + ': ');

        args = modifier(...args);

        // 3. Pass along arguments to console.log
        log.apply(console, args);
    };

}