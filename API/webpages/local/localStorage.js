var widgets = document.querySelectorAll('.canDrag');
//var chosenProfile = JSON.parse(localStorage.getItem('selectedProfile'));

function loadPositions(){
    var id;

    for(var i of widgets){
      var retrevied = JSON.parse(localStorage.getItem(i.id));
    //  console.log(retrevied);
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
        //console.log(id);
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

loadPositions();


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




  //localStorage.setItem(selectedProfile, JSON.stringify(profile));

  function check(i){
    if(i.id ==  'photoAlbum' || i.id ==  'events' || i.id == 'calendar'){
      return true;
    }
  }
}


function loadNews(){

  var ret = localStorage.getItem('newsCategories');
  var arr = [0,1,5];
  if(ret == null){
    localStorage.setItem('newsCategories', JSON.stringify(arr));
  }


}


loadNews();
