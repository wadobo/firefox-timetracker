var textArea = document.getElementById("edit-box");
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");
var commitButton = document.getElementById("commit-button");
var timer = document.getElementById("timer");

timer.obj = null;
timer.lasttime = 0;

var updateTimer = function() {
  var date = new Date();
  var hours = 0;
  var minutes = 0;

  if(timer.obj) {
    currenttime = date.getTime();
    totaltime = (currenttime - timer.lasttime)/(1000*3600);

    timer.textContent = totaltime.toFixed(2) +
                        'h to commit';
  }
};

timer.start = function(date) {
  timer.obj = date;
  timer.lasttime = date.getTime();
  startButton.style.display = 'none';
  stopButton.style.display = 'block';
};

timer.stop = function() {
  timer.obj = null;
  timer.lasttime = 0;
  startButton.style.display = 'block';
  stopButton.style.display = 'none';
};

textArea.addEventListener('keyup', function onkeyup(event) {
  if (event.keyCode === 13) {
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
  setInterval(updateTimer, 10000);
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
