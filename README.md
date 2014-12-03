##Prerequisites
- nodejs https://gist.github.com/isaacs/579814
- npm install -g bower
- npm install -g grunt-cli

##Launch AWS (Optional)
- Select Ubuntu Trusty 64-bit EC2 Instance (t1.medium)
- Create security group with Port 22 SSH, and All-Traffic open
- Create SSH key or use existing

##Install Docker
Ubuntu
- ssh -i problee-main.pem ubuntu@54.148.108.72
- sudo apt-get update
- sudo apt-get install docker.io
- sudo docker run -i -t ubuntu /bin/bash
- create new docker user (https://docs.docker.com/installation/ubuntulinux/#giving-non-root-access)

Mac OS X
- install boot2docker (https://docs.docker.com/installation/mac)
- workaround TCP Bug (http://stackoverflow.com/questions/26686358/docker-cant-connect-to-boot2docker-because-of-tcp-timeout (@user3684424)
- BoxManage controlvm boot2docker-vm natpf1 "problee1,tcp,127.0.0.1,3000,,3000" (port forwarding)

##Build App
- git clone https://github.com/bfortuner/probleejs.git
- cd probleejs/
- npm install
- docker build -t problee .

##Run App
- docker run -p 27017:27017 -d --name db mongo (-d means background process)
- docker run -p 3000:3000 --link db:db_1 --name app problee

##Dev/Test
- docker run -p 3000:3000 -p 35729:35729 -v ~/public:/home/mean/public -v ~/app:/home/mean/app --link db:db_1 problee

This starts web server in the docker container, but overrides the contents of /app and /public with your local changes

##View App
- boot2docker ip (to get IP address for Mac)
- your-ip-address:3000

##Useful Docker Commands
- docker ps -a (show containers)
- docker images (show images)
- docker start/stop container_name
- docker rm container_name
- docker rmi image_id
- docker logs container_name (shows web logs for that container)
- boot2docker stop/delete/init/up

##Reference:
* http://meanjs.org/docs.html
* https://github.com/meanjs/mean/blob/master/README.md
* https://docs.docker.com/installation/ubuntulinux/
* https://docs.docker.com/userguide/usingdocker/
* https://docs.docker.com/reference/commandline/cli
