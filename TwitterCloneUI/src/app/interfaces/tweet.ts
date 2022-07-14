export interface Tweet {
    "tweet_id" : string;
    "user_id": string;
    "reply_id" : string;
    "content" : string;
    "media" : string | null;
    "likes" : number;
    "user_name" : string;
    "twitter_handle" : string;
    "profile_image" : string;
    "retweet_id" : string;
    "retweet_user_id" : string;
    "retweet_twitter_handle" : string;
    "quote_tweet_id" : string;
    "retweet_quoute_count" : number;
    "time_stamp" : number;
}

export interface NewTweet {
    "user_id" : string | undefined;
    "reply_id" : string | null;
    "content" : string;
    "media" : string | null;
    "likes" : number;
    "user_name" : string | undefined;
    "twitter_handle" : string | undefined;
    "profile_image" : string | undefined;
    "retweet_id" : string | null;
    "retweet_user_id" : string | null;
    "retweet_twitter_handle" : string | null;
    "quote_tweet_id" : string | null;
    "retweet_quoute_count" : number;
}

export interface Dimensions {
    width : string;
    height : string;
}