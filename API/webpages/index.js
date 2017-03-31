

window.addEventListener('load', loadPictures);
window.bsettings.addEventListener('click', showSettings);
window.addEventListener('load', allowUpload);
window.choosefile.addEventListener('change', allowUpload);
window.title.addEventListener('input', allowUpload);
window.deleteSelected.addEventListener('click', deleteSelectedPhotos);
window.next.addEventListener('click', nextPhoto);
window.prev.addEventListener('click', prevPhoto);

var slider = window.slidespeed;
var left = window.prev;
var right = window.next;

var counter = 0;
var selectedItems = [];
var img;
var loadwidth = 0;
var canvas = window.progress.getContext("2d");
var timer;


function changeImage() {
    var photos = window.photos;
    var length = photos.children.length;

    if (length > 0) {
        if (img[counter].className == "hidden") {
            img[counter].classList.toggle('hidden');
        } else {
            img[counter].classList.toggle('hidden');
            counter++;
            if (counter == img.length) {
                counter = 0;
            }
            img[counter].classList.toggle('hidden');
        }

    }

}


function allowUpload() {
    var upload = window.bupload;
    var choosefile = window.choosefile;
    var title = window.title;

    if (choosefile.value.length > 0 && title.value.length > 0) {
        upload.disabled = false;
    } else {
        upload.disabled = true;
    }
}

function loadPictures() {
    var url = 'api/pictures';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            putPicturesInPage(JSON.parse(xhr.responseText));
        } else {
            console.error('error getting pictures', xhr);
        }
    }
    xhr.send();
}
var imgs = [];

function putPicturesInPage(pics) {
    imgs = pics;

    window.photos.innerHTML = '';
    window.content.innerHTML = '';
    var photos = window.photos;
    var settingscontent = window.content;

    if (imgs.length > 0) {

        pics.forEach(function(pic) {

            var container = document.createElement('section');
            photos.appendChild(container);

            var img = document.createElement('img');
            img.src = pic.file;
            img.id = "images";
            img.draggable = false;
            img.classList.add('hidden');
            container.appendChild(img);

            var record = document.createElement('tr');
            record.id = 'tablerow';
            settingscontent.appendChild(record);
            var data = document.createElement('td');
            data.textContent = pic.id;
            data.dataset.id = pic.id;
            record.appendChild(data);

            data = document.createElement('td');

            data.textContent = pic.title;
            record.appendChild(data);

            data = document.createElement('td');
            img = document.createElement('img');
            img.src = pic.file;
            img.classList.add('miniature');
            data.appendChild(img);
            record.appendChild(data);



        });
        img = document.querySelectorAll("#images");
        changeImage();
        startLoading(10);
        addListeners();

    } else {
        console.log("no images");
    }


}


function startLoading(speed) {
    canvas.fillStyle = "gray";
    canvas.fill();

    function draw() {
        var settings = window.settings;
        if (settings.classList != '') {
          if(img.length > 1){
              loadwidth++;
          }
            canvas.fillRect(0, 0, loadwidth, 180);
        }
        if (loadwidth > 300) {
            changeImage();
            canvas.clearRect(0, 0, 400, 200);
            resetLoadingBar();
        }
    }
    timer = window.setInterval(draw, speed * 3.5);


}

function resetLoadingBar() {
    loadwidth = 0;
    canvas.clearRect(0, 0, 400, 200);
}

function setSelected(e) {
    e.target.parentNode.classList.toggle('selected');
    console.log('click');
    checkSelected();
}


function checkSelected() {
    var deleteS = window.deleteSelected;
    var content = document.getElementById('content').children;
    selectedItems = [];
    for (var i of content) {
        if (i.className == 'selected') {
            selectedItems.push(i);
        }
    }
    if (selectedItems.length > 0) {
        window.deleteSelected.className = '';
    } else {
        window.deleteSelected.className = 'hiddenDel';
    }
}

function showSettings() {
    var settings = window.settings;
    if (settings.classList == 'settings-hid') {
        bsettings.textContent = "Close settings";
    } else {
        bsettings.textContent = "Open settings";
    }
    settings.classList.toggle('settings-hid');
}

function addListeners() {
    var tablerow = window.content.children;
    for (var i = 0; i < tablerow.length; i++) {
        tablerow[i].addEventListener('click', setSelected);
    }
    var add = window.add;

    var apply = window.apply;

    apply.addEventListener('click', function(){
        var time = window.settings.querySelector('input[type=number]');
        if(time.value > 3){
          console.log(time.value);
          clearInterval(timer);
          changeImage();
          startLoading(time.value);
          resetLoadingBar();
          window.settings.classList.toggle('settings-hid');
          window.bsettings.textContent = "Open settings";
        }
    });
}

function deleteSelectedPhotos() {

    var xhr = new XMLHttpRequest();
    var content = window.content.children;
    var index = 0;
    ids = "";

    for (var id = 0; id < selectedItems.length; id++) {
        ids += selectedItems[id].firstChild.dataset.id + ' , ';
    }

    var last = ids.lastIndexOf(" , ");
    ids = ids.substring(0, last);


    var question = "";

    if (selectedItems.length < 2) {
        question = "You really want to delete image with this id? : " + selectedItems[0].firstChild.dataset.id;
    } else {
        question = "You really want to delete images with these ids? : " + ids;
    }

    if (window.confirm(question)) {
        for (var x of selectedItems) {
            xhr.open('DELETE', '/api/pictures/' + x.firstChild.dataset.id, false); // synchronous request
            xhr.send();
        }
        loadPictures();
        counter = 0;
        resetLoadingBar();
    }
    ids = "";
    selectedItems = [];
    checkSelected();
}



function nextPhoto(){
  img[counter].classList.toggle('hidden');
  counter++;
  if (counter == img.length) {
      counter = 0;
  }
  img[counter].classList.toggle('hidden');
  resetLoadingBar();
}

function prevPhoto(){
  img[counter].classList.toggle('hidden');
  counter--;
  if (counter == -1) {
      counter = img.length - 1;
  }
  img[counter].classList.toggle('hidden');
  resetLoadingBar();
}
