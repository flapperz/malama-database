//--------variable----------------------

var max_id_cafe = 0;
var max_id_customer = 0;

var edit_id = 0;
var page = '';

//-------OTHERS-------------------------
function setPage(thisPage) {
  console.log(thisPage);
  page = thisPage;
  if (page == 'CAFE') {
    document.getElementById('CAFE').style.textDecoration = 'underLine';
    document.getElementById('CUSTOMER').style.textDecoration = 'none';
    document.getElementById('DEPOSITION').style.textDecoration = 'none';
  } else if (page == 'CUSTOMER') {
    document.getElementById('CAFE').style.textDecoration = 'none';
    document.getElementById('CUSTOMER').style.textDecoration = 'underLine';
    document.getElementById('DEPOSITION').style.textDecoration = 'none';
  } else if (page == 'DEPOSTION') {
    document.getElementById('CAFE').style.textDecoration = 'none';
    document.getElementById('CUSTOMER').style.textDecoration = 'none';
    document.getElementById('DEPOSITION').style.textDecoration = 'underLine';
  }
}

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

function hideFormAddCustomerDog() {
  document.getElementById('popup-add-customerDog').style.visibility = 'hidden';
  clearFormAddCafeDog();
}

function hideFormEditCustomerDog() {
  document.getElementById('popup-edit-customerDog').style.visibility = 'hidden';
  clearFormEditCafeDog();
}

//----------------Form Management (SHOW)

function showFormAddDog() {
  if (page == 'CAFE') {
    showFormAddCafeDog();
  } else if (page == 'CUSTOMER') {
    showFormAddCustomerDog();
  }
}

function showFormAddCafeDog() {
  document.getElementById('popup-add-cafeDog').style.visibility = 'visible';
}

function showFormEditCafeDog() {
  document.getElementById('popup-edit-cafeDog').style.visibility = 'visible';
}

function showFormAddCustomerDog() {
  document.getElementById('popup-add-customerDog').style.visibility = 'visible';
}

