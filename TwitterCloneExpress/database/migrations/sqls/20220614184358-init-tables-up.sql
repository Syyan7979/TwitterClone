CREATE TABLE IF NOT EXISTS `users` (
    `userId` VARCHAR(14) NOT NULL,
    `userName` VARCHAR(15) NOT NULL,
    `twitterHandle` VARCHAR(15) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `password` VARCHAR (128) NOT NULL,
    PRIMARY KEY (`userId`)
);

CREATE TABLE IF NOT EXISTS `tweets` (
    `tweetId` VARCHAR(14) NOT NULL,
    `userId` VARCHAR(14) NOT NULL,
    `replyId` VARCHAR(14) NULL,
    `content` VARCHAR(280),
    `media` VARCHAR(255),
    `likes` INT,
    `timeStamp` BIGINT,
    PRIMARY KEY (`tweetId`),
    FOREIGN KEY (`userId`) REFERENCES `users`(`userId`)
);

CREATE TABLE IF NOT EXISTS `follows` (
    `followId` VARCHAR(14) NOT NULL,
    `followerId` VARCHAR(14) NOT NULL,
    `followeeId` VARCHAR(14) NOT NULL,
    `timeStamp` BIGINT,
    PRIMARY KEY (`followId`),
    FOREIGN KEY (`followerId`) REFERENCES `users`(`userId`),
    FOREIGN KEY (`followeeId`) REFERENCES `users`(`userId`)
);

CREATE TABLE IF NOT EXISTS `likes` (
    `likeId` VARCHAR(14) NOT NULL,
    `userId` VARCHAR(14) NOT NULL,
    `tweetId` VARCHAR(14) NOT NULL,
    `timeStamp` BIGINT,
    PRIMARY KEY (`likeId`),
    FOREIGN KEY (`userId`) REFERENCES `users`(`userId`),
    FOREIGN KEY (`tweetId`) REFERENCES `tweets`(`tweetId`)
);

