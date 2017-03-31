

window.addEventListener('load', updateCurrentMonth);
window.todayE.addEventListener('click', showTodayEvents);
window.upcomingE.addEventListener('click', showUpcomingEvents);
window.nextM.addEventListener('click', updateMonth);
window.previousM.addEventListener('click', updateMonth);
window.addEventListener('load', showTodayEvents);
window.createEvent.addEventListener('click', addEvent);
window.exit.addEventListener('click', closeEventAdd);
window.addEventListener('load', function(){
  var inputs = window.addEvents.querySelectorAll('input');
  var create = window.createEvent;
  for(var i of inputs){
    i.addEventListener('input', function(){
      if(this.value == 0){
        this.style.backgroundColor = 'red';
        create.disabled = true;
      }else {
        this.style.backgroundColor = null
        create.disabled = false;
      }
    });
  }
});


var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var weekdays = ['Monday','Tuesday', 'Wednesday','Thursday','Friday','Saturday','Sunday'];
var date = new Date();
var month = date.getMonth();
var currentM = window.currentMonth;
var year = date.getFullYear();
var firstDay;



function closeEventAdd(){
  window.addEvents.classList.add('hidden');
  if(selectedDay){
    selectedDay.style.backgroundColor = 'inherit';
  }
}

function addEvent(){

  var error = false;

  var newEvent = {
    id:0,
    eventName: window.eventTitle.value,
    eventDesc: window.eventDesc.value,
    eventOn: window.eventWhen.value,
    eventStart:window.eventFrom.value,
    eventFinish:window.eventTo.value
  };



  if(error == false){
    console.log(newEvent);
    var url = 'api/calendar';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(newEvent));
    loadEvents();
    window.addEvents.classList.add('hidden');
    window.formAddEv.reset();
  }

}

var selectedDay;

function openEventAdd(e){


  window.addEvents.classList.remove('hidden');

    selectedDay = e.target;
  var m = (months.indexOf(currentM.textContent) + 1);
  var d = e.target.textContent;

  if(m < 10){
    m = '0' + m;
  }
  if(d < 10){
    d = '0' + d;
  }

  window.eventWhen.value = year + '-' + m + '-' + d;

}


function hideShowEvents(){
  window.events.classList.toggle('hidden');
  if(window.events.className == 'hidden'){
    window.hideEvents.textContent = 'Show Events';
  }else {
    window.hideEvents.textContent = 'Hide Events';
  }
}


function loadEvents(){
  var selectedMonth = months.indexOf(currentM.textContent);
  var nextMonth = selectedMonth + 1;
  var url = '/api/calendar?month=' + selectedMonth + '&nextMonth=' + nextMonth;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
      if (xhr.status === 200) {

          createEvents(JSON.parse(xhr.responseText));
      } else {
          console.error('error adding event', xhr);
      }
  }
  xhr.send();
}

function createEvents(events){


  todaysEvents.innerHTML = '';
  upcomingEvents.innerHTML = '';

  events.forEach(function(ev) {
    var container = document.createElement('section');
    var when = ev.when.split('T');
    var day = when[0].split('-');
    var getWeekday = months[day[1] - 1] + ' ' + day[2] + ', ' + day[0] + ' 00:00:00';
    var isThismonth = false;

    var my_date = new Date(getWeekday);


    var eventDiv = document.createElement('div');
    eventDiv.id = 'eventday';

    container.appendChild(eventDiv);

    var div = document.createElement('div');
    div.classList.add('weekday');
    if(my_date.getDay() == 0){
      div.textContent = weekdays[6];
    }else {
      div.textContent = weekdays[my_date.getDay() - 1];
    }


    eventDiv.appendChild(div);

    div = document.createElement('div');
    div.classList.add('day');
    div.textContent = day[2];
    eventDiv.appendChild(div);

    div = document.createElement('div');
    div.classList.add('month');
    div.textContent = months[day[1] - 1];
    if(div.textContent == currentMonth.textContent){
      isThismonth = true;
    }
    eventDiv.appendChild(div);



    var elem = document.createElement('h1');
    elem.textContent = ev.name;
    elem.dataset.id = ev.id;
    container.appendChild(elem);

    elem = document.createElement('p');
    elem.textContent = ev.desc;
    elem.id = 'eventdesc';
    container.appendChild(elem);


    if(ev.start == 'all day'){
      eventtime = 'all day';
    }
    else {
      eventtime = 'From ' + ev.start + ' to ' +  ev.finish;
    }

    elem = document.createElement('p');
    elem.textContent = eventtime;
    container.appendChild(elem);

    elem = document.createElement('p');
    elem.dataset.id = ev.id;
    elem.textContent = 'x';
    elem.id = 'remove';
    elem.onclick = deleteEvent;
    container.appendChild(elem);

    var alldays = window.days.children;

    if(day[1] < 10){
      mth = day[1].split('0');
    }

    for(var i = 0; i < alldays.length; i++){
      if(alldays[i].textContent == day[2] && currentM.textContent == months[mth[1] - 1] && year == day[0]){
        alldays[i].classList.add('hasEvent');
      }
    }

    if(isThismonth == true){
      todaysEvents.appendChild(container);
    }else {
      upcomingEvents.appendChild(container);
    }



  });

    if(upcomingEvents.textContent == ''){
      upcomingEvents.textContent = 'no events scheduled yet';
    }

    if(todaysEvents.textContent == ''){
      upcomingEvents.textContent = 'no events scheduled yet';
    }


}

