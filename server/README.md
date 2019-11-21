# วิธีใช้ 
1. npm install 
2. เข้าไปแก้ username/password ใน Server.js กับ app/model/db.js 
3. พอลงเสร็จให้ nodemon Server.js 

# API ต่างๆ 

//GET Cafe Dog  
**GET** : localhost:5000/cafedog 

//ADD Cafe Dog  
**POST** : localhost:5000/cafedog 

//GET Customer Dog  
**GET** : localhost:5000/customerdog 

//ADD Customer Dod  
**POST** : localhost:5000/customerdog 

//GET Dog from 'TABLE' by 'NAME' -> เอาไว้ search  
**GET** : localhost:5000/cafe_dog/'name'  
**GET** : localhost:5000/customer_dog/'name' 

//UPDATE Cafe/Customer Dog by 'ID'  
**PUT** : localhost:5000/cafedog/'id'  
**PUT** : localhost:5000/customerdog/'id' 

//DELETE Dog from 'TABLE' by 'ID'  
**DELETE** : localhost:5000/del/'table'/'id' 

//GET Deposition  
**GET** : localhost:5000/dep 

//ADD Deposition  
**POST** : localhost:5000/dep

//For Signup  
**POST** : localhost:5000/signup  
parameters  

        {
            username:...,
            pwd:...,
            firstname:...,
            lastname:....
        } 

//For Sigin  
**POST** : localhost:5000/signin  
parameters  

        {
            username:...,
            pwd:...
        } 
