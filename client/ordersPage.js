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

    $.ajax({
        url: 'http://localhost:8082/allOrders',
        data: { userId: userId },
        type: 'POST',
        jsonpCallback: 'callback',
        success: function (data) {
            var array = jQuery.parseJSON(data);
            var container = $("#container");
            if (array.message === 'Not found') {
                $("#container").text('You do not have any orders yet.');
            }
            for (var i = 0; i < array.length; i++) {
                var div = document.createElement("div");
                div.setAttribute("id", 'o' + i);
                var products = jQuery.parseJSON(array[i].products);
                var orderNumber = document.createElement("div");
                $(orderNumber).text("Order: " + i);
                $(div).append(orderNumber);
                for (var j = 0; j < products.length; j++) {
                    var subDiv = document.createElement("div");
                    subDiv.setAttribute("id", 'p' + i + j);
                    $(subDiv).text(products[j].title + " " + products[j].description + " " + products[j].price);
                    $(div).append(subDiv);
                }
                var br = document.createElement("br");
                $(div).append(br);
                $(container).append(div);
            }
            console.log('Success: ')
            console.log(data);
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + error.message);
        },
    });
});