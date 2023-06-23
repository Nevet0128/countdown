const d = document,
  $alarmIcon = d.getElementById("alarm-icon"),
  $audioAlarm = d.getElementById("audio-alarm"),
  $audioVolume = d.getElementById("audio-volume"),
  $clock = d.getElementById("clock"),
  $countDown = d.getElementById("count-down"),
  $date = d.getElementById("date"),
  $hours = d.getElementById("hours"),
  $minutes = d.getElementById("minutes"),
  $start = d.getElementById("start"),
  $pause = d.getElementById("pause"),
  $resume = d.getElementById("resume"),
  $restart = d.getElementById("restart"),
  $delete = d.getElementById("delete"),
  $songBar = d.getElementById("song-bar");

//for countDown
let totalSeconds = 0,
  isPaused = false,
  endCountdown = false,
  todaysDate = new Date(),
  hours = todaysDate.getHours(),
  minutes = todaysDate.getMinutes();

$clock.textContent = `${hours}:${minutes}`;

function setDate() {
  let getDay = todaysDate.getDay(),
    getDayN = todaysDate.getDate(),
    getMonth = todaysDate.getMonth(),
    getYear = todaysDate.getFullYear();

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

function setClock() {
  hours = todaysDate.getHours();
  if (hours / 10 < 1) hours = `0${hours}`;

  minutes = todaysDate.getMinutes();
  if (minutes / 10 < 1) minutes = `0${minutes}`;

  if (hours <= 11) {
    $clock.textContent = `${hours}:${minutes} AM`;
  } else {
    $clock.textContent = `${hours}:${minutes} PM`;
  }
}

/* const countDown2 = () => {
      setInterval(() => {
    currentMilliseconds = Date.now();
    hoursToMilliseconds = $hours.value * 3.6e6;
    minutesToMiliseconds = $minutes.value * 60000;
    totalUserTime = hoursToMilliseconds + minutesToMiliseconds;

    timeRemaining = currentMilliseconds + totalUserTime - currentMilliseconds;

    //Changing the date if the day ends
    if (todaysDate.getHours() === 0 && todaysDate.getMinutes() === 0) {
      setDate();
    }

    //The count has ended
    if (timeRemaining <= 0) {
      $pause.classList.add("hidde");

      clearInterval(countDown);
      $countDown.textContent = "TIME!";
      $audioAlarm.play();
      return;
    }

    //User clears the count down
    if (endCountdown === true) {
      clearInterval(countDown);
      $countDown.textContent = "00:00:00";
      return;
    }

    //User has paused the count down
    if (isPaused) {
      setTimeout(() => {
        timeRemaining + 500;
      }, 500);
    } else {
      //para el resultado
      getHours = Math.floor(timeRemaining / 3.6e6);
      getMinutes = Math.floor((timeRemaining % 3.6e6) / 60000);
      getSeconds = Math.floor(
        (((hoursToMilliseconds + minutesToMiliseconds) % 3.6e6) % 60000) / 1000
      );

      $countDown.textContent = `${getHours}:${getMinutes}:${getSeconds}`;
    }
  }, 1000);

  return;
}; */

setDate();
setClock();

const countDown = () => {
  totalSeconds = $hours.value * 3600;
  totalSeconds += $minutes.value * 60;

  //Changing the date if the day ends
  if (todaysDate.getHours() === 0 && todaysDate.getMinutes() === 0) {
    setDate();
  }

  let countDown = setInterval(() => {
    if (totalSeconds === 0) {
      $pause.classList.add("hidde");

      clearInterval(countDown);
      $countDown.textContent = "TIME!";
      $audioAlarm.play();
      return;
    }

    if (endCountdown === true) {
      clearInterval(countDown);
      $countDown.textContent = "00:00:00";
      return;
    }

    if (isPaused) {
      setTimeout(() => {}, 500);
    } else {
      totalSeconds--;

      hours = Math.floor(totalSeconds / 3600);
      if (hours / 10 < 1) hours = `0${hours}`;

      minutes = Math.floor((totalSeconds % 3600) / 60);
      if (minutes / 10 < 1) minutes = `0${minutes}`;

      seconds = Math.floor((totalSeconds % 3600) % 60);
      if (seconds / 10 < 1) seconds = `0${seconds}`;

      $countDown.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }, 1000);

  return;
};

d.addEventListener("click", (e) => {
  if (e.target === $start) {
    //Inputs filter
    if (
      $hours.value <= 24 &&
      $hours.value >= 0 &&
      $minutes.value <= 60 &&
      $minutes.value >= 0
    ) {
      $start.classList.add("hidde");
      $pause.classList.remove("hidde");
      $restart.classList.remove("hidde");
      $delete.classList.remove("hidde");
      countDown();
    } else {
      alert("Las horas no mayores a 24 y los minutos no mayores a 60");
      $hours.value = "";
      $minutes.value = "";
    }
    endCountdown = false;
  }

  if (e.target === $pause) {
    $pause.classList.add("hidde");
    $resume.classList.remove("hidde");

    isPaused = true;
  }

  if (e.target === $resume) {
    $resume.classList.add("hidde");
    $pause.classList.remove("hidde");

    isPaused = false;
  }

  if (e.target === $restart) {
    $start.classList.remove("hidde");
    $pause.classList.add("hidde");
    $restart.classList.add("hidde");
    $delete.classList.add("hidde");

    $countDown.textContent = "00:00:00";
    endCountdown = true;
    $audioAlarm.load();
  }

  if (e.target === $delete) {
    $start.classList.remove("hidde");
    $pause.classList.add("hidde");
    $restart.classList.add("hidde");
    $resume.classList.add("hidde");
    $delete.classList.add("hidde");

    $countDown.textContent = "00:00:00";
    endCountdown = true;
    $hours.value = 0;
    $minutes.value = 0;
    $audioAlarm.load();
  }
});

/*MUSIC BAR*/

$songBar.setAttribute("min", 0);
$songBar.setAttribute("max", $audioAlarm.duration);
$songBar.value = 0;
$audioAlarm.volume = 0.1;

$audioAlarm.addEventListener("timeupdate", (e) => {
  //para filtrar decimales ✅
  if (Math.round($audioAlarm.currentTime) != $songBar.value) {
    $songBar.value = Math.round($audioAlarm.currentTime);
  }
});

d.addEventListener("change", (e) => {
  if (e.target == $clock) {
    setClock();
  }

  if (e.target == $audioVolume) {
    $audioAlarm.volume = $audioVolume.value;
  }

  if (e.target == $songBar) {
    $audioAlarm.currentTime = e.target.value;
  }
});

/*TODO
❗❗❗❗❗ Aprender FIGMA para tener clases y ID concretos para facilitar el CSS ❗❗❗❗❗

-> duration indicates the length of the element's media in seconds. ✅
https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration

-> Fecha completa ✅

-> Poner la hora en vivo 📌

->REHACER CUENTA ATRÁS COMPARANDO FECHAS ❌
por mal funcionamiento

->Poner RESTRICCIONES en los inputs ✅
  -Sólo números positivos o 0
  -No más de 60 en MINUTOS
  -No más de 24 en las HORAS

-> POSICIONAR LAS SECCIONES CON GRID ✅
      titulo titulo titulo
      TODO   main   listaReproducción

-> LISTA TO-DO con retención de datos (local storage)
    -Ponerlo a la izquierda

-> CALENDARIO con localStorage para marcar los días 
que se ha estudiado
  -Ponerlo debajo de todo, que ocupe el 100 vw y vh
  -Cuando se marque un objetivo del TODO
    cambiar el fondo de un color morado de la casilla del día

-> SECCIÓN DE MÚSICA
  -Haciendo pruebas con la API en thunderbird
  -Conectar con la API haciendo
  -Ponerlo a la derecha
  - Encerrarlo en un div para acomodarlo aparte



-> visualizador de audio con la WEB API 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
*/
