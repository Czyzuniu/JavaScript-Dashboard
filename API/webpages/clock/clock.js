

window.addEventListener('load', getSettings);
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
