$(document).ready(function () {
  checkSession();
  var user = window.location.href;
  user = user.split('?')
  getUserData(user[1]);
  $('#buttonDelete').click(function () {
    deleteUser(user[1]);
  });

  $('#buttonCancel').click(function () {
    window.location.href = "profile.html";
  });
});

async function getUserData (userId) {
  const getUser = await $.ajax({
    method: 'GET',
    url: 'https://handoven-api-production-production.up.railway.app/user/' + userId,
    data: {},
    beforeSend: function () {
      // Status Enviando
      // $().html("Enviando...")
    }
  })
    .done(function (msg) {
      // ALGUMA AÇÃO
    })
    .fail(function (jqXHR, textStatus, msg) {
      // ALERTA DE REQUISIÇÃO
      // alert("Ruim")
    });
  var name = getUser.name;

  populate(name);
}

function populate (name) {
  if (name) {
    $('#nameTitle').text(name);
  } else {
    alertHandler('danger', 'Erro ao carregar dados!');
    window.location.href = "profile.html"
  }
}

async function deleteUser (userId) {
  if (userId) {
    const deleteUserFromId = await $.ajax({
      method: 'DELETE',
      url: 'https://handoven-api-production-production.up.railway.app/user/' + userId,
      data: {},
      beforeSend: function () {
        // Status Enviando
        // $().html("Enviando...")
      }
    })
      .done(function (msg) {
        alertHandler('succes', 'Usuário Excluído!');
        window.location.href = "profile.html";
      })
      .fail(function (jqXHR, textStatus, msg) {
        // alert("Ruim")
      });

    if (deleteUserFromId) {
      alertHandler('succes', 'Usuário Excluído!');
      window.location.href = "profile.html";
    }
  } else {
    alertHandler('danger', 'Não foi possível completar a solicitação!');
  }
}