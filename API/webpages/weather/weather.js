function loadWeather(town){
  var town = town;
  var weatherurl = 'http://api.apixu.com/v1/current.json?key=2e167e86455f442997e161402172602&q=' + town;
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
  var town = data.location.name;
  var weather = data.current.condition.text;
  var temp = data.current.temp_c;

  var icon = document.createElement('img');
  icon.src = data.current.condition.icon;

  window.weather.children[0].textContent = temp + '' + '\u2103';

  window.townlocation.textContent = town;
  window.weathertype.textContent = weather;
  window.weathericon.appendChild(icon);

}





window.addEventListener('load', function(){
  loadWeather('Portsmouth');
});
