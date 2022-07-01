-- USER RELATED QUERIES
    -- Getting all the users
CREATE PROCEDURE get_all_users()
BEGIN
SELECT userId, userName, twitterHandle, email, profileImage, headerImage  FROM users;
END;

    -- Getting a particular user given userId
CREATE PROCEDURE `get_user`(
    IN id VARCHAR(14)
)
BEGIN
SELECT 
	userId, userName, twitterHandle, email, profileImage, headerImage 
FROM 
	users
WHERE userId = id;
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
(userId, userName, twitterHandle, email, password, profileImage, headerImage) 
VALUES 
(id, userN, twitHand, userEmail, pass, dp, hp);
END;

    -- Updating a parameter for a user in users given their userId

    -- Delete a user in users given a userId
CREATE PROCEDURE `delete_user`(
	IN id VARCHAR(14)
)
BEGIN
DELETE FROM tweets WHERE userId = id;
DELETE FROM likes WHERE userId = id;
DELETE FROM follows WHERE followerId = id OR followeeId = id;
DELETE FROM users WHERE userId = id;
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
	userName = userN;
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
	email = userEmail;
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
	userId = id
ORDER BY
	timeStamp DESC;
END;

    -- Getting all the followings of a user given a userId

CREATE PROCEDURE `user_followings`(
	IN id VARCHAR(14)
)
BEGIN
SELECT 
	*
FROM
	follows
WHERE 
	followerId = id
ORDER BY
	timeStamp DESC;
END;

    -- Getting all the followers of a user given a userId

CREATE PROCEDURE `user_followers`(
	IN id VARCHAR(14)
)
BEGIN
SELECT 
	*
FROM
	follows
WHERE 
	followeeId = id
ORDER BY
	timeStamp DESC;
END;

    -- Getting the feed of a user given a userId

CREATE PROCEDURE `user_feed`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	tweetId, userID, replyId, content, media, likes, tweets.timestamp
FROM
	tweets
LEFT JOIN
	follows
ON
	tweets.userId = follows.followeeId
WHERE
	follows.followerId = id OR tweets.userId = id
ORDER BY
	timeStamp DESC;
END;

    -- Getting all the likes of user given a userId

CREATE PROCEDURE `user_likes`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	tweets.tweetId, tweets.userID, tweets.replyId, tweets.content, tweets.media, tweets.likes, tweets.timestamp
FROM
	tweets
INNER JOIN
	likes
ON
	tweets.tweetId = likes.tweetId
WHERE
	likes.userId = id
ORDER BY
	timeStamp DESC;
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
	userId = id AND media != "null"
ORDER BY
	timeStamp DESC;
END;

	-- validating login
CREATE PROCEDURE `login_validation`(
	IN usrName VARCHAR(15),
    IN pwrd VARCHAR(128)
)
BEGIN
SELECT 
	*
FROM 
	users
WHERE
	(userName = usrName AND password = pwrd) OR (email = usrName AND password = pwrd);
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
WHERE tweetId = id;
END;

    -- Inserting tweet to tweets

CREATE PROCEDURE `insert_tweet`(
	IN tId VARCHAR(14), 
    IN uId VARCHAR(15), 
    IN rId VARCHAR(15), 
    IN cont VARCHAR(280), 
    IN med VARCHAR(255),
    IN numLikes INT
)
BEGIN
INSERT INTO
	tweets 
(tweetId, userId, replyId, content, media, likes, timeStamp) 
VALUES 
(tId, uId, rId, cont, med, numLikes, unix_timestamp());
END;

    -- Updating a parameter for a tweet in tweets given their twetId

    -- Delete a tweet in tweets given a tweetId

CREATE PROCEDURE `delete_tweet`(
	IN id VARCHAR(14)
)
BEGIN
UPDATE
	tweets
SET 
	replyId = NULL
WHERE
	replyId = id;
DELETE FROM likes WHERE tweetId = id;
DELETE FROM tweets WHERE tweetId = id;
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
	replyId = id
ORDER BY
	likes DESC;
END;

	-- Getting all the users that liked the tweet
CREATE PROCEDURE `tweet_likers`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	users.userId, users.userName, users.twitterHandle, users.email
FROM
	users
INNER JOIN
	likes
ON
	users.userId = likes.userId
WHERE
	likes.tweetId = id
ORDER BY
	likes.timeStamp DESC;
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
    IN id VARCHAR(14)
)
BEGIN
SELECT 
	*
FROM 
	follows
WHERE followId = id;
END;

    -- Inserting following to follows
CREATE PROCEDURE `insert_following`(
	IN mainId VARCHAR(14), 
    IN frId VARCHAR(14), 
    IN feId VARCHAR(14)
)
BEGIN
INSERT INTO
	follows 
(followId, followerId, followeeId, timeStamp) 
VALUES 
(mainId, frId, feId, unix_timestamp());
END;

    -- Delete a following in follows given a followId

CREATE PROCEDURE `delete_following`(
	IN id VARCHAR(14)
)
BEGIN
DELETE FROM follows WHERE followId = id;
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
	followerId = frId AND followeeId = feId;
END;

-- LIKES RELATED QUERIES
    -- Getting all the likes

CREATE PROCEDURE `get_all_likes`()
BEGIN
SELECT * FROM likes;
END;

    -- Getting a particular like given likeId

CREATE PROCEDURE `get_like`(
	IN id VARCHAR(14)
)
BEGIN
SELECT
	*
FROM
	likes
WHERE
	likeId = id;
END;

    -- Inserting like to likes
CREATE PROCEDURE `insert_like`(
	IN mainId VARCHAR(14), 
    IN usrId VARCHAR(14), 
    IN twtId VARCHAR(14)
)
BEGIN
INSERT INTO
	likes 
(likeId, userId, tweetId, timeStamp) 
VALUES 
(mainId, usrId, twtId, unix_timestamp());
END;

    -- Delete a like in likes given a likeId

CREATE PROCEDURE `delete_like`(
	IN id VARCHAR(14)
)
BEGIN
DELETE FROM likes WHERE likeId = id;
END;

    -- Like dependency Check

CREATE PROCEDURE `check_like_existence`(
	IN usrId VARCHAR(14),
    IN twtId VARCHAR(14)
)
BEGIN
SELECT
	*
FROM
	likes
WHERE
	userId = usrId AND tweetId = twtId;
END;

 -- Seeding 1 user
 
CALL insert_user('1', '@kurtIsrael', 'kurt', 'kurt@gmail.com', 'password', 'https://i.pinimg.com/originals/e5/91/dc/e591dc82326cc4c86578e3eeecced792.png', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
CALL insert_user('2', '@kebin', 'kevin', 'kevin@gmail.com', 'sherlock', 'https://i.pinimg.com/originals/e5/91/dc/e591dc82326cc4c86578e3eeecced792.png', 'https://jannaschreier.files.wordpress.com/2012/03/website-header-blue-grey-background.jpg');
call insert_following('1', '1', '2');
CALL insert_tweet('1', '2', 'null', 'I love jollibee ChickenJoy', 'null', '0');
CALL insert_tweet('2', '2', 'null', 'I love greenwhich lasagna supreme', 'null', '0');
CALL insert_tweet('3', '2', 'null', 'I love mcdo mcflurry', 'null', '0');