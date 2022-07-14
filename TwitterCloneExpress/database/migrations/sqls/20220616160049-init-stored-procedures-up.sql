-- USER RELATED QUERIES
    -- Getting all the users
CREATE PROCEDURE `get_all_users`()
BEGIN
SELECT user_id, user_name, twitter_handle, user_email, profile_image, header_image, time_stamp  
FROM users;
END;

    -- Getting a particular user given userId
CREATE PROCEDURE `get_user`(
    IN id VARCHAR(14)
)
BEGIN
SELECT 
	user_id, user_name, twitter_handle, user_email, profile_image, header_image, time_stamp 
FROM 
	users
WHERE user_id = id;
END;

    -- Inserting user to users
CREATE PROCEDURE `insert_user`(
    IN id VARCHAR(14), 
    IN userN VARCHAR(15), 
    IN twitHand VARCHAR(15), 
    IN userEmail VARCHAR(320), 
    IN pass VARCHAR(128),
	IN dp VARCHAR(255),
	in hp VARCHAR(255)
)
BEGIN
INSERT INTO
	users 
(user_id, user_name, twitter_handle, user_email, user_password, profile_image, header_image, time_stamp) 
VALUES 
(id, userN, twitHand, userEmail, pass, dp, hp, unix_timestamp());
END;

    -- Delete a user in users given a userId
CREATE PROCEDURE `delete_user`(
	IN id VARCHAR(14)
)
BEGIN
DELETE FROM tweets WHERE user_id = id;
DELETE FROM likedTweets WHERE liker_id = id;
DELETE FROM follows WHERE follower_id = id OR followee_id = id;
DELETE FROM users WHERE user_id = id;
END;

    -- UserName Existence Check

CREATE PROCEDURE `check_username_existence`(
	IN userN VARCHAR(15)
)
BEGIN
SELECT
	*
FROM
	users
WHERE
	user_name = userN;
END;

    -- Email Existence Check

CREATE PROCEDURE `check_email_existence`(
	IN userEmail VARCHAR(320)
)
BEGIN
SELECT
	*
FROM
	users
WHERE
	user_email = userEmail;
END;

    -- Getting all the followings of a user given a userId

CREATE PROCEDURE `user_followings`(
	IN id VARCHAR(14)
)
BEGIN
SELECT 
	followee_id AS user_id, followee_user_name AS user_name, followee_twitter_handle AS twitter_handle, followee_profile_image AS profile_image
FROM
	follows
WHERE 
	follower_id = id
ORDER BY
	time_stamp DESC;
END;

    -- Getting all the followers of a user given a userId

CREATE PROCEDURE `user_followers`(
	IN id VARCHAR(14)
)
BEGIN
SELECT 
	follower_id AS user_id, follower_user_name AS user_name, follower_twitter_handle AS twitter_handle, follower_profile_image AS profile_image
FROM
	follows
WHERE 
	followee_id = id
ORDER BY
	time_stamp DESC;
END;

	-- validating login
CREATE PROCEDURE `login_validation`(
	IN usrName VARCHAR(15),
	In usrEmail VARCHAR(320),
    IN pwrd VARCHAR(128)
)
BEGIN
SELECT 
	*
FROM 
	users
WHERE
	(user_name = usrName AND user_password = pwrd) OR (user_email = usrEmail AND user_password = pwrd);
END;

	-- Recommended follows
CREATE PROCEDURE `follow_recommendations`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	*
FROM
	users
WHERE user_id NOT IN (
	SELECT 
		followee_id
	FROM
		follows
	WHERE follower_id = id
) AND user_id != id
LIMIT 20;
END;

	-- Getting all the users that liked the tweet
CREATE PROCEDURE `tweet_likers`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	liker_id, liker_user_name, liker_twitter_handle, liker_profile_image
FROM
	likedTweets
WHERE
	tweet_id = id
ORDER BY
	time_stamp;
END;


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-- TWEET RELATED QUERIES
    -- Getting all the tweets

CREATE PROCEDURE `get_all_tweets`()
BEGIN
SELECT * FROM tweets;
END;

    -- Getting particular tweet given tweetId

CREATE PROCEDURE `get_tweet`(
    IN id VARCHAR(14)
)
BEGIN
SELECT 
	*
FROM 
	tweets
WHERE tweet_id = id;
END;

    -- Inserting tweet to tweets

