var User = require('../model/userModel.js');

exports.list_all_Users = function(req, res) {
    User.getAllUsers(function(err, User) {
      if (err)
        res.send(err);
        console.log('res', User);
     res.setHeader("Content-Type", "application/json");
     res.statusCode = 200;
     res.send(User);
    });
  };

  exports.get_User_by_id = function(req, res) {
  
    //handles null error 
     if(!req){
            res.status(400).send({ error:true, message: 'Please provide senderID' });
          }
     else{
        User.getUserById(req.params.senderId, function(err, user) {
      
        if (err)
            res.send(err);
        res.json(user);
     });
  }
  };

  exports.login = function(req, res) {
    var login = new User(req.body);
    //handles null error 
     if(!req){
            res.status(400).send({ error:true, message: 'Please provide username/password' });
          }
     else{
        User.Login(login, function(err, user) {
      
        if (err)
            res.send(err);
        res.json(user);
     });
  }
  };