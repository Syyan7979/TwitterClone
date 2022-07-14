class Likes {
    constructor(db) {
        this.db = db;
    }

    async insertLike(likerId, tweetId){
        let updateTweet = `UPDATE tweets SET likes = likes + 1 WHERE tweet_id = ? or retweet_id = ?`;
        await this.db.execute(updateTweet, [tweetId, tweetId]);
        let likerQuery = `CALL get_user(?)`;
        let [liker, _a] = await this.db.execute(likerQuery, [likerId]);
        let tweetQuery = `CALL get_tweet(?)`;
        let [tweet, _b] = await this.db.execute(tweetQuery, [tweetId]);
        let sql = `CALL insert_like(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return this.db.execute(sql, [likerId, tweetId, tweet[0][0].user_id, tweet[0][0].reply_id, tweet[0][0].content, tweet[0][0].media, tweet[0][0].likes, tweet[0][0].user_name, tweet[0][0].twitter_handle, tweet[0][0].profile_image, , liker[0][0].user_name, liker[0][0].twitter_handle, liker[0][0].profile_image, tweet[0][0].retweet_id, tweet[0][0].retweet_user_id, tweet[0][0].retweet_twitter_handle, tweet[0][0].quote_tweet_id, tweet[0][0].retweet_quoute_count]);
    };

    async deleteLike(userId, tweetId) {
        let updateTweet = `UPDATE tweets SET likes = likes - 1 WHERE tweet_id = ? OR retweet_id = ?`;
        await this.db.execute(updateTweet, [tweetId, tweetId]);
        let sql = `CALL delete_like(?, ?)`;
        return this.db.execute(sql, [userId, tweetId]);
    };

    async likesExistenceCheck(userId, tweetId) {
        let sql = `CALL like_exists(?, ?)`;
        let [existence, _] = await this.db.execute(sql, [userId, tweetId]);
        return (existence[0].length > 0? true : false);
    }
};

module.exports = Likes;