const db = require('../data_storage/mysql_data_access');

class Tweets {
     
    static async getAllTweets() {
        try {
            let sql = "CALL get_all_tweets()";
            let [tweets, _] = await db.execute(sql);
            return tweets[0]
        } catch (error) {
            throw error;
        }
    };

    static async getTweet(tweetId) {
        try {
            let sql = `CALL get_tweet('${tweetId}')`;
            let [tweet, _] = await db.execute(sql);
            return tweet[0][0];
        } catch (error) {
            throw error;
        }
    };

    static insertTweet(tweetId, values){
        let sql = `CALL insert_tweet('${tweetId}', '${values.userId}', '${values.replyId}', '${values.content}', '${values.media}', '${values.likes}')`;
        return db.execute(sql);
    };

    static updateTweet(tweetId, parameter, value) {
        let sql = `UPDATE tweets SET ${parameter} = '${value}' WHERE tweetId = '${tweetId}'`;
        return db.execute(sql);
    };

    static deleteTweet(tweetId) {
        let sql = `CALL delete_tweet('${tweetId}')`;
        return db.execute(sql);
    };

    static async tweetReplies(tweetId) {
        try {
            let sql = `CALL tweet_replies('${tweetId}')`;
            let [replies, _] = await db.execute(sql);
            return replies[0]
        } catch (error) {
            throw error;
        }
    };

    static async tweetLikers(tweetId) {
        try {
            console.log(tweetId)
            let sql = `CALL tweet_likers('${tweetId}')`;
            let [likers, _] = await db.execute(sql);
            return likers[0]
        } catch (error) {
            throw error;
        }
    };
    

    static async existenceCheck(tweetId) {
        try {
            let tweet = await this.getTweet(tweetId);
            if(tweet.length == 0) {
                throw new Error("Tweet Does not exist");
            } 
        } catch (error) {
            throw error;
        }
        
    };
};

module.exports = Tweets;