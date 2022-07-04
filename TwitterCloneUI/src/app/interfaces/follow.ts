export interface Follow {
    "followId" : string;
    "followerId" : string;
    "followeeId" : string;
    "timestamp" : number
}

export interface FollowCheck {
    "followerId" : string | undefined;
    "followeeId" : string | undefined;
}