var textArea = document.getElementById("edit-box");
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
var commitButton = document.getElementById("commit-button");
var timer = document.getElementById("timer");
timer.obj = null;

timer.start = function(date) {
    timer.obj = date;
};

timer.stop = function() {
    timer.obj = null;
};

var updateTimer = function() {
  var date = new Date();
  var hours = 0;
  var minutes = 0;

  if(date.getHours() < timer.obj.getHours()) {
    hours = date.getHours() - timer.obj.getHours();
  }
  if(date.getMinutes() < timer.obj.getHours()) {
    minutes = date.getMinutes() - timer.obj.getMinutes();
  }

  timer.textContent = hours +
                      '.' + minutes +
                      'h to commit';
};

textArea.addEventListener('keyup', function onkeyup(event) {
  if (event.keyCode == 13) {
    // Remove the newline.
    text = textArea.value.replace(/(\r\n|\n|\r)/gm,"");
    self.port.emit("text-entered", text);
    textArea.value = '';
  }
}, false);

startButton.addEventListener('click', function onclickevent(event) {
  var date = new Date();
  var project = 'project';
  textArea.value += '== ' + date.getDate() +
                   '/' + (date.getMonth() + 1) +
                   '/' + date.getFullYear() +
                   '==\n' + date.getHours()  +
                   ':' + date.getMinutes() +
                   ' start ' + project + '\n';
  timer.start(date);
  updateTimer();
});

stopButton.addEventListener('click', function onclickevent(event) {
  var date = new Date();
  textArea.value += date.getHours() + ':' +
                    date.getMinutes() + ' Stop\n';
  timer.stop();
});

self.port.on("show", function onShow() {
  textArea.focus();
});
