// const axios = require("axios");

// DELETE : localhost:5000/del/'table'/'id'
// (table = 'cafe_dog' or 'customer_dog')

console.log('using script.js');

function hideForm() {
  document.getElementById('popup').style.visibility = 'hidden';
}

function showForm() {
  document.getElementById('popup').style.visibility = 'visible';
}

function edit(id) {
  console.log('edit' + id);
}

function delCafeDog(id) {
  try {
    axios.delete('http://localhost:5000/del/cafe_dog/' + id).then(response => {
      console.log(response.data);
      window.alert('ID: ' + id + ' Successfully delete');
      getCafeDog();
    });
  } catch (error) {
    console.error(error);
  }
}
function getCafeDog() {
  try {
    axios.get('http://localhost:5000/cafedog').then(response => {
      console.log(response);
      var html =
        '<table class="table-cafe"><tr><th>ID</th><th>NAME</th><th>BREED</th><th>BIRTHDATE</th><th>WEIGHT</th><th>EDIT</th><th>DELETE</th></tr>';

      for (let i = 0; i < response.data.length; i++) {
        const ID = response.data[i].dog_id;
        const NAME = response.data[i].dog_name;
        const BREED = response.data[i].breed;
        const BIRTHDATE = response.data[i].date_of_birth;
        const WEIGHT = response.data[i].weight;
        html +=
          '<tr><td>' +
          ID +
          '</td><td>' +
          NAME +
          '</td><td>' +
          BREED +
          '</td><td>' +
          BIRTHDATE +
          '</td><td>' +
          WEIGHT +
          '</td><td><img src="../img/pencil.png" onclick="edit(' +
          ID +
          ')" /></td><td><img src="../img/bin.png" onclick="delCafeDog(' +
          ID +
          ')"></td></tr>';
      }
      html += '</table>';
      document.getElementById('dog-display').innerHTML = html;
    });
  } catch (error) {
    console.log('failed')
    console.error(error);
  }
}
function addCafeDog() {
  var NAME = $("[name='dog_name']").val();
  var BREED = $("[name='surname']").val();
  var BIRTHDATE = $("[name='nickname']").val();
  var WEIGHT = $("[name='image']").val();
  var sourcing_company = $("[name='gender']:checked").val();

  console.log(NAME + BREED + BIRTHDATE + WEIGHT + sourcing_company);

  // axios
  //   // .post("https://sb-oil-web-bootcamp.herokuapp.com/users", {
  //   .post('http://localhost:3000/api/users', {
  //     name: name,
  //     surname: surname,
  //     nickname: nickname,
  //     gender: gender,
  //     image: image
  //   })
  //   .then(function(response) {
  //     console.log(response);
  //     var obj = response.data;
  //     var status = obj.status;
  //     if (status == 0) {
  //       errMessage = obj.error;
  //       $('createUserForm').trigger('reset');
  //       alert(errMessage);
  //       unhideForm();
  //     } else {
  //       getAllUsers();
  //     }
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
}

function createUser() {
  hideForm();
  var name = $("[name='name']").val();
  var surname = $("[name='surname']").val();
  var nickname = $("[name='nickname']").val();
  var image = $("[name='image']").val();
  var gender = $("[name='gender']:checked").val();
  var text =
    'name=' +
    name +
    '&surname=' +
    surname +
    '&nickname=' +
    nickname +
    '&gender=' +
    gender +
    '&image=' +
    image;
  var xmlhttp = new XMLHttpRequest();
  var str = '';

  axios
    .post('https://sb-oil-web-bootcamp.herokuapp.com/users', {
      name: name,
      surname: surname,
      nickname: nickname,
      gender: gender,
      image: image
    })
    .then(function(response) {
      console.log(response);
      var obj = response.data;
      var status = obj.status;
      if (status == 0) {
        errMessage = obj.error;
        $('createUserForm').trigger('reset');
        alert(errMessage);
        unhideForm();
      } else {
        getAllUsers();
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

// function getCustomerDog() {
//   try {
//     const response = await axios.get("http://localhost:5000/customerdog");
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function addCafeDog() {
//   //มาแก้ parameter ที่ส่งด้วยจ้าาาาา : 3
//   try {
//     const response = await axios.post("http://localhost:5000/cafedog", {
//       dog_id: 99,
//       dog_name: "OIL",
//       breed: "EnglishCocker",
//       date_of_birth: "1999-12-11",
//       weight: "12",
//       last_checkup_date: "1999-12-11",
//       last_bath_date: "1999-12-11",
//       health_status: "yes",
//       sourcing_company: "dontknow",
//       brought_price: "12",
//       showtime: "14-18"
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function addCustomerDog() {
//   //มาแก้ parameter ที่ส่งด้วยจ้าาาาา : 3
//   try {
//     const response = await axios.post("http://localhost:5000/customerdog", {
//       dog_id: 999,
//       dog_name: "OIL",
//       breed: "EnglishCocker",
//       date_of_birth: "1999-12-11",
//       weight: "12"
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function getCafeDogByName(name) {
//   try {
//     const response = await axios.get("http://localhost:5000/cafe_dog/" + name);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function getCustomerDogByName(name) {
//   try {
//     const response = await axios.get(
//       "http://localhost:5000/customer_dog/" + name
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function updateCafeDogByID(id) {
//   //มาแก้ parameter ที่ส่งด้วยจ้าาาาา : 3
//   try {
//     const response = await axios.put("http://localhost:5000/cafedog/" + id, {
//       dog_id: id,
//       dog_name: "EDIT",
//       breed: "EnglishCocker",
//       date_of_birth: "1999-12-11",
//       weight: "12",
//       last_checkup_date: "1999-12-11",
//       last_bath_date: "1999-12-11",
//       health_status: "yes",
//       sourcing_company: "dontknow",
//       brought_price: "12",
//       showtime: "14-18"
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function updateCustomerDogByID(id) {
//   //มาแก้ parameter ที่ส่งด้วยจ้าาาาา : 3
//   try {
//     const response = await axios.put(
//       "http://localhost:5000/customerdog/" + id,
//       {
//         dog_id: id,
//         dog_name: "EDIT",
//         breed: "EnglishCocker",
//         date_of_birth: "1999-12-11",
//         weight: "12"
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// getCafeDog();
// getCustomerDog();
// addCafeDog();
// addCustomerDog();

//if ในหน้า form ว่าถ้าไม่กรอกห้ามใส่ !!!!!
// getCafeDogByName("oil");
// getCustomerDogByName("oil");
// updateCafeDogByID(2);
// updateCustomerDogByID(1);
