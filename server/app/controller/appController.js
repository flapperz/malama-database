var Model = require('../model/appModel.js');

var CafeDog = function(dog){
  this.dog_id = dog.dog_id;
  this.dog_name = dog.dog_name;
  this.breed = dog.breed;
  this.date_of_birth = dog.date_of_birth;
  this.weight = dog.weight;

  this.last_checkup_date = dog.last_checkup_date;
  this.last_bath_date = dog.last_bath_date;
  this.health_status =  dog.health_status;
  this.sourcing_company = dog.sourcing_company;
  this.brought_price = dog.brought_price;
  this.showtime = dog.showtime;
};

var CustDog = function(dog){
  this.dog_id = dog.dog_id;
  this.dog_name = dog.dog_name;
  this.breed = dog.breed;
  this.date_of_birth = dog.date_of_birth;
  this.weight = dog.weight;
};

exports.add_cafe_dog = function(req, res){
  var new_dog = new CafeDog(req.body);

  if (!new_dog.dog_id || !new_dog.dog_name || !new_dog.breed || !new_dog.date_of_birth || !new_dog.weight){
    res.status(400).send({error:true, message: 'Please provide data'})
  }else{
    Model.dogUpdater.addCafeDog(new_dog, function(err,dog){
      if (err)
        res.send(err);
      res.json(dog);
    });
  }
};

exports.add_customer_dog = function(req, res){
  var new_dog = new CustDog(req.body);

  if (!new_dog.dog_id || !new_dog.dog_name || !new_dog.breed || !new_dog.date_of_birth || !new_dog.weight){
    res.status(400).send({error:true, message: 'Please provide data'})
  }else{
    Model.dogUpdater.addCustomerDog(new_dog, function(err,dog){
      if (err)
        res.send(err);
      res.json(dog);
    });
  }
};

exports.list_cafe_dog = function(req,res){
  Model.dogUpdater.getCafeDog(function(err, dog){
    console.log('controller')
        if (err)
          res.send(err);
          console.log('res', dog);
        res.send(dog);
  });
};

exports.list_customer_dog = function(req,res){
  Model.dogUpdater.getCustomerDog(function(err, dog){
    console.log('controller')
        if (err)
          res.send(err);
          console.log('res', dog);
        res.send(dog);
  });
};

//REQUEST NEEDS TO ADD req.table PARAMETER
exports.get_dog_by_name = function(req,res){
  Model.dogUpdater.getDogByName(req.params.dog_name, req.params.table, function(err,dog){
    if (err)
      res.send(err);
    res.json(dog);
  });
};

exports.update_cafe_dog = function(req,res){
  Model.dogUpdater.updateCafeDog(req.params.dog_id, new CafeDog(req.body), function(err,dog){
    if (err)
      res.send(err);
    res.json(dog);
  });
};

exports.update_customer_dog = function(req,res){
  Model.dogUpdater.updateCustomerDog(req.params.dog_id, new CustDog(req.body), function(err,dog){
    if (err) 
      res.send(err);
    res.json(dog);
  });
};

exports.delete_dog = function(req,res){
  Model.dogUpdater.deleteDog(req.params.dog_id, req.params.table, function(err,dog){
    if (err)
      res.send(err);
    res.json({message: 'Dog Successfully delete'});
  });
};


//Deposit Dog
var Deposition = function(deposit){
  this.dog_id = deposit.dog_id;
  this.deposition_id = deposit.deposition_id;
  this.product_id = deposit.product_id;
  this.box_id = deposit.box_id;
  this.deposit_fee = deposit.deposit_fee;
  this.is_retrieved = deposit.is_retrieved;
  this.checkout_time = deposit.checkout_time;
};

exports.add_deposition = function(req,res){
  console.log(req.body);
  let new_dep = new Deposition(req.body);
  console.log(new_dep)

  if (!new_dep.dog_id || !new_dep.deposition_id || !new_dep.product_id || !new_dep.box_id || !new_dep.is_retrieved || !new_dep.checkout_time){
    res.status(400).send({error:true, message: 'Please provide data'})
  }else{
    Model.dogUpdater.depositDog(new_dep, function(err,dog){
      if (err)
        res.send(err);
      res.json(dog);
    });
  }
};

exports.get_deposition = function(req,res){
  Model.dogUpdater.getDeposition(function(err, dog){
    console.log('controller')
        if (err)
          res.send(err);
          console.log('res', dog);
        res.send(dog);
  });
};

//For hashing password 
var bcrypt = require('bcryptjs');
const saltRounds = 10;

//For User SignUp/SignIn
var userCredential = function(users){
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(users.password, salt);
      
  // console.log('password',hash);
  // console.log('password',this.pwd);
  this.username = users.username;
  this.password = hash;
  this.firstname = users.firstname;
  this.lastname = users.lastname;
};

exports.sign_up = function(req,res){
    console.log('Signing Up');
    console.log(JSON.stringify(req.body));
    let new_user = new userCredential(req.body);
    console.log(new_user);

    if (!new_user.username || !new_user.password || !new_user.firstname || !new_user.lastname){
      res.status(400).send({error:true, message:'Please provide user data'})
    }else{
      Model.userCred.createUser(new_user, function(err,new_user){
        if (err) res.send(err);
        console.log('res',new_user);
        res.send(new_user);
      });
    }
};

exports.log_in = function(req,res){
  console.log('Signing In');
  console.log(req.body.username);

  Model.userCred.loginRequest(req.body.username,function(sql_err,usr_hash){
    console.log('user password from query:',usr_hash);
    let flag = bcrypt.compareSync(req.body.password,usr_hash);

    if (flag){
      console.log('Login Success')
      res.send({username : req.body.username, status : 'success'});
    }else{
      res.status(400).send({error:true, message:'Wrong Password'})
    }
  });
}


//For Box query
exports.get_boxes = function(req,res){
  console.log('Get all boxes list');

  Model.boxes.getBoxes(function(err,box){
    if (err) console.log(err);
    console.log('Available box',box)
    res.send(box);
  })
}