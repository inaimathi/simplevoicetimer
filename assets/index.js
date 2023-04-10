const hasStorage = 'localStorage' in window;

function mkLog(elem) {
  $el = document.createElement("pre")
  $el.className = "log";

  elem.appendChild($el);

  return (msg, prefix) => {
    const pref = prefix === undefined ? "" : prefix;
    const m = pref + msg;
    console.log(m);
    $el.textContent += (m + "\n");
  }
}

var _log = console.log;

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

// front.send("hello from front");

// front.on("hello from back", function(msg){
// 	console.log(msg);
// 	$('#msg').html(msg);
// });

front.on("front-log", (msg) => _log(msg, "BACK -- "));

function frontStart() {
  _log = mkLog(document.querySelector(".jumbotron"))

  _log("This is a log test...")

  const startSound = mkSound("../assets/sound/start.wav");
  const progSound = mkSound("../assets/sound/progress.wav");
  const finSound = mkSound("../assets/sound/finish.wav");

  $("#start-button").on("click", startSound);
  $("#progress-button").on("click", progSound)
  $("#finish-button").on("click", finSound);

}
