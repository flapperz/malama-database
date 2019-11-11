-- adding dummy data
-- dog dog_foodtypes cafe_dog customer_dog product box deposition user
USE malama;
-- cal setup before cal lthis

INSERT INTO box (size, last_cleaning_date, status)
VALUES 	('L', curdate(), 'Occupied'),
		('S', curdate(), 'Occupied');
select * from box;

INSERT INTO customer_dog (dog_name, breed, date_of_birth, weight)
VALUES	('redgold', 'royal', '1999-05-27', 11.1),
		('redblue', 'royal', '1999-05-27', 13.3);

INSERT INTO cafe_dog
VALUES 	(1, 'doge', 'shiba', '1999-05-27', 23.1, curdate(), curdate(), 'ear cancer, hypothermia, horny', 'mcdonald', 10, '10-14'),
		(2, 'nully', 'nulltribe', null, 100, null, null, '', null, 0, 'NO SHOWTIME');
SELECT * FROM cafe_dog;

INSERT INTO customer_dog_foodtypes
VALUES 	(1, 'chocolate');

INSERT INTO cafe_dog_foodtypes
VALUES 	(2, 'chocolate'),
		(2, 'human');
-- SELECT * FROM customer_dog_foodtypes;

INSERT INTO product(product_name, cost, price)
VALUES 	('deposition', null, 112),
		('deposition', null, 0);
SELECT * FROM product;

INSERT INTO deposition(dog_id, product_id, box_id, deposit_fee, is_retrieved, checkout_time)
VALUES 	(1, 1, 1, 112, true, now()),
		(2, 2, 2, 0, false, now());

INSERT INTO user
VALUES ('flapperz', 'password1', 'krit', 'c'),
		('ttk', 'password2', 'kkun', 'liw');
SELECT * FROM user;

