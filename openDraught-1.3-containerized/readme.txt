◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

To edit your taplist from your phone, open the browser on your phone and go to opendraught.com. From opendraught.com press the Login button in the top right. Enter the  ip address of your container and press Go. Enter your admin password and you're ready to start editing.

Click the Edit button to change any of the text on the list. For each row you may also select either empty, or hide.

Checking the Empty box will gray out the item on your taplist, indicating it is unavailable but was/will be an option again.

The Hide box removes the row entirely from your tap list but still makes readding it very easy, simply by unchecking the box. This can also be a useful feature if you have less than 20 taps. Just hide the taps at the bottom of the list until you have the appropriate amount remaining for your tap selection.

◘◘◘◘

Note that you'll want to change your admin password and secure string in the .env file using a text editor.

You'll also want edit the image line in docker-compose to your Docker Hub details.

◘◘◘◘

Google Chrome is the recommended browser for openDraught.
If scaling is necessary to fit the tap list on to your screen, with your tap list open in Chrome: press the Ctrl + or Ctrl - hotkeys to scale page as needed.

Chrome remembers individual web page scaling so your scaling should save.

If you need more info on scaling or want to know how to check your saved scaling. Please view the Scaling Explanation pdf file located in our GitHub repo.

◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

These are notes about setting up DigitalOcean hosting by renting one of their $4/month Ubuntu Virtual Machines:

◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

Sign Up: If you don't have a DigitalOcean account, sign up at DigitalOcean.
Create a Droplet: Log in to your DigitalOcean account and create a new Droplet.
Choose an image: Select the latest Ubuntu version (e.g., Ubuntu 20.04 LTS).
Choose a plan: Select a plan that fits your needs. For testing, the cheapest plan should suffice.
Choose a data center region: Select a region close to you or your users.
Authentication: Choose between an SSH key or a password. SSH key is recommended for security.
Finalize and create: Click "Create Droplet".

Click Droplets on the left bar
Click your Droplet
Access > Launch Console

◘◘◘◘◘

*** These commands to install Docker on the DigitalOcean Ubuntu virtual machine ***

sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce
sudo systemctl start docker
sudo systemctl enable docker
docker --version


◘◘◘◘◘

*** Run this in DigitalOcean ubuntu terminal to allocate port 3000 to the docker container ***

docker run -d -p 3000:3000 dockerhub_username/projectname:tag   <-- fill in your docker hub path here

◘◘◘◘◘

*** Type this in ubuntu terminal to run the docker container ***

docker run dockerhub_username/projectname:tag   <-- fill in your docker hub path here

◘◘◘◘◘

*** Type this in ubuntu terminal to see all running docker containers ***

docker ps

◘◘◘◘◘

*** Type this in ubuntu terminal to stop all running docker containers ***

docker stop $(docker ps -q)

◘◘◘◘◘
