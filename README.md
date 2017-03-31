      I designed this dashboard for a home purpose environment. I have used
      database to store data for widgets, and localStorage to store all
      configurable data such as their position and size.


                                How to run?

      Step 1 :Type npm install if the modules are not installed

      Step 2: Type npm run initsql - and enter your mysql password to create
      the database.

      Step 3: Type npm run dashboard - to run.

                                Key features

      In total there is 7 different widgets, for the user to use

      1.News - news from all over the world, you can have up to 3 different
      news panels with different categories. You can also specify different
      time values for their sliding speed.

      2.Weather - shows todays weather with an additional
      forecast of next 4 days.You can specify your location by clicking on
      the location arrow and typing new location.

      3.Clock - very simple clock with an addition of changing the display
      format into 24 hour or 12 hour.

      4.Calendar - calendar with an addition of adding events to it. Upon clicking
      on the selected day, user gets a form to fill out all of his required
      details. All of the added events are then shown in the events widget.

      5.Events - displays all of the events. Has two different panels one for
      showing this months events and other for next month. If user wishes to
      delete the event from the calendar, red x at the bottom of each event will
      trigger deletion.

      6.To do list - allows the user to add todo's to his list. Upon addition
      user can click on the note to mark if it has been completed or not.If
      he wishes to delete the item from the list, when a note is marked as
      completed, there is a x which will trigger deletion upon clicking

      7.Photo album - allows the user to store images which will slide
       automatically at specified interval. User can upload, delete images and
       change their slide interval at the settings panel.
       Upon hovering over the widget, user sees a red arrow which he can press
       to switch the current image to next or previous one.

                          Initiative Drag & Drop

      All of the widgets have an option to move. Upon holding a left mouse
      button over an widget and moving our mouse,
      we can move it at specified location within the browser window.


                              Resizing Widgets

      All of the widgets have an option to resize them, in the bottom right
      corner there is a resizable button, which user can hold down with left
      mouse and move the mouse to resize.

                              Configurable mode

      User can switch between Configurable or Read mode, when in Configurable
      mode all of the dragging,resizing, settings features are enabled, else
      everything is disabled.


                    Tutorial mode (Only on first time launch)

      Upon launching dashboard first time, user gets tutorial of how to use
      different widgets. Different steps of tutorial occur upon finishing the
      previous simple exercise. If the user wishes to stop the tutorial he can
      press 'skip tutorial'.



                                    Design


      Layout design - I have designed this dashboard, to be very simple to
      use for the user. I have created an initiative drag and drop, with a very
      clear design. I wanted to create a system based upon IOS design, reason
      for that is because I believe that it is very easy to use, and I wanted
      to create a design already known by the users, to increase their usability
      of the system, and their overall satisfaction.


      System design - For each of the widget I have created a separate folder
      each of the folder contains it own js and css file. I did this to make sure
      that each part of the system is kept separate and their code will not
      overlap. There is just one index.html which gets all of these files together
      and creates all of the html code.

      I have only used express, mysql, nodemon, bodyParser and multer. I did not
      use any external libraries. Most of the work is my own apart from some of
      the server code which I have used from your 'ws_api', it was a nice
      starting point for me.



                          Implementation rationale


      I am very happy with an outcome of two of my widgets, weather and news.
      Both of them were designed at the end of the teaching year where my skills
      in css, js were much better then at the start. In the news I like how
      we can select different categories, on each different panel, with an
      addition of flex-box which layouts everything perfectly.

      I am also very happy with an outcome of my drag and drop and resize
      features which I believe works very well and gives the user a freedom of
      customisation. Also first time tutorial works very all as it is a nice
      introduction to my dashboard.


                                What went wrong?

      There are many things which I did wrong while I was creating this API.
      The first problem was that I have jumped straight into coding without
      a strong knowledge of javascript, this has caused a poor decisions from me
      when designing each of the components. Upon finishing the previous widget
      I was already jumping straight to creating other ones while the
      previous one's were still not completed.

      I believe that the code is very poorly maintained because it lacks a lot
      of useful comments and sometimes my variable names and decisions are
      poor. The reason for that is that I was not mostly focusing on writing
      nice code instead I just wanted to write as much with good functionality,
      telling myself that I will surely change it at the end, and I did not.
      Code is very repetitive most of the time I could surely create a function
      for the same piece of code which I was writing, for example
      in the server where I create a query to a mysql server I could easily
      create a function to connect and insert or retrieve data, compared
      now where I have the same piece of code in every 'get method'.

      I also think that creating html code using javascript is much better,
      at the start I was hardcoding the html widgets in index.html, this took
      me a lot of time and created a lot of errors.

      At the start I also did not know anything about localStorage, this has
      caused me to choose a lot poor decisions e.g 'I have decided to keep
      the clock settings in the database, so every time user wishes to change
      their settings server updates a database' - this is a very bad decision
      I should have just save this information in localStorage.

      I have separated all of the folders to make sure that they are kept
      nice and individually, but in my stylesheets I was writing bad selectors
      e.g. to style all divs inside the todolist I did 'div {}' instead of
      ' #todolist div', this has caused a lot of ambiguity when I was styling
      since I have styled multiple selectors at the same time.


      I have not used 'use strict' throughout the whole year, and when I realised
      it, I have got so many errors which I could not fix, therefore I don't use
      strict mode at all. I should have started using it from the start since
      helps by catching some exceptions and prevents to throw some errors, which
      I probably encountered but did not know how to fix.

      I have also not used any let or any of the new javascript parts inside my
      code, by the time I have realised that there is something like 'let' I was
      already half-way through the api, which then links by to the first point,
      that I should not have jumped straight to coding.


                                    Reflection

      If I would start this API all over again I would start from one widget at
      a time, upon completing the first one I would not start another one. If I
      would get an error or a bug which I could not fix, I would try to fix it,
      instead of finding a way of skiping it. I would document my code from the
      start.


      Overall I have taught myself a lot on this unit, spend almost a whole
      year developing this API, and had a lot of fun doing it. I am now
      capable of writing an API from scratch using the best practices. I have
      decided to write all the code myself because I wanted to learn as much
      as I can, I wanted to know the fundamentals of javascript, and how
      data between the client and server is exchanged.
