DROP DATABASE IF EXISTS `politics_stats`;
CREATE DATABASE `politics_stats`;
USE `politics_stats`;

CREATE TABLE IF NOT EXISTS `political_groups` (
    `name` VARCHAR(32) NOT NULL,
    `country` VARCHAR(16) NOT NULL,
    `logo_color` VARCHAR(32) NOT NULL,
    `last_update` DATE NOT NULL,
    PRIMARY KEY (`name`)
);

CREATE TABLE IF NOT EXISTS `twitter_accounts` (
    `handle` VARCHAR(255) NOT NULL,
    `id` VARCHAR(64) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `img_url` VARCHAR(255) NOT NULL,
    `verified` TINYINT(1) NOT NULL,
    `created_on` VARCHAR(64) NOT NULL,
    `followers` INT(11) NOT NULL,
    `following` INT(11) NOT NULL,
    `total_tweets` INT(11) NOT NULL,
    `description` TEXT NOT NULL,
    `political_group` VARCHAR(32) NOT NULL,
    `last_update` DATE NOT NULL,
    PRIMARY KEY (`handle`),
    FOREIGN KEY (`political_group`) REFERENCES political_groups(`name`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `twitter_dailystats_accounts` (
    `handle` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `followers` INT(11) NOT NULL,
    `fetched_tweets` INT(11) NOT NULL,
    `tot_likes` INT(11) NOT NULL,
    `tot_retweets` INT(11) NOT NULL,
    `tot_replies` INT(11) NOT NULL,
    `avg_likes` DECIMAL(11, 2) NOT NULL,
    `avg_len` DECIMAL(11, 2) NOT NULL,
    `avg_retweets` DECIMAL(11, 2) NOT NULL,
    `avg_replies` DECIMAL(11, 2) NOT NULL,
    `avg_sentiment` ENUM('Positive', 'Negative', 'Neutral', 'Null') NOT NULL,
    PRIMARY KEY (`handle`, `date`),
    FOREIGN KEY (`handle`) REFERENCES twitter_accounts(`handle`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `twitter_dailystats_group` (
    `name` VARCHAR(32) NOT NULL,
    `date` DATE NOT NULL,
    `followers` INT(11) NOT NULL,
    `fetched_tweets` INT(11) NOT NULL,
    `num_analyzed_accounts` INT(11) NOT NULL,
    `tot_likes` INT(11) NOT NULL,
    `tot_retweets` INT(11) NOT NULL,
    `tot_replies` INT(11) NOT NULL,
    `avg_likes` DECIMAL(11, 2) NOT NULL,
    `avg_len` DECIMAL(11, 2) NOT NULL,
    `avg_retweets` DECIMAL(11, 2) NOT NULL,
    `avg_replies` DECIMAL(11, 2) NOT NULL,
    `avg_sentiment` ENUM('Positive', 'Negative', 'Neutral', 'Null') NOT NULL,
    PRIMARY KEY (`name`, `date`),
    FOREIGN KEY (`name`) REFERENCES political_groups(`name`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `twitter_hashtags_account` (
    `id` INT(11) AUTO_INCREMENT NOT NULL,
    `handle` VARCHAR(255) NOT NULL,
    `hashtag` VARCHAR(128) NOT NULL,
    `date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`handle`) REFERENCES twitter_accounts(`handle`) ON DELETE CASCADE
);
