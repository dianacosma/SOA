$( document ).ready(function() {
    $('#loginButton').click(
        function () {
            var username = $('#usernameInput').val();
            var password = $('#passwordInput').val();
            var body = {username: username, password: password};
            $.ajax({
                url: 'http://localhost:8081/login',
                // dataType: "jsonp",
                data: body,
                type: 'POST',
                jsonpCallback: 'callback', 
                success: function (data) {
                    var ret = jQuery.parseJSON(data);
                    var dataArray = JSON.parse(data);
                    localStorage.setItem('userId', dataArray[0].userid);
                    window.location = "mainPage.html";
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error.message);
                    $('#error').text('Error at login.');
                },
            });
        }
    )

    $('#signUp').click(
        function () {
            var username = $('#username').val();
            var password = $('#password').val();
            var address = $('#address').val();
            var color = $('#color').val();
            var body = {username: username, password: password, address: address, color: color};
            $.ajax({
                url: 'http://localhost:8081/register',
                // dataType: "jsonp",
                data: body,
                type: 'POST',
                jsonpCallback: 'callback', 
                success: function (data) {
                    var ret = jQuery.parseJSON(data);
                    var dataArray = JSON.parse(data);
                    $('#result').text('Registration successful! Log in with your new user.');
                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error.message);
                    $('#error').text('Error at login.');
                },
            });
        }
    )


    $('#dialog').hide();

    $('#registerButton').click(
        function () {
            $("#registerForm").css("visibility", "visible");
        }
    )

    $('#closeButton').click(
        function () {
            $('#dialog').hide();
            return false;
        }
    )

    var click = false,
        height = null,
        width = null;

    $(document).mousemove(function (e) {

        if (click == true) {
            $('#dialog').css({
                'width': e.pageX,
                'height': e.pageY
            })
            $('#header').css({
                'width': e.pageX
            })



        }
    });

    $('#dialog').click(function (e) {
        click = !click;
        return false;
    });

    $('html').click(function () {
        click = false;
    });
});