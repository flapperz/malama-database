-- adding dummy data
-- dog dog_foodtypes cafe_dog customer_dog product box deposition user
USE malama;
-- cal setup before cal lthis

INSERT INTO customer_dog (dog_name, breed, date_of_birth, weight)
VALUES	('Snoopy', 'dalmasian', '2003-08-24', 13.8),
		('Redgold', 'royal', '1999-05-27', 11.1),
		('Redblue', 'royal', '1999-05-27', 13.3),
        ('Soulsilver', 'lum' , '2002-11-12', 21.1),
        ('Fufu', 'lieutenant', '2005-07-31', 4.6);

INSERT INTO cafe_dog
VALUES 	(1, 'Doge', 'shiba', '1999-05-27', 23.1, curdate(), curdate(), true, 'mcdonald', 10, '10-14'),
		(2, 'Muji', 'pomeranian', '1999-05-27', 23.1, curdate(), curdate(), false, 'mcdonald', 10, '10-14'),
        (3, 'Gluta', 'lum', '2001-07-28', 62, curdate(), curdate(), false, 'kfc', 400, 4);
SELECT * FROM cafe_dog;

INSERT INTO customer_dog_foodtypes
VALUES 	(1, 'chocolate');


INSERT INTO box(size, last_cleaning_date, `status`)
VALUES  ('S', curdate(), 'Available'),
		('M', curdate(), 'Available'),
        ('M', curdate(), 'Available'),
        ('L', curdate(), 'Available'),
        ('L', curdate(), 'Available');
SELECT * FROM box;