CREATE PROCEDURE `insert_tweet`(
	IN tId VARCHAR(14), 
    IN usrId VARCHAR(15), 
    IN rId VARCHAR(15), 
    IN cont VARCHAR(280), 
    IN med VARCHAR(1020),
    IN numLikes INT,
	IN usrName VARCHAR(15),
	IN twtHandle VARCHAR(15),
	IN profImg VARCHAR(255),
	IN rt_id VARCHAR(14),
	IN rt_u_id VARCHAR(14),
	IN rt_twt_handle VARCHAR(15),
	IN qt_twt_id VARCHAR(14),
	IN ret_quotes INT
)
BEGIN
INSERT INTO
	tweets 
(tweet_id, user_id, reply_id, content, media, likes, user_name, twitter_handle, profile_image, retweet_id, retweet_user_id, retweet_twitter_handle, quote_tweet_id, retweet_quoute_count, time_stamp) 
VALUES 
(tId, usrId, rId, cont, med, numLikes, usrName, twtHandle, profImg, rt_id, rt_u_id, rt_twt_handle, qt_twt_id, ret_quotes, unix_timestamp());
END;

    -- Delete a tweet in tweets given a tweetId

CREATE PROCEDURE `delete_tweet`(
	IN id VARCHAR(14)
)
BEGIN
UPDATE
	tweets
SET 
	reply_id = NULL
WHERE
	reply_id = id;
DELETE FROM likedTweets WHERE tweet_id = id;
DELETE FROM tweets WHERE tweet_id = id;
END;

    -- Get all the replies of a particular tweet given a tweetId

CREATE PROCEDURE `tweet_replies`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	*
FROM
	tweets
WHERE
	reply_id = id
ORDER BY
	likes DESC;
END;

-- Getting the feed of a user given a userId

CREATE PROCEDURE `user_feed`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	*
FROM
	tweets
WHERE (tweets.user_id = id AND tweets.retweet_id IS NULL) OR (tweets.user_id IN (
	SELECT
		followee_id
	FROM
		follows
	WHERE follower_id = id
) and tweets.retweet_id IS NULL) OR (tweets.retweet_user_id IN (
	SELECT
		followee_id
	FROM
		follows
	WHERE follower_id = id
))
ORDER BY
	time_stamp DESC;
END;

    -- Getting all tweets created by a particular user given a userId

CREATE PROCEDURE `user_tweets`(
	IN id VARCHAR(14)
)
BEGIN
SELECT 
	*
FROM
	tweets
WHERE 
	(user_id = id AND retweet_id IS NULL) OR (retweet_user_id = id AND retweet_id IS NOT NULL)
ORDER BY
	time_stamp DESC;
END;

    -- Getting all the likes of user given a userId

CREATE PROCEDURE `user_likes`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	tweet_id, user_id, reply_id, content, media, likes, user_name, twitter_handle, profile_image, retweet_id, retweet_user_id, retweet_twitter_handle, quote_tweet_id, retweet_quoute_count, time_stamp
FROM
	likedTweets
WHERE
	liker_id = id
ORDER BY
	time_stamp DESC;
END;

    -- Getting all the media of a user given a userId

CREATE PROCEDURE `user_medias`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	*
FROM
	tweets
WHERE
	user_id = id AND media != "null"
ORDER BY
	time_stamp DESC;
END;

CREATE PROCEDURE `retweet_exists`(
	IN usr_id VARCHAR(14),
	IN twt_id VARCHAR(14)
)
BEGIN
SELECT
	*
FROM
	tweets
WHERE
	retweet_user_id = usr_id AND retweet_id = twt_id;
END;

CREATE PROCEDURE `delete_retweet`(
	IN usrId VARCHAR(14),
	IN twtId VARCHAR(14)
)
BEGIN
DELETE FROM tweets WHERE retweet_user_id = usrId AND retweet_id = twtId;
END;


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-- FOLLOWING RELATED QUERIES
    -- Getting all the follows

CREATE PROCEDURE `get_all_follows`()
BEGIN
SELECT * FROM follows;
END;

    -- Getting particular following given followId

CREATE PROCEDURE `get_follow`(
    IN frId VARCHAR(14), 
    IN feId VARCHAR(14)
)
BEGIN
SELECT 
	*
FROM 
	follows
WHERE follower_id = frId AND followee_id = feId;
END;

    -- Inserting following to follows
CREATE PROCEDURE `insert_following`(
    IN frId VARCHAR(14), 
    IN feId VARCHAR(14),
	IN frUserNm VARCHAR(15),
	IN frTwtHand VARCHAR(15),
	IN frProfImg VARCHAR(255),
	IN feUserNm VARCHAR(15),
	IN feTwtHand VARCHAR(15),
	IN feProfImg VARCHAR(255)
)
BEGIN
INSERT INTO
	follows 
