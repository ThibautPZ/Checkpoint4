-- Active: 1689174540931@@127.0.0.1@3306@fannydeglave

INSERT INTO
    `painting_sizes` (`name`)
VALUES ('Mini'), ('Medium'), ('Maxi');

INSERT INTO
    `painting_types` (`name`)
VALUES ('Acrylique'), ('Aquarelle'), ('Huile'), ('Dessin');

INSERT INTO
    `user_types` (`name`)
VALUES ('User'), ('Administrator');

INSERT INTO
    `users` (
        `lastname`,
        `firstname`,
        `address`,
        `postal_code`,
        `city`,
        `phone_number_1`,
        `phone_number_2`,
        `email`,
        `password`,
        `account_date`,
        `user_types_id`
    )
VALUES (
        'Deglave',
        'Fanny',
        'Sample Adress',
        '31000',
        'City',
        '00000001',
        '00000002',
        'fanny@mail.com',
        'September 27, 2023 12:00:00',
        'password',
        2
    ), (
        'User',
        'Normal',
        'Sample Adress',
        '31000',
        'City',
        '00000001',
        '00000002',
        'normal@mail.com',
        'September 27, 2023 12:00:00',
        'password',
        1
    );