function showFormEditCustomerDog() {
  document.getElementById('popup-edit-customerDog').style.visibility =
    'visible';
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

function clearSearchingValue() {
  document.getElementById('searching-form').reset();
}

//-------Err Management-----------------

function addError(error, message) {
  return error == '' ? message : error + ', ' + message;
}

//--------------API-----------------

function searchDog() {
  if (page == 'CAFE') {
    searchCafeDog();
  } else if (page == 'CUSTOMER') {
    searchCustomerDog();
  }
}

//cafeDog

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

function editCafeDog() {
  var error = '';
  const ID = edit_id;
  var NAME = $("[id='edit_cafeDog_dog_name']").val();
  var BREED = $("[id='edit_cafeDog_breed']").val();
  var BIRTHDATE = $("[id='edit_cafeDog_date_of_birth']").val();
  var WEIGHT = $("[id='edit_cafeDog_weight']").val();
  var COMPANY = $("[id='edit_cafeDog_sourcing_company']").val();
  var PRICE = $("[id='edit_cafeDog_brought_price']").val();
  var LAST_CHECK = $("[id='edit_cafeDog_last_checkup_date']").val();
  var LAST_BATH = $("[id='edit_cafeDog_last_bath_date']").val();
  var HEALTH = $("[id='edit_cafeDog_health_status']").val();
  var SHOWTIME = $("[id='edit_cafeDog_show-time']").val();

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
      .put('http://localhost:5000/cafedog/' + ID, {
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
        hideFormEditCafeDog();
        getCafeDog();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function editCafeDog_(id) {
  showFormEditCafeDog();
  edit_id = id;

  var find = findCafeDog(id);
  find.then(dog => {
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
  // setPage('CAFE');
  try {
    axios.get('http://localhost:5000/cafedog').then(response => {
      console.log(response);
      var html =
        '<table class="table-cafe"><thead><tr><th>ID</th><th>NAME</th><th>BREED</th><th>BIRTHDATE</th><th>WEIGHT</th><th>COMPANY</th><th>PRICE</th><th>LAST_CHECK</th><th>LAST_BATH</th><th>HEALTH</th><th>SHOWTIME</th><th>EDIT</th><th>DELETE</th></tr></thead></table>';

      html += '<div class="table-data"><table class="table-cafe"><tbody>';
      for (let i = 0; i < response.data.length; i++) {
        const ID = response.data[i].dog_id;
        const NAME = response.data[i].dog_name;
        const BREED = response.data[i].breed;
        // const BIRTHDATE = response.data[i].date_of_birth;
        const BIRTHDATE = response.data[i].date_of_birth.slice(0, 10);
        const WEIGHT = response.data[i].weight;
        const COMPANY = response.data[i].sourcing_company;
        const PRICE = response.data[i].brought_price;
        const LAST_CHECK = response.data[i].last_checkup_date.slice(0, 10);
        const LAST_BATH = response.data[i].last_bath_date.slice(0, 10);
        const HEALTH = response.data[i].health_status;
        const SHOWTIME = response.data[i].showtime;
        max_id_cafe = max_id_cafe > ID ? max_id_cafe : ID;

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
          '</td><td>' +
          COMPANY +
          '</td><td>' +
          PRICE +
          '</td><td>' +
          LAST_CHECK +
          '</td><td>' +
          LAST_BATH +
          '</td><td>' +
          HEALTH +
          '</td><td>' +
          SHOWTIME +
          '</td><td><img src="../img/pencil.png" onclick="editCafeDog_(' +
          ID +
          ')" /></td><td><img src="../img/bin.png" onclick="delCafeDog(' +
          ID +
          ')"></td></tr>';
      }
      html += '</tbody></table></div>';
      document.getElementById('dog-display').innerHTML = html;
      setPage('CAFE');
      // console.log(html);
    });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}

function addCafeDog() {
  var error = '';
  var ID = max_id_cafe + 1;
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
        max_id_cafe = ID;
        hideFormAddCafeDog();
        getCafeDog();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function searchCafeDog() {
  const search_name = $("[id='search_form']").val();
  console.log(search_name);
  try {
    axios
      .get('http://localhost:5000/cafe_dog/' + search_name)
      .then(response => {
        console.log(response);
        var html =
          '<table class="table-cafe"><thead><tr><th>ID</th><th>NAME</th><th>BREED</th><th>BIRTHDATE</th><th>WEIGHT</th><th>COMPANY</th><th>PRICE</th><th>LAST_CHECK</th><th>LAST_BATH</th><th>HEALTH</th><th>SHOWTIME</th><th>EDIT</th><th>DELETE</th></tr></thead></table>';

        html += '<div class="table-data"><table class="table-cafe"><tbody>';
        for (let i = 0; i < response.data.length; i++) {
          const ID = response.data[i].dog_id;
          const NAME = response.data[i].dog_name;
          const BREED = response.data[i].breed;
          // const BIRTHDATE = response.data[i].date_of_birth;
          const BIRTHDATE = response.data[i].date_of_birth.slice(0, 10);
          const WEIGHT = response.data[i].weight;
          const COMPANY = response.data[i].sourcing_company;
          const PRICE = response.data[i].brought_price;
          const LAST_CHECK = response.data[i].last_checkup_date.slice(0, 10);
          const LAST_BATH = response.data[i].last_bath_date.slice(0, 10);
          const HEALTH = response.data[i].health_status;
          const SHOWTIME = response.data[i].showtime;
          max_id_cafe = max_id_cafe > ID ? max_id_cafe : ID;

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
            '</td><td>' +
            COMPANY +
            '</td><td>' +
            PRICE +
            '</td><td>' +
            LAST_CHECK +
            '</td><td>' +
            LAST_BATH +
            '</td><td>' +
            HEALTH +
            '</td><td>' +
            SHOWTIME +
            '</td><td><img src="../img/pencil.png" onclick="editCafeDog_(' +
            ID +
            ')" /></td><td><img src="../img/bin.png" onclick="delCafeDog(' +
            ID +
            ')"></td></tr>';
        }
        html += '</tbody></table></div>';
        document.getElementById('dog-display').innerHTML = html;
        // console.log(html);
        clearSearchingValue();
      });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}

//customerDog

// "dog_id": 1,
// "dog_name": "oil",
// "breed": "oil",
// "date_of_birth": "1999-12-09T17:00:00.000Z",
// "weight": 12

function findCustomerDog(id) {
  try {
    return axios.get('http://localhost:5000/customerdog').then(response => {
      // console.log(response);
      var dog;
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].dog_id == id) {
          dog = {
            dog_id: id,
            dog_name: response.data[i].dog_name,
            breed: response.data[i].breed,
            date_of_birth: response.data[i].date_of_birth.slice(0, 10),
            weight: response.data[i].weight
          };
          // console.log('return');
          // console.log(dog);
          return dog;
        }
      }
    });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}

function editCustomerDog() {
  var error = '';
  const ID = edit_id;
  var NAME = $("[id='edit_customerDog_dog_name']").val();
  var BREED = $("[id='edit_customerDog_breed']").val();
  var BIRTHDATE = $("[id='edit_customerDog_date_of_birth']").val();
  var WEIGHT = $("[id='edit_customerDog_weight']").val();

  if (NAME == '' || BREED == '' || BIRTHDATE == '' || WEIGHT == '') {
    error = addError(error, 'Fields required');
  }

  if (error != '') {
    window.alert(error);
    return;
  } else {
    axios
      .put('http://localhost:5000/customerdog/' + ID, {
        dog_id: ID,
        dog_name: NAME,
        breed: BREED,
        date_of_birth: BIRTHDATE,
        weight: WEIGHT
      })
      .then(function(response) {
        console.log(response);
        hideFormEditCustomerDog();
        getCustomerDog();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function editCustomerDog_(id) {
  console.log('editCustomerDog : ' + id);
  showFormEditCustomerDog();
  edit_id = id;
  var find = findCustomerDog(id);
  find.then(dog => {
    $("[id='edit_customerDog_dog_name']").val(dog.dog_name);
    $("[id='edit_customerDog_breed']").val(dog.breed);
    $("[id='edit_customerDog_date_of_birth']").val(dog.date_of_birth);
    $("[id='edit_customerDog_weight']").val(dog.weight);
  });
}

function delCustomerDog(id) {
  try {
    axios
      .delete('http://localhost:5000/del/customer_dog/' + id)
      .then(response => {
        console.log(response.data);
        window.alert('ID: ' + id + ' Successfully delete');
        getCustomerDog();
      });
  } catch (error) {
    console.error(error);
  }
}

function getCustomerDog() {
  setPage('CUSTOMER');
  try {
    axios.get('http://localhost:5000/customerdog').then(response => {
      console.log(response);
      var html =
        '<table class="table-cafe"><thead><tr><th>ID</th><th>NAME</th><th>BREED</th><th>BIRTHDATE</th><th>WEIGHT</th><th>EDIT</th><th>DELETE</th></tr></thead></table>';

      html += '<div class="table-data"><table class="table-cafe"><tbody>';
      for (let i = 0; i < response.data.length; i++) {
        const ID = response.data[i].dog_id;
        const NAME = response.data[i].dog_name;
        const BREED = response.data[i].breed;
        // const BIRTHDATE = response.data[i].date_of_birth;
        const BIRTHDATE = response.data[i].date_of_birth.slice(0, 10);
        const WEIGHT = response.data[i].weight;
        max_id_customer = max_id_customer > ID ? max_id_customer : ID;

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
          '</td><td><img src="../img/pencil.png" onclick="editCustomerDog_(' +
          ID +
          ')" /></td><td><img src="../img/bin.png" onclick="delCustomerDog(' +
          ID +
          ')"></td></tr>';
      }
      html += '</tbody></table></div>';
      document.getElementById('dog-display').innerHTML = html;
      // console.log(html);
      console.log('getCustomerDog');
    });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}

function addCustomerDog() {
  console.log('addCustomerDog');
  var error = '';
  var ID = max_id_customer + 1;
  var NAME = $("[id='dog_name_customer']").val();
  var BREED = $("[id='breed_customer']").val();
  var BIRTHDATE = $("[id='date_of_birth_customer']").val();
  var WEIGHT = $("[id='weight_customer']").val();
  if (NAME == '' || BREED == '' || BIRTHDATE == '' || WEIGHT == '') {
    error = addError(error, 'Fields required');
  }
  if (error != '') {
    window.alert(error);
    return;
  } else {
    axios
      .post('http://localhost:5000/customerdog', {
        dog_id: ID,
        dog_name: NAME,
        breed: BREED,
        date_of_birth: BIRTHDATE,
        weight: WEIGHT
      })
      .then(function(response) {
        console.log(response);
        max_id_customer = ID;
        hideFormAddCustomerDog();
        getCustomerDog();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function searchCustomerDog() {
  const search_name = $("[id='search_form']").val();
  console.log(search_name);
  try {
    axios
      .get('http://localhost:5000/customer_dog/' + search_name)
      .then(response => {
        console.log(response);
        var html =
          '<table class="table-cafe"><thead><tr><th>ID</th><th>NAME</th><th>BREED</th><th>BIRTHDATE</th><th>WEIGHT</th><th>EDIT</th><th>DELETE</th></tr></thead></table>';

        html += '<div class="table-data"><table class="table-cafe"><tbody>';
        for (let i = 0; i < response.data.length; i++) {
          const ID = response.data[i].dog_id;
          const NAME = response.data[i].dog_name;
          const BREED = response.data[i].breed;
          const BIRTHDATE = response.data[i].date_of_birth.slice(0, 10);
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
            '</td><td><img src="../img/pencil.png" onclick="editCustomerDog_(' +
            ID +
            ')" /></td><td><img src="../img/bin.png" onclick="delCustomerDog(' +
            ID +
            ')"></td></tr>';
        }
        html += '</tbody></table></div>';
        document.getElementById('dog-display').innerHTML = html;
        clearSearchingValue();
      });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}
