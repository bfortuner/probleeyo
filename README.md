#ProbleeYo
Responsive web app using MeanJS stack. Bootstrapped with Yo generator: https://github.com/DaftMonk/generator-angular-fullstack

##Prerequisites
- sudo pip install nodeenv (Node virtual env -- super useful!)
- MongoDB (http://docs.mongodb.org/manual/tutorial/getting-started/)

##Setup Workspace
- mkdir problee; cd problee
- nodeenv env
- . env/bin/activate
- npm install -g bower
- npm install -g grunt-cli
- npm install -g yo
- npm install -g generator-angular-fullstack

##Build App
- git clone https://github.com/bfortuner/probleeyo.git
- cd probleeyo/
- cp server/config/local.env.sample.js local.env.js
- npm install
- bower install

##Run MongoDB
- mongod

##Run App
- bower server

##Useful commands
- deactivate_node (exit nodeenv)

##MongoDB Commands
- mongod (run daemon)
- mongo (run shell)
- db 
- show dbs
- show collections
- db.problems.find( {"title":"my problem title"} )
- db.problems.insert({"title":"my problem title"} )
- db.problems.find({ "_id" : ObjectId("547f7c113b3afaa7fd72710a")})
- db.problems.update(
   {"_id" : ObjectId("547f7c133b3afaa7fd72710b") },
   {
      title: "New Problem Title",
      description: "hello there",
      difficulty: 3
   },
   { upsert: false }
)
