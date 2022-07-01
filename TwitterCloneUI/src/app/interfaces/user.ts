export interface User {
    "userId" : string;
    "userName" : string;
    "twitterHandle" : string;
    "email" : string;
    "password" : string;
    "profileImage" : string;
    "headerImage" : string;
}

export interface RegisterUser {
    "userName" : string | null;
    "twitterHandle" : string | null;
    "email" : string | null;
    "password" : string | null;
    "profileImage" : string | null;
    "headerImage" : string | null;
}

export interface LoginUser {
    "identifier" : string | null;
    "password" :  string | null;
}