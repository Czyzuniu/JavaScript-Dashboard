


function loadWeather(){
//  var town = town;
  var weatherurl = 'http://api.apixu.com/v1/forecast.json?key=2e167e86455f442997e161402172602&q=Portsmouth&days=3';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', weatherurl, true);
  xhr.onload = function() {
      if (xhr.status === 200) {
          createWeather(JSON.parse(xhr.responseText));
      } else {
          console.error('error getting pictures', xhr);
          //window.main.innerHTML = 'sorry, something went wrong...';
      }
  }
  xhr.send();

}

function createWeather(data){
  console.log(data);
  var today = new Date();
  var month = (today.getMonth()+1);
  if(month < 10){
    month = '0' + month;
  }
  var date = today.getFullYear()+'-'+month+'-'+today.getDate();
  window.weathernew.innerHTML = '';

  div = document.createElement('div');
  div.id = 'current';

  var elem = document.createElement('h1');
  elem.textContent = data.location.name;
  div.appendChild(elem);


  var div1 = document.createElement('div');

  elem = document.createElement('img');
  elem.src = data.current.condition.icon;
  div1.appendChild(elem);

  elem = document.createElement('p');
  elem.textContent = data.current.temp_c + '' + '\u2103';
  elem.classList.add('text');
  div1.appendChild(elem);

  div.appendChild(div1);


  div1 = document.createElement('div');
  elem = document.createElement('p');
  elem.classList.add('txt');
  elem.textContent = data.current.condition.text;
  div1.appendChild(elem);

  div.appendChild(div1);

  window.weathernew.appendChild(div);
  //container = document.createElement('section');
  //div = document.createElement('div');
  //div.id = 'forecast';
  //container.appendChild(div);

  //var elem = document.createElement('h1');
  //elem.textContent = data.location.name;
  //div.appendChild(elem);
  //window.weathernew.appendChild(container);


  var forecast = document.createElement('div');
  forecast.id = 'forecast';
  window.weathernew.appendChild(forecast);
  var weekdays = ['Monday','Tuesday', 'Wednesday','Thursday','Friday','Saturday','Sunday'];
  data.forecast.forecastday.forEach(function(weather){

    var elem = document.createElement('div');
    elem.id = 'dayfore';
    forecast.appendChild(elem);

    var data = document.createElement('p');
    var date = new Date(weather.date);
    data.textContent = weekdays[date.getDay()];
    elem.appendChild(data);

    var data = document.createElement('img');
    data.src = weather.day.condition.icon;
    elem.appendChild(data);

    data = document.createElement('p');
    data.textContent = weather.day.avgtemp_c + '' + '\u2103';
    elem.appendChild(data);

    data = document.createElement('p');
    data.textContent = weather.day.condition.text;
    elem.appendChild(data);

  });

}


loadWeather();
