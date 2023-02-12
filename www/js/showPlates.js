$(document).ready(function () {
  checkSession();
  var plate = window.location.href;
  plate = plate.split('?')
  getPlateData(plate[1])
});

async function getPlateData (plateId) {
  const getPlate = await $.ajax({
    method: 'GET',
    url: 'https://handoven-api-production-production.up.railway.app/plates/plateId/' + plateId,
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
  var name = getPlate.nome;
  var ingredients = getPlate.secao[0];
  var howDo = getPlate.secao[0][1];
  var moreInformations = getPlate.secao[0][2];

  populate(name, ingredients, howDo, moreInformations);
}

function populate (name, ingredients, howDo, moreInformations) {
  if (name &&
    ingredients &&
    howDo) {

    var elementsFirstSession = ''
    var elementsSecondSession = ''
    var elementsThirdSession = ''

    $('#nameTitle').text(name);

    //Populate First Session
    $('#titleFirstSession').text(ingredients[0].nome)
    for (let i = 0; i < ingredients[0].conteudo.length; i++) {
      elementsFirstSession += '<li>' + ingredients[0].conteudo[i] + '</li>'
    }

    $('#firstSessionElements').append(elementsFirstSession);

    //Populate Second Session
    console.log(howDo)
    $('#titleSecondSession').text(howDo.nome)
    for (let i = 0; i < howDo.conteudo.length; i++) {
      elementsSecondSession += '<li>' + howDo.conteudo[i] + '</li>'
    }

    $('#secondSessionElements').append(elementsSecondSession);

    //Populate Third Session
    if (moreInformations) {
      $('#titleThirdSession').text(moreInformations.nome)
      for (let i = 0; i < moreInformations.conteudo.length; i++) {
        elementsThirdSession += '<li>' + moreInformations.conteudo[i] + '</li>'
      }

      $('#thirdSessionElements').append(elementsThirdSession);
    }
  } else {
    alertHandler('danger', 'Erro ao carregar dados!');

  }
}