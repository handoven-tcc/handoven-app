//CONFIGURA AS REQUISIÇÕES DA TELA DE LOGIN
$(document).ready(function () {
  $('#buttonLogin').click(function () {
    //checks dos campos
    var email = $('#email').val();
    var password = $('#password').val();
    if (email && password) {
      loginUser(email, password);
    } else {
      alertHandler('danger', 'É necessário preencher todos os campos!');
    }
  })
});


async function loginUser (email, password) {
  const login = await $.ajax({
    method: 'POST',
    url: 'https://handoven-api-production-production.up.railway.app/user/login',
    data:
    {
      email: email,
      password: password
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

  if (!login.id) {
    alertHandler('danger', 'Não foi possível entrar, tente novamente!');
  }

  // SALVAMENTO DE DADOS NO SESSION STORAGE
  localStorage.setItem('userId', login.id)
  localStorage.setItem('userName', login.name)
  localStorage.setItem('userBirthdate', login.birthDate)
  localStorage.setItem('userEmail', login.email)
  localStorage.setItem('userCellPhone', login.cell)
  localStorage.setItem('familyId', login.familyId)

  //checagem localstorage
  if (localStorage.getItem('userId') &&
    localStorage.getItem('userName') &&
    localStorage.getItem('userBirthdate') &&
    localStorage.getItem('userEmail') &&
    localStorage.getItem('userCellPhone') &&
    localStorage.getItem('familyId')) {
    window.location.href = "dashboard.html"
  } else {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userBirthdate')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userCellPhone')
    localStorage.removeItem('familyId')
    alertHandler('danger', 'Não foi possível entrar, tente novamente!');
    window.location.href = "login.html"
  }

  console.log(login);
}