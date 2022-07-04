const db = require('../data_storage/mysql_data_access');
const { use } = require('../routes/following');

class Users {
     
    static async getAllUsers() {

        try {
            let sql = `CALL get_all_users()`;
            let [users, _] = await db.execute(sql);
            return users[0];
        } catch (error) {
            throw error;
        }
    };

    static async getUser(userId) {
        try {
            let sql = `CALL get_user('${userId}')`;
            let [user, _] = await db.execute(sql);
            return user[0][0];
        } catch (error) {
            throw error;
        }
    };

    static insertUser(userId, values){
        let sql = `CALL insert_user('${userId}', '${values.userName}', '${values.twitterHandle}', '${values.email}', '${values.password}', '${values.profileImage}', '${values.headerImage}')`;
        return db.execute(sql);
    };

    static updateUser(userId, parameter, value) {
        let sql = `UPDATE users SET ${parameter} = '${value}' WHERE userId = '${userId}'`;
        return db.execute(sql);
    };

    static deleteUser(userId) {
        let sql = `CALL delete_User('${userId}')`;
        return db.execute(sql);
    };

    static async usernameExistence(userName) {
        try {
            let sql = `CALL check_username_existence('${userName}')`;
            let [users, _] = await db.execute(sql);
            return users[0];
        } catch (error) {
            throw error;
        }
    };

    static async useremailExistence(email) {
        try {
            let sql = `CALL check_email_existence('${email}')`;
            let [users, _] = await db.execute(sql);
            return users[0];
        } catch (error) {
            throw error;
        }
    };

    static async userTweets(userId) {
        try {
            let sql = `CALL user_tweets('${userId}')`;
            let [tweets, _] = await db.execute(sql);
            return tweets[0];
        } catch (error) {
            throw error;
        }
    };

    static async userFollowings(userId) {
        try {
            let sql = `CALL user_followings('${userId}')`;
            let [followings, _] = await db.execute(sql);
            return followings[0];
        } catch (error) {
            throw error;
        }
    };

    static async userFollowers(userId) {
        try {
            let sql = `CALL user_followers('${userId}')`;
            let [followers, _] = await db.execute(sql);
            return followers[0];
        } catch (error) {
            throw error;
        }
    };

    static async userFeed(userId) {
        try {
            let sql = `CALL user_feed('${userId}')`;
            let [feed, _] = await db.execute(sql);
            return feed[0];
        } catch (error) {
            throw error;
        }
    };

    static async userLikes(userId) {
        try {
            let sql = `CALL user_likes('${userId}')`;
            let [likes, _] = await db.execute(sql);
            return likes[0];
        } catch (error) {
            throw error;
        }
    };

    static async userMedias(userId) {
        try {
            let sql = `CALL user_medias('${userId}')`;
            let [medias, _] = await db.execute(sql);
            return medias[0];
        } catch (error) {
            throw error;
        }
    };

    static async existenceCheck(userId) {
        let user = await this.getUser(userId);
        if(user.length == 0) {
            throw new Error("User Does not exist!");
        }
    };

    static async login_validate(userName, email, password) {
        try {
            let sql = `CALL login_validation('${userName}', '${email}', '${password}')`;
            let [user, _] = await db.query(sql);
            if (user[0].length == 0) {
                throw new Error('Invalid username or password');
            }
            return user[0][0];
        } catch (error) {
            throw error;
        }
    };
};

module.exports = Users;