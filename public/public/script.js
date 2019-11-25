//--------variable----------------------

var max_id_cafe = 0;
var max_id_customer = 0;
var dog_deposition_id = 0;

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
    showSearchBar();
  } else if (page == 'CUSTOMER') {
    document.getElementById('CAFE').style.textDecoration = 'none';
    document.getElementById('CUSTOMER').style.textDecoration = 'underLine';
    document.getElementById('DEPOSITION').style.textDecoration = 'none';
    showSearchBar();
  } else if (page == 'DEPOSITION') {
    document.getElementById('CAFE').style.textDecoration = 'none';
    document.getElementById('CUSTOMER').style.textDecoration = 'none';
    document.getElementById('DEPOSITION').style.textDecoration = 'underLine';
    hideSearchBar();
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

function hideFormAddDepositionDog() {
  document.getElementById('popup-deposition-form').style.visibility = 'hidden';
}

function hideSignUpForm() {
  if (document.getElementById('sign-up-form') != null) {
    document.getElementById('sign-up-form').style.visibility = 'hidden';
    clearFormSignUp();
  }
}

function hideSignInForm() {
  if (document.getElementById('sign-in-form') != null) {
    document.getElementById('sign-in-form').style.visibility = 'hidden';
    clearFormSignIn();
  }
}

function hideSearchBar() {
  document.getElementById('id-search-bar').style.visibility = 'hidden';
  document.getElementById('id-add-dog-botton').style.visibility = 'hidden';
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

function showSignUpForm() {
  document.getElementById('sign-up-form').style.visibility = 'visible';
  hideSignInForm();
}

function showSignInForm() {
  hideSignUpForm();
  document.getElementById('sign-in-form').style.visibility = 'visible';
}

function showFormAddDepositionDog() {
  document.getElementById('popup-deposition-form').style.visibility = 'visible';
}

function showSearchBar() {
  document.getElementById('id-search-bar').style.visibility = 'visible';
  document.getElementById('id-add-dog-botton').style.visibility = 'visible';
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

function clearFormSignUp() {
  $("[id='username']").val('');
  $("[id='password']").val('');
  $("[id='confirm_password']").val('');
  $("[id='firstname']").val('');
  $("[id='lastname']").val('');
}

function clearFormSignIn() {
  $("[id='username_login']").val('');
  $("[id='password_login']").val('');
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
        clearSearchingValue();
      });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}

//customerDog

function findCustomerDog(id) {
  try {
    return axios.get('http://localhost:5000/customerdog').then(response => {
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
        '<table class="table-cafe"><thead><tr><th>ID</th><th>NAME</th><th>BREED</th><th>BIRTHDATE</th><th>WEIGHT</th><th>EDIT</th><th>DELETE</th><th>DEPOSITION</th></tr></thead></table>';

      html += '<div class="table-data"><table class="table-cafe"><tbody>';
      for (let i = 0; i < response.data.length; i++) {
        const ID = response.data[i].dog_id;
        const NAME = response.data[i].dog_name;
        const BREED = response.data[i].breed;
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
          ')"></td><td>' +
          '<p onclick=addToDeposition(' +
          ID +
          ')>+ ADD</p>' +
          '</td></tr>';
      }
      html += '</tbody></table></div>';
      document.getElementById('dog-display').innerHTML = html;
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

//---------------Deposition-------------

function addToDeposition(ID) {
  dog_deposition_id = ID;
  console.log('add ' + ID + ' to Deposition');
  showFormAddDepositionDog();
  getAvailableBoxes();
}

function addDeposition() {
  console.log(dog_deposition_id);
  var error = '';
  const box_id = $("[name='available-box']").val();
  if (box_id == null) {
    error = addError(error, 'Fields required');
  }
  if (error != '') {
    window.alert(error);
    return;
  } else {
    axios
      .post('http://localhost:5000/dep', {
        dog_id: dog_deposition_id,
        box_id: box_id
      })
      .then(function(response) {
        console.log(response);
        hideFormAddDepositionDog();
        getCustomerDog();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function getDeposition() {
  console.log('deposition');
  setPage('DEPOSITION');
  try {
    axios.get('http://localhost:5000/dep').then(response => {
      console.log(response.data);
      var html =
        '<table class="table-cafe"><thead><tr><th>DEPOSITION ID</th><th>BOX ID</th><th>DOG ID</th><th>PRODUCT ID</th><th>FEE</th><th>DEPOSIT TIME</th><th>CHECK OUT TIME</th></tr></thead></table>';

      html += '<div class="table-data"><table class="table-cafe"><tbody>';
      for (let i = 0; i < response.data.length; i++) {
        const deposition_id = response.data[i].deposition_id;
        const box_id = response.data[i].box_id;
        const dog_id = response.data[i].dog_id;
        const product_id = response.data[i].product_id;
        const deposit_fee =
          response.data[i].deposit_fee == null
            ? 0
            : response.data[i].deposit_fee;
        const checkin_time =
          response.data[i].checkin_time == null
            ? '-'
            : response.data[i].checkin_time.substring(0, 10) +
              ' (' +
              response.data[i].checkin_time.substring(11, 19) +
              ')';
        const checkout_time =
          response.data[i].checkout_time == null
            ? '<p onclick="checkOut(' +
              deposition_id +
              ',' +
              dog_id +
              ')">check out</p>'
            : response.data[i].checkout_time.substring(0, 10) +
              ' (' +
              response.data[i].checkout_time.substring(11, 19) +
              ')';
        const is_retrieved = response.data[i].is_retrieved;

        html +=
          '<tr><td>' +
          deposition_id +
          '</td><td>' +
          box_id +
          '</td><td>' +
          dog_id +
          '</td><td>' +
          product_id +
          '</td><td>' +
          deposit_fee +
          '</td><td>' +
          checkin_time +
          '</td><td>' +
          checkout_time +
          '</td></tr>';
      }
      html += '</tbody></table></div>';
      document.getElementById('dog-display').innerHTML = html;
    });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}

function getAvailableBoxes() {
  try {
    axios.get('http://localhost:5000/boxes').then(response => {
      console.log(response);
      var html =
        '<form id="deposition-form"><select id="available-box" name="available-box"> \
                  <option value="" disabled selected hidden>-- select a box --</option> ';
      for (let i = 0; i < response.data.length; i++) {
        const boxID = response.data[i].box_id;
        const size = response.data[i].size;
        console.log(boxID + '#' + size);
        html +=
          '<option value="' +
          boxID +
          '"> box : ' +
          boxID +
          ' ( size: ' +
          size +
          ' )' +
          '</option>';
      }
      html += '</select></form>';
      document.getElementById('depositionForm').innerHTML = html;
    });
  } catch (error) {
    console.log('failed');
    console.error(error);
  }
}

function checkOut(deposition_id, dog_id) {
  axios
    .post('http://localhost:5000/dep/checkout', {
      deposition_id: deposition_id,
      dog_id: dog_id
    })
    .then(function(response) {
      console.log(response);
      getDeposition();
    })
    .catch(function(error) {
      console.log(error);
    });
}
//---------AUTHORIZATION----------------
function checkStatusOnDog() {
  if (localStorage.getItem('login') != 'true') {
    console.log(localStorage.getItem('login'));
    console.log('not-login');
    alert('please log in');
    location = 'http://localhost:3000';
  } else {
    console.log('login :D ');
    getCafeDog();
  }
}

function checkStatus() {
  setTimeout(function() {
    if (localStorage.getItem('login') != 'true') {
      console.log(localStorage.getItem('login'));
      console.log('not-login');
      showSignInForm();
    } else {
      console.log('login :D ');
    }
  }, 100);
}

function signUp() {
  console.log('signUp');
  var error = '';
  var USERNAME = $("[id='username']").val();
  var PASSWORD = $("[id='password']").val();
  var CONFIRM_PASSWORD = $("[id='confirm_password']").val();
  var FIRSTNAME = $("[id='firstname']").val();
  var LASTNAME = $("[id='lastname']").val();
  if (USERNAME == '' || PASSWORD == '' || FIRSTNAME == '' || LASTNAME == '') {
    error = addError(error, 'Fields required');
  }
  if (PASSWORD != CONFIRM_PASSWORD) {
    error = addError(error, 'Password and confirm password does not match');
  }
  if (error != '') {
    window.alert(error);
    return;
  } else {
    axios
      .post('http://localhost:5000/login/signup', {
        username: USERNAME,
        password: PASSWORD,
        firstname: FIRSTNAME,
        lastname: LASTNAME
      })
      .then(function(response) {
        // console.log(response.data.code);
        console.log(response);
        if (response.data.code == undefined) {
          alert('Sign up complete !');
          showSignInForm();
        } else {
          alert('This username is already exists !');
          clearFormSignUp();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

function signIn() {
  console.log('signIn');
  var error = '';
  var USERNAME = $("[id='username_login']").val();
  var PASSWORD = $("[id='password_login']").val();

  if (USERNAME == '' || PASSWORD == '') {
    error = addError(error, 'Fields required');
  }
  if (error != '') {
    window.alert(error);
    return;
  } else {
    axios
      .post('http://localhost:5000/login/signin', {
        username: USERNAME,
        password: PASSWORD
      })
      .then(function(response) {
        console.log(response.data.status);
        if (response.data.status == 'success') {
          alert('Login Success !');
          localStorage.setItem('login', 'true');
          hideSignInForm();
        } else {
          alert('Log in Fail ! Please log in again.');
          clearFormSignIn();
          localStorage.setItem('login', 'false');
        }
      })
      .catch(function(error) {
        console.log(error);
        console.log('login Fail');
      });
  }
}

function signOut() {
  localStorage.setItem('login', 'false');
  if (location == 'http://localhost:3000') {
    checkStatus();
  } else {
    location = 'http://localhost:3000';
  }
}
