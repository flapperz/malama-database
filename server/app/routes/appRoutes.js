module.exports = function(app) {
  var todoList = require('../controller/appController');

  app.route('/cafedog')
    .get(todoList.list_cafe_dog) //LIST CAFE DOG
    .post(todoList.add_cafe_dog); //ADD CAFE DOG
    
  //UPDATE CAFE DOG
  app.route('/cafedog/:dog_id')
    .put(todoList.update_cafe_dog);
    
  app.route('/customerdog')
    .get(todoList.list_customer_dog) //LIST CUST DOG
    .post(todoList.add_customer_dog); //ADD CUST DOG

  //UPDATE CUST DOG
  app.route('/customerdog/:dog_id')
    .put(todoList.update_customer_dog);
    
  //GET DOG BY NAME FROM 'table'
  app.route('/:table/:dog_name')
    .get(todoList.get_dog_by_name);
  
  //DELETE DOGE
  app.route('/del/:table/:dog_id')
    .delete(todoList.delete_dog);

  app.route('/dep')
    .get(todoList.get_deposition)
    .post(todoList.add_deposition);

  app.route('/login/signup')
    .post(todoList.sign_up);

  app.route('/login/signin')
    .post(todoList.log_in);
};