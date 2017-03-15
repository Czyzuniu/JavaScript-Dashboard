var c = 0;

function getNews(){
  var xhr = new XMLHttpRequest();
  var url = 'https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=c8598c85665d4e61974bf83636763804';

  xhr.open('GET', url, true);
  xhr.onload = function() {
      if (xhr.status === 200) {
          createNews(JSON.parse(xhr.responseText));
      } else {
          console.error('error getting pictures', xhr);
          //window.main.innerHTML = 'sorry, something went wrong...';
      }
  }
  xhr.send();
}

function slideNews(){
  var news = window.news.children;
  var length = news.length;

  if (length > 0) {
      if (news[c].className == "slide") {
          news[c].classList.toggle('slide');
      } else {
          news[c].classList.toggle('slide');
          c++;
          if (c == length) {
              c = 0;
          }
          news[c].classList.toggle('slide');
      }

  }

  setTimeout(slideNews, 8000);
}

function createNews(data){
  window.news.innerHTML = '';
  data.articles.forEach(function(news){
    var container = document.createElement('section');


    var elem = document.createElement('img');
    elem.src = news.urlToImage;
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


    window.news.appendChild(container);

    container.classList.add('slide');
  });
  slideNews();
}


window.addEventListener('load', getNews);
