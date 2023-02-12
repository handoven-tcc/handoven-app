$(document).ready(function () {
  checkSession();
  $('#buttonClear').click(function () {
    $('.input-edit').val('');
  });

  $('#buttonCreate').click(function () {
    var name = $('#name').val();
    var validity = $('#validity').val();
    var type = $('#type').val();
    var category = $('#category').val();
    var cost = $('#cost').val();
    var amount = $('#amount').val();
    var familyId = localStorage.getItem('familyId');

    if (name &&
      validity &&
      type &&
      category &&
      cost &&
      amount &&
      familyId) {
      addProduct(name, validity, type, category, cost, amount, familyId)
    } else {
      alertHandler('warning', 'Todos os campos devem ser preenchidos!');
    }
  });
});

async function addProduct (name, validity, type, category, cost, amount, familyId) {
  const addUser = await $.ajax({
    method: 'POST',
    url: 'https://handoven-api-production-production.up.railway.app/products',
    data: {
      name: name,
      type: type,
      validity: validity,
      category: category,
      cost: cost,
      amount: amount,
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
    alertHandler('success', 'Produto Adicionado!');
  } else {
    alertHandler('danger', 'Problemas ao adicionar produto!');
  }
}