(follower_id, followee_id, follower_user_name, follower_twitter_handle, follower_profile_image, followee_user_name, followee_twitter_handle, followee_profile_image, time_stamp) 
VALUES 
(frId, feId, frUserNm, frTwtHand, frProfImg, feUserNm, feTwtHand, feProfImg, unix_timestamp());
END;

    -- Delete a following in follows given a followId

CREATE PROCEDURE `delete_following`(
	IN frId VARCHAR(14),
	IN feId VARCHAR(14)
)
BEGIN
DELETE FROM follows WHERE follower_id = frId AND followee_id = feId;
END;

    -- Following dependency Check

CREATE PROCEDURE `check_following_existence`(
	IN frId VARCHAR(14),
    IN feId VARCHAR(14)
)
BEGIN
SELECT
	*
FROM
	follows
WHERE
	follower_id = frId AND followee_id = feId;
END;

-- LIKES RELATED QUERIES
    -- Inserting like to likes
CREATE PROCEDURE `insert_like`(
    IN likerId VARCHAR(14), 
    IN twtId VARCHAR(14),
    IN usrId VARCHAR(15), 
    IN rId VARCHAR(15), 
    IN cont VARCHAR(280), 
    IN med VARCHAR(1020),
    IN numLikes INT,
	IN userN VARCHAR(15), 
    IN twitHand VARCHAR(15), 
	IN dp VARCHAR(255),
	IN likerUserN VARCHAR(15), 
    IN likerTwitHand VARCHAR(15), 
	IN likerDp VARCHAR(255),
	IN rt_id VARCHAR(14),
	IN rt_u_id VARCHAR(14),
	IN rt_twt_handle VARCHAR(15),
	IN qt_twt_id VARCHAR(14),
	IN ret_quotes INT
)
BEGIN
INSERT INTO
	likedTweets 
(liker_id, tweet_id, user_id, reply_id, content, media, likes, user_name, twitter_handle, profile_image, liker_user_name, liker_twitter_handle, liker_profile_image, retweet_id, retweet_user_id, retweet_twitter_handle, quote_tweet_id, retweet_quoute_count, time_stamp) 
VALUES 
(likerId, twtId, usrId, rId, cont, med, numLikes, userN, twitHand, dp, likerUserN, likerTwitHand, likerDp, rt_id, rt_u_id, rt_twt_handle, qt_twt_id, ret_quotes, unix_timestamp());
END;

    -- Delete a like in likes given a likeId

CREATE PROCEDURE `delete_like`(
	IN usrId VARCHAR(14),
	IN twtId VARCHAR(14)
)
BEGIN
DELETE FROM likedTweets WHERE liker_id = usrId AND tweet_id = twtId;
END;

CREATE PROCEDURE `like_exists`(
	IN usrId VARCHAR(14),
	IN twtId VARCHAR(14)
)
BEGIN
SELECT 
	*
FROM 
	likedTweets 
WHERE 
	liker_id = usrId AND tweet_id = twtId;
END;

 -- Seeding 20 user
 
