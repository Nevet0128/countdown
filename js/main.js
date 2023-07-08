const d = document,
  $alarmIcon = d.getElementById("alarm-icon"),
  $audioAlarm = d.getElementById("audio-alarm"),
  $audioVolume = d.getElementById("audio-volume"),
  $playlist = d.getElementById("rain-and-thunder-sounds"),
  $playSong = d.getElementById("play-song"),
  $pauseSong = d.getElementById("pause-song"),
  $previousSong = d.getElementById("previous-song"),
  $nextSong = d.getElementById("next-song"),
  $aleatorySong = d.getElementById("aleatory-song"),
  $countDown = d.getElementById("count-down"),
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
  endCountdown = false;

function countDown() {
  totalSeconds = $hours.value * 3600;
  totalSeconds += $minutes.value * 60;

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
}

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

d.addEventListener("click", (e) => {
  if (e.target === $playSong) {
    $playlist.play();
  }

  if (e.target === $pauseSong) {
    $playlist.pause();
  }
});

$songBar.setAttribute("min", 0);
$songBar.setAttribute("max", $playlist.duration);
$songBar.value = 0;
$playlist.volume = 0.1;
$audioAlarm.volume = 0.1;

$playlist.addEventListener("timeupdate", (e) => {
  //para filtrar decimales ✅
  if (Math.round($playlist.currentTime) != $songBar.value) {
    $songBar.value = Math.round($playlist.currentTime);
  }
});

d.addEventListener("change", (e) => {
  if (e.target == $audioVolume) {
    $playlist.volume = $audioVolume.value;
  }

  if (e.target == $songBar) {
    $playlist.currentTime = e.target.value;
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
