class Tweets {
    constructor(db, Redis) {
        this.db = db;
        this.Redis = Redis;
    }
    async getAllTweets() {
        try {
            let sql = "CALL get_all_tweets()";
            let [tweets, _] = await this.db.execute(sql);
            return tweets[0]
        } catch (error) {
            throw error;
        }
    };

    async getTweet(tweetId) {
        try {
            let sql = `CALL get_tweet(?)`;
            let [tweet, _] = await this.db.execute(sql, [tweetId]);
            return tweet[0][0];
        } catch (error) {
            throw error;
        }
    };

    async insertTweet(tweetId, values){
        // Regex pattern for hashtag detection
        const regex = /#(?![# ]).*? /g;
        // getting all the hashtags
        const tweet = values.content + ' ';
        const hashtags = tweet.match(regex);

        if (hashtags) {
            for (let i = 0; i < hashtags.length; i++) {
                const result = await this.Redis.insertToSortedSet('trends', 1, hashtags[i].slice(1, -1));
                console.log(result);
            }
        }

        if (values.retweet_id !== null || values.retweet_id !== 'null') {
            let updateTweet = `UPDATE tweets SET retweet_quoute_count = retweet_quoute_count + 1 WHERE tweet_id = ? or retweet_id = ?`;
            await this.db.execute(updateTweet, [values.retweet_id, values.retweet_id]);
        }
        let sql = `CALL insert_tweet(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return this.db.execute(sql, [tweetId, values.user_id, values.reply_id, values.content, values.media, values.likes, values.user_name, values.twitter_handle, values.profile_image, values.retweet_id, values.retweet_user_id, values.retweet_twitter_handle, values.quote_tweet_id, values.retweet_quoute_count]);
    };

    updateTweet(tweetId, parameter, value) {
        let sql = `UPDATE tweets SET ${parameter} = ${parameter} + ${value} WHERE tweet_id = '${tweetId}'`;
        return this.db.execute(sql);
    };

    deleteTweet(tweetId) {
        let sql = `CALL delete_tweet(?)`;
        return this.db.execute(sql, [tweetId]);
    };

    async tweetReplies(tweetId) {
        try {
            let sql = `CALL tweet_replies(?)`;
            let [replies, _] = await this.db.execute(sql, [tweetId]);
            return replies[0]
        } catch (error) {
            throw error;
        }
    };

    async getUserFeed(userId) {
        try {
            let sql = `CALL user_feed(?)`;
            let [tweets, _] = await this.db.execute(sql, [userId]);
            return tweets[0]
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    async getUserTweets(userId) {
        try {
            let sql = `CALL user_tweets(?)`;
            let [tweets, _] = await this.db.execute(sql, [userId]);
            return tweets[0]
        } catch (error) {
            throw error;
        }
    };

    async getUserLikes(userId) {
        try {
            let sql = `CALL user_likes(?)`;
            let [tweets, _] = await this.db.execute(sql, [userId]);
            return tweets[0]
        } catch (error) {
            throw error;
        }
    };

    async getUserMedias(userId) {
        try {
            let sql = `CALL user_medias(?)`;
            let [tweets, _] = await this.db.execute(sql, [userId]);
            return tweets[0]
        } catch (error) {
            throw error;
        }
    };

    async retweetExistenceCheck(userId, tweetId) {
        let sql = `CALL retweet_exists(?, ?)`;
        let [existence, _] = await this.db.execute(sql, [userId, tweetId]);
        return (existence[0].length > 0? true : false);
    }

    async deleteRetweet(userId, tweetId) {
        let updateTweet = `UPDATE tweets SET retweet_quoute_count = retweet_quoute_count - 1 WHERE retweet_id = ? OR tweet_id = ?`;
        await this.db.execute(updateTweet, [tweetId, tweetId]);
        let sql = `CALL delete_retweet(?, ?)`;
        return this.db.execute(sql, [userId, tweetId]);
    };
    
    async existenceCheck(tweetId) {
        try {
            let tweet = await this.getTweet(tweetId);
            if(tweet.length == 0) {
                throw new Error("Tweet Does not exist");
            } 
        } catch (error) {
            throw error;
        }
        
    };

    async getTrends() {
        try {
            let trends = await this.Redis.getSortedSet('trends')
            return trends
        } catch (error) {
            throw error
        }
    }
};

module.exports = Tweets;