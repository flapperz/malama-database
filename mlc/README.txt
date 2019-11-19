How to run
1. $ npm install
2. edit username/password in
    - Server.js
    - app/model/db.js
3. $ nodemon Server.js

ีapi
//GET Cafe Dog , ADD Cafe Dog
GET : localhost:5000/cafedog
POST : localhost:5000/cafedog

//GET Customer Dog , ADD Customer Dog
GET : localhost:5000/customerdog
POST : localhost:5000/customerdog

//GET Dog from 'TABLE' by 'NAME' -> เอาไว้ search
GET : localhost:5000/cafe_dog/'name'
GET : localhost:5000/customer_dog/'name'

//UPDATE Cafe/Customer Dog by 'ID'
PUT : localhost:5000/cafedog/'id'
PUT : localhost:5000/customerdog/'id'

//DELETE Dog from 'TABLE' by 'ID'
DELETE : localhost:5000/del/'table'/'id'
(table = 'cafe_dog' or 'customer_dog')

---------------------------------
about project
---------------------------------
database : Krit Chonlapand
design : Jinwara Jenjenprasert
back-end : TTK (เกื้อกูล ลิ่วเจริญชัย)
front-end : Kanjana Pednok