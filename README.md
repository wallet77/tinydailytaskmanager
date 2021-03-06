Tiny Daily Task Manager
====================

TDTM Roadmap
--------------------------------------

1. French translation & translation menu (<b>DONE</b>)
2. Login system
3. Documentation (PHP & Js)
4. Allow clicking on calendar's tasks to edit them
5. Filter by task

TDTM requirements
--------------------------------------

What TDTM needs to work correctly ?
###Client Side
	
1. Extjs 4.2.1
2. JsDuck 4.6.1
3. Jquery 1.10.x
4. FullCalendar 1.6.x (jquery plugin by Adam Shaw)


###Browser compatibility
1. Internet Explorer 6+
2. Firefox 3.6+ (PC, Mac)
3. Safari 4+
4. Chrome 10+
5. Opera 11+ (PC, Mac)

###Server Side
1. Any server language compatible with REST Api, default is PHP (5.2.3)
2. Apache 2
3. Mysql (or any storage system which respects TDTM data model)
4. Be sure your web server accept all HTTP request (GET, POST, PUT, DELETE)

TDTM contraints
--------------------------------------
TDTM works as a standalone and full screen interface.
We just need to launch a single Ext.application to manage all interfaces elements.


TDTM technicals points
--------------------------------------

1. RESTFUL
This project is based on REST principles to allow a better communication between client side and server side.
It allows anyone to switch easily the entire server side without changing interface.

2. Full Javascipt interface
Extjs appears to be the better framework to create a thick client like application in a sort period of time.
It is fully compatible with a REST api.

3. Full ajax application
This project works as a standalone thick client. Furthermore an ajax application implies to not refresh all the page everytime a request is sent.
We just need to refresh a part of our application (what Extjs do perfectly).

TDTM features
--------------------------------------

1. CRUD Projects
2. CRUD Members
3. CRUD Task
4. Display a week calendar
5. Allow task or member filtering on calendar event
