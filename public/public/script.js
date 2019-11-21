//--------variable----------------------

var max_id = 0;

//--------Form Managrment---------------

//----------------Form Management (HIDE)

function hideFormAddCafeDog() {
  document.getElementById('popup-add-cafeDog').style.visibility = 'hidden';
  clearFormAddCafeDog();
}

function hideFormEditCafeDog() {
  document.getElementById('popup-edit-cafeDog').style.visibility = 'hidden';
  clearFormEditCafeDog();
}

//----------------Form Management (SHOW)

function showFormAddCafeDog() {
  document.getElementById('popup-add-cafeDog').style.visibility = 'visible';
}

function showFormEditCafeDog() {
  document.getElementById('popup-edit-cafeDog').style.visibility = 'visible';
}

//----------------Form Management (CLEAR)

function clearFormAddCafeDog() {
  clearFormValue();
  document.getElementById('add-cafeDog-form').reset();
}

function clearFormEditCafeDog() {
  clearFormValue();
  document.getElementById('edit-cafeDog-form').reset();
}

function clearFormValue() {
  $("[name='dog_name']").val(null);
  $("[name='breed']").val(null);
  $("[name='date_of_birth']").val(null);
  $("[name='weight']").val(null);
  $("[name='sourcing_company']").val(null);
  $("[name='brought_price']").val(null);
  $("[name='last_checkup_date']").val(null);
  $("[name='last_bath_date']").val(null);
  $("[name='health_status']").val(null);
  $("[name='show-time']").val(null);
}

//-------Err Management-----------------

function addError(error, message) {
  return error == '' ? message : error + ', ' + message;
}

//--------------API-----------------

function findCafeDog(id) {
  try {
    return axios.get('http://localhost:5000/cafedog').then(response => {
      // console.log(response);
      var dog;
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].dog_id == id) {
          dog = {
            dog_id: id,
            dog_name: response.data[i].dog_name,
            breed: response.data[i].breed,
            date_of_birth: response.data[i].date_of_birth.slice(0, 10),
            weight: response.data[i].weight,
            last_checkup_date: response.data[i].last_checkup_date.slice(0, 10),
            last_bath_date: response.data[i].last_bath_date.slice(0, 10),
            health_status: response.data[i].health_status,
            sourcing_company: response.data[i].sourcing_company,
            brought_price: response.data[i].brought_price,
            showtime: response.data[i].showtime
          };
          console.log('return');
          console.log(dog);

          return dog;
        }
      }
    });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}

function edit(id) {
  showFormEditCafeDog();
  //ถ้าขยันก็ทำค่า default ไป ถ้า ขก.ก็ทำแบบที่เคยทำอะ55555
  // document.getElementById('dog_name').value = 'new value';
  // $("[name='dog_name']").val('oil');
  // console.log('edit' + id);
  var find = findCafeDog(id);
  find.then(dog => {
    console.log(dog.last_checkup_date);
    $("[name='dog_name']").val(dog.dog_name);
    $("[name='breed']").val(dog.breed);
    $("[name='date_of_birth']").val(dog.date_of_birth);
    $("[name='weight']").val(dog.weight);
    $("[name='sourcing_company']").val(dog.sourcing_company);
    $("[name='brought_price']").val(dog.brought_price);
    $("[name='last_checkup_date']").val(dog.last_checkup_date);
    $("[name='last_bath_date']").val(dog.last_bath_date);
    $("[name='health_status']").val(dog.health_status);
    $("[name='show-time']").val(dog.showtime);
  });
  // console.log('end');
  // console.log(dog.dog_name);
  // try {
  //   axios.get('http://localhost:5000/cafedog').then(response => {
  //     console.log(response);

  //     for (let i = 0; i < response.data.length; i++) {
  //       if (i == ID) {
  //       }
  //       const ID = response.data[i].dog_id;
  //       const NAME = response.data[i].dog_name;
  //       const BREED = response.data[i].breed;
  //       const BIRTHDATE = response.data[i].date_of_birth.slice(0, 10);
  //       const WEIGHT = response.data[i].weight;
  //     }
  //     html += '</table>';
  //     document.getElementById('dog-display').innerHTML = html;
  //   });
  // } catch (error) {
  //   console.log('failed');
  //   console.error(error);
  // }
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
