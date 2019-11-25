-- mic drop
DROP SCHEMA IF EXISTS malama;

-- create schema 
CREATE SCHEMA IF NOT EXISTS malama;
USE malama;

-- variables

-- create tables
CREATE TABLE IF NOT EXISTS supplier
(
	supplier_name 	CHAR(50) NOT NULL, 
    address1 		CHAR(255) NOT NULL,
    address2 		CHAR(255) NOT NULL,
    province		CHAR(255) NOT NULL,
    zipcode 		VARCHAR(5) NOT NULL,
	supplier_tel 	VARCHAR(10) NOT NULL,
    salesman		CHAR(50) ,
    
    PRIMARY KEY (supplier_name)
);

CREATE TABLE IF NOT EXISTS product
(
	product_id		INT NOT NULL AUTO_INCREMENT,
    product_name	CHAR(50) NOT NULL, 
	cost			FLOAT,
    price			FLOAT NOT NULL,
    
    PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS stock_item
(
	stock_id		INT NOT NULL AUTO_INCREMENT,
    supplier_name	CHAR(50) NOT NULL,
    product_id		INT NOT NULL,
    item_name		CHAR(50) NOT NULL,
    stock_amount	FLOAT,
    stock_date		DATE NOT NULL,
    
    PRIMARY KEY (stock_id),
    
    FOREIGN KEY (supplier_name)
		REFERENCES supplier(supplier_name)
        ON UPDATE CASCADE ON DELETE RESTRICT,
	
    FOREIGN KEY (product_id)
		REFERENCES product(product_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS freshly_made_item
(
	fresh_item_id	INT NOT NULL AUTO_INCREMENT,
    product_id		INT NOT NULL,
    kcal			INT,
    
    PRIMARY KEY (fresh_item_id),
    
    FOREIGN KEY (product_id)
		REFERENCES product(product_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS box
(
	box_id			INT NOT NULL AUTO_INCREMENT,
    size			ENUM('S', 'M', 'L') NOT NULL,		
    last_cleaning_date DATE,
    status			ENUM('Occupied', 'Available', 'Broken', 'Not use') NOT NULL,
	
    PRIMARY KEY (box_id)
);

CREATE TABLE IF NOT EXISTS cafe_dog
(
	dog_id			INT NOT NULL AUTO_INCREMENT,
    dog_name		CHAR(50) NOT NULL,
    breed			CHAR(50) NOT NULL,
    date_of_birth	DATE,
    weight			FLOAT NOT NULL,
    -- end of dog session
    last_checkup_date DATE,
    last_bath_date	DATE,
    health_status	VARCHAR(255) NOT NULL,
    sourcing_company CHAR(50),
    brought_price	FLOAT NOT NULL,
    showtime		ENUM('10-14', '14-18', '18-21', 'NO SHOWTIME') NOT NULL,
    
    PRIMARY KEY (dog_id)
);

CREATE TABLE IF NOT EXISTS customer_dog
(
	dog_id			INT NOT NULL AUTO_INCREMENT,
    dog_name		CHAR(50) NOT NULL,
    breed			CHAR(50) NOT NULL,
    date_of_birth	DATE,
    weight			FLOAT NOT NULL,
    -- end of dog session

    PRIMARY KEY (dog_id)
);

-- normalization from dog
CREATE TABLE IF NOT EXISTS customer_dog_foodtypes
(
	dog_id 			INT NOT NULL,
    food_types		CHAR(50) NOT NULL,
    
    PRIMARY KEY (dog_id, food_types),
    
    FOREIGN KEY (dog_id)
		REFERENCES customer_dog(dog_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cafe_dog_foodtypes
(
	dog_id 			INT NOT NULL,
    food_types		CHAR(50) NOT NULL,
    
    PRIMARY KEY (dog_id, food_types),
    
    FOREIGN KEY (dog_id)
		REFERENCES cafe_dog(dog_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS deposition
(
	dog_id			INT NOT NULL,
    deposition_id	INT NOT NULL AUTO_INCREMENT,
    product_id 		INT NOT NULL,
    box_id			INT,
    deposit_fee		FLOAT,
    is_retrieved	BOOLEAN NOT NULL,
    checkin_time    DATETIME,
    checkout_time	DATETIME,
    
    PRIMARY KEY (deposition_id, dog_id),
    
    FOREIGN KEY (product_id)
		REFERENCES product(product_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
        
	FOREIGN KEY (dog_id)
		REFERENCES customer_dog(dog_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
        
	FOREIGN KEY (box_id)
		REFERENCES box(box_id)
        ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS customer
(
	customer_id		INT NOT NULL,
	
    PRIMARY KEY (customer_id)
);

CREATE TABLE IF NOT EXISTS guest
(
	guest_id		INT NOT NULL,
	
    PRIMARY KEY (guest_id),
    
    FOREIGN KEY (guest_id)
		REFERENCES customer(customer_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cafe_member
(
	member_id		INT NOT NULL AUTO_INCREMENT,
    email			CHAR(50),
    date_of_birth	DATE,
    mobile_no		VARCHAR(10) NOT NULL,
	address1 		CHAR(255) NOT NULL,
    address2 		CHAR(255) NOT NULL,
    province		CHAR(255) NOT NULL,
    zipcode 		VARCHAR(5) NOT NULL,
    firstname		CHAR(50) NOT NULL,
    lastname		CHAR(50) NOT NULL,
	
    PRIMARY KEY (member_id),
    
    FOREIGN KEY (member_id)
		REFERENCES customer(customer_id)
        ON UPDATE CASCADE ON DELETE CASCADE
    
);

-- normalize from cafe_member
CREATE TABLE IF NOT EXISTS member_privileges
(
	customer_id		INT NOT NULL,
    privilege		VARCHAR(50),
    
    PRIMARY KEY (customer_id),
    
    FOREIGN KEY (customer_id)
		REFERENCES customer(customer_id)
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS purchased_by
(
	product_id		INT NOT NULL,
    customer_id		INT NOT NULL,
    transaction_id	INT NOT NULL,
    
    PRIMARY KEY (product_id, customer_id, transaction_id),
    
    FOREIGN KEY (product_id)
		REFERENCES product(product_id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    
    FOREIGN KEY (customer_id)
		REFERENCES customer(customer_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS transaction
(
	transaction_id	INT NOT NULL AUTO_INCREMENT,
	customer_id		INT NOT NULL,
	transaction_detail VARCHAR(255),
    transaction_method ENUM('CASH', 'CREDIT', 'DEBIT', 'LINEPAY', 'PROMPTPAY') NOT NULL,
    
    PRIMARY KEY (transaction_id, customer_id),
    
    FOREIGN KEY (customer_id)
		REFERENCES customer(customer_id)
        ON UPDATE CASCADE ON DELETE RESTRICT
    
);

CREATE TABLE IF NOT EXISTS user
(
	username	CHAR(10) NOT NULL,
    password	CHAR(255) NOT NULL,
    firstname	CHAR(50) NOT NULL,
    lastname	CHAR(50) NOT NULL,
    
    PRIMARY KEY (username)
);

-- User Store Procedure
DROP FUNCTION IF EXISTS usf_checkout;
DELIMITER $$
CREATE FUNCTION usf_checkout (v_dog_id INT, v_deposition_id INT) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE v_base_price FLOAT;
    DECLARE v_box_id INT;
    DECLARE v_box_size	FLOAT;
    DECLARE v_product_id INT;
    DECLARE v_is_retrieved INT;
    
    SELECT is_retrieved INTO v_is_retrieved FROM deposition WHERE deposition_id = v_deposition_id AND dog_id = v_dog_id;
    IF v_is_retrieved = 1 THEN
		RETURN 1;
	END IF;
    
    SELECT box_id, product_id INTO v_box_id, v_product_id FROM deposition WHERE deposition_id = v_deposition_id AND dog_id = v_dog_id;
    SELECT size INTO v_box_size FROM `box` WHERE box_id = v_box_id;
    SET v_base_price = 150;
    SET @price = v_base_price * v_box_size;
    
    -- update depostion :: checkout datetime, is retrieved, fee
	UPDATE 
		deposition 
	SET
		checkout_time = now(),
        is_retrieved = 1,
        deposit_fee = @price
	WHERE
		deposition_id = v_deposition_id and dog_id = v_dog_id;
        
    -- update product :: price
    UPDATE
		product
	SET
		price = @price
	WHERE
		product_id = v_product_id;
    -- udpate box :: status
    UPDATE
		`box`
	SET
		`status` = 'available'
	WHERE
		box_id = v_box_id;
	RETURN 0;
END$$
DELIMITER ;

DROP FUNCTION IF EXISTS usf_deposit_dog;
DELIMITER $$
CREATE FUNCTION `usf_deposit_dog`(v_dog_id INT, v_box_id INT) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE v_box_size INT;
    DECLARE v_status INT;
	DECLARE v_dog_name LONGTEXT;
    
    SET @deposition_fix_cost = 100;
	SELECT size, `status` INTO v_box_size, v_status FROM `box` WHERE box_id = v_box_id;
    SELECT dog_name INTO v_dog_name FROM customer_dog WHERE dog_id = v_dog_id;
    -- check box available
	IF v_status <> 2 THEN
 		RETURN 1;
	END IF; 
    
    -- set status to occupied
    UPDATE `box` SET `status` = 'occupied' WHERE box_id = v_box_id;
    
    -- insert product
    INSERT INTO 
		product
	SET
		product_name = CONCAT('deposition_', v_dog_name, '_', v_box_size),
        cost = @deposition_fix_cost,
        price = 0;
        
    -- insert deposit
    SET @v_product_id = LAST_INSERT_ID();
    INSERT INTO
		deposition
	SET
		dog_id = v_dog_id,
        product_id = @v_product_id,
        box_id = v_box_id,
        is_retrieved = false,
        checkin_time = NOW();	
	RETURN 0;
END$$
DELIMITER ;

-- index
CREATE INDEX price_index ON product(price) USING BTREE;









