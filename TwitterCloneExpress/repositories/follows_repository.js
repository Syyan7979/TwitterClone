class Follows {

    constructor(db, Redis) {
        this.db = db;
        this.Redis = Redis;
    }
     
    async getAllFollows() {
        try {
            let sql = "CALL get_all_follows()";
            let [follows, _] = await this.db.execute(sql);
            return follows[0];
        } catch (error) {
            throw error;
        }
    };

    async getFollow(followerId, followeeId) {
        try {
            let sql = `CALL get_follow(?, ?)`;
            let [follow, _] = await this.db.execute(sql, [followerId, followeeId]);
            return follow[0][0];
        } catch (error) {
            throw error;
        }
    };

    async insertFollowing(followerId, followeeId){
        try {
            console.log(`userId:${followerId}`)
            await this.Redis.deleteCache(`userId:${followerId}`);
            let followerQuery = `CALL get_user(?)`
            let followeeQuery = `CALL get_user(?)`
            let [follower, _a] = await this.db.execute(followerQuery, [followerId]);
            let [followee, _b]= await this.db.execute(followeeQuery, [followeeId]);
            let sql = `CALL insert_following(?, ?, ?, ?, ?, ?, ?, ?)`;
            return this.db.execute(sql, [followerId, followeeId, follower[0][0].user_name, follower[0][0].twitter_handle, follower[0][0].profile_image, followee[0][0].user_name, followee[0][0].twitter_handle, followee[0][0].profile_image]);
        } catch (error) {
            console.log(error);
            throw error
        }
    };

    deleteFollowing(followerId, followeeId) {
        let sql = `CALL delete_following(?, ?)`;
        return this.db.execute(sql, [followerId, followeeId]);
    };

    async followingExistence(followerId, followeeId) {
        try {
            let sql = `CALL check_following_existence(?, ?)`;
            let [follow, _] = await this.db.execute(sql, [followerId, followeeId]);
            return (follow[0].length > 0 ? true : false);
        } catch (error) {
            throw error;
        }
    };
};

module.exports = Follows;