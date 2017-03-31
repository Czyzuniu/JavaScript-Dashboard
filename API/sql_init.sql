create database if not exists dashboard;

create table if not exists dashboard.photos (
  id int primary key auto_increment,
  filename varchar(60),
  title varchar(10)
)charset 'utf8mb4';

create table if not exists dashboard.background (
  id int primary key auto_increment,
  filename varchar(60)
)charset 'utf8mb4';

create table if not exists dashboard.alarm (
  id int primary key auto_increment,
  alarmTime time,
  title varchar(50)
)charset 'utf8mb4';

create table if not exists dashboard.todolist (
  id int primary key auto_increment,
  task varchar(60),
  completed boolean
)charset 'utf8mb4';

insert ignore into dashboard.photos values (1, 'earth.jpg', 'earth');
insert ignore into dashboard.photos values (2, 'moon.jpg', 'moon');
insert ignore into dashboard.photos values (3, 'parrot.jpg','parrot');
insert ignore into dashboard.photos values (4, 'forest.jpg','forest');




insert ignore into dashboard.todolist values (1,"open dashboard", true);
insert ignore into dashboard.todolist values (2,"mark all dashboards", false);

create table if not exists dashboard.settings (
    id int primary key auto_increment,
    component varchar(60),
    setting varchar(25),
    value boolean
  );

insert ignore into dashboard.settings values (1,"clock", "format24", false);



create table if not exists dashboard.calendar (
    id int primary key auto_increment,
    eventName varchar(60),
    eventDesc varchar(50),
    eventOn date,
    eventStart varchar(8),
    eventFinish varchar(8)
)charset 'utf8mb4';





insert ignore into dashboard.calendar values (2,'INSE Submission','Final project','2017-04-28', '00:00','23:00');
