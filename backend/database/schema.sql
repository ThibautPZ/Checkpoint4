-- Active: 1689174540931@@127.0.0.1@3306@fannydeglave

CREATE TABLE
    IF NOT EXISTS `painting_sizes` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(64) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `techniques` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(128) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `families` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(128) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `supports` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(64) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `user_types` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(64) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `paintings` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(128) NOT NULL,
        `pathname` VARCHAR(128) NOT NULL,
        `comment` TEXT NULL,
        `width` INT NOT NULL,
        `height` INT NOT NULL,
        `sold` TINYINT NOT NULL,
        `family_member` INT NULL,
        `families_id` INT NULL,
        `painting_sizes_id` INT NOT NULL,
        `supports_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_paintings_families` FOREIGN KEY (`families_id`) REFERENCES `families` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_paintings_painting_sizes` FOREIGN KEY (`painting_sizes_id`) REFERENCES `painting_sizes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_paintings_supports` FOREIGN KEY (`supports_id`) REFERENCES `supports` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `paintings_has_techniques` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `paintings_id` INT NOT NULL,
        `techniques_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_paintings_has_techniques_paintings` FOREIGN KEY (`paintings_id`) REFERENCES `paintings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_paintings_has_techniques_techniques` FOREIGN KEY (`techniques_id`) REFERENCES `techniques` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `users` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `lastname` VARCHAR(128) NOT NULL,
        `firstname` VARCHAR(128) NOT NULL,
        `address` VARCHAR(128) NULL,
        `postal_code` VARCHAR(45) NULL,
        `city` VARCHAR(45) NULL,
        `phone_number_1` VARCHAR(45) NULL,
        `phone_number_2` VARCHAR(45) NULL,
        `email` VARCHAR(128) NOT NULL,
        `password` VARCHAR(128) NOT NULL,
        `account_date` VARCHAR(64) NOT NULL,
        `user_types_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_users_user_types` FOREIGN KEY (`user_types_id`) REFERENCES `user_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `contacts` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `sender_name` VARCHAR(64) NULL,
        `sender_email` VARCHAR(64) NULL,
        `sender_phone` VARCHAR(64) NULL,
        `message` TEXT NOT NULL,
        `users_id` INT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_contacts_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `favorite_paintings` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `paintings_id` INT NOT NULL,
        `users_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_paintings_has_users_paintings1` FOREIGN KEY (`paintings_id`) REFERENCES `paintings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_paintings_has_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

CREATE TABLE
    IF NOT EXISTS `painting_comments` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `comment` TEXT NOT NULL,
        `date` VARCHAR(64) NOT NULL,
        `paintings_id` INT NOT NULL,
        `users_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_paintings_has_users_paintings2` FOREIGN KEY (`paintings_id`) REFERENCES `paintings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_paintings_has_users2` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;