    const API_KEY = '27141b92df114a5392b42695bdffaae8';
    const BASE_URL = 'https://newsapi.org/v2/';
    const END_POINT = 'everything';

export default class NewsApiService{
    constructor() {
        this.query = '';
        this.page = 1;
        this.pageSize = 5;
    }

    fetchArticles() {
        // console.log(this);
        return fetch(`${BASE_URL}${END_POINT}?apiKey=${API_KEY}&q=${this.query}&pageSize=${this.pageSize}&page=${this.page}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
        return resp.json();
        }).then(({articles}) => {
            this.incrementPage();

            return articles;
        })
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get searchQuery() {
        return this.query;
    }

    set searchQuery(newQuery) {
        this.query = newQuery;
    }
}