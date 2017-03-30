var drags = document.querySelectorAll('.canDrag');
var tab = [];
var stepCount = 0;

  var customizeMode = JSON.parse(localStorage.getItem('configurable'));

  if(customizeMode == null){
    customizeMode = true;
    localStorage.getItem('configurable', JSON.stringify(customizeMode));
  }

//console.log(drags);
var border;
var draggedItem;
var offsetX;
var offsetY;
var id;
var left;
var top;
var resizers = [];


/* Draggable event handlers */
    function dragStart(event) {
      var style = window.getComputedStyle(event.target, null);

      id = event.target.id;
      event.dataTransfer.setData('id', id);
      event.dataTransfer.setData('left',(parseInt(style.getPropertyValue("left"),10)));
      event.dataTransfer.setData('top',(parseInt(style.getPropertyValue("top"),10)));

      draggedItem = event.target;

      draggedItem.style.border = '2px dashed grey'
      draggedItem.classList.remove('bringToFront');
      //console.log(draggedItem);
      offsetX = (parseInt(style.getPropertyValue("left"),10) - event.clientX);
      offsetY = (parseInt(style.getPropertyValue("top"),10) - event.clientY);
      //  console.log(draggedItem);
    }


    function dragEnd(event) {
      window.comptab.style.border = 'none';
      draggedItem.style.border = null;

      //shake(drags);
    }

  /* Drop target event handlers */
  function dragEnter(event) {
  }



  function dragOver(event) {

    var l = draggedItem.style.left = (event.clientX + parseInt(offsetX));

    var t = draggedItem.style.top = (event.clientY + parseInt(offsetY));


    draggedItem.style.left = (event.clientX + parseInt(offsetX)) + 'px';
    draggedItem.style.top = (event.clientY + parseInt(offsetY)) + 'px';

    window.comptab.style.border = '1px dashed green';

    var data = document.getElementById(id);
    var rect = data.getBoundingClientRect();

    bounds(draggedItem);


      var object = {
        id:id,
        startingLeft:l,
        startingTop:t,
        startingH:rect.height,
        startingW:rect.width,
        hidden:false
      };

    localStorage.setItem(id, JSON.stringify(object));
      //console.log(event.target.id);


      event.preventDefault();
 // Set the dropEffect to move
    event.dataTransfer.dropEffect = "move"
  }

  function dragOverTaskbar(event){
  }

  function dragLeave(event) {
  }




  function drop(event) {


  event.preventDefault();
  var id = event.dataTransfer.getData('id');
  var startingLeft = event.dataTransfer.getData('left');
  var startingTop = event.dataTransfer.getData('top');
  //console.log(startingLeft + ',' + startingTop);
  //var data = document.querySelectorAll('[data-id]');

  var data = document.getElementById(id);
  var rect = data.getBoundingClientRect();

  var object = {
    id:id,
    startingLeft:startingLeft,
    startingTop:startingTop,
    startingH:rect.height,
    startingW:rect.width,
    hidden:true
  };

  localStorage.setItem(id, JSON.stringify(object));

      tab.push(object);
      data.classList.toggle('hidden');
      createMiniature(object);




  }



  for(var i = 0; i < drags.length; i++){
    var component = document.getElementById(drags[i].id);
    component.addEventListener('dragstart',dragStart,false);
    component.addEventListener('dragenter',dragEnter,false);
    component.addEventListener('dragend',dragEnd,false);
    document.body.addEventListener('dragover',dragOver,false);
  }


function createMiniature(object){
  var elem = document.createElement('img');
  var comp = document.getElementById(object.id);
  elem.classList.add('miniature');
  elem.src = 'icons/'+ object.id + '.png';
  elem.style.cursor = 'pointer';
  elem.dataset.id = object.id;
  stepCount++;
  elem.addEventListener('click', function(){
      var index = tab.indexOf(object);
      var main = tab[index];
    //  console.log(comp);
      comp.classList.toggle('hidden');
      comp.style.left = object.startingLeft;
      comp.style.top = object.startingTop;
      tab.splice(index,1);
      object.hidden = false;
      localStorage.setItem(object.id, JSON.stringify(object));
      //console.log(localStorage.getItem(object.id));
      window.comptab.removeChild(elem);
      stepCount++;
  });




  window.comptab.appendChild(elem);

}

var icon = window.readOnly.querySelector('i');



function toggleMode(){

  if(customizeMode){
    icon.className = 'fa fa-toggle-on';

  }
  else {
    icon.className = 'fa fa-toggle-off';
  }

  setTimeout(toggleCustomization, 200);


}


window.addEventListener('load', function(){

    resizers = document.getElementsByClassName('resizer');
  toggleMode();
    icon.addEventListener('click', function(){
      customizeMode = customizeMode == true ? false : true;
      console.log(customizeMode);
      localStorage.setItem('configurable', JSON.stringify(customizeMode));
      toggleMode();

    });
});

function toggleCustomization(){

  var array = document.querySelectorAll('#csettings,#bsettings,#add, #settingsButton , .fa-location-arrow, #weatherLoc, #cog');
  if(customizeMode){
      window.body.classList.add('selectedBorder');
    for(var i of drags){
      i.draggable = true;
      i.classList.add('on');
//
    }
    for(var x of resizers){
      x.classList.remove('slide');
    }
    for(var y of array){
      y.classList.remove('slide');

    }
    window.comptab.classList.remove('slide');

  }
  else{
      window.body.classList.remove('selectedBorder');
    for(var i of drags){
      i.draggable = false;
      i.classList.remove('on');
    }
    for(var x of resizers){
      x.classList.add('slide');
    }
    for(var y of array){
      y.classList.add('slide');
      console.log(y);
    }
    window.comptab.classList.add('slide');
  }
}


function bounds(elem){
  var data = document.getElementById(elem.id);
  var rect = data.getBoundingClientRect();

  var width = window.innerWidth;
  var height = window.innerHeight;


  if(rect.left < 0){
    elem.style.left = 0 + 10;
  }

  if(rect.right > width){
    elem.style.left = width - (rect.width + 10);
  }

  if(rect.top < 0){
    elem.style.top = 0 + 10;
  }

  if(rect.bottom > height){
    elem.style.top = height - (rect.height + 10);
  }
}



window.addEventListener('load', function(){
  for(var i of drags){
    bounds(i);
  }
});
