const d = document,
  $alarmIcon = d.getElementById("alarm-icon"),
  $audioAlarm = d.getElementById("audio-alarm"),
  $audioVolume = d.getElementById("audio-volume"),
  $clock = d.getElementById("clock"),
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

const countDown = () => {
  totalSeconds = $hours.value * 3600;
  totalSeconds += $minutes.value * 60;

  let countDown = setInterval(() => {
    if (totalSeconds === 0) {
      $pause.classList.add("hidde");

      clearInterval(countDown);
      $clock.textContent = "TIME!";
      $audioAlarm.play();
      return;
    }

    if (endCountdown === true) {
      clearInterval(countDown);
      $clock.textContent = "00:00:00";
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

      $clock.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }, 1000);

  return;
};

d.addEventListener("click", (e) => {
  if (e.target === $start) {
    $start.classList.add("hidde");
    $pause.classList.remove("hidde");
    $restart.classList.remove("hidde");
    $delete.classList.remove("hidde");

    endCountdown = false;
    countDown();
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

    $clock.textContent = "00:00:00";
    endCountdown = true;
    $audioAlarm.load();
  }

  if (e.target === $delete) {
    $start.classList.remove("hidde");
    $pause.classList.add("hidde");
    $restart.classList.add("hidde");
    $resume.classList.add("hidde");
    $delete.classList.add("hidde");

    $clock.textContent = "00:00:00";
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
  if (e.target == $audioVolume) {
    $audioAlarm.volume = $audioVolume.value;
  }

  if (e.target == $songBar) {
    $audioAlarm.currentTime = e.target.value;
  }
});

/*TODO
-> duration indicates the length of the element's media in seconds. ✅
https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration

-> SECCIÓN DE MÚSICA
  -Que sea un sticky
  - Encerrarlo en un div para acomodarlo aparte

-> visualizador de audio con la WEB API 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
*/
