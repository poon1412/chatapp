const sql = require("../dbconnect.js");

var Channel = function(channel){
    this.id = channel.id;
    this.name = channel.name;
    this.create_at = new Date();
};

Channel.getAllChannel = function (result) {
    sql.query("Select * from room;", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('chats : ', res);  
                result(null, res);
            }
        });   
};

Channel.createChannel = function (newChannel,result) {
    sql.query("INSERT INTO room set ?", newChannel, function (err,res) {   
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            sql.query("Select * from room where id = ?;", res.insertId, function (err,res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }else{
                    result(null, res);
                }
            });
            
        }
    });  
};

    

module.exports= Channel;