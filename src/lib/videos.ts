import { PostTypeEnum } from '../models/Post';

const rapidApiKey: string = import.meta.env.VITE_TIKTOK_APIKEY;
// const language = navigator.language;

interface SearchData {
    data: {
        results: SearchResult[];
    }[];
}

export interface SearchResult {
    domain: string;
    url: string;
    title: string;
    snippet: string;
    position: number;
}

interface MusicInfo {
    id: string;
    title: string;
    play: string;
    cover: string;
    author: string;
    original: boolean;
    duration: number;
    album: string;
}

interface CommerceInfo {
    adv_promotable: boolean;
    auction_ad_invited: boolean;
    branded_content_type: number;
    with_comment_filter_words: boolean;
}

interface Author {
    id: string;
    unique_id: string;
    nickname: string;
    avatar: string;
}

export interface VideoData {
    aweme_id?: string;
    id?: string;
    region?: string;
    title?: string;
    cover?: string;
    origin_cover?: string;
    duration?: number;
    play: string;
    wmplay?: string;
    size?: number;
    wm_size?: number;
    music?: string;
    music_info?: MusicInfo;
    play_count?: number;
    digg_count?: number;
    comment_count?: number;
    share_count?: number;
    download_count?: number;
    collect_count?: number;
    create_time?: number;
    anchors?: null;
    anchors_extras?: string;
    is_ad?: boolean;
    commerce_info?: CommerceInfo;
    commercial_video_info?: string;
    author?: Author;
}

// interface VideoInfo {
//     code: number;
//     msg: string;
//     processed_time: number;
//     data: VideoData | null;
// }

export const searchTiktokForVideos = async (
    placeNames: (string | undefined)[],
    type: PostTypeEnum
): Promise<SearchResult[]> => {
    if (placeNames.length === 0) return [];

    if (type === 'restaurant') {
        placeNames = placeNames.map(placeName => `"${placeName}" food`);
    } else if (type === 'activity') {
        placeNames = placeNames.map(placeName => `"${placeName}" activity`);
    } else if (type === 'event') {
        placeNames = placeNames.map(placeName => `"${placeName}" event`);
    }

    const queries = placeNames.map(
        placeName => `${placeName} site:www.tiktok.com video`
    );
    // console.log("Queries:", queries);
    const body = JSON.stringify({
        queries
    });
    let url = 'https://real-time-web-search.p.rapidapi.com/search';
    let options: RequestInit = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'real-time-web-search.p.rapidapi.com'
        },
        body
    };

    try {
        let searches: SearchResult[][] = [];
        let response = await fetch(url, options);
        if (response.status === 503) {
            console.log('Bulk Search Service Unavailable');
            // if the bulk search service is unavailable, search for each query individually
            url = 'https://real-time-web-search.p.rapidapi.com/search?q=';
            options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key':
                        '44d71f5504mshdbc5f8c245922d9p168213jsne1d8c59fdd1b',
                    'X-RapidAPI-Host': 'real-time-web-search.p.rapidapi.com'
                }
            };

            searches = await Promise.all(
                queries.map(async query => {
                    const encodedURL = url + encodeURIComponent(query);
                    // console.log("EncodedURL:", encodedURL);
                    response = await fetch(encodedURL, options);
                    const { data: results }: { data: SearchResult[] } =
                        await response.json();

                    if (!results) return [];
                    return results;
                })
            );
        } else {
            const { data }: SearchData = await response.json();

            if (!data) return [];
            searches = data?.map(search => search.results); // Get the results from each query
        }
        // console.log(searches);
        const results = searches.map(results => {
            return results.filter(async (result: SearchResult) => {
                const videoURL = result.url;

                // check that this videoURL has a username and a video id
                // e.g. https://www.tiktok.com/@username/video/videoID
                const username = videoURL.split('/')[3];
                const videoID = videoURL.split('/')[5];

                if (
                    username[0] === '@' &&
                    username?.length &&
                    !videoID?.length
                ) {
                    console.log('No videoID:', videoURL);
                    url =
                        'https://real-time-web-search.p.rapidapi.com/search?q=';
                    options = {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key':
                                '44d71f5504mshdbc5f8c245922d9p168213jsne1d8c59fdd1b',
                            'X-RapidAPI-Host':
                                'real-time-web-search.p.rapidapi.com'
                        }
                    };

                    const encodedURL =
                        url +
                        encodeURIComponent(
                            `video ${username} site:www.tiktok.com`
                        );
                    console.log('EncodedURL:', encodedURL);
                    response = await fetch(encodedURL, options);
                    const { data: results }: { data: SearchResult[] } =
                        await response.json();

                    if (!results) return [];
                    return results.filter(result => {
                        const videoURL = result.url;
                        const username = videoURL.split('/')[3];
                        const videoID = videoURL.split('/')[5];
                        return (
                            username[0] === '@' &&
                            username?.length &&
                            videoID?.length
                        );
                    })[0];
                }
                return (
                    username[0] === '@' && username?.length && videoID?.length
                );
            })[0];
        });

        console.log('Video Search results:', results);
        return results;
    } catch (error) {
        console.log(error);

        return [];
    }
};

export async function getTiktokVideoInfo(
    videoURL: string
): Promise<VideoData | null> {
    const encodedURL = encodeURIComponent(videoURL);
    const url = `https://tiktok-api15.p.rapidapi.com/index/Tiktok/getVideoInfo?url=${encodedURL}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'tiktok-api15.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log('getTikTokVideoInfo', error);
        return null;
    }
}

export const getPlaceVideoData = async (
    places: (string | undefined)[],
    type: PostTypeEnum
): Promise<({ data: VideoData | null; link: string } | null)[]> => {
    // use real time web search api to search tiktok for videos basesd of place names
    const videoSearches: (SearchResult | null)[] | null =
        await searchTiktokForVideos(places, type);
    console.log('Get Place Video Data Video Search Results:', videoSearches);
    if (!videoSearches) return [];
    // get tiktok video info using tiktok api then wait for all the fetches to finish
    const tiktokVideoInfos = [];

    for (const i in videoSearches) {
        const videoSearch = videoSearches[i];
        if (!videoSearch) {
            tiktokVideoInfos.push(null);
        } else {
            const tiktokVideoInfo = await getTiktokVideoInfo(videoSearch.url);
            console.log('Tiktok Video Info:', tiktokVideoInfo);
            if (!tiktokVideoInfo) tiktokVideoInfos.push(null);
            tiktokVideoInfos.push({
                data: tiktokVideoInfo,
                link: videoSearch.url
            });
        }
    }

    // console.log("tiktokVideoInfos", tiktokVideoInfos);
    // console.log("tiktokVideos", videoSearches);
    return tiktokVideoInfos;
};
