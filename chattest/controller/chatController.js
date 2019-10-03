var Chat = require('../model/chatModel.js');
exports.list_all_messages = function(req, res) {
    Chat.getAllChats(function(err, chat) {
      if (err)
        res.send(err);
        console.log('res', chat);
     res.setHeader("Content-Type", "application/json");
     res.statusCode = 200;
     res.send(chat);
    });
  };

  // exports.create_a_message = function(req, res) {
  //   var new_message = new Chat(req.body);
  
  //   //handles null error 
  //    if(!new_message.message || !new_message.sendID){
  
  //             res.status(400).send({ error:true, message: 'Please provide message/etc' });
  
  //         }
  //    else{
    
  //       Chat.createMessage(new_message, function(err, chat) {
      
  //       if (err)
  //           res.send(err);
  //       res.json(chat);
  //    });
  // }
  // };

  exports.get_meaasages_by_room = function(req, res) {
  
    //handles null error 
     if(!req){
            res.status(400).send({ error:true, message: 'Please provide RoomID' });
          }
     else{
      Chat.getChatByRoomId(req.params.roomId, function(err, chat) {
      
        if (err)
          res.send(err);
        res.json(chat);
     });
  }
  };

  exports.create_a_message = function(req, res) {
    var new_message = new Chat(Reqbody(req.body.message,req.body.sendID));
  
    //handles null error 
     if(!new_message.message || !new_message.sendID || !req.body.roomID){
  
              res.status(400).send({ error:true, message: 'Please provide message,sendID,roomID' });
  
          }
     else{
    
        Chat.createMessage(new_message,req.body.roomID, function(err, chat) {
      
        if (err)
            res.send(err);
        res.json(chat);
     });
  }
    
  };
  const Reqbody = (message, sendID) => {
    return {
      message,
      sendID,
  };
  };