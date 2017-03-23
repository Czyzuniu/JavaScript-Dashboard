window.addEventListener('load', function(){
  getNews([0,1,2]);
});



newsArray = [];
var error = false;
var classes = ['first','second','third'];
var keys = ['https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=c8598c85665d4e61974bf83636763804',
'https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=c8598c85665d4e61974bf83636763804',
'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=c8598c85665d4e61974bf83636763804',
'https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=c8598c85665d4e61974bf83636763804',
'https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=c8598c85665d4e61974bf83636763804',
 'https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=c8598c85665d4e61974bf83636763804']
var names = ["Sports", "Technology", "World", "Gaming", "Business", "Programming"]


function getNews(arr){
  var xhr = new XMLHttpRequest();

  for(var i of arr){
    sendRequest(keys[i]);
    //console.log(i);
  }



}

function sendRequest(url){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
      if (xhr.status === 200) {
          if(xhr.readyState == 4 && xhr.status == 200){
            newsArray.push(JSON.parse(xhr.responseText));
            createNews(newsArray);
          }
      } else {
          console.error('error getting pictures', xhr);
          //window.main.innerHTML = 'sorry, something went wrong...';
      }
  }
  xhr.send();
}

function slideNews(cl, time){
  var c = 0;
  var main = document.querySelectorAll(cl);
  main = main[0].children;
  var length = main.length;


  function slide(){

    if (length > 0) {
        if (main[c].className == "slide") {
            main[c].classList.toggle('slide');
        } else {
            main[c].classList.toggle('slide');
            c++;
            if (c == length) {
                c = 0;
            }
            main[c].classList.toggle('slide');
        }
    }

  }
  slide();
  setInterval(slide, time * 1000);
}

function createNews(data){
  if(data.length > 0){
    i = 0;
  window.news.innerHTML = '';


  data.forEach(function(newsdata){
    var div = document.createElement('div');
    div.id = 'newscontainer';
    div.dataset.id = newsdata.source;


    if(div.dataset.id == newsdata.source){
      newsdata.articles.forEach(function(news){
        var container = document.createElement('section');

        var elem = document.createElement('img');
        elem.src = news.urlToImage;
        elem.onerror = function(){
          this.src = 'noimage.png';
        }
        elem.draggable = false;
        container.appendChild(elem);

        elem = document.createElement('h1');
        elem.textContent = news.title;
        elem.onclick = function(){
          window.location = news.url;
        }
        container.appendChild(elem);

        elem = document.createElement('p');
        elem.textContent = news.description;
        container.appendChild(elem);

        elem = document.createElement('span');
        elem.classList.add('info');
        elem.textContent = getCategoriesName(newsdata.source);
        container.appendChild(elem);

        container.classList.add('slide');

        div.appendChild(container);
        //console.log(news.source);
      });
      size('news');
    }

    window.news.appendChild(div);
    div.classList.add(classes[i]);
    i++;
});

    var news = window.news;
    makeResizable(news);
  }

  var nsettings = document.createElement('div');
  nsettings.id = 'newsSettings';
  nsettings.classList.add('hidden');
  window.news.appendChild(nsettings);

  var button = document.createElement('input');
  button.type = 'button';
  button.value = 'settings';
  button.id = 'settingsButton';
  window.news.appendChild(button);

  button.onclick = function(){
    window.newsSettings.classList.toggle('hidden');
  }

  createSettingsPage();
}



function appendNews(arr, appender, cl){
  arr.forEach(function(news){
    var container = document.createElement('section');

    var elem = document.createElement('img');
    elem.src = news.urlToImage;
    elem.onerror = function(){
      this.src = 'noimage.png';
    }
    elem.draggable = false;
    container.appendChild(elem);

    elem = document.createElement('h1');
    elem.textContent = news.title;
    elem.onclick = function(){
      window.location = news.url;
    }
    container.appendChild(elem);

    elem = document.createElement('p');
    elem.textContent = news.description;
    container.appendChild(elem);

    container.classList.add('slide');

    appender.classList.add(cl);
    appender.appendChild(container);
    //console.log(news.source);
  });
  size('news');
}

