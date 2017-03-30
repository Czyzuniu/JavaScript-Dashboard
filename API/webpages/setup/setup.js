var set = window.setup;
//var profiles = [];
//var selectedProfile;


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

  /*
  var container = document.createElement('div');

  var elem = document.createElement('p');
  elem.textContent = 'Choose a profile';
  container.appendChild(elem);

  var form = document.createElement('form');
  var select = document.createElement('select');
  var profileName = document.createElement('input')
  profileName.type = 'text';
  profileName.placeholder = 'Profile name';
  form.appendChild(profileName);

  var input = document.createElement('input')
  input.addEventListener('click', function(){
    if(profileName.value.length > 0){
      profiles.push(profileName.value);
      localStorage.setItem('profiles', JSON.stringify(profiles));
      clearSelect(select);
      addProfiles();
    }
  });
  input.type = 'button';
  input.value = 'Create Profile';
  form.appendChild(input);




  function addProfiles(){
    for(var i of profiles){
      var opt = document.createElement('option');
      opt.text = i;
      select.appendChild(opt);
    }
  }

  addProfiles();
  form.appendChild(select);

  var input = document.createElement('input')
  input.type = 'button';
  input.value = 'Set profile';
  input.addEventListener('click', function(){
    localStorage.setItem('selectedProfile', JSON.stringify(profiles[select.selectedIndex]));
    changeProfile();
  });

  form.appendChild(input);
  container.appendChild(form);
  set.appendChild(container);
}





function clearSelect (comboBox) {
  while (comboBox.options.length > 0) {
  comboBox.remove(0);
  }
}


function changeProfile(){
  selectedProfile = JSON.parse(localStorage.getItem('selectedProfile'));
}


window.addEventListener('load', function(){
  selectedProfile = JSON.parse(localStorage.getItem('selectedProfile'));
  if(selectedProfile == null){
    selectedProfile = 'Default';
    localStorage.setItem('selectedProfile', JSON.stringify(selectedProfile));
  }


  if(localStorage.getItem('profiles') == null){
    profiles = ["Default"];
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }else {
    profiles = JSON.parse(localStorage.getItem('profiles'));
  }
});
*/


window.setInterval(function(){
  loadWeather();
  loadNews();
}, 600000);
