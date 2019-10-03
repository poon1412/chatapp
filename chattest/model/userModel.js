const sql = require("../dbconnect.js");
var User = function(user){
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.name = user.name;
};

User.getAllUsers = function (result){
    sql.query("Select * from user",function(err,res){
       if(err) {
           console.log("error: ", err);
           result(null, err);
       }
       else{
           console.log('User : ', res);  
           result(null, res);
       }
    })
   };

User.getUserById = function (senderId,result) {
    sql.query("Select * from user where id = ?", senderId, function (err, res) {
                
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

User.Login = function (req,result) {
    sql.query("Select * from user where username = ?", req.username, function (err, res) {
    
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else if(req.password == res[0].password){
            result(null, res);
        }else{
            result(err,null);
        }
    });  
};

    

module.exports= User;