setTimeout(function(){
  slideNews('.first',8);
  slideNews('.second',8);
  slideNews('.third',8);
},1000);



function createSettingsPage(){
  var settings = window.newsSettings;

  var elem = document.createElement('h1');
  elem.textContent = "Settings";
  settings.appendChild(elem);

  elem = document.createElement('p');
  elem.textContent = "How many different news categories would you like to have?";
  settings.appendChild(elem);

  var form = document.createElement('form');

  elem = document.createElement('select');


  for(var i = 1; i <= 3; i++){
    var option = document.createElement('option');
    option.value = i;
    var text = ' category';
    if(i > 1){
      text = " categories";
    }
    option.text = i + text;
    elem.add(option);
  }



      form.appendChild(elem);
      settings.appendChild(form);

      var categories = document.createElement('div');
      categories.className = 'cat';
      categories.id = 'categories';
      settings.appendChild(categories);



    createCategories(elem);
  elem.addEventListener('change', function(){
    createCategories(elem);
  });








}


function getCategoriesName(source){
  switch (source) {
    case 'ars-technica': return 'Technology';
      break;
    case 'espn': return 'Sports';
      break;
    case 'ign': return 'Gaming';
      break;
    case 'bbc-news': return 'World News';
      break;
    case 'business-insider': return 'Business';
      break;
    case 'hacker-news': return 'Programming';
      break;
    default:

  }
}

function createCategories(elem){

  var txt = document.createElement('p');
  txt.textContent = "Please choose your " + 1 + " news category";
  categories.appendChild(txt);

  var categ = elem.value < 2 ? "category" : "categories";
  txt.textContent = "Please choose your " + elem.value + " news " + categ;
  categories.innerHTML = '';



    var errorLabel = document.createElement('p');
    errorLabel.textContent = 'Please enter a time value between 8 and 60';
    errorLabel.style.position = 'absolute';
    errorLabel.style.fontSize = '13' + 'px';
    errorLabel.style.color = 'red';
    errorLabel.style.left = '34' + '%';
    errorLabel.classList.toggle('hidden');
    categories.appendChild(errorLabel);

  for(var i = 0; i < elem.value; i++){

    var frm = document.createElement('form');
    var select = document.createElement('select');
    var speed = document.createElement('input');
    speed.type = 'number';
    speed.max = "60";
    speed.min = "8";
    speed.value = "8";
    speed.addEventListener('input', function(){
      console.log(this.value);
      if(this.value < 8 || this.value > 60){
        submit.disabled = true;
        this.style.backgroundColor = 'red';
        errorLabel.classList.remove('hidden');
      }
      else{
        submit.disabled = false;
        this.style.backgroundColor = 'inherit';
        errorLabel.classList.add('hidden');
      }
    });




    frm.appendChild(speed);
    for(var a of names){
      var opt = document.createElement('option');
      opt.text = a;
      select.add(opt);
    }
    select.classList.add('newscat');

    frm.appendChild(select);
    categories.appendChild(frm);
  }

  var applyForm = document.createElement('form');
  applyForm.style.width = '100' + '%';
  var submit = document.createElement('input');
  submit.type = 'button';
  submit.value = "Apply changes";
  submit.id = 'submit';
  submit.onclick = changeNews;
  applyForm.appendChild(submit);
  categories.appendChild(applyForm);
}


function changeNews(){
  var data = window.categories.querySelectorAll('select');
  var time = window.categories.querySelectorAll('input[type=number]');

  newsArray = [];
  var arr = []
  for(var val of data){
    arr.push(val.selectedIndex);
  }
  if(!error){
    getNews(arr);
    var count = 0;
    var times = [];
    for(var t of time){
      times.push(t.value);

      setTimeout(function(){
        console.log('ssss');
        slideNews('.' + classes[count],times[count]);
        count++;
      },1000);
    }
  }

}
