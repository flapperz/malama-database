-- adding dummy data
-- dog dog_foodtypes cafe_dog customer_dog product box deposition user
USE malama;
-- cal setup before cal lthis

INSERT INTO customer_dog (dog_name, breed, date_of_birth, weight)
VALUES	('redgold', 'royal', '1999-05-27', 11.1),
		('redblue', 'royal', '1999-05-27', 13.3);

INSERT INTO cafe_dog
VALUES 	(1, 'doge', 'shiba', '1999-05-27', 23.1, curdate(), curdate(), 'no', 'mcdonald', 10, '10-14'),
		(2, 'Muji', 'pomeranian', '1999-05-27', 23.1, curdate(), curdate(), 'no', 'mcdonald', 10, '10-14');
SELECT * FROM cafe_dog;

INSERT INTO customer_dog_foodtypes
VALUES 	(1, 'chocolate');

INSERT INTO cafe_dog_foodtypes
VALUES 	(2, 'chocolate'),
		(2, 'human');
-- SELECT * FROM customer_dog_foodtypes;
INSERT INTO user
VALUES ('flapperz', 'password1', 'krit', 'c'),
		('ttk', 'password2', 'kkun', 'liw');

INSERT INTO box(size, last_cleaning_date, `status`)
VALUES  ('S', curdate(), 'Available'),
		('M', curdate(), 'Available'),
        ('L', curdate(), 'Available');
SELECT * FROM box;

