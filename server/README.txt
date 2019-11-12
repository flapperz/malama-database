วิธีใช้ 
1. npm install nodemon 
2. npm install body-parser
3. npm install mysql
4. npm install express
5. เข้าไปแก้ username/password ใน Server.js กับ app/model/db.js
6. พอลงเสร็จให้ nodemon Server.js

ีapi ต่างๆ

//GET Cafe Dog , ADD Cafe Dog
GET : localhost:5000/cafedog
POST : localhost:5000/cafedog

//GET Customer Dog , ADD Customer Dod
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