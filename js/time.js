const $clock = d.getElementById("clock"),
  $date = d.getElementById("date");

function setDate(today) {
  const setDate = new Date();
  let getDay = setDate.getDay(),
    getDayN = setDate.getDate(),
    getMonth = setDate.getMonth(),
    getYear = setDate.getFullYear();

  switch (getMonth) {
    case 0:
      month = "Enero";
      break;
    case 1:
      month = "Febrero";
      break;
    case 2:
      month = "Marzo";
      break;
    case 3:
      month = "Abril";
      break;
    case 4:
      month = "Mayo";
      break;
    case 5:
      month = "Junio";
      break;
    case 6:
      month = "Julio";
      break;
    case 7:
      month = "Agosto";
      break;
    case 8:
      month = "Septiembre";
      break;
    case 9:
      month = "Octubre";
      break;
    case 10:
      month = "Noviembre";
      break;
    case 11:
      month = "Diciembre";
      break;

    default:
      break;
  }

  switch (getDay) {
    case 0:
      day = "Domingo";
      break;
    case 1:
      day = "Lunes";
      break;
    case 2:
      day = "Martes";
      break;
    case 3:
      day = "Miercoles";
      break;
    case 4:
      day = "Jueves";
      break;
    case 5:
      day = "Viernes";
      break;
    case 6:
      day = "Sabado";
      break;

    default:
      break;
  }

  $date.textContent = `${day}, ${getDayN} de ${month} del ${getYear}`;
}

function startTime() {
  const today = new Date();
  let h = today.getHours(),
    m = today.getMinutes(),
    s = today.getSeconds();

  m = checkTime(m);
  s = checkTime(s);

  $clock.textContent = h + ":" + m + ":" + s;

  //Changing the date if the day ends
  if (h === 0 && m === 0) {
    setDate();
  }

  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

setDate();
startTime();
