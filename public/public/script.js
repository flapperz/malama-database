//--------variable----------------------

var max_id = 0;

//--------Form Managrment---------------

//----------------Form Management (HIDE)

function hideFormAddCafeDog() {
  document.getElementById('popup-add-cafeDog').style.visibility = 'hidden';
  clearFormAddCafeDog();
}

//----------------Form Management (SHOW)

function showFormAddCafeDog() {
  document.getElementById('popup-add-cafeDog').style.visibility = 'visible';
}

//----------------Form Management (CLEAR)

function clearFormAddCafeDog() {
  document.getElementById('add-dog-form').reset();
  // document.getElementsByClassName('form').reset();
}

//-------Err Management-----------------

function addError(error, message) {
  return error == '' ? message : error + ', ' + message;
}

//--------------API-----------------

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
        // const BIRTHDATE = response.data[i].date_of_birth;
        const BIRTHDATE = response.data[i].date_of_birth.slice(0, 10);
        const WEIGHT = response.data[i].weight;

        max_id = max_id > ID ? max_id : ID;

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
    console.log('failed');
    console.error(error);
  }
}

function addCafeDog() {
  var error = '';
  var ID = max_id + 1;
  var NAME = $("[name='dog_name']").val();
  var BREED = $("[name='breed']").val();
  var BIRTHDATE = $("[name='date_of_birth']").val();
  var WEIGHT = $("[name='weight']").val();
  var COMPANY = $("[name='sourcing_company']").val();
  var PRICE = $("[name='brought_price']").val();
  var LAST_CHECK = $("[name='last_checkup_date']").val();
  var LAST_BATH = $("[name='last_bath_date']").val();
  var HEALTH = $("[name='health_status']").val();
  var SHOWTIME = $("[name='show-time']").val();

  if (
    NAME == '' ||
    BREED == '' ||
    BIRTHDATE == '' ||
    WEIGHT == '' ||
    COMPANY == '' ||
    PRICE == '' ||
    LAST_CHECK == '' ||
    LAST_BATH == '' ||
    HEALTH == null ||
    SHOWTIME == null
  ) {
    error = addError(error, 'Fields required');
  }

  if (error != '') {
    window.alert(error);
    return;
  } else {
    axios
      .post('http://localhost:5000/cafedog', {
        dog_id: ID,
        dog_name: NAME,
        breed: BREED,
        date_of_birth: BIRTHDATE,
        weight: WEIGHT,
        last_checkup_date: LAST_CHECK,
        last_bath_date: LAST_BATH,
        health_status: HEALTH,
        sourcing_company: COMPANY,
        brought_price: PRICE,
        showtime: SHOWTIME
      })
      .then(function(response) {
        console.log(response);
        max_id = ID;
        hideFormAddCafeDog();
        getCafeDog();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function addCafeDogTest() {
  axios
    .post('http://localhost:5000/cafedog', {
      dog_id: 64,
      dog_name: 'OIL',
      breed: 'EnglishCocker',
      date_of_birth: '1999-12-11',
      weight: '12',
      last_checkup_date: '1999-12-11',
      last_bath_date: '1999-12-11',
      health_status: 'yes',
      sourcing_company: 'dontknow',
      brought_price: '12',
      showtime: '14-18'
    })
    .then(function(response) {
      console.log(response);
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