CALL insert_user('1', 'kurtIsrael', 'kurt', 'kurt@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/54e7d1404857a814f1dc8460962e33791c3ad6e04e5074417c2d78d19e44cd_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('2', 'kebin', 'kevin', 'kevin@gmail.com', 'sherlock', 'https://randomwordgenerator.com/img/picture-generator/53e3d7454351ac14f1dc8460962e33791c3ad6e04e507440762e7ad3954fcd_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('3', 'kc', 'kaye_christine', 'kc@gmail.com', 'kaye_christine', 'https://randomwordgenerator.com/img/picture-generator/5fe4d14a4a5ab10ff3d8992cc12c30771037dbf85254784b772872d39e44_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('4', 'gennnnn', 'giniesy', 'gen@gmail.com', 'tabachoy', 'https://randomwordgenerator.com/img/picture-generator/54e1dd404f4faa0df7c5d57bc32f3e7b1d3ac3e45659764f762d78d39e_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('5', 'sISMEOla', 'sissy', 'sISMEOla@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/55e8d24b4b52a414f1dc8460962e33791c3ad6e04e5074417d2e72d39744c6_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('6', 'ItOrYbOY', 'Itory', 'ItOrYbOY@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/57e6d3444d56ac14f1dc8460962e33791c3ad6e04e507440742a7ed19549cc_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('7', 'TChaBLEd', 'Tchalla', 'TChaBLEd@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/57e9d24a4c53a514f1dc8460962e33791c3ad6e04e507441722872d79748c4_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('8', 'COPOSter', 'Cooper', 'COPOSter@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/natural-4946737_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('9', 'iGHTEOuc', 'IU', 'iGHTEOuc@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/57e5dc464252ae14f1dc8460962e33791c3ad6e04e5074417c2f73d49248cc_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('10', 'OPArDEau', 'opard', 'OPArDEau@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/54e4d6414852a514f1dc8460962e33791c3ad6e04e5074417d2c7ed09048c7_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('11', 'hARDEmEt', 'hMet', 'hARDEmEt@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/5fe0d7464a5ab10ff3d8992cc12c30771037dbf85254784d752f7add9e4f_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('12', 'gHteNtER', 'Gunther', 'gHteNtER@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/57e9dd464a5aa414f1dc8460962e33791c3ad6e04e50744172297bd59445c7_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('13', 'AntEREPl', 'Anther', 'AntEREPl@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/57e2d54a4a55a514f1dc8460962e33791c3ad6e04e5074417c2f7dd5904ecd_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('14', 'mPtOrAiN', 'mtrain', 'mPtOrAiN@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/55e0d64b4a5ba414f1dc8460962e33791c3ad6e04e507440772d73d4954fcc_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('15', 'sOAxpesP', 'pepsi', 'sOAxpesP@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/55e6d1464955a514f1dc8460962e33791c3ad6e04e507440702d79d39e49c6_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('16', 'DquaLiSa', 'DuaLisa', 'DquaLiSa@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/italy-4093227_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('17', 'EGERiAlf', 'Ereh', 'EGERiAlf@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/52e1d3424e53a414f1dc8460962e33791c3ad6e04e50744172297cd59544c3_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('18', 'acheiGrE', 'Mikasa', 'acheiGrE@gmail.com', 'password', 'https://randomwordgenerator.com/img/picture-generator/52e7d0424f5aaa14f1dc8460962e33791c3ad6e04e50744172297bd5904ac0_640.jpg', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('19', 'NSMANUCI', 'manuci', 'NSMANUCI@gmail.com', 'password', 'https://i.pinimg.com/originals/e5/91/dc/e591dc82326cc4c86578e3eeecced792.png', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('20', 'OStImicK', 'otis', 'OStImicK@gmail.com', 'password', 'https://i.pinimg.com/originals/e5/91/dc/e591dc82326cc4c86578e3eeecced792.png', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');

CALL insert_following('1', '2', 'kurtIsrael', 'kurt', 'https://randomwordgenerator.com/img/picture-generator/54e7d1404857a814f1dc8460962e33791c3ad6e04e5074417c2d78d19e44cd_640.jpg', 'kebin', 'kevin', 'https://randomwordgenerator.com/img/picture-generator/54e7d1404857a814f1dc8460962e33791c3ad6e04e5074417c2d78d19e44cd_640.jpg');

CALL insert_tweet('1', '2', 'null', 'I love jollibee ChickenJoy', '["https://cdn.shopify.com/s/files/1/0580/3245/5858/products/10-pc-chickenjoy-bucket.jpg?v=1635459211&width=1080"]', '0', 'kebin', 'kevin', 'https://randomwordgenerator.com/img/picture-generator/53e3d7454351ac14f1dc8460962e33791c3ad6e04e507440762e7ad3954fcd_640.jpg', null, null, null, null, 0);
CALL insert_tweet('2', '2', 'null', 'I love greenwhich lasagna supreme', '["https://greenwich-pizza-cdn.tillster.com/9a93c78e-e6cd-4e40-b004-32d61f708725.png"]', '0', 'kebin', 'kevin', 'https://randomwordgenerator.com/img/picture-generator/53e3d7454351ac14f1dc8460962e33791c3ad6e04e507440762e7ad3954fcd_640.jpg', null, null, null, null, 0 );
CALL insert_tweet('3', '2', 'null', 'I love mcdo mcflurry', '["https://pbs.twimg.com/media/CAhbkACWMAA7a55.jpg"]', '0', 'kebin', 'kevin', 'https://randomwordgenerator.com/img/picture-generator/53e3d7454351ac14f1dc8460962e33791c3ad6e04e507440762e7ad3954fcd_640.jpg', null, null, null, null, 0);