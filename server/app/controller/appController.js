var Model = require('../model/appModel.js');

var CafeDog = function(dog){
  this.dog_id = dog.dog_id;
  this.dog_name = dog.dog_name;
  this.breed = dog.breed;
  this.date_of_birth = dog.date_of_birth;
  this.weight = dog.weight;

  this.last_checkup_date = dog.last_chechup_date;
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
  this.is_retrieved = deposit.is_retrieved;
  this.checkout_time = deposit.checkout_time;
}

exports.add_deposition = function(req,res){
  var new_dep = Deposition(req.body);

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

//For User SignUp/SignIn
var userCredential = function(user){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(user.password, salt, function(err,hash){
      this.password = hash;
    });
  });

  this.username = user.username;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
};

exports.sign_up = function(req,res){
  
    console.log('Signing Up');
    var new_user = userCredential(req.body);

    if (!new_user.username || !new_user.password || !new_user.firstname || !new_user.lastname){
      res.status(400).send({error:true, message:'Please provide data'})
    }else{
      Model.userCred.createUser(new_user, function(err,new_user){
        if (err) res.send(err);
        console.log('res',new_user);
        res.send(new_user);
      });
    }
};