window.addEventListener('load', loadNotes);
window.input.addEventListener('input', isError);
window.addEventListener('load', isError);




var focused = false;
var err = false;


function taskCompleted(e){
  if(e.target.id == 'newtask'){
    e.target.classList.toggle('completed');
    e.target.children[1].classList.toggle('crossed');
    e.target.children[0].classList.toggle('hidden');
    e.target.children[2].classList.toggle('hidden');
  }
}

function setFocus(bool){
  focused = bool;
  showError(window.errmsg.textContent);
}


function showError(msg){
  var errdiv = window.error;
  var emsg = window.errmsg;
  emsg.textContent = msg;
  if(err && focused){
    errdiv.className = '';
  }
  else {
    errdiv.className = 'errorhide';
  }
}


function isError(){
  var value = window.task.value.length;
  var errdiv = window.error;
  if(value > 20){
      err = true;
      showError('Please enter 20 characters at max');
  }
  else {
      err = false;
      showError('');
    }


}



function createListeners(){
  var notes = window.notes.children;
  add.addEventListener('click', saveNote);
  for(var i = 0; i < notes.length; i++){
    notes[i].addEventListener('click', taskCompleted);
  }
}

function loadNotes() {
    var url = '/api/notes';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            createNotes(JSON.parse(xhr.responseText));
            createListeners();
        } else {
            console.error('error getting notes', xhr);
        }
    }
    xhr.send();
}

function deleteNote(e) {


        var id = e.target.dataset.id;
        var xhr = new XMLHttpRequest();
        xhr.open('delete', '/api/notes/' + id , true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                xhr.open('delete', '/api/notes/' + id , true);
                loadNotes();

            } else {
                console.error('error deleting notes', xhr);
            }
        }
        xhr.send();

}

function updateNote(e){

    var note = e.target;

    var completed;
    if(note.className == 'completed'){
      completed = 0;
    }
    else {
      completed = 1;
    }

    var url = '/api/notes/update?noteID=' + note.dataset.id +'&noteCompleted=' + completed;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send();

}


function saveNote() {
    var title = window.task.value;
    if(title.length == 0){
      err = true;
      focused = true;
      showError('Please type something');
    }
      if(err == false){
        var url = '/api/notes?title='+title;
        window.task.value = "";
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.send();
        loadNotes();
      }
}

function createNotes(notes){

  var container = window.notes;
  container.innerHTML = '';

  notes.forEach(function (note){


    var elem = document.createElement('li');
    elem.onclick = updateNote;
    var spantxt = document.createElement('span');
    spantxt.textContent = note.task;
    spantxt.id = 'notetxt';
    elem.id = 'newtask';
    elem.dataset.id = note.id;

    if(note.completed == 1){
      elem.classList.add('completed');
      spantxt.classList.add('crossed');
    }
    container.appendChild(elem);




    var span = document.createElement("span");
    span.dataset.id = note.id;
    var txt = document.createTextNode("\u00D7");
    span.classList.add('remove');

    span.onclick = function(e){
      deleteNote(e);
    };
    if(note.completed == 0){
      span.classList.add('hidden');
    }

    span.appendChild(txt);




    var stick = document.createElement('span');
    var ttick = document.createTextNode('\u2713')
    if(note.completed == 0){
      stick.classList.add('hidden');
    }

    stick.classList.add('completed');

    stick.appendChild(ttick);


    elem.appendChild(stick);
    elem.appendChild(spantxt);
    elem.appendChild(span);

    });

}
