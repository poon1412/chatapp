var Channel = require('../model/channelModel.js');
exports.get_channel = function(req, res) {
    Channel.getAllChannel(function(err, channel) {
      if (err)
        res.send(err);
        console.log('res', channel);
     res.setHeader("Content-Type", "application/json");
     res.statusCode = 200;
     res.send(channel);
    });
  };
  exports.create_channel = function(req, res) {
    var new_channel = new Channel(req.body);
  
    //handles null error 
     if(!new_channel.name){
            res.status(400).send({ error:true, message: 'Please provide Name of Room' });
          }
     else{
    
        Channel.createChannel(new_channel, function(err, channel) {
      
        if (err)
            res.send(err);
        res.json(channel);
     });
  }
  };