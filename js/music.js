const $alarmIcon = d.getElementById('alarm-icon'),
  $audioAlarm = d.getElementById('audio-alarm'),
  $audioVolume = d.getElementById('audio-volume'),
  $playlist = d.getElementById('rain-and-thunder-sounds'),
  $playSong = d.getElementById('play-song'),
  $pauseSong = d.getElementById('pause-song'),
  $previousSong = d.getElementById('previous-song'),
  $nextSong = d.getElementById('next-song'),
  $aleatorySong = d.getElementById('aleatory-song'),
  $songBar = d.getElementById('song-bar')

/*MUSIC BAR*/

d.addEventListener('click', (e) => {
  if (e.target === $playSong) {
    $playlist.play()
  }

  if (e.target === $pauseSong) {
    $playlist.pause()
  }
})

$songBar.setAttribute('min', 0)
$songBar.setAttribute('max', $playlist.duration)
$songBar.value = 0
$playlist.volume = 0.1
$audioAlarm.volume = 0.1

$playlist.addEventListener('timeupdate', (e) => {
  //para filtrar decimales ✅
  if (Math.round($playlist.currentTime) != $songBar.value) {
    $songBar.value = Math.round($playlist.currentTime)
  }
})

d.addEventListener('change', (e) => {
  if (e.target == $audioVolume) {
    $playlist.volume = $audioVolume.value
  }

  if (e.target == $songBar) {
    $playlist.currentTime = e.target.value
  }
})

/* -> SECCIÓN DE MÚSICA
  -Haciendo pruebas con la API en thunderbird
  -Conectar con la API haciendo
  -Ponerlo a la derecha
  - Encerrarlo en un div para acomodarlo aparte



-> visualizador de audio con la WEB API 
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API */
