$(document).ready(function () {
    var userId = localStorage.userId;

    if (!userId) {
        window.location = "home.html";
        return;
    }

    $('#signOut').click(
        function () {
            localStorage.userId = '';
            window.location = "home.html";
            return;
        }
    )

    var cart = [];
    var allData = [];
    $('#cart').text(cart);

    $.ajax({
        url: 'http://localhost:8082/allProducts',
        data: '',
        type: 'GET',
        jsonpCallback: 'callback',
        success: function (data) {
            var array = jQuery.parseJSON(data);
            var container = $("#container");
            allData = array;
            for (var i = 0; i < array.length; i++) {
                var div = document.createElement("div");
                div.setAttribute("id", 'p' + i);
                $(div).text(array[i].title + " " + array[i].description + " " + array[i].price);
                var button = document.createElement("input");
                button.setAttribute("id", 'button' + i);
                button.setAttribute("type", "button");
                button.setAttribute("value", "Add to cart");
                $(div).append(button);
                $(container).append(div);
                $(container).on('click', "#button" + i, function (e) {
                    var id = e.currentTarget.id;
                    var index = id[id.length - 1]
                    cart.push(array[index]);
                    console.log(cart);
                });
            }
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
            $('#lblResponse').html('Error connecting to the server.');
        },
    });

    $('#ordersButton').click(
        function () {
            window.location = "ordersPage.html";
        }
    )

    $('#signOut').click(
        function () {
            localStorage = '';
            window.location = "home.html";
        }
    )

    $('#cartButton').click(
        function () {
            var container = $("#cartContainer");
            var cartDiv = $("#cart");
            if (cart.length === 0) {
                $(container).text('Your cart is empty.');
            } else {
                var total = 0;
                for (var i = 0; i < cart.length; i++) {
                    var div = document.createElement("div");
                    div.setAttribute("id", 'p' + i);
                    $(div).text(cart[i].title + " " + cart[i].description + " " + cart[i].price);
                    $(cartDiv).append(div);
                    total = total + cart[i].price;
                }
                var div = document.createElement("div");
                div.setAttribute("id", 'price');
                $(div).text("Total: " + total);
                $(container).append(div);
                $("#orderButton").css("visibility", "visible");
            }
        }
    )

    $('#orderButton').click(
        function () {
            var body = { userId: userId, products: JSON.stringify(cart) };
            $.ajax({
                url: 'http://localhost:8082/order',
                data: body,
                type: 'POST',
                jsonpCallback: 'callback',
                success: function (data) {
                    var ret = jQuery.parseJSON(data);
                    console.log('Success: ')
                    console.log(data);
                    $('#orderResult').text('Your order has been placed. Go to "My orders" to watch the order history.');
                    cart = [];

                },
                error: function (xhr, status, error) {
                    console.log('Error: ' + error.message);
                    $('#orderResult').text('Something went wrong when ordering.');
                },
            });
        }
    )


});