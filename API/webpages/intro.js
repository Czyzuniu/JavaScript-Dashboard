

var steps = [2,3,4,5];
var currentStep = 1;
var stepCompleted = false;
var timerStep;


window.addEventListener('load', function(){

  if(localStorage.getItem('firstTime') === null){
    window.todolist.classList.toggle('hidden');
    window.body.classList.toggle('blurred');
    window.news.classList.toggle('hidden');
    window.clock.classList.toggle('hidden');
    window.weather.classList.toggle('onstep');
    window.comptab.classList.toggle('hidden');
    var tabItems = window.comptab.children;

    for(var i of tabItems){
      i.classList.toggle('hidden');
    }

    var stepElement = document.createElement('div');
    var bottomPanel = document.createElement('div');
    bottomPanel.id = 'inputs';
    stepElement.id = 'step';
    window.body.appendChild(stepElement);

    var header = document.createElement('div');
    header.id = 'headerStep';

    var h = document.createElement('h1');
    h.textContent = 'Hello World, I am your dashboard!';

    header.appendChild(h);


    stepElement.appendChild(header);


    var content = document.createElement('div');
    content.id = 'contentStep';
    var text = document.createElement('p');
    writeInfo('You can move any of your widgets by holding a ' +
            'left mouse button and moving your mouse! ',content);


    writeInfo('upon hovering over any of your widgets your mouse cursor will look' +
    ' like this one below.',content);


    var icon = document.createElement('img');
    icon.src = 'icons/move.png';

    content.appendChild(icon);


    writeInfo('Move your weather widget around, to progress to the next step', content);

    stepElement.appendChild(content);

    createBottomPanel(bottomPanel);
    stepElement.appendChild(bottomPanel);

    var rect = window.weather.getBoundingClientRect();
    var startingLeft = rect.left;
    var startingTop = rect.top;
    timerStep = setInterval(function(){
              rect = window.weather.getBoundingClientRect();

              if(startingLeft != rect.left || startingTop != rect.top){
                enableNextStep('nextStepButton');
                clearInterval(timerStep);
                return;
              }

    },100);
  }
});



function writeInfo(text, appender){
  var info = document.createElement('p');

  info.textContent = text;
  appender.appendChild(info);
}


function createBottomPanel(appender){
  var input = document.createElement('input');
  input.type = 'button';
  input.value = 'Skip tutorial';
  input.addEventListener('click', function(){
    finish();
  });
  appender.appendChild(input);

  var input = document.createElement('input');
  input.type = 'button';
  input.id = 'nextStepButton';
  input.value = 'Next step';
  input.disabled = true;
  input.addEventListener('click', function(){
    currentStep++;
    nextStep(currentStep);

  });


  appender.appendChild(input);

}

function nextStep(step){
  switch (step) {
    case 2: secondStep();

      break;

    case 3: thirdStep();

      break;

    case 4: fourthStep();

      break;


    case 5: fifthStep();

      break;

    case 6: sixthStep();

      break;

    case 7: seventhStep();

      break;

    case 8: eightthStep();

      break;


    case 9: ninethStep();
      break;


    case 10: tenthStep();

      break;


    case 11: finish();
      break;
    default:

  }
}

function tenthStep(){
  disableNextStep('nextStepButton');
  var header = window.headerStep;
  var content =  window.contentStep;
  header.innerHTML = '';
  content.innerHTML = '';
  window.comptab.style.border = '3px dashed green';
  window.comptab.classList.toggle('onstep');
  window.comptab.classList.remove('hidden');


  createHeader('Hiding your widgets');

  writeInfo("You can hide your unwanted widgets by moving your widget on top of the bottom bar!",
  content);

  writeInfo("In order to show them back again, click on its icon at the bottom bar!",
  content);

  writeInfo("Hide and show your weather widget to complete the tutorial", content);

  window.nextStepButton.value = 'Complete tutorial';




  stepTimer = setInterval(function(){
    if(stepCount == 5){
      clearInterval(stepTimer);
      enableNextStep('nextStepButton');
    }
  });
}

function secondStep(){

  var header = window.headerStep;
  var content =  window.contentStep;
  header.innerHTML = '';
  content.innerHTML = '';
  disableNextStep('nextStepButton');
  createHeader('Changing your weather location');

  writeInfo('You can change your weather location by clicking '  +
  'location arrow on your weather widget'
  ,content);
  var icon = document.createElement('i');
  icon.className = 'fa fa-location-arrow';
  icon.style.textAlign = 'center';
  content.appendChild(icon);

  writeInfo('Upon typing your new location at the input form,'
  + 'click anywhere on the dashboard to set it!',content);

  writeInfo('Set your location now, to progress to the next step!', content);
  var currentLocation = window.weathersearch.children[0];

  stepTimer = setInterval(function(){
          var newLocation = window.weathersearch.children[0];
          if(newLocation != null){
            if(newLocation != currentLocation){
              enableNextStep('nextStepButton');
              clearInterval(stepTimer);
            }
          }
  },100);

}


function thirdStep(){
  var header = window.headerStep;
  var content =  window.contentStep;
  var news = window.news;
  header.innerHTML = '';
  content.innerHTML = '';
  news.classList.toggle('hidden');
  window.weather.classList.toggle('hidden');
    window.weather.classList.remove('onstep');

  news.classList.toggle('onstep');
  news.style.left = 25 + 'px';
  news.style.top = 105 + 'px';

  createHeader('Here are your news!');

  writeInfo('You can customize your categries by pressing the ' +
  'settings button at the bottom of the news widget', content);

  var input = document.createElement('input');
  input.type = 'button';
  input.value = 'settings';
  input.disabled = true;
  input.style.width = 100 + '%';
  content.appendChild(input);

  writeInfo('In settings you can choose between 6 different news categories on up to 3 different news panels', content);

  writeInfo('Specify your desired categories, and their news slide speed', content);
}

