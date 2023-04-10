const hasStorage = 'localStorage' in window;

function mkLog(elem) {
  _el = document.createElement("pre")
  _el.className = "log";

  elem.appendChild(_el);

  return (msg, prefix) => {
    const pref = prefix === undefined ? "" : prefix;
    const m = pref + msg;
    console.log(m);
    _el.textContent += (m + "\n");
  }
}
var _log = console.log;

const sounds = {};

function playSound(name) {
  if (name in sounds) {
    _log("Playing sound '" + name + "'");
    sounds[name]();
  }
}

function mkSound(src, name) {
  const _el = document.createElement("audio");
  _el.src = src;
  _el.preload = "auto";
  _el.autostart = "false";

  const f = () => {
    _el.pause();
    _el.currentTime = 0;
    _el.play();
  }

  if (name !== undefined) {
    sounds[name] = f;
  }

  return f;
}

function renderExercise(elem, exercise) {
  const template = document.querySelector("#exercise-screen");
  const clone = template.content.firstElementChild.cloneNode(true);

  clone.querySelector(".exercise-name").textContent = exercise.name;
  const $time = clone.querySelector(".exercise-time");
  elem.innerHTML = "";
  elem.appendChild(clone);
  _log("Exercise rendered...")

  var secondsRemaining = exercise.duration.seconds;
  var paused = false;
  var interval = undefined;

  const $reset = clone.querySelector(".exercise-reset");
  const $pause = clone.querySelector(".exercise-pause");
  const $skip = clone.querySelector(".exercise-skip");

  const update = () => {
    if (secondsRemaining > 0 && !paused) {
      secondsRemaining -= 1;

      if (secondsRemaining % 5 == 0) {
	_log("Ping...");
	playSound("progress");
      }

      if (secondsRemaining == 0) {
	_log("Done! :D");
	playSound("finish");
      }
    }

    $time.textContent = secondsRemaining + " seconds";
  }

  $reset.addEventListener("click", () => secondsRemaining = exercise.duration.seconds);
  $pause.addEventListener("click", () => {
    paused = !paused
    if (paused) {
      $pause.textContent = "|>";
    } else {
      $pause.textContent = "||";
    }
  });
  $skip.addEventListener("click", () => {
    secondsRemaining = 0;
    update()
  });

  interval = setInterval(update, 1000);
  playSound("start");
  update();
}

front.on("front-log", (msg) => _log(msg, "BACK -- "));

function frontStart() {
  _log = mkLog(document.querySelector(".jumbotron"))

  _log("This is a log test...")

  const startSound = mkSound("../assets/sound/start.wav", "start");
  const progSound = mkSound("../assets/sound/progress.wav", "progress");
  const finSound = mkSound("../assets/sound/finish.wav", "finish");

  startSound();

  $("#start-button").on("click", () => renderExercise(
    document.querySelector(".main-display"),
    {name: "Calf Stretch Left", duration: {seconds: 30}}
  ));
  $("#progress-button").on("click", progSound)
  $("#finish-button").on("click", finSound);
}
