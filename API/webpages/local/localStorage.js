window.addEventListener('load', function(){
  loadPositions();
  loadNews();
});

var widgets = document.querySelectorAll('.canDrag'); // get all the widgets

/**
 * load their positions from the local storage
 * if it is null load them at their positions specified at the css
 * and then update the localstorage
 */
function loadPositions(){
    var id;

    for(var i of widgets){
      var retrevied = JSON.parse(localStorage.getItem(i.id));
      if(retrevied == null){
        loadDefaultStorage();
      }
      else {
        i.style.left = retrevied.startingLeft + 'px';
        i.style.top = retrevied.startingTop + 'px';
        i.style.height = retrevied.startingH + 'px';
        i.style.width = retrevied.startingW + 'px';
        if(retrevied.hidden == true){
          document.getElementById(i.id).classList.add('hidden');
          tab.push(retrevied);
          createMiniature(retrevied);
        }else {
          document.getElementById(i.id).classList.remove('hidden');
        }
      }
      i.addEventListener('click', function(e){
        var target = e.target;
        while(target.parentNode.id != 'body'){
          var front = document.querySelectorAll('.bringToFront');
          for(var i = 0; i < front.length; i++){
            front[i].classList.remove('bringToFront');
          }


          target = target.parentNode;
          target.classList.add('bringToFront');


        }


      });
  }
}



/**
 * load and set their default storage, used when there is no localstorage
 * @return {[type]} [description]
 */
function loadDefaultStorage(){


  for(var i of widgets){

    var object = {
      id:i.id,
      startingLeft:i.style.left,
      startingTop: i.style.top,
      startingH: i.style.height,
      startingW: i.style.width,
      hidden:check(i)
    };

    localStorage.setItem(i.id, JSON.stringify(object));
  }


  function check(i){
    if(i.id ==  'photoAlbum' || i.id ==  'events' || i.id == 'calendar'){
      return true;
    }
  }
}

/**
 * load default news categories
 */
function loadNews(){

  var ret = localStorage.getItem('newsCategories');
  var arr = [0,1,5];
  if(ret == null){
    localStorage.setItem('newsCategories', JSON.stringify(arr));
  }


}
