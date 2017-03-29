
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
    }

    function stopResize(e) {
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
        element.draggable = true;
    }

    var resizer = document.createElement('div');
    resizer.className = 'resizer';
    resizer.addEventListener('mousedown', initResize, false);
    element.appendChild(resizer);
}




function size(id){
  var elem = document.getElementById(id);
  rectObject = elem.getBoundingClientRect();
  var children = window.time.children;

  if(id == 'clock'){
    for(var a of children){
      a.style.fontSize = rectObject.width * 0.2;
    }
  }
  if(id == 'weather'){
    var elements = window.weathertemp.children;
    var img = window.weathericon.children[0];

    for(var a of elements){
      a.style.fontSize = rectObject.width * 0.0800;
    }

  }

  if(id == 'news'){
    var imgs = window.news.querySelectorAll('img');

    for(var i of imgs){
        //i.style.height = rectObject.width  * 0.2 + 'px';
    }
  }

}



window.addEventListener('load',function(){
    for(var i of elements){
      var id = document.getElementById(i.id);
      makeResizable(id);
    }
  });
