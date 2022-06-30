const db = require('../data_storage/mysql_data_access');

class Likes {
     
    static async getAllLikes() {
        try {
            let sql = "CALL get_all_likes()";
            let [likes, _] = await db.execute(sql);
            return likes[0];
        } catch (error) {
            throw error;
        }
    };

    static async getLike(likeId) {
        try {
            let sql = `CALL get_like('${likeId}')`;
            let [like, _] = await db.execute(sql);
            return like[0];
        } catch (error) {
            throw error;
        }
    };

    static insertLike(likeId, values){
        let sql = `CALL insert_like('${likeId}', '${values.userId}', '${values.tweetId}')`;
        return db.execute(sql);
    };

    static deleteLike(likeId) {
        let sql = `CALL delete_like('${likeId}')`;
        return db.execute(sql);
    };

    static async likesExistence(userId, tweetId) {
        try {
            let sql = `CALL check_like_existence('${userId}', '${tweetId}')`
            let [like, _] = await db.execute(sql);
            return like[0];
        } catch (error) {
            throw error;
        }
    };

    static async existenceCheck(likeId) {
        let like = await this.getLike(likeId);
        if(like.length == 0) {
            throw new Error("Like is not established!");
        }
    };
};

module.exports = Likes;