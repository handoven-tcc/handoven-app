function checkSession () {
  var SessionName = localStorage.getItem('userName') ? localStorage.getItem('userName') : null;
  var SessionBirthDate = localStorage.getItem('userBirthdate') ? localStorage.getItem('userBirthdate') : null;
  var SessionEmail = localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : null;
  var SessionCellphone = localStorage.getItem('userCellPhone') ? localStorage.getItem('userCellPhone') : null;
  var SessionFamilyId = localStorage.getItem('familyId') ? localStorage.getItem('familyId') : null;
  var SessionUserId = localStorage.getItem('userId') ? localStorage.getItem('userId') : null;

  if (!SessionName ||
    !SessionBirthDate ||
    !SessionEmail ||
    !SessionCellphone ||
    !SessionFamilyId ||
    !SessionUserId) {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userBirthdate')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userCellPhone')
    localStorage.removeItem('familyId')
    window.location.href = 'login.html';
  }
}

function dateFormat (date, type) {
  //2022-10-18T03:00:00.000Z
  if (date) {
    if (!type) {
      date = date.split('-');
      year = date[0];
      month = date[1];
      day = date[2].split('T')[0];
      date = day + '/' + month + '/' + year;
      return date;
    } else {
      date = date.split('/');
      year = date[2];
      month = date[1];
      day = date[0];
      date = year + '-' + month + '-' + day + 'T03:00:00.000Z';
      return date;
    }
  } else {
    return null;
  }
}

async function alertHandler (type, message) {
  //alert | success | warning | danger
  var alert = ''
  alert += '<style>@keyframes go-back {from {transform: translateX(100px);}to {transform: translateX(-100);}}</style>';
  alert += '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><symbol id="check-circle-fill" viewBox="0 0 16 16" width="32" fill="#0a6300"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" /></symbol ><symbol id="info-fill" viewBox="0 0 16 16" width="32" fill="#002663"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></symbol><symbol id="exclamation-triangle-fill" viewBox="0 0 16 16" width="32" fill="#ad9100"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></symbol></symbol><symbol id="exclamation-triangle-fill-error" viewBox="0 0 16 16" width="32" fill="#870101"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></symbol></svg><br>';

  switch (type) {
    case 'alert':
      alert += '<div class="alert alert-primary d-flex align-items-center" role="alert" style = "position: fixed; float:right; z-index: 3; width: 90%; height: 4rem; text-align: center; margin-top: -2rem; margin-left: 0.5rem; animation: go-back 1s backwards alternate;" > <svg class="bi flex-shrink-0 me-2" role="img" aria - label="Info:" > <use xlink:href="#info-fill" /></svg > <div style="margin-left: -80%; color: #002663; font-weight:bold;">' + message + '</div></div > ';
      break;
    case 'success':
      alert += '<div class="alert alert-success d-flex align-items-center" role="alert" style = "position: fixed; float:right; z-index: 3; width: 90%; height: 4rem; text-align: center; margin-top: -2rem; margin-left: 0.5rem; animation: go-back 1s backwards alternate;" > <svg class="bi flex-shrink-0 me-2" role="img" aria - label="Success:" > <use xlink:href="#check-circle-fill" /></svg > <div style="margin-left: -80%; color: #00631e; font-weight:bold;">' + message + '</div></div > ';
      break;
    case 'warning':
      alert += '<div class="alert alert-warning d-flex align-items-center" role="alert" style = "position: fixed; float:right; z-index: 3; width: 90%; height: 4rem; text-align: center; margin-top: -2rem; margin-left: 0.5rem; animation: go-back 1s backwards alternate;" > <svg class="bi flex-shrink-0 me-2" role="img" aria - label="Warning:" > <use xlink:href="#exclamation-triangle-fill" /></svg > <div style="margin-left: -80%; color: #ad9100; font-weight:bold;">' + message + '</div></div > ';
      break;
    case 'danger':
      alert += '<div class="alert alert-danger d-flex align-items-center" role="alert" style = "position: fixed; float:right; z-index: 3; width: 90%; height: 4rem; text-align: center; margin-top: -2rem; margin-left: 0.5rem; animation: go-back 1s backwards alternate;" > <svg class="bi flex-shrink-0 me-2" role="img" aria - label="Danger:" > <use xlink:href="#exclamation-triangle-fill-error" /></svg > <div style="margin-left: -80%; color: #870101; font-weight:bold;">' + message + '</div></div > ';
      break;
    default:
      break;
  }
  $('#areaAlert').append(alert);
  await new Promise(r => setTimeout(r, 2000));
  $('#areaAlert').empty();
}