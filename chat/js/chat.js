var user
var room
var socket = io('http://localhost:5000');
var messages = document.getElementById("messages");
if (!user || user == null) {
    $(".md").addClass('is-active')
}

$(".close1").click(function () {
    $(".md").removeClass("is-active");
});

$(".loging").click(function () {
    if (!$(".username").val() || !$(".password").val()) {
        console.log("not log")
        window.location.href = "http://localhost:8888/chat/index2.html";
    } else {
        $.ajax({
            url: "http://localhost:5000/login",
            dataType: 'json',
            type: 'post',
            headers: { "Access-Control-Allow-Origin": "*" },
            contentType: 'application/json',
            data: JSON.stringify({ "username": $('.username').val(), "password": $('.password').val() }),
            success: function (response, textStatus, jQxhr) {
                user = JSON.parse(JSON.stringify(response))
                console.log(user[0].name)
                $(".md").removeClass("is-active");
                $(".sidebar").append("<li><figure class='image is-100x100'><img class='is-rounded' src='https://bulma.io/images/placeholders/128x128.png'></figure><ul><li>" + user[0].name + "</li></ul></li>")
                parseRoom()
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
});

$(function () {
    $('.room-name').click(function () {
        $.ajax({
            url: "http://localhost:5000/channel",
            dataType: 'json',
            type: 'post',
            headers: { "Access-Control-Allow-Origin": "*" },
            contentType: 'application/json',
            data: JSON.stringify({ "name": $('#room-name').val() }),
            success: function (response, textStatus, jQxhr) {
                room = JSON.parse(JSON.stringify(response))
                $(".md2").removeClass("is-active");

                parseRoom()
                socket.emit("Room Create", 1);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

    })
});

$(".create_room").click(function () {
    $(".md2").addClass('is-active')
});

$(".close2").click(function () {
    $(".md2").removeClass("is-active");
});


function parseRoom() {
    $(".rooms").empty()
    fetch("http://localhost:5000/channel")
        .then(data => {
            return data.json();
        })
        .then(json => {
            json.map(data => {
                let li = document.createElement("li");

                let a = document.createElement("a");
                a.setAttribute('class', 'button is-primary is-outlined joint-room');
                a.setAttribute('data-id', data.id);
                a.setAttribute('data-value',data.name)
                rooms.appendChild(li).appendChild(a).append(data.name);
                $('.joint-room').unbind("click");
                $('.joint-room').on("click", function () {
                    socket.emit('leaves', room);
                    $('.card-header-title').empty()
                    $('.card-header-title').append($(this).data("value"));
                    $('.sendmessage').removeAttr("disabled");
                    socket.emit('join', $(this).data("id"));
                    room = $(this).data("id")
                    $(".messages").empty()
                    genchat($(this).data("id"))
                });
            });
        });
}
(function () {
    $(".sendmessage").click(function (e) {
        let li = document.createElement("li");
        e.preventDefault(); // prevents page reloading
        //   socket.emit("chat message", $("#message").val());

        // console.log(user[0].name)
        socket.emit(
            'chat message',
            {
                room : room,
                name: user[0].name,
                text: $('#message-input').val()
            },
            () => { }
        );
        messages.appendChild(li).append($("#message-input").val());
        let span = document.createElement("span");
        messages.appendChild(span).append("by " + user[0].name + ": " + formatTimeAgo($.now()));

        $('.card-content').animate({
            scrollTop: $('.card-content').get(0).scrollHeight
        }, 300);

        $.ajax({
            url: "http://localhost:5000/chats",
            dataType: 'json',
            type: 'post',
            headers: { "Access-Control-Allow-Origin": "*" },
            contentType: 'application/json',
            data: JSON.stringify({ "message": $('#message-input').val(), "sendID": user[0].id ,"roomID": room }),
            success: function (response, textStatus, jQxhr) {
                $("#message-input").val("");
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        return false;
    });

    socket.on("received", data => {
        console.log(data)
        let li = document.createElement("li");
        let span = document.createElement("span");
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.text);
        messages.appendChild(span).append("by " + data.name + ": " + formatTimeAgo(data.time));
        $('.card-content').animate({
            scrollTop: $('.card-content').get(0).scrollHeight
        }, 300);
    });

    socket.on("RoomCreate", data => {
        parseRoom()
    });
})();

function genchat(roomId) {
    fetch("http://localhost:5000/chats/"+roomId)
        .then(data => {
            return data.json();
        })
        .then(json => {
            json.map(data => {
                let li = document.createElement("li");
                let span = document.createElement("span");
                messages.appendChild(li).append(data.message);
                messages
                    .appendChild(span)
                    .append("by " + data.name + ": " + formatTimeAgo(data.send_at));
            });
        });
}