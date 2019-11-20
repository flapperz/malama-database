# malama-database
Final project for Database design subject.
This repository include 
- sql file to create malama database
- local server for api request
- local server for hosting cafe's website

## Prerequisite
- Node.js
- MySQL Workbench

## How to run
- Run sql/malama_setup.sql in mySQL Workbench to create malama schema
- Install all Node.js dependency package using `npm install` in 2 folders
    - `server/`
    - `public/`
- Running back-end server `nodemon server.js` in `server/`
- Running front-end server `nodemon frontend-server.js` in `public/`
- Open `http://localhost:3000/html/basic-page.html` VOLA!

## API description
api
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

## Credits
database : Krit Chonlapand
design : Jinwara Jenjenprasert
back-end : TTK (เกื้อกูล ลิ่วเจริญชัย)
front-end : Kanjana Pednok
