export interface Tweet {
    "tweetId" : string;
    "tweetID": string;
    "userID" : string;
    "userId" : string;
    "replyId" : string;
    "replyID" : string;
    "content" : string;
    "media" : string;
    "likes" : number
    "timestamp" : number
    "timeStamp" : number
}

export interface NewTweet {
    "userId" : string | undefined;
    "replyId" : string | null;
    "content" : string;
    "media" : string | null;
    "likes" : number
}