function updateCurrentMonth() {
    updateDays();
    currentM.textContent = months[month];
}


function updateDays() {

    //create empty days
    var days = window.days;

    days.textContent = "";
    document.getElementById('year').textContent = year;


    firstDay = new Date(year, month, 1).getDay();
    var lastDay = new Date(year, month + 1, 0).getDate();

    if (firstDay == 0) {
        firstDay = 7;
    }

    for (var i = 1; i < firstDay; i++) {
        var day = document.createElement("li");
        day.textContent = " ";
        days.appendChild(day);
    }


    for (var i = 1; i <= lastDay; i++) {
        var day = document.createElement("li");
        day.textContent = i;
        days.appendChild(day);
        if (i == date.getDate() && month == date.getMonth() && year == date.getFullYear()) {
            day.className = "current";
        }
        day.addEventListener('click', openEventAdd);

    }



    window.year.textContent = year;
}


function todaysDate() {
    var current = "Today " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    var days = window.days;
    var todayDiv = document.createElement("div");
    todayDiv.id = "today";
    days.appendChild(todayDiv);
    var today = document.createElement("p");
    today.id = "currentDate";
    today.textContent = current;
    todayDiv.appendChild(today);
}

function updateMonth(e) {
    if (e.target.id == 'nextM') {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }

    }
    if (e.target.id == 'previousM') {
        month--

        if (month < 0) {
            month = 11;
            year--;
        }
    }

    currentM.textContent = months[month];
    updateDays();
    loadEvents();
}



function showTodayEvents(e) {
    isTodayEvent = true;
    var upcomingEvents = window.upcomingEvents;
    var todayE = window.todayE;
    var upcomingE = window.upcomingE;
    upcomingEvents.classList.add('hiddenevent');
    window.todaysEvents.classList.remove('hiddenevent');
    todayE.classList.add('active');
    upcomingE.classList.remove('active');
    loadEvents();
}

function showUpcomingEvents() {
    isTodayEvent = false;
    var todaysEvents = window.todaysEvents;
    var todayE = window.todayE;
    var upcomingE = window.upcomingE;
    todaysEvents.classList.add('hiddenevent');
    window.upcomingEvents.classList.remove('hiddenevent');
    todayE.classList.remove('active');
    upcomingE.classList.add('active');
    loadEvents();
}


function deleteEvent(e){
  var ev = e.target.parentNode;
  var question = "Are you sure you want to delete event with this title? " + ev.children[1].textContent;
  if (window.confirm(question)) {
    var id = e.target.dataset.id;
    var xhr = new XMLHttpRequest();
    xhr.open('delete', '/api/calendar/' + id , true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            xhr.open('delete', '/api/calendar/' + id , true);
            loadEvents();
            updateDays();

        } else {
            console.error('error deleting events', xhr);
        }
    }
    xhr.send();
  }

}


showTodayEvents();
