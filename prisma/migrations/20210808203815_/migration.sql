-- CreateTable
CREATE TABLE `User` (
    `nickname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User.email_unique`(`email`),
    PRIMARY KEY (`nickname`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `profileId` INTEGER NOT NULL AUTO_INCREMENT,
    `profilePic` VARCHAR(191),
    `role` VARCHAR(191),
    `nickname` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_nickname_unique`(`nickname`),
    PRIMARY KEY (`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191),

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostLike` (
    `postLikeId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `postId` INTEGER NOT NULL,

    UNIQUE INDEX `PostLike.postId_nickname_unique`(`postId`, `nickname`),
    PRIMARY KEY (`postLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `commentId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmark` (
    `bookmarkId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `postId` INTEGER NOT NULL,

    UNIQUE INDEX `Bookmark.postId_nickname_unique`(`postId`, `nickname`),
    PRIMARY KEY (`bookmarkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `questionId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nickname` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`questionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionLike` (
    `questionLikeId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `questionId` INTEGER NOT NULL,

    UNIQUE INDEX `QuestionLike.questionId_nickname_unique`(`questionId`, `nickname`),
    PRIMARY KEY (`questionLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `answerId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `questionId` INTEGER NOT NULL,

    PRIMARY KEY (`answerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnswerLike` (
    `answerLikeId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `answerId` INTEGER NOT NULL,

    UNIQUE INDEX `AnswerLike.answerId_nickname_unique`(`answerId`, `nickname`),
    PRIMARY KEY (`answerLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BootCamp` (
    `bootcampName` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bootcampName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nickname` VARCHAR(191) NOT NULL,
    `bootcampName` VARCHAR(191) NOT NULL,
    `season` VARCHAR(191) NOT NULL,
    `pros` VARCHAR(191) NOT NULL,
    `cons` VARCHAR(191) NOT NULL,
    `stars` DOUBLE NOT NULL,

    UNIQUE INDEX `Review.nickname_bootcampName_unique`(`nickname`, `bootcampName`),
    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Community` (
    `communityId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nickname` VARCHAR(191) NOT NULL,
    `bootcampName` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`communityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionLike` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionLike` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`questionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`questionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerLike` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerLike` ADD FOREIGN KEY (`answerId`) REFERENCES `Answer`(`answerId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD FOREIGN KEY (`bootcampName`) REFERENCES `BootCamp`(`bootcampName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Community` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Community` ADD FOREIGN KEY (`bootcampName`) REFERENCES `BootCamp`(`bootcampName`) ON DELETE CASCADE ON UPDATE CASCADE;
