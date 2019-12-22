import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';
const MAX_AVAILABLE_ITEMS = 1000;
const PAGE_SIZE = 50;
const TOTAL_PAGES = MAX_AVAILABLE_ITEMS / PAGE_SIZE;
const SEED = 'test-set'

const prepareQuery = (params = {}) =>
    Object
        .entries(params)
        .map((entry) => entry.join('='))
        .join('&');

const getUsersUrl = (page = 1, { nationality }) => {
    const queryString = prepareQuery({
        seed: SEED,
        results: PAGE_SIZE,
        page,
        nat: nationality,
    });

    return `${API_URL}?${queryString}`;
};

const parseUser = (data = {}) => {
    const {
        name: {
            first: firstName,
            last: lastName,
        } = {},
        email,
        phone,
        cell,
        login: {
            username,
        } = {},
        picture: {
            thumbnail,
        } = {},
        location : {
            street: {
                number: streetNumber,
                name: streetName,
            },
            city,
            postcode,
            state,
        } = {},
        id: {
            value: id,
        } = {},
    } = data;

    return {
        id,

        firstName,
        lastName,
        username,

        thumbnail,

        email,
        phone,
        cell,

        address: {
            street: `${streetName} ${streetNumber}`,
            city,
            postcode: `${postcode}`,
            state,
        },
    }
};

// We will cache fetched data.
// This is purely to save subsequent requests when changing nationalities back and forward.
// RandomUser API returns the same data for a given seed... so we can assume that the data is constant.
// If API data changes frequently a different caching strategy or a different cache mechanism should be used.
//
// We will store promises returned from getUsers method with parsed data.
// If requests fail we will remove promises from cache.
//
// Data will be saves in a structure shown below:
// cache = {
//     [NATIONALIDY_CODE]: [
//         PAGE_0_RESPONSE_PROMISE,
//         PAGE_1_RESPONSE_PROMISE,
//         ...
//     ],
//     ...
// }
const cache = {};

const Api = {
    getUsers: function (page, { nationality }, { prefetch = true } = {}) {
        // This should be handled by the API.
        if (page > TOTAL_PAGES) {
            return Promise.reject(new Error('Invalid request.'));
        }

        // Create a cache array for given nationality
        cache[nationality] = cache[nationality] || [];

        // Get cached response promise for selected nationality and selected page
        let responsePromise = cache[nationality][page];

        // If data not found in cache fetch it from API.
        if (!responsePromise) {
            responsePromise = axios.get(getUsersUrl(page, { nationality }))
                .then(({ data: { results = [] } = {} }) => {
                    return {
                        users: results.map(parseUser),
                        page,
                        totalPages: TOTAL_PAGES,
                    };
                })
                .catch(error => {
                    // Remove cached promise on error.
                    cache[nationality][page] = null;

                    throw error;
                })

            cache[nationality][page] = responsePromise;
        }

        // Here we can try to prefetch next page if next page is still in available range.
        if (prefetch && page < TOTAL_PAGES) {
            // Don't fetch more pages, just the next one (prefetch = false)
            this.getUsers(page + 1, { nationality }, { prefetch: false });
        }

        return responsePromise;
    },
};

export default Api;