

var set = window.setup;



window.addEventListener('load', function(){
  var bg = JSON.parse(localStorage.getItem('background'));
  if(bg == null){
    bg = 'rgb(102, 204, 255)';
  }
  window.body.style.backgroundColor = bg;
  localStorage.setItem('background', JSON.stringify(bg));
});






window.cog.addEventListener('click', function(){

  set.classList.toggle('slide');
  window.cog.classList.toggle('bringToFront');
  for(var i of drags){
    i.classList.remove('bringToFront');
  }
  setup.innerHTML = '';

  createSetupPage();
});


function createSetupPage(){

  var container = document.createElement('div');
  var elem = document.createElement('p');
  elem.textContent = 'Change background-color';
  container.appendChild(elem);

  elem  = document.createElement('input');
  elem.type = 'color';
  elem.id = 'colorpicker';
  elem.addEventListener('input', function(){
    window.body.style.backgroundColor = this.value;
    localStorage.setItem('background', JSON.stringify(this.value));
  });
  container.appendChild(elem);



  container.appendChild(elem);



  set.appendChild(container);

}


window.setInterval(function(){
  loadWeather();
  loadNews();
}, 3600000);
