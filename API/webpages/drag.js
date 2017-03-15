var drags = document.querySelectorAll('.canDrag');
var tab = [];
//console.log(drags);
var border;
var draggedItem;
var offsetX;
var offsetY;
var id;
var left;
var top;

/* Draggable event handlers */
    function dragStart(event) {
      var style = window.getComputedStyle(event.target, null);
      id = event.target.id;
      event.target.classList = '';
      event.dataTransfer.setData('id', id);
      event.dataTransfer.setData('left',(parseInt(style.getPropertyValue("left"),10)));
      event.dataTransfer.setData('top',(parseInt(style.getPropertyValue("top"),10)));

      draggedItem = event.target;
      offsetX = (parseInt(style.getPropertyValue("left"),10) - event.clientX);
      offsetY = (parseInt(style.getPropertyValue("top"),10) - event.clientY);
    }


    function dragEnd(event) {
      window.comptab.style.border = 'none';
    }

  /* Drop target event handlers */
  function dragEnter(event) {
  }



  function dragOver(event) {


      //var test = event.target;

    var l = draggedItem.style.left = (event.clientX + parseInt(offsetX));

    var t = draggedItem.style.top = (event.clientY + parseInt(offsetY));


    draggedItem.style.left = (event.clientX + parseInt(offsetX)) + 'px';
    draggedItem.style.top = (event.clientY + parseInt(offsetY)) + 'px';

    window.comptab.style.border = '1px dashed green';

    var object = {
      id:id,
      startingLeft:l,
      startingTop:t,
      hidden:false
    };

    localStorage.setItem(id, JSON.stringify(object));
      //console.log(event.target.id);


      event.preventDefault();
 // Set the dropEffect to move
    event.dataTransfer.dropEffect = "move"
  }

  function dragOverTaskbar(event){
    //window.comptab.textContent = 'pin to taskbar';
  }

  function dragLeave(event) {
    event.preventDefault();
  }




  function drop(event) {


  event.preventDefault();
  var id = event.dataTransfer.getData('id');
  var startingLeft = event.dataTransfer.getData('left');
  var startingTop = event.dataTransfer.getData('top');
  console.log(startingLeft + ',' + startingTop);
  //var data = document.querySelectorAll('[data-id]');

  var data = document.getElementById(id);

  var object = {
    id:id,
    startingLeft:startingLeft,
    startingTop:startingTop,
    hidden:true
  };

  localStorage.setItem(id, JSON.stringify(object));

      tab.push(object);
      data.classList.toggle('hidden');
      createMiniature(object);


  console.log(tab);


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
  elem.classList.add('miniature');
  elem.src = object.id + '.png';
  elem.dataset.id = object.id;
  console.log(object.id);
  elem.addEventListener('click', function(){
      var index = tab.indexOf(object);
      console.log(index);
      var main = tab[index];
      var comp = document.getElementById(object.id);
      console.log(comp);
      comp.classList.toggle('hidden');
      comp.style.left = object.startingLeft;
      comp.style.top = object.startingTop;
      tab.splice(index,1);
      object.hidden = false;
      localStorage.setItem(object.id, JSON.stringify(object));
      console.log(localStorage.getItem(object.id));
      window.comptab.removeChild(elem);
  });
  window.comptab.appendChild(elem);



}
