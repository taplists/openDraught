◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

These are notes to install and run openDraught in Windows 10

◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

Double click node-v20.14.0-x64.exe to install Node.js.

Per installing tradition, just click next a bunch of times when installing Node and install it in the default path

◘◘◘◘

Once Node is installed > double click openDraught to launch openDraught and launch a browser window with your taplist in it

◘◘◘◘

Reminder: If you close the openDraught window that starts minimzed, openDraught will stop working until you launch it again.

◘◘◘◘

If you close the taplist and want to reopen it, as long as openDraught is running just open a browser and type in
localhost:3000

◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

API Notes:

The point of utilizing the Google Docs API is to have openDraught write your host machines local IP address to a Google Doc every hour. That way if you have an IP that changes every now and then, all you have to do is open your Google Doc and you'll be able to see what your latest IP address is.

In order to setup the Google Docs API:
Follow instructions provided in googledoc.api-setup.pdf.

Your Google Doc ID will go in the provided space at the top of server.js.
That will be the ID of the page where your IP will be written by openDraught so you can keep
track of what your local IP address for the machine this is running on.

Then you'll download your credentials JSON from google and name it credentials.json and put it in
this directory that this readme is currently in.