function fourthStep(){
  var header = window.headerStep;
  var content =  window.contentStep;
  header.innerHTML = '';
  content.innerHTML = '';
  window.news.classList.toggle('hidden');
  getWidget('clock');

  createHeader('Here is your clock!');


  writeInfo('Simple clock, press settings button to switch to 12 or 24 hour format', content);


    var icon = document.createElement('img');
    icon.src = 'icons/clockSettings.png';
    content.appendChild(icon);


    var icon = document.createElement('img');
    icon.src = 'icons/format.png';
    icon.id = 'bigger';
    content.appendChild(icon);


}

function fifthStep(){
  var header = window.headerStep;
  var content =  window.contentStep;
  disableNextStep('nextStepButton');
  header.innerHTML = '';
  content.innerHTML = '';
  window.clock.classList.toggle('hidden');
  getWidget('todolist');
  createHeader('Here is your to do list!');
  writeInfo("You can add your todo's to your list, type your next thing to do in the input box and press ADD", content);
  var img = document.createElement('img');
  img.src = 'icons/todos.png';
  img.id = 'bigger';
  content.appendChild(img);
  writeInfo("Upon addition you will see your todo in the list!", content);
  writeInfo("Add a todo to your list, to go to the next step!", content);

  var currentItems = window.notes.children.length;

  stepTimer = setInterval(function(){
            var items = window.notes.children.length;
            console.log(items);
            console.log(currentItems);
            if(items > currentItems){
              enableNextStep('nextStepButton');
              clearInterval(stepTimer);
            }
  },500);

}

function sixthStep(){
  var header = window.headerStep;
  var content =  window.contentStep;
  header.innerHTML = '';
  content.innerHTML = '';
  window.todolist.classList.toggle('hidden');

  getWidget('photoAlbum');

  createHeader('Here is your Photo Album!');

  writeInfo('It slides your photos at your specified time', content);

  writeInfo('You can upload, delete in your settings panel',content);

  writeInfo('Upon hovering on any image, you can skip it by pressing an arrow',content);
}

function seventhStep(){
  disableNextStep('nextStepButton');
  var header = window.headerStep;
  var content =  window.contentStep;
  header.innerHTML = '';
  content.innerHTML = '';
  window.photoAlbum.classList.toggle('hidden');

  getWidget('calendar');

  var events = window.events;
  events.classList.toggle('onstep');
  events.classList.toggle('hidden');
  events.style.left = 116 + 'px';
  events.style.top = 457 + 'px';

  createHeader('Here is your personal calendar!')
  writeInfo('You can add events when clicking on your specified day on the calendar', content);
  writeInfo('Your added events are stored on your seperate events widget', content);
  writeInfo('Add an event to your calendar, to go the the next step!', content);


  var addEvent = window.createEvent;
  addEvent.addEventListener('click', function(){
        enableNextStep('nextStepButton');
  });

}

function eightthStep(){
  disableNextStep('nextStepButton');
  var header = window.headerStep;
  var content =  window.contentStep;
  header.innerHTML = '';
  content.innerHTML = '';
  window.calendar.classList.toggle('hidden');
  window.events.classList.toggle('hidden');

  getWidget('weather');

  createHeader('You can resize your widgets!');

  writeInfo('On the bottom right corner of every widget, there is a red resizable button', content);

  writeInfo('You can resize your widget, by holding a left mouse on resizable ' +
  'button and moving your mouse ', content);

  writeInfo('Resize your widget to move the the next step!', content);

  var rectW = window.weather.getBoundingClientRect();
  var startingW = rectW.width;
  var startingH = rectW.height;

  timerStep = setInterval(function(){
            rectW = window.weather.getBoundingClientRect();
            console.log(rectW);
            if(startingW != rectW.width || startingH != rectW.height){
              enableNextStep('nextStepButton');
              clearInterval(timerStep);
            }

  },300);

}


function createHeader(text){
  var header = window.headerStep;
  var h = document.createElement('h1');
  h.textContent = text
  header.appendChild(h);
}


function getWidget(id){
  var elem = document.getElementById(id);
  elem.classList.toggle('onstep');
  elem.classList.toggle('hidden');
  elem.style.left = 450 + 'px';
  elem.style.top = 150 + 'px';
}


function enableNextStep(id){
  var next = document.getElementById(id);
  next.disabled = false;
}

function disableNextStep(id){
  var next = document.getElementById(id).disabled = true;
}

function finish(){
  localStorage.setItem('firstTime', JSON.stringify(true));

  var items = document.querySelectorAll('.onstep');
  for(var i of items){
    i.classList.remove('onstep');
  }

  window.body.classList.remove('blurred');
  window.step.classList.toggle('hidden');
  loadDefaultStorage();
  window.location.reload();
  clearInterval(timer);
}

function ninethStep(){
  var header = window.headerStep;
  var content =  window.contentStep;
  header.innerHTML = '';
  content.innerHTML = '';
  window.readOnly.classList.toggle('onstep');

  createHeader("Customizable mode");
  writeInfo("You can switch between customzable or read only mode", content);
  writeInfo("In the top right corner there is a switch", content);
  writeInfo("If the switch is on, you can confugure your dashboard", content);
  writeInfo("Otherwise all of the customizable features are gone", content);
}
