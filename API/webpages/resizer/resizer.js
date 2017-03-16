var elements = document.getElementsByClassName('canDrag');

function getClientRect(id){
  var elem = document.getElementById(id);
  return elem.getBoundingClientRect()
}

function makeResizable(element){
  function initResize(e) {
     window.addEventListener('mousemove', resize, false);
     window.addEventListener('mouseup', stopResize, false);
  }

    function resize(e) {
       element.draggable = false;
       size(element.id);
       element.style.width = (e.clientX - element.offsetLeft) + 'px';
       element.style.height = (e.clientY - element.offsetTop) + 'px';
       var retrieved = JSON.parse(localStorage.getItem(element.id));
       retrieved.startingH = getClientRect(element.id).height;
       retrieved.startingW = getClientRect(element.id).width;
       localStorage.setItem(element.id,JSON.stringify(retrieved));
       console.log(retrieved);
    }

    function stopResize(e) {
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
        element.draggable = true;
    }

    var resizer = document.createElement('div');
    resizer.classList.add('resizer');
    resizer.addEventListener('mousedown', initResize, false);
    element.appendChild(resizer);
}

for(var i of elements){
  var id = document.getElementById(i.id);
  makeResizable(id);

}


function size(id){
  var elem = document.getElementById(id);
  rectObject = elem.getBoundingClientRect();
  var children = elem.children;

  if(id == 'clock'){
    for(var a of children){
      a.style.fontSize = rectObject.width * 0.3;
    }
  }
  if(id == 'weather'){
    var elements = window.weathertemp.children;
    var img = window.weathericon.children[0];

    for(var a of elements){
      a.style.fontSize = rectObject.width * 0.0900;
    }

    console.log(elements);
  }

}