
function loadWeather(town){
  var weatherurl = 'http://api.apixu.com/v1/forecast.json?key=2e167e86455f442997e161402172602&q=' + town + '&days=5';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', weatherurl, true);
  xhr.onload = function() {
      if (xhr.status === 200) {
          createWeather(JSON.parse(xhr.responseText));
      } else {
          console.error('error getting weather', xhr);
      }
  }
  xhr.send();

}


function createWeather(data){
  window.current.innerHTML = '';
  window.forecast.innerHTML = '';


  var elem = document.createElement('div');
  elem.id = 'weathericon';
  var dat = document.createElement('img');
  dat.src = data.current.condition.icon;
  dat.draggable = false;
  elem.appendChild(dat);

  window.current.appendChild(elem);


  elem = document.createElement('div');
  elem.id = 'weathertemp';
  dat = document.createElement('p');
  dat.textContent = data.current.temp_c + '' + '\u2103';
  dat.classList.add('tempFont');
  elem.appendChild(dat);

  dat = document.createElement('p');
  dat.textContent = data.current.condition.text;
  elem.appendChild(dat);

  window.current.appendChild(elem);

  elem = document.createElement('div');
  elem.id = 'weathersearch';

  dat = document.createElement('p');
  dat.textContent = data.location.name + ',' + data.location.country;


  var icon = document.createElement('i');
  icon.className = 'fa fa-location-arrow';
  icon.style.fontSize = 25 + 'px';
  icon.style.width =  100 + '%';

  icon.onclick = function(e){
    dat.classList.add('behind');
    window.weatherLoc.classList.remove('behind');
  };
  dat.appendChild(icon);
  elem.appendChild(dat);

  dat = document.createElement('input');
  dat.placeholder = 'enter city name';
  dat.type = 'text';
  dat.id = 'weatherLoc';
  dat.addEventListener('blur', function(e){
    var town = window.weathersearch.children[1].textContent;
    if(dat.value.length > 0){
      town.textContent = dat.value;
      loadWeather(dat.value);
      localStorage.setItem('loc', dat.value);
    }else {
      dat.classList.add('behind');
    }
  });


  dat.classList.add('behind');
  elem.appendChild(dat);

  window.current.appendChild(elem);

  var forecastData = data.forecast.forecastday;
  forecastData.splice(0, 1);

  forecastData.forEach(function(weather){

    var elem = document.createElement('div');
    elem.id = 'dayfore';
    window.forecast.appendChild(elem);

    var data = document.createElement('img');
    data.src = weather.day.condition.icon;
    data.draggable = false;
    elem.appendChild(data);

    data = document.createElement('p');
    var date = new Date(weather.date);
    data.textContent = weekdays[date.getDay() - 1];
    if(data.textContent == ''){
      data.textContent = "Sunday";
    }
    elem.appendChild(data);

    data = document.createElement('p');
    data.textContent = weather.day.avgtemp_c + '\u2103';
    elem.appendChild(data);


  });
  size('weather');
}

var locat = localStorage.getItem('loc');
if(locat == null){
  loadWeather('Portsmouth');
}
else {
  loadWeather(locat);
}
