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

docker run -d -p 3000:3000 anderwolfe/opendraught:2

◘◘◘◘◘

*** Type this in ubuntu terminal to run the docker container ***

docker run dockerhub_username/projectname:tag   <-- fill in your docker hub path here
for example, this is my docker hub path: anderwolfe/opendraught:2

◘◘◘◘◘

*** Type this in ubuntu terminal to see all running docker containers ***

docker ps

◘◘◘◘◘

*** Type this in ubuntu terminal to stop all running docker containers ***

docker stop $(docker ps -q)

◘◘◘◘◘
