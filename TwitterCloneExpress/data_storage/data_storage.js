var express = require('express');
const shortid = require('shortid')

let users = {}
let tweets = {}
let follows = {}

/*
LEGEND
    type 0 => users
    type 1 => tweets
    type 2 => follows
*/

const storage_contorller = {

    getObjects : function(type) {
        if (type == 0) {
            return users;
        } else if (type == 1) {
            return tweets;
        } else if (type == 2) {
            return follows;
        }
    },

    getObject : function(id, type) {
        if (type == 0) {
            return users[id];
        } else if (type == 1) {
            return tweets[id];
        } else if (type == 2) {
            return follows[id];
        }
    },

    addObjects : function(id, values, type) {
        if (type == 0) {
            users[id] = values;
        } else if (type == 1) {
            tweets[id] = values;
        } else if (type == 2) {
            follows[id] = values;
        }
    },
    
    deleteObjects : function(id, type) {
        if (type == 0) {
            delete users[id];

            // remove all tweets created by the particular user.
            tweetsKeys = Object.keys(tweets)
            newTweets = {}

            console.log(tweets)
            tweetsKeys.forEach((key) => {
                if (tweets[key].userId != id) {
                    newTweets[key] = tweets[key];
                }
            });
            tweets = newTweets;
            console.log(tweets)

            // remove established following between particular user and other users.
            followsKeys = Object.keys(follows)
            newFollows = {}

            console.log(follows)
            followsKeys.forEach((key) => {
                if (follows[key].followerId != id && follows[key].followeeId != id) {
                    newFollows[key] = follows[key];
                }
            });
            follows = newFollows;
            console.log(follows)

        } else if (type == 1) {
            delete tweets[id];
        } else if (type == 2) {
            delete follows[id];
        }
    }, 

    checkDuplicates : function(checkValue) {
        const uniqueIds = Object.keys(users);
        for (var i = 0; i < uniqueIds.length; i++) {
            if (users[uniqueIds[i]].userName == checkValue) {
                return true;
            }
        } 
        return false;
    },

    checkFollowDuplicates : function(id1, id2) {
        const uniqueIds = Object.keys(follows);
        for (var i = 0; i < uniqueIds.length; i++) {
            if (follows[uniqueIds[i]].followerId == id1 && follows[uniqueIds[i]].followeeId == id2) {
                return true;
            }
        } return false;
    },

    checkExistence : function(id, type) {
        if (type == 0) {
            return (users[id] ? true : false)
        } else if (type == 1) {
            return (tweets[id] ? true : false)
        } else if (type == 2) {
            return (follows[id] ? true : false)
        }
    },

    updateObject : function(id, value, type) {
        const keys = Object.keys(value);
        if (type == 0) {
            keys.forEach((key) => {
                users[id][key] = value[key]
            })
        } else if (type == 1) {
            keys.forEach((key) => {
                tweets[id][key] = value[key]
            })
        }
    }, 

    userTweets : function(id) {
        var tweetsClone = {}
        var keys = Object.keys(tweets)

        keys.forEach((key) => {
            if (tweets[key].userId == id) {
                tweetsClone[key] = tweets[key];
            }
        });

        tweetsClone = Object.fromEntries(Object.entries(tweetsClone).sort((a, b) => b[1].timeStamp-a[1].timeStamp));

        return tweetsClone;
    },

    userFollowings : function(id) {
        var followsClone = {}
        var keys = Object.keys(follows)

        // filters the follows storage such that it only shows those that have followerId field equalt to the user
        keys.forEach((key) => {
            if (follows[key].followerId == id) {
                followsClone[key] = follows[key];
            }
        })
        return followsClone;
    }, 

    userFeed : function(id) {
        var tweetsClone = {};
        var allFollowed = []

        followsKeys = Object.keys(follows);
        followsKeys.forEach((key) => {
            if (follows[key].followerId == id) {
                allFollowed.push(follows[key].followeeId)
            }
        });

        console.log(allFollowed)
        tweetsKeys = Object.keys(tweets);
        tweetsKeys.forEach((key) => {
            if (allFollowed.includes(tweets[key].userId)) {
                tweetsClone[key] = tweets[key];
            }
        });

        tweetsClone = Object.fromEntries(Object.entries(tweetsClone).sort((a, b) => b[1].timeStamp - a[1].timeStamp));
        return tweetsClone;
    }

}

module.exports = storage_contorller;