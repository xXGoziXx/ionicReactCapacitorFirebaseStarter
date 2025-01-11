import algoliasearch from 'algoliasearch/lite';
import aa from 'search-insights';

const client = algoliasearch(
    import.meta.env.VITE_ALGOLIA_APPID,
    import.meta.env.VITE_ALGOLIA_SEARCH_APIKEY
);

aa('init', {
    appId: import.meta.env.VITE_ALGOLIA_APPID,
    apiKey: import.meta.env.VITE_ALGOLIA_SEARCH_APIKEY
});

export interface QuerySuggestion {
    objectID: string;
    query: string;
    count: number;
}
export const locations = client.initIndex('locations');
export const locationsQuerySuggestions = client.initIndex(
    'locations_query_suggestions'
);

const Algolia = {
    locations,
    locationsQuerySuggestions
};
export default Algolia;
