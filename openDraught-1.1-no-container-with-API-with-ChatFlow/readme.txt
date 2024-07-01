◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

These are notes to install and run openDraught in Windows 10

◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

Double click node-v20.14.0-x64.exe to install Node.js.

Per installing tradition, just click next a bunch of times when installing Node and install it in the default path

◘◘◘◘

Once Node is installed > double click openDraught to launch openDraught which will automatically launch a browser window with your taplist in it

◘◘◘◘

Reminder: If you close the openDraught window that starts minimzed, openDraught will stop working until you launch it again.

◘◘◘◘

If you close the taplist and want to reopen it, as long as openDraught is running just open a browser and type in
localhost:3000

◘◘◘◘

To edit your taplist from your phone, open the browser on your phone and go to opendraught.com (note that the phone must be on the same wifi network as your host computer.) From opendraught.com press the Login button in the top right. Enter the local ip address of your host computer, usually something like 192.168.1.101 and press Go. Enter your admin password and you're ready to start editing.

Click the Edit button to change any of the text on the list. For each row you may also select either empty, or hide.

Checking the Empty box will gray out the item on your taplist, indicating it is unavailable but was/will be an option again.

The Hide box removes the row entirely from your tap list but still makes readding it very easy, simply by unchecking the box. This can also be a useful feature if you have less than 20 taps. Just hide the taps at the bottom of the list until you have the appropriate amount remaining for your tap selection.

◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

API Notes:

The point of utilizing the Google Docs API is to have openDraught write your host machines local IP address to a Google Doc every hour. That way if you have an IP that changes every now and then, all you have to do is open your Google Doc and you'll be able to see what your latest IP address is.

In order to setup the Google Docs API:
Follow instructions provided in googledoc.api-setup.pdf.

Your Google Doc ID will go in the provided space at the top of server.js.
That will be the ID of the page where your IP will be written by openDraught so you can keep
track of what your local IP address for the machine this is running on.

Then you'll download your credentials JSON from google and name it credentials.json and put it in
this directory that this readme is currently in. Just delete the already existing credentials.json file in this project.