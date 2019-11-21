var sql = require('./db.js');

var DogUpdater = function(dog){
    this.dog_id = dog.dog_id;
    this.dog_name = dog.dog_name;
    this.dog_breed = dog.breed;
    this.dog_date_of_birth = dog.date_of_birth;
    this.dog_weight = dog.weight;
};

//Add Cafe Dog
DogUpdater.addCafeDog = function(newDog,result){
    sql.query("insert into cafe_dog set ?", newDog, function(err,res){
        if (err){
            console.log('Error: ',err);
            result(err,null);
        }else{
            console.log(res.insertId);
            result(null,res.insertId);
        }
    });
};

//Add Customer Dog
DogUpdater.addCustomerDog = function(newDog,result){
    sql.query("insert into customer_dog set ?", newDog, function(err,res){
        if (err){
            console.log('Error: ',err);
            result(err,null);
        }else{
            console.log(res.insertId);
            result(null,res.insertId);
        }
    });
};

//Query Dog at 'TABLE' by name
DogUpdater.getDogByName = function(dogName, table, result){
    let query = "select * from "+table+" where dog_name = ?";
    sql.query(query, dogName, function (err,res){
        if (err){
            console.log('Error: ',err);
            result(err,null);
        }else{
            // console.log(res.insertId);
            result(null,res);
        }
    });
};

//Get Cafe Dog list
DogUpdater.getCafeDog = function (result){
    sql.query("select * from cafe_dog", function (err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('cafe_dog list : ', res);  
            result(null, res);
        }
    });
};

//Get Customer Dog list
DogUpdater.getCustomerDog = function (result){
    sql.query("select * from customer_dog", function (err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
          console.log('customer_dog list : ', res);  

         result(null, res);
        } 
    });
}

DogUpdater.updateCafeDog = function(id, value, result){
    sql.query("update cafe_dog set ? where dog_id = ?", [value,id], function(err,res){
        if (err){
            console.log("error : ", err);
            result(null,err);
        }
        else{
            result(null, res);
        }
    })
};

DogUpdater.updateCustomerDog = function(id, value, result){
    sql.query("update customer_dog set ? where dog_id = ?", [value,id], function(err,res){
        if (err){
            console.log("error : ", err);
            result(null,err);
        }
        else{
            result(null, res);
        }
    })
};

DogUpdater.deleteDog = function(id, table, result){
    var query = "delete from "+table+" where dog_id = ?";
    sql.query(query,id, function (err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
       
         result(null, res);
        }
    });
};

//DEPOSITION
DogUpdater.depositDog = function(value, result){
    sql.query('insert into deposition set ?', value, function(err,res){
        if (err){
            console.log('Error: ',err);
            result(err,null);
        }else{
            console.log(res.insertId);
            result(null,res.insertId);
        }
    });
};

DogUpdater.getDeposition = function(result){
    sql.query('select * from deposition', function (err,res){
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('deposition list : ', res);  
            result(null, res);
        }
    });
};

//LOGIN


var userCredential = function(user){
    this.username = user.username;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
}

//POST - Sign Up
userCredential.createUser = function(value,result){
    sql.query('insert into `user` set ?', value, function(err,res){
        if (err){
            console.log("Error adding user",err);
            result(null,err);
        }else{
            console.log('Add user complete');
            result(null,res);
        }
    });
};

userCredential.loginRequest = function(username,result){
    sql.query('select * from `user` where username = ?', username, function(err,res){
        res = res[0]
        console.log('user',res);

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('query password : ', res.password);  
            result(null, res.password);
        } 
    });
};




//Exports All
module.exports = {dogUpdater : DogUpdater, userCred : userCredential};