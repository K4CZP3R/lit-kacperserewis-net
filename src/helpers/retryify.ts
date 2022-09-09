import { fetchPosts } from '../redux/reducers/blog.reducer';
import { fetchPage } from '../redux/reducers/page.reducer';
import { fetchProjects } from '../redux/reducers/projects.reducer';
import { fetchSocials } from '../redux/reducers/socials.reducer';
import { store } from '../redux/store';
import { delay } from './sleep';

class Retryify {

    private currentTry = 0;
    constructor(private action: () => Promise<unknown>, private verifyAction: () => Promise<boolean>, private maxTries: number, private tryEveryMs: number) { }

    async start() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {

            while (this.currentTry < this.maxTries) {

                const result = await this.retry();
                if (result) return resolve(1);
                else await delay(this.tryEveryMs);

                this.currentTry += 1;

            }

            return reject('Maximum tries reached!');

        });



    }

    private async retry(): Promise<boolean> {
        await this.action();
        return await this.verifyAction();

    }
}


export function SOCIALS_FETCH_RETRYIFY(tries = 5, pauseBetween = 1000) {
    return new Retryify(async () => {
        await store.dispatch(fetchSocials());
    }, async () => {
        return !store.getState().socialsReducer.error;
    }, tries, pauseBetween);
}

export function PAGE_FETCH_LANDING_RETRYIFY(tries = 5, pauseBetween = 1000) {
    return new Retryify(async () => {
        await store.dispatch(fetchPage('landing-page'));
    }, async () => {
        return !store.getState().pageReducer.error;
    }, tries, pauseBetween);
}

export function PROJECTS_FETCH_RETYFIY(tries = 5, pauseBetween = 1000) {
    return new Retryify(async () => {
        await store.dispatch(fetchProjects());
    }, async () => {
        return !store.getState().projectsReducer.error;
    }, tries, pauseBetween);
}

export function POSTS_FETCH_RETRYFIY(tries = 5, pauseBetween = 1000) {
    return new Retryify(async () => {
        await store.dispatch(fetchPosts());
    }, async () => {
        return !store.getState().blogReducer.error;
    }, tries, pauseBetween);
}