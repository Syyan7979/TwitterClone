export interface User {
    "user_id" : string;
    "user_name" : string;
    "twitter_handle" : string;
    "user_email" : string;
    "user_password" : string;
    "profile_image" : string;
    "header_image" : string;
    "time_stamp" : number;
}

export interface RegisterUser {
    "user_name" : string | null;
    "twitter_handle" : string | null;
    "user_email" : string | null;
    "user_password" : string | null;
    "profile_image" : string | null;
    "header_image" : string | null;
}

export interface LoginUser {
    "user_name" : string | null;
    "user_email" : string | null;
    "user_password" :  string | null;
}