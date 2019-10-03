
module.exports = function(app) {
    var chat = require('../controller/chatController');
    var user = require('../controller/userController');
    var channel = require('../controller/channelController');
    // todoList Routes
    app.route('/chats')
      .get(chat.list_all_messages)
      .post(chat.create_a_message)
    
    app.route('/chats/:roomId')
      .get(chat.get_meaasages_by_room)

    app.route('/users')
      .get(user.list_all_Users)

    app.route('/login')
    .post(user.login)

    app.route('/user/:senderId')
      .get(user.get_User_by_id)

    app.route('/channel')
      .post(channel.create_channel)
      .get(channel.get_channel)

    };

 
  


