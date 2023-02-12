$(document).ready(function () {

  checkSession();

  const familyId = localStorage.getItem('familyId');

  if (familyId) {

    // GET PRODUCTS BY FAMILY ID
    getProducts(familyId);
    getPlates();

  } else {
    //limpeza do storage e drop login
    $('#errorLoadProducts').append('<h3 class="mt-2 fs-4">Não foi possível carregar os produtos de sua família</h3>')
  }

  //Chavear para Home
  $('#home').show();
  $('#products').hide();
  $('#plates').hide();

  //Chavear para Home
  $("#homeButton").click(function () {
    $('#home').show();
    $('#products').hide();
    $('#plates').hide();
  });
  //Chavear para Products
  $('#productsButton').click(function () {
    $('#home').hide();
    $('#products').show();
    $('#plates').hide();
  });
  $('#showProducts').click(function () {
    $('#home').hide();
    $('#products').show();
    $('#plates').hide();
  });

  //Chavear para Plates
  $('#platesButton').click(function () {
    $('#home').hide();
    $('#products').hide();
    $('#plates').show();
  });

  $('#logout').click(function () {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userBirthdate')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userCellPhone')
    localStorage.removeItem('familyId')
    window.location.href = "login.html"
  });

  $('#filterByName').click(function () {
    var filter = $('#valueFilterByName').val();

    if (filter) {
      getPlatesByName(filter);
    }
  });

  $('#valueFilterByName').change(function () {
    var filter = $('#valueFilterByName').val();
    if (filter === "") {
      getPlates();
    }
  });

  $('#productFilterByName').click(function () {
    var filter = $('#valueProductFilterByName').val();

    if (filter) {
      getProductsByName(filter, familyId);
    }
  });

  $('#valueProductFilterByName').change(function () {
    var filter = $('#valueProductFilterByName').val();
    if (filter === "") {
      getProducts(familyId);
    }
  });
});

async function getProducts (familyId) {
  const products = await $.ajax({
    method: 'GET',
    url: 'https://handoven-api-production-production.up.railway.app/products/familyId/' + familyId,
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
  showProducts(products);
}

async function getPlates () {
  const getPlates = await $.ajax({
    method: 'GET',
    url: 'https://handoven-api-production-production.up.railway.app/plates/200',
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
  if (getPlates) {
    showPlates(getPlates);
  }
}

async function getPlatesByName (filter) {
  const platesByName = await $.ajax({
    method: 'POST',
    url: 'https://handoven-api-production-production.up.railway.app/plates/name',
    data: { nome: filter },
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
  if (platesByName) {
    showPlates(platesByName);
  }
}

async function getProductsByName (filter, familyId) {
  const productsByName = await $.ajax({
    method: 'POST',
    url: 'https://handoven-api-production-production.up.railway.app/products/name/familyId/' + familyId,
    data: { name: filter },
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
  if (productsByName) {
    showProducts(productsByName);
  }
}

function showProducts (prods) {
  var itens = "";
  var totalProducts = 0
  var totalExpiryProducts = 0
  var totalMissingProducts = 0
  var totalValueProducts = 0

  for (let i = 0; i < prods.length; i++) {
    itens += '<div class="card mt-2" style="width: 22rem; background-color: #1e2d40; color: white;"><a id="showProduct_' + i + '" href="showProduct.html?' + prods[i].id + '" class="card-link cardProduct"><div class="card-body"><h5 class="card-title">' + prods[i].name + '</h5><h6 class="card-subtitle mb-2 text-muted">' + prods[i].type + '&nbsp;<span class="badge bg-secondary">' + prods[i].category + '</span></h6><h6 class="labelProductCard">Preço: <strong>R$' + prods[i].cost + '</strong></h6><h6 class="labelProductCard">Quantidade: <strong>' + prods[i].amount + '</strong></h6><h6 class="labelProductCard">Vencimento: <strong>' + dateFormat(prods[i].validity, false) + '</strong></h6></div></a></div>';
    totalProducts += 1;
    if (prods[i].expiryProducts === true) {
      totalExpiryProducts += 1;
    }
    if (prods[i].amount === 0) {
      totalMissingProducts += 1;
    }
    if (prods[i].cost) {
      totalValueProducts += parseFloat(prods[i].cost) * prods[i].amount;
    }
  }
  totalProducts = totalProducts - totalMissingProducts;
  dashboardInformations = '<div class="col"><div class="card productCard"><div class="card-body cardDashboard"><h5 class="card-title titleCardDashboard">Produtos Em Estoque</h5><strong id="totalProducts" class="valueCardDashboard" style="color:#fcdf82;">' + totalProducts + '</strong></div></div></div><div class="col"><div class="card productCard"><div class="card-body cardDashboard"><h5 class="card-title titleCardDashboard">Produtos Em Falta</h5><strong id="totalMissingProducts" class="valueCardDashboard" style="color:#fcdf82;">' + totalMissingProducts + '</strong></div></div></div><div class="col"><div class="card productCard"><div class="card-body cardDashboard"><h5 class="card-title titleCardDashboard">Produtos a Vencer</h5><strong id="totalExpiryProducts" class="valueCardDashboard" style="color:#fcdf82;">' + totalExpiryProducts + '</strong></div></div></div><div class="col"><div class="card productCard"><div class="card-body cardDashboard"><h5 class="card-title titleCardDashboard">Total R$ / Estoque</h5><strong id="totalValueProducts" class="valueCardDashboard" style="color:#fcdf82;">R$' + totalValueProducts.toFixed(2) + '</strong></div></div></div>';

  $('#productList').empty()
  $('#productList').append(itens)
  $('#areaDashboard').append(dashboardInformations)
}

function showPlates (plates) {
  var platesAppend = '';
  for (let i = 0; i < plates.length; i++) {
    platesAppend += '<div class="card mt-2" style="width: 22rem; background-color: #1e2d40; color: white;"><a href = "showPlates.html?' + plates[i].id + '" class="cardPlates"><div class="card-body" style="text-align: left;"><table><tr><td style="width: 17rem;"><h5 class="card-title" style="font-size: 1.3rem;">' + plates[i].nome + '</h5><td><td rowspan="2"><img src="../img/food.png" alt="Dinner" width="60" style="right: 0px;"></td></tr><tr><td><h6 class="card-subtitle mb-2 text-muted">Serve: <strong>&nbsp;-</strong></h6></td></tr></table></div></a></div>';
  }
  $('#areaPlates').empty()
  $('#areaPlates').append(platesAppend);
}