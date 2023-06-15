const d = document,
  $clock = d.getElementById("clock"),
  $hours = d.getElementById("hours"),
  $minutes = d.getElementById("minutes"),
  $start = d.getElementById("start"),
  $pause = d.getElementById("pause"),
  $resume = d.getElementById("resume"),
  $restart = d.getElementById("restart"),
  $delete = d.getElementById("delete");

let totalSeconds = 0,
  isPaused = false,
  endCountdown = false;

const countDown = () => {
  totalSeconds = $hours.value * 3600;
  totalSeconds += $minutes.value * 60;

  let countDown = setInterval(() => {
    if (totalSeconds === 0) {
      clearInterval(countDown);
      $clock.textContent = "TIME!";
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

    endCountdown = true;
  }

  if (e.target === $delete) {
    $start.classList.remove("hidde");
    $pause.classList.add("hidde");
    $restart.classList.add("hidde");
    $resume.classList.add("hidde");
    $delete.classList.add("hidde");

    endCountdown = true;
    $hours.value = 0;
    $minutes.value = 0;
  }
});
