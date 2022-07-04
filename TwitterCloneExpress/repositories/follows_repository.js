const db = require('../data_storage/mysql_data_access');

class Follows {
     
    static async getAllFollows() {
        try {
            let sql = "CALL get_all_follows()";
            let [follows, _] = await db.execute(sql);
            return follows[0];
        } catch (error) {
            throw error;
        }
    };

    static async getFollow(followId) {
        try {
            let sql = `CALL get_follow('${followId}')`;
            let [follow, _] = await db.execute(sql);
            return follow[0];
        } catch (error) {
            throw error;
        }
    };

    static insertFollowing(followId, values){
        let sql = `CALL insert_following('${followId}', '${values.followerId}', '${values.followeeId}')`;
        return db.execute(sql);
    };

    static deleteFollowing(followerId, followeeId) {
        let sql = `CALL delete_following('${followerId}', '${followeeId}')`;
        return db.execute(sql);
    };

    static async followingExistence(followerId, followeeId) {
        try {
            let sql = `CALL check_following_existence('${followerId}', '${followeeId}')`;
            let [follow, _] = await db.execute(sql);
            return follow[0];
        } catch (error) {
            throw error;
        }
    };

    static async existenceCheck(followId) {
        let follow = await this.getFollow(followId);
        if(follow.length == 0) {
            throw new Error("Following is not established!");
        }
    };
};

module.exports = Follows;