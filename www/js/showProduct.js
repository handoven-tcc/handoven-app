$(document).ready(function () {
  checkSession();
  var product = window.location.href;
  product = product.split('?')

  getProductData(product[1])

  $('#buttonEdit').click(function () {
    $('.inputEdit').prop("disabled", false);
    $('.inputEdit').css({ color: "black" });
    $('.inputEdit').css({ background: "white" });
    $('#buttonSave').prop("hidden", false);
    $('#buttonCancel').prop("hidden", false);
  });

  $('#buttonSave').click(function () {
    $('.inputEdit').prop("disabled", true);
    $('.inputEdit').css({ color: "white" });
    $('.inputEdit').css({ background: "#17212f" });
    UpdateProduct(product[1]);
    $('#buttonSave').prop("hidden", true);
    $('#buttonCancel').prop("hidden", true);

  });

  $('#buttonCancel').click(function () {
    $('.inputEdit').prop("disabled", true);
    $('.inputEdit').css({ color: "white" });
    $('.inputEdit').css({ background: "#17212f" });
    $('#buttonSave').prop("hidden", true);
    $('#buttonCancel').prop("hidden", true);
  });
});

async function getProductData (productId) {
  const getProduct = await $.ajax({
    method: 'GET',
    url: 'https://handoven-api-production-production.up.railway.app/products/' + productId,
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
  console.log(getProduct)
  var name = getProduct.name;
  var validity = getProduct.validity;
  var category = getProduct.category;
  var type = getProduct.type;
  var cost = getProduct.cost;
  var amount = getProduct.amount;

  populate(name, validity, category, type, cost, amount);
}

function populate (name, validity, category, type, cost, amount) {
  if (name &&
    validity &&
    category &&
    type &&
    cost &&
    (amount === 0 || amount)) {
    if (type == 'Refrigerated') {
      type = 'Refrigerado';
    } else if (type == 'Not Refrigerated') {
      type = 'Não Refrigerado';
    }

    $('#nameTitle').text(name);
    $('#name').val(name);
    $('#validity').val(dateFormat(validity, false));
    $('#category').val(category);
    $('#type').val(type);
    $('#cost').val(cost);
    $('#amount').val(amount);
  } else {
    alertHandler('danger', 'Erro ao carregar dados!');
  }
}

async function UpdateProduct (product) {
  var name = $('#name').val();
  var validity = $('#validity').val();
  var category = $('#category').val();
  var type = $('#type').val();
  var cost = $('#cost').val();
  var amount = $('#amount').val();
  var familyId = localStorage.getItem('familyId');
  var body = "";

  if ((name || validity || category || type || cost || amount) && familyId) {
    body = {
      name: name,
      type: type,
      validity: dateFormat(validity, true),
      category: category,
      cost: cost,
      amount: amount,
      familyId: familyId
    }

    if (body) {
      const uptadeProductOnByProductId = await $.ajax({
        method: 'PUT',
        url: 'https://handoven-api-production-production.up.railway.app/products/' + product,
        data: body,
        beforeSend: function () {
          // Status Enviando
          // $().html("Enviando...")
        }
      })
        .done(function (msg) {
          alertHandler('success', 'Produto atualizado!');
        })
        .fail(function (jqXHR, textStatus, msg) {
          alertHandler('danger', 'Problemas ao atualizar produto!');
        });

      if (uptadeProductOnByFamilyId.name) {
        getProductData(product[1])
        alertHandler('success', 'Produto atualizado!');
      } else {
        alertHandler('danger', 'Problemas ao atualizar produto!');
      }
    } else {
      alertHandler('danger', 'Não foi possível completar a solicitação!');
    }
  } else {
    alertHandler('danger', 'Não foi possível completar a solicitação!');
  }
}