const hasStorage = 'localStorage' in window;

function mkSound(src) {
  const _el = document.createElement("audio");
  _el.src = src;
  _el.preload = "auto";
  _el.autostart = "false";
  return () => {
    _el.pause();
    _el.currentTime = 0;
    _el.play();
  }
}

function loadWorkout(name) {
  if (hasStorage) {
    const serialized = window.localStorage.getItem("workout/" + name);
    if (serialized !== null) {
      return JSON.parse(serialized);
    }
  }
  return {};
}

function saveWorkout(name, workout) {
  if (hasStorage) {
    window.localStorage.setItem("workout/" + name, JSON.serialize(workout));
    return true;
  };
  return false;
}

function listWorkouts() {
  return ["lower-body-stretch", "full-body-stretch"];
}

function _log(msg, prefix) {
  const $el = $(".log")
  const pref = prefix === undefined ? "" : prefix;
  const m = pref + msg;
  console.log(m);
  $el.append(m + "\n");
}

front.send("hello from front");

front.on("hello from back", function(msg){
	console.log(msg);
	$('#msg').html(msg);
});

front.on("front-log", (msg) => _log(msg, "BACK -- "));

var ct = 1;

function frontStart() {
  const startSound = mkSound("../assets/sound/start.wav");
  const progSound = mkSound("../assets/sound/progress.wav");
  const finSound = mkSound("../assets/sound/finish.wav");

  $("#start-button").on("click", startSound);
  $("#progress-button").on("click", progSound)
  $("#finish-button").on("click", finSound);

  $("#counter-p").html(ct);

  $("#load-button").on("click", () => {
    const str = window.localStorage.getItem("count");
    ct = JSON.parse(str);
    $("#counter-p").html(ct);
  });

  $("#save-button").on("click", () => {
    window.localStorage.setItem("count", JSON.stringify(ct));
  });

  $("#up-button").on("click", () => {
    ct = ct + 1;
    $("#counter-p").html(ct);
  });

  $("#down-button").on("click", () => {
    ct = ct - 1;
    $("#counter-p").html(ct);
  });
}
