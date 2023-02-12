$(document).ready(function () {
  checkSession();
  populate();

  $('#buttonEdit').click(function () {
    $('.inputEdit').prop("disabled", false);
    $('.inputEdit').css({ color: "black" });
    $('.inputEdit').css({ background: "white" });
    $('#password').val("");
    $('#buttonSave').prop("hidden", false);
    $('#buttonCancel').prop("hidden", false);
  });

  $('#buttonSave').click(function () {
    $('.inputEdit').prop("disabled", true);
    $('.inputEdit').css({ color: "white" });
    $('.inputEdit').css({ background: "#17212f" });
    UpdateProfile();
    $('#buttonCancel').prop("hidden", true);
    $('#buttonSave').prop("hidden", true);
    $('#password').val("");
  });

  $('#buttonCancel').click(function () {
    $('.inputEdit').prop("disabled", true);
    $('.inputEdit').css({ color: "white" });
    $('.inputEdit').css({ background: "#17212f" });
    $('#buttonCancel').prop("hidden", true);
    $('#buttonSave').prop("hidden", true);
    $('#password').val("");
  });

  $('.deleteUser').click(function () {
    var userToDelete = windou.location.href.split('?')[1];
    console.log("userToDelete: " + userToDelete);
    userDelete(userToDelete);
  });
});

async function UpdateProfile () {
  var name = $('#name').val();
  var birthDate = $('#birthDate').val();
  var cellphone = $('#cellphone').val();
  var email = $('#email').val();
  var password = $('#password').val();
  var userId = localStorage.getItem('userId');
  var familyId = localStorage.getItem('familyId');
  var body = "";

  if ((name || birthDate || cellphone || email || password) && userId && familyId) {
    if (password == "") {
      body = {
        name: name,
        birthDate: birthDate,
        cell: cellphone,
        email: email
      }
    } else {
      body = {
        name: name,
        birthDate: dateFormat(birthDate, true),
        cell: cellphone,
        email: email,
        password: password,
        familyId: familyId
      }
      console.log(body.birthDate);
    }

    if (body) {
      const uptadeUserOnByUser = await $.ajax({
        method: 'PUT',
        url: 'https://handoven-api-production-production.up.railway.app/user/' + userId,
        data: body,
        beforeSend: function () {
          // Status Enviando
          // $().html("Enviando...")
        }
      })
        .done(function (msg) {
          alertHandler('success', 'Usuário atualizado!');
        })
        .fail(function (jqXHR, textStatus, msg) {
          alertHandler('danger', 'Problemas ao atualizar usuário!');
        });

      if (uptadeUserOnByUser.name) {
        localStorage.setItem('userId', uptadeUserOnByUser.id)
        localStorage.setItem('userName', uptadeUserOnByUser.name)
        localStorage.setItem('userBirthdate', uptadeUserOnByUser.birthDate)
        localStorage.setItem('userEmail', uptadeUserOnByUser.email)
        localStorage.setItem('userCellPhone', uptadeUserOnByUser.cell)
        localStorage.setItem('familyId', uptadeUserOnByUser.familyId)
      }
    } else {
      alertHandler('danger', 'Não foi possível completar a solicitação!');
    }
  } else {
    alertHandler('danger', 'Não foi possível completar a solicitação!');

  }
}

async function populate () {

  var users = '';

  const getFamilyName = await $.ajax({
    method: 'GET',
    url: 'https://handoven-api-production-production.up.railway.app/family/' + localStorage.getItem('familyId'),
    data: {},
    beforeSend: function () {
      // Status Enviando
      // $().html("Enviando...")
    }
  })
    .done(function (msg) {
      // alert("Boa")
    })
    .fail(function (jqXHR, textStatus, msg) {
      // alert("Ruim")
    });

  familyName = getFamilyName.name;


  const getFamilyUsers = await $.ajax({
    method: 'GET',
    url: 'https://handoven-api-production-production.up.railway.app/user/familyId/' + localStorage.getItem('familyId'),
    data: {},
    beforeSend: function () {
      // Status Enviando
      // $().html("Enviando...")
    }
  })
    .done(function (msg) {
      // alert("Boa")
    })
    .fail(function (jqXHR, textStatus, msg) {
      // alert("Ruim")
    });

  if (getFamilyUsers) {
    for (let i = 0; i < getFamilyUsers.length; i++) {
      if (localStorage.getItem('userId') == getFamilyUsers[i].id) {
        users += '<div class="user mt-2" style="border: 2px solid #fcdf82!important;"><input type="text" value="' + getFamilyUsers[i].id + '" hidden><div style="margin-left: 0.5rem;"><strong>' + getFamilyUsers[i].name + '</strong><a class="deleteUser" class="trash" href="?' + getFamilyUsers[i].id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg></a></div></div>';
      } else {
        users += '<div class="user mt-2"><input type="text" value="' + getFamilyUsers[i].id + '" hidden><div style="margin-left: 0.5rem;"><strong>' + getFamilyUsers[i].name + '</strong><a class="deleteUser" class="trash" href="deleteUser.html?' + getFamilyUsers[i].id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" /><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /></svg></a></div></div>';
      }
    }
    $('#areaUsers').append(users);
  }

  var SessionName = localStorage.getItem('userName') ? localStorage.getItem('userName') : null;
  var SessionBirthDate = localStorage.getItem('userBirthdate') ? localStorage.getItem('userBirthdate') : null;
  var SessionEmail = localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : null;
  var SessionCellphone = localStorage.getItem('userCellPhone') ? localStorage.getItem('userCellPhone') : null;
  var SessionFamilyId = localStorage.getItem('familyId') ? localStorage.getItem('familyId') : null;
  var SessionUserId = localStorage.getItem('userId') ? localStorage.getItem('userId') : null;

  $('#name').val(SessionName);
  $('#birthDate').val(dateFormat(SessionBirthDate, false));
  $('#email').val(SessionEmail);
  $('#cellphone').val(SessionCellphone);
  $('#name').val(SessionName);
  $('#familyName').text(familyName);
  $('#password').val('*******');
}

async function userDelete (userDelete) {
  console.log("deleteUser: " + userDelete)
  const deleteUser = await $.ajax({
    method: 'DELETE',
    url: 'https://handoven-api-production-production.up.railway.app/user/' + userDelete,
    data: {},
    beforeSend: function () {
      // Status Enviando
      // $().html("Enviando...")
    }
  })
    .done(function (msg) {
      // alert("Boa")
    })
    .fail(function (jqXHR, textStatus, msg) {
      // alert("Ruim")
    });

  console.log(deleteUser)
  window.location.href = 'dashboard.html';
}