class Users {
    constructor(db, redis) {
        this.db = db;
        this.Redis = redis;
    }

    async getAllUsers() {
        try {
            let sql = `CALL get_all_users()`;
            let [users, _] = await this.db.execute(sql);
            return users[0];
        } catch (error) {
            throw error;
        }
    };

    async getUser(userId) {
        try {
            let sql = `CALL get_user(?)`;
            let [user, _] = await this.db.execute(sql, [userId]);
            return user[0][0];
        } catch (error) {
            throw error;
        }
    };

    insertUser(userId, values){
        let sql = `CALL insert_user(?, ?, ?, ?, ?, ?, ?)`;
        return this.db.execute(sql, [userId, values.user_name, values.twitter_handle, values.user_email, values.user_password, values.profile_image, values.header_image]);
    };

    async updateUser(userId, parameter, value) {
        if (parameter === 'user_name' || parameter === 'twitter_handle' || parameter === 'profile_image') {
            let likedTweetsQuery1 = `UPDATE likedTweets SET ${parameter} = '${value}' WHERE user_id = '${userId}'`
            let likedTweetsQuery2 = `UPDATE likedTweets SET ${'liker_'+parameter} = '${value}' WHERE liker_id = '${userId}'`
            let followerQuery = `UPDATE follows SET ${'follower_'+parameter} = '${value}' WHERE follower_id = '${userId}'`
            let followeeQuery = `UPDATE follows SET ${'followee_'+parameter} = '${value}' WHERE followee_id = '${userId}'`
            let tweetsQuery = `UPDATE tweets SET ${parameter} = '${value}' WHERE user_id = '${userId}'`
            if (parameter === 'twitter_handle') {
                let tweetsQuery2 = `UPDATE tweets SET ${parameter} = '${value}' WHERE retweet_user_id = '${userId}'`
                let likedTweetsQuery3 = `UPDATE likedTweets SET ${'liker_'+parameter} = '${value}' WHERE retweet_user_id = '${userId}'`
                await this.db.execute(tweetsQuery2);
                await this.db.execute(likedTweetsQuery3);
            }
            await this.db.execute(likedTweetsQuery1);
            await this.db.execute(likedTweetsQuery2);
            await this.db.execute(followerQuery);
            await this.db.execute(followeeQuery);
            await this.db.execute(tweetsQuery);
        }
        let sql = `UPDATE users SET ${parameter} = '${value}' WHERE user_id = '${userId}'`;
        return this.db.execute(sql);
    };

    deleteUser(userId) {
        let sql = `CALL delete_User(?)`;
        return this.db.execute(sql, [userId]);
    };

    async usernameExistence(userName) {
        try {
            let sql = `CALL check_username_existence(?)`;
            let [users, _] = await this.db.execute(sql, [userName]);
            return users[0];
        } catch (error) {
            throw error;
        }
    };

    async useremailExistence(email) {
        try {
            let sql = `CALL check_email_existence(?)`;
            let [users, _] = await this.db.execute(sql, [email]);
            return users[0];
        } catch (error) {
            throw error;
        }
    };

    async userFollowings(userId) {
        try {
            let sql = `CALL user_followings(?)`;
            let [followings, _] = await this.db.execute(sql, [userId]);
            return followings[0];
        } catch (error) {
            throw error;
        }
    };

    async userFollowers(userId) {
        try {
            let sql = `CALL user_followers(?)`;
            let [followers, _] = await this.db.execute(sql, [userId]);
            return followers[0];
        } catch (error) {
            throw error;
        }
    };

    async login_validate(userName, email, password) {
        try {
            console.log(userName, email, password)
            let sql = `CALL login_validation(?, ?, ?)`;
            let [user, _] = await this.db.query(sql, [userName, email, password]);
            if (user[0].length == 0) {
                throw new Error('Invalid username or password');
            }
            return user[0][0];
        } catch (error) {
            throw error;
        }
    };

    async recommendedFollows(userId) {
        try {
            let key = `userId:${userId}`;
            let cached = await this.Redis.getCache(key);
            if (cached !== null) {
                console.log('from cache');
                return cached;
            } else {
                console.log('db accessed')
                let sql = `CALL follow_recommendations(?)`;
                let [users, _] = await this.db.query(sql, [userId]);
                let newCachedUsers = await this.Redis.setCache(key, users[0], 20);
                return newCachedUsers;
            }
        } catch (error) {
            throw error;
        }
    };

    async getTweetLikers(tweetId) {
        try { 
            let sql = `CALL tweet_likers(?)`;
            let [users, _] = await this.db.query(sql, [tweetId]);
            return users[0];
        } catch (error) {
            throw error;
        }
    }

    async existenceCheck(userId) {
        let user = await this.getUser(userId);
        if(user.length == 0) {
            throw new Error("User Does not exist!");
        }
    };
};

module.exports = Users;