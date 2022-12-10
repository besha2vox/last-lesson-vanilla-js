export class Fetch {
    static #BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
    static #API_KEY = '9cTjAjlRB53wyhAFk5VzXcBu5GiPU6fK';

    constructor() {
        this._queryToFetch = '';
        this._pageToFetch = 0;
    }

    async fetchEvents(keyword) {
        const params = new URLSearchParams({
            page: this._pageToFetch,
            keyword: this._queryToFetch,
            size: 10,
            apikey: Fetch.#API_KEY,
        });

        return await fetch(`${Fetch.#BASE_URL}?${params.toString()}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    resetPage() {
        this._pageToFetch = 0;
    }

    get queryToFetch() {
        return this._queryToFetch;
    }

    set queryToFetch(keyword) {
        this._queryToFetch = keyword;
    }

    get pageToFetch() {
        return this._pageToFetch;
    }

    set pageToFetch(num = 1) {
        this._pageToFetch += num;
    }
}
