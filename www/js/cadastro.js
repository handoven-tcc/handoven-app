//CONFIGURA AS REQUISIÇÕES DA TELA DE CADASTRO
$(document).ready(function () {
  $('#buttonCadastro').click(function () {
    var familyName = $('#familyName').val();
    var userName = $('#name').val();
    var birthDate = $('#birthDate').val();
    var cellphone = $('#cellphone').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var passwordConfirm = $('#passwordConfirm').val();

    if (familyName &&
      userName &&
      birthDate &&
      cellphone &&
      email &&
      password &&
      passwordConfirm) {
      if (password === passwordConfirm) {
        register(familyName, userName, birthDate, cellphone, email, password);
      } else {
        alertHandler('danger', 'As senhas não coincidem!');
      }
    } else {
      //Erro de parâmetros aqui
      alertHandler('danger', 'Todos os campos devem ser preenchidos!');
    }
  })
});

async function register (familyName, userName, birthDate, cellphone, email, password) {
  const createFamily = await $.ajax({
    method: 'POST',
    url: 'https://handoven-api-production-production.up.railway.app/family',
    data:
    {
      name: familyName
    },
    beforeSend: function () {
      // Status Enviando
      // $().html("Enviando...")
      // alert("Enviando a requisição")
    }
  })
    .done(function (msg) {
      // ALGUMA AÇÃO
      // alert("Deu certo a requisição: " + msg)
    })
    .fail(function (jqXHR, textStatus, msg) {
      // ALERTA DE REQUISIÇÃO
      // alert("Deu errado a requisição: " + msg)
    });

  familyId = createFamily.id;

  const createUser = await $.ajax({
    method: 'POST',
    url: 'https://handoven-api-production-production.up.railway.app/user',
    data: {
      name: userName,
      birthDate: birthDate,
      cell: cellphone,
      email: email,
      password: password,
      familyId: familyId
    },
    beforeSend: function () {
      // Status Enviando
      // $().html("Enviando...")
      // alert("Enviando a requisição")
    }
  })
    .done(function (msg) {
      // ALGUMA AÇÃO
      // alert("Deu certo a requisição: " + msg)
    })
    .fail(function (jqXHR, textStatus, msg) {
      // ALERTA DE REQUISIÇÃO
      // alert("Deu errado a requisição: " + msg)
    });

  console.log(createUser);

  // SALVAMENTO DE DADOS NO SESSION STORAGE
  localStorage.setItem('userId', createUser.id)
  localStorage.setItem('userName', createUser.name)
  localStorage.setItem('userBirthdate', createUser.birthDate)
  localStorage.setItem('userEmail', createUser.email)
  localStorage.setItem('userCellPhone', createUser.cell)
  localStorage.setItem('familyId', createUser.familyId)

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
}