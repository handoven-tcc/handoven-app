$(document).ready(function () {
  checkSession();
  $('#buttonClear').click(function () {
    $('.input-edit').val('');
  });

  $('#buttonCreate').click(function () {
    var name = $('#name').val();
    var birthDate = $('#birthDate').val();
    var cellPhone = $('#cellphone').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var passwordConfirm = $('#passwordConfirm').val();
    var familyId = localStorage.getItem('familyId');

    if (name &&
      birthDate &&
      cellPhone &&
      email &&
      password &&
      passwordConfirm &&
      familyId) {
      if (password === passwordConfirm) {
        addUser(name, birthDate, cellPhone, email, password, familyId)
      } else {
        alertHandler('danger', 'As senhas não coincidem!');
      }
    } else {
      alertHandler('danger', 'Todos os campos devem ser preenchidos!');
    }
  });
});

async function addUser (name, birthDate, cellPhone, email, password, familyId) {
  const addUser = await $.ajax({
    method: 'POST',
    url: 'https://handoven-api-production-production.up.railway.app/user',
    data: {
      name: name,
      birthDate: birthDate,
      cell: cellPhone,
      email: email,
      password: password,
      familyId: familyId
    },
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
  $('.input-edit').val('');
  if (addUser.id) {
    alertHandler('success', 'Usuário Adicionado!');
  } else {
    alertHandler('danger', 'Problemas ao adicionar usuário!');
  }
}