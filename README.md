##Prerequisites
- Node Virtual Environment (sudo pip install nodeenv)
- MongoDB (http://docs.mongodb.org/manual/tutorial/getting-started/)

##Setup Workspace
- mkdir problee; cd problee
- nodeenv env
- . env/bin/activate
- npm install -g bower
- npm install -g grunt-cli

##Build App
- git clone https://github.com/bfortuner/probleeyo.git
- cd probleeyo/
- npm install
- bower install

##Run MongoDB
-mongod

##Run App
- bower server

##Useful commands
-deactivate_node (exit nodeenv)
-mongod (run daemon)
-mongo (run shell)
-
