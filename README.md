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

##Useful MongoDB Commands
- db
- show dbs
- show collections
- db.problems.find( {"title":"my problem title"} )
- db.problems.insert({"title":"my problem title"} )
- b.problems.find({ "_id" : ObjectId("547f7c113b3afaa7fd72710a")})
- db.problems.update(
   {"_id" : ObjectId("547f7c133b3afaa7fd72710b") },
   {
      title: "New Problem Title",
      description: "hello there",
      difficulty: 3
   },
   { upsert: false }
)
