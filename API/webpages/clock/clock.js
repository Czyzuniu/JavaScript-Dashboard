window.addEventListener('load', getSettings);
window.addEventListener('load', function(){
    //createAlarmPage(); alarm is disabled
    //loadAlarms();
});
window.csettings.addEventListener('click', showSettings);
window.cformat.addEventListener('click', toggle);
setInterval(getTime, 1000);

var on = window.cformat;
var classList = on.classList;
var is24;
var alarms = [];
var currentTime;

var alarmOn = false;



function getTime(){

  var date = new Date();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var time = window.time;
  var format = window.cformat;
  var ext = '';

  if(minutes < 10){
      minutes = '0' + minutes;
  }

  if(is24){
    if(hour < 10){
      hour = '0' + hour;
    }
  }

  if(is24 == false){
    if(date.getHours() > 12){
      hour -= 12;
      ext = 'PM';
    }
    else if(date.getHours() == 12){
      hour = 12;
      ext = 'PM';
    }
    else {
      ext = 'AM';
    }

  }

    //  console.log(hour);
  time.children[0].textContent = hour;
  time.children[1].textContent = ':';
  time.children[2].textContent = minutes;
  time.children[3].textContent = ext;
  time.children[1].classList.toggle('blink');

  var h = time.children[0].textContent;
  var m = time.children[2].textContent;





}

function showSettings(){
  var settings = window.sett;
  settings.classList.toggle('hidden');
}

function getSettings(){
  var url = '/api/clock';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
      if (xhr.status === 200) {
          loadSettings(JSON.parse(xhr.responseText));
          size('clock');
      } else {
      //    console.error('error getting pictures', xhr);
        }
      }
        xhr.send();


}

function loadSettings(settings){
  console.log(settings);
  settings.forEach(function (s){
    if(s.setting == 'format24'){
      if(s.value == 0){
        is24 = false;
        on.className = classList[0] + " " + 'fa-toggle-off';
      }else {
        is24 = true;
        on.className = classList[0] + " " + 'fa-toggle-on';
        }
      }
    });
  }


function toggle(){
  var val;
  if(classList[1] == 'fa-toggle-on'){
    on.className = classList[0] + " " + 'fa-toggle-off';
    is24 = false;
    val = 0;
  }
  else {
    on.className = classList[0] + " " + 'fa-toggle-on';
    is24 = true;
    val = 1;
  }

  var url = '/api/clock?format=' + val;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.send();
}

function createAlarmPage(){
  var alarmI= window.alarmIcon;
  alarmI.addEventListener('click', function(){
      window.alarm.classList.toggle('slide');
      window.csettings.classList.toggle('hidden');

  });

      var alarm = window.alarm;
      alarm.innerHTML = '';

      var div1 = document.createElement('div');
      div1.id = 'panel';

      var time = document.createElement('input');
      time.type = 'time';
      div1.appendChild(time);

      var title = document.createElement('input');
      title.type = 'text';
      title.value = 'title';
      div1.appendChild(title);

      elem = document.createElement('input');
      elem.type = 'button'
      elem.value = 'set alarm!';

      elem.addEventListener('click', function(){
        var xhr = new XMLHttpRequest();
        var url = '/api/clockAlarm?time=' + time.value + '&title=' + title.value;

        xhr.open('POST',url, true); // synchronous request
        xhr.send();
        loadAlarms();
      });
      div1.appendChild(elem);

      alarm.appendChild(div1);

      var div2 = document.createElement('div');
      div2.id = 'panel';

      alarm.appendChild(div2);
}

function loadAlarms(){
  var url = '/api/clockAlarm';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
      if (xhr.status === 200) {
          createAlarms(JSON.parse(xhr.responseText));
      } else {
          console.error('error getting pictures', xhr);
      }
  }
  xhr.send();
}

function createAlarms(data){
  var main = window.panel[1];
  main.innerHTML = '';
  data.forEach(function(alrm){
    var container = document.createElement('section');

    var elem = document.createElement('div');
    elem.classList.add('alarmDiv');

    var text = document.createElement('h1');
    text.textContent = alrm.title;
    elem.appendChild(text);


    var clockDiv = document.createElement('div');
    clockDiv.id = 'clockImage';

    var img = document.createElement('img');
    img.src = 'clock.png';

    clockDiv.appendChild(img);
    elem.appendChild(clockDiv);

    var text = document.createElement('p');
    var time = alrm.time.split(':');
    text.textContent = time[0] + ':' + time[1];
    var obj = {
      time:(time[0] + ':' + time[1]),
      title:alrm.title
    };

    alarms.push(obj);
    elem.appendChild(text);

    text = document.createElement('p');
    text.textContent = 'X';
    text.id = 'remove';
    text.dataset.id = alrm.id;
    text.onclick = function(e){
      deleteAlarm(e);
      loadAlarms();
    }
    elem.appendChild(text);

    container.appendChild(elem);
    main.appendChild(container);

  });
}

function checkIfAlarm(){
  var question;
  var title;
  console.log(alarmOn);
  for(var i of alarms){
    if(i.time == currentTime){
      title = i.title;
      alarmOn = true;
    }
  }

  if(alarmOn){
    audio.play();
    window.alarmOff.classList.remove('slide');
  }



}

window.alarmOff.addEventListener('click', function(){
    alarmOn = true;
    audio.pause();
    window.alarmOff.classList.add('slide');
    setTimeout(function(){
        alarmOn = false;
    },60000)
});

function deleteAlarm(e){
  var id = e.target.dataset.id;
  var url = '/api/clockAlarm?id=' + id;
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', url, true);
  xhr.send();
}
