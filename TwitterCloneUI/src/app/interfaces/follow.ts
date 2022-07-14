export interface Follow {
    "follower_id" : string;
    "followee_id" : string;
    "time_stamp" : number
}

export interface FollowCheck {
    "follower_id" : string | undefined;
    "followee_id" : string | undefined;
}