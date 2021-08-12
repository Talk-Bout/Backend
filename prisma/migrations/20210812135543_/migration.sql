-- CreateTable
CREATE TABLE `User` (
    `nickname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profilePic` VARCHAR(191),
    `role` VARCHAR(191),

    UNIQUE INDEX `User.email_unique`(`email`),
    PRIMARY KEY (`nickname`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedback` (
    `feedbackId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191),

    PRIMARY KEY (`feedbackId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `postId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191),
    `nickname` VARCHAR(191),

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostComment` (
    `postCommentId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191),
    `postId` INTEGER,

    PRIMARY KEY (`postCommentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostLike` (
    `postLikeId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191),
    `postId` INTEGER,

    UNIQUE INDEX `PostLike.postId_nickname_unique`(`postId`, `nickname`),
    PRIMARY KEY (`postLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostBookmark` (
    `postBookmarkId` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` INTEGER,
    `nickname` VARCHAR(191),

    UNIQUE INDEX `PostBookmark.postId_nickname_unique`(`postId`, `nickname`),
    PRIMARY KEY (`postBookmarkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `questionId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `nickname` VARCHAR(191),
    `image` VARCHAR(191),
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`questionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionLike` (
    `questionLikeId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191),
    `questionId` INTEGER,

    UNIQUE INDEX `QuestionLike.questionId_nickname_unique`(`questionId`, `nickname`),
    PRIMARY KEY (`questionLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionBookmark` (
    `questionBookmarkId` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER,
    `nickname` VARCHAR(191),

    UNIQUE INDEX `QuestionBookmark.questionId_nickname_unique`(`questionId`, `nickname`),
    PRIMARY KEY (`questionBookmarkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `answerId` INTEGER NOT NULL AUTO_INCREMENT,
    `questionId` INTEGER,
    `nickname` VARCHAR(191),
    `content` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191),

    PRIMARY KEY (`answerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnswerLike` (
    `answerLikeId` INTEGER NOT NULL AUTO_INCREMENT,
    `answerId` INTEGER,
    `nickname` VARCHAR(191),

    UNIQUE INDEX `AnswerLike.answerId_nickname_unique`(`answerId`, `nickname`),
    PRIMARY KEY (`answerLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bootcamp` (
    `bootcampName` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bootcampName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BootcampBookmark` (
    `bootcampBookmarkId` INTEGER NOT NULL AUTO_INCREMENT,
    `bootcampName` VARCHAR(191),
    `nickname` VARCHAR(191),

    UNIQUE INDEX `BootcampBookmark.bootcampName_nickname_unique`(`bootcampName`, `nickname`),
    PRIMARY KEY (`bootcampBookmarkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191),
    `bootcampName` VARCHAR(191),
    `status` VARCHAR(191) NOT NULL,
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
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `nickname` VARCHAR(191),
    `bootcampName` VARCHAR(191),
    `image` VARCHAR(191),
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`communityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityComment` (
    `communityCommentId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191),
    `communityId` INTEGER,

    PRIMARY KEY (`communityCommentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityLike` (
    `communityLikeId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191),
    `communityId` INTEGER,

    UNIQUE INDEX `CommunityLike.communityId_nickname_unique`(`communityId`, `nickname`),
    PRIMARY KEY (`communityLikeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityBookmark` (
    `communityBookmarkId` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(191),
    `communityId` INTEGER,

    UNIQUE INDEX `CommunityBookmark.communityId_nickname_unique`(`communityId`, `nickname`),
    PRIMARY KEY (`communityBookmarkId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComment` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostComment` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostBookmark` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostBookmark` ADD FOREIGN KEY (`postId`) REFERENCES `Post`(`postId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionLike` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionLike` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`questionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionBookmark` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionBookmark` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`questionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD FOREIGN KEY (`questionId`) REFERENCES `Question`(`questionId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerLike` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnswerLike` ADD FOREIGN KEY (`answerId`) REFERENCES `Answer`(`answerId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BootcampBookmark` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BootcampBookmark` ADD FOREIGN KEY (`bootcampName`) REFERENCES `Bootcamp`(`bootcampName`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD FOREIGN KEY (`bootcampName`) REFERENCES `Bootcamp`(`bootcampName`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Community` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Community` ADD FOREIGN KEY (`bootcampName`) REFERENCES `Bootcamp`(`bootcampName`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComment` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityComment` ADD FOREIGN KEY (`communityId`) REFERENCES `Community`(`communityId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityLike` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityLike` ADD FOREIGN KEY (`communityId`) REFERENCES `Community`(`communityId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityBookmark` ADD FOREIGN KEY (`nickname`) REFERENCES `User`(`nickname`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityBookmark` ADD FOREIGN KEY (`communityId`) REFERENCES `Community`(`communityId`) ON DELETE SET NULL ON UPDATE CASCADE;
