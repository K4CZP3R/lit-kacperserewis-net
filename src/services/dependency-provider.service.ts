// import { LoggingService } from "./logging.service";

import { Logging } from './logging.service';

export class DependencyProviderService {
    private static instance: DependencyProviderService;


    private dependencyStorage: { [name: string]: unknown } = {};

    private static getInstance(): DependencyProviderService {
        if (!DependencyProviderService.instance) DependencyProviderService.instance = new DependencyProviderService();
        return DependencyProviderService.instance;
    }

    public static setImpl<T>(name: string, implementation: T): void {
        Logging.log(`Setting implementation for ${name}`);
        this.getInstance().dependencyStorage[name] = implementation;
    }
    public static getImpl<T>(name: string): T {
        Logging.log(`Getting implementation for ${name}`);
        return this.getInstance().dependencyStorage[name] as T;
    }
}
export function Inject<T>(name: string): (target: unknown, key: string | symbol) => void {
    return function (target: unknown, key: string | symbol) {
        const getter = () => {
            Logging.log('Getting dependency ', name, key);
            return DependencyProviderService.getImpl<T>(name);
        };
        const setter = () => {
            throw new Error('Can\'t assign to inject decorated property!');
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}
