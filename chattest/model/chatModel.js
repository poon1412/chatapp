const sql = require("../dbconnect.js");

var Chat = function(chat){
    this.id = chat.id;
    this.message = chat.message;
    this.sendID = chat.sendID;
    this.send_at = new Date();
};

Chat.getAllChats = function (result) {
    sql.query("Select chat.message, chat.send_at, user.name from chat INNER JOIN user ON chat.sendID=user.id order by chat.send_at;", function (err, res) {

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

// Chat.createMessage = function (newMessage,result) {
//     sql.query("INSERT INTO chat set ?", newMessage, function (err, res) {
                
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             console.log(res.insertId);
//             result(null, res.insertId);
//         }
//     });  
// };

Chat.getChatByRoomId = function (roomId,result) {
    sql.query("Select chat.message, chat.send_at, user.name from chat_room INNER JOIN chat ON chat.id=chat_room.massage_id INNER JOIN room ON chat_room.room_id=room.id INNER JOIN user ON chat.sendID=user.id where chat_room.room_id = ? order by chat.send_at;", roomId, function (err, res) {     
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });  
};

Chat.createMessage = function (newMessage,roomId,result) {
    sql.query("INSERT INTO chat set ?", newMessage, function (err, res1) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            sql.query("INSERT INTO chat_room set ?", chat_room(res1.insertId,roomId), function (err) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }else{
                    console.log(res1.insertId);
                    result(null, res1.insertId);
                }
            }); 
        }
    });  
    const chat_room = (massage_id, room_id) => {
        return {
            massage_id,
            room_id,
       };
      };
};

    

module.exports= Chat;