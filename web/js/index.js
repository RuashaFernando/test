//Mobile Nav Toggle
window.openMobileNav = function() {
    var mobileNav = document.getElementById("mobile-nav");
    mobileNav.classList.add("active");
};
window.closeMobileNav = function() {
    var mobileNav = document.getElementById("mobile-nav");
    mobileNav.classList.remove("active");
};

//Search Toggle
window.toggleSearch = function(){
    var searchWrapper = document.getElementById("search-wrapper");
    searchWrapper.classList.toggle("active");
};


//Profile DropDown
window.toggleProfileDropdown = function(){
    var profileDropdown = document.getElementById("profile-dropdown");
    profileDropdown.classList.toggle("active");
};

//Cart Page section change
function loadContent(page, clickedButton) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("content-container").innerHTML = this.responseText;
            
            var buttons = document.querySelectorAll(".process-element");
            buttons.forEach(function(button) {
                button.classList.remove("active");
                button.classList.remove("pass");
            });
            
            if (clickedButton.classList.contains("process-element")) {
                clickedButton.classList.add("active");
                var prevButton = clickedButton.previousElementSibling;
                while (prevButton) {
                    prevButton.classList.add("pass");
                    prevButton = prevButton.previousElementSibling;
                }
            }
            
            if(clickedButton.classList.contains("checkout-btn")){
                    var checkoutBtn = document.getElementById("checkout-button");
                    checkoutBtn.classList.add("active");
                    var prevButton = checkoutBtn.previousElementSibling;
                    while (prevButton) {
                        prevButton.classList.add("pass");
                        prevButton = prevButton.previousElementSibling;
                    }
            }
            
            if(clickedButton.classList.contains("place-order-btn")){
                var orderBtn = document.getElementById("order-button");
                orderBtn.classList.add("active");
                var prevButton = orderBtn.previousElementSibling;
                while (prevButton) {
                    prevButton.classList.add("pass");
                    prevButton = prevButton.previousElementSibling;
                }
            }
                                  
            // Update title based on clicked button
            var title = "";
            if(clickedButton.id === "cart-button") {
                title = "Cart";
            } else if(clickedButton.id === "checkout-button") {
                title = "Checkout";
            } else if(clickedButton.id === "order-button") {
                title = "Complete!";
            }
            document.getElementById("title").innerText = title;
        }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
}

//Quantity 
function minus(cartId) {
    var quantityInput = document.getElementById('quantity_' + cartId);
    if (quantityInput) {
        var currentValue = parseInt(quantityInput.value);
        if(currentValue === 1){
            document.getElementById('minus-btn_' + cartId).disabled = true;
        }
        if (!isNaN(currentValue) && currentValue > 0) {
            quantityInput.value = currentValue - 1;
            updateSubtotal(cartId);
            updateCartTotal();
        }
    }
}

function add(cartId) {
    var quantityInput = document.getElementById('quantity_' + cartId);
    if (quantityInput) {
        var currentValue = parseInt(quantityInput.value);
        if (!isNaN(currentValue)) {
            quantityInput.value = currentValue + 1;
            updateSubtotal(cartId);
            updateCartTotal();
        }
    }
}

function updateSubtotal(cartId) {
    var quantity = parseInt(document.getElementById('quantity_' + cartId).value);
    var price = parseFloat(document.querySelector('#cartItem_' + cartId + ' .price').innerText.replace('$', ''));
    var subtotal = quantity * price;
    document.querySelector('#cartItem_' + cartId + ' .sub-total').textContent = '$' + subtotal.toFixed(2);
}

function updateCartTotal() {
    var sumSubtotal = 0;
    $('.sub-total').each(function() {
        var subtotal = parseFloat($(this).text().replace('$', ''));
        sumSubtotal += subtotal;
    });
    var shippingCost = parseFloat($('.cart-sum-total .shipping').text().trim().substring(1));
    $('.cart-sum-sub-total .price').text('$' + sumSubtotal.toFixed(2));
    updateCartWithShippingTotal(sumSubtotal + shippingCost);
}

function updateCartWithShippingTotal(subTotal){
    $('.cart-sum-total .price').text('$' + subTotal.toFixed(2));
}

//function getStoredTotal() {
//    return sessionStorage.getItem('cartTotal');
//}


window.getShipping = function(){
    var selectedValue = parseFloat($('input[name="shipping-method"]:checked').val());
    var totalString = $('.cart-sum-total .price').text();
    var totalNumeric = parseFloat(totalString.substring(1));
    var previousShippingString = $('.cart-sum-total .shipping').text().trim();
    var previousShipping = previousShippingString ? parseFloat(previousShippingString.substring(1)) : 0;
    var newTotal = totalNumeric - previousShipping + selectedValue;
    $('.cart-sum-total .price').text('$' + newTotal.toFixed(2));
    $('.cart-sum-total .shipping').text('$' + selectedValue.toFixed(2));
};



//Payment Method Select
function showPaymentInfo(paymentMethod) {
    var cardInfo = document.getElementById("card-info");
    var paypalInfo = document.getElementById("paypal-info");
    
    if (paymentMethod === "credit-card") {
        cardInfo.style.display = "block";
        paypalInfo.style.display = "none";
    } else if (paymentMethod === "paypal") {
        cardInfo.style.display = "none";
        paypalInfo.style.display = "block";
    }
}

//Add To Cart
function addToCart() {
    var formData = $("#addToCartForm").serialize();
    $.ajax({
        type: "POST",
        url: contextPath + "/AddToCartServlet",
        data: formData,
        success: function(response) {
            $("#loadingIndicator").hide();
            alert(response);
        }
    });
    return false;
}



// Display Cart 
 $(document).ready(function() {
    function fetchCartItemsAndUpdateTotal() {
        $.ajax({
            url: 'CartServlet',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var tbody = $('.cart-table tbody');
                var sumSubtotal = 0; 
                $.each(data, function(index, item) {
                    var minusButton = $('<button>').addClass('minus-btn').attr({id:'minus-btn_' + item.cartId, 'data-cart-id': item.cartId}).append(
                        $('<img>').attr('src', 'assets/icons/Minus.png')
                    ).click(function() {
                        var cartId = $(this).attr('data-cart-id');
                        minus(cartId);
                    }).prop('disabled', false);

                    var addButton = $('<button>').addClass('add-btn').attr({id:'add-btn', 'data-cart-id': item.cartId}).append(
                        $('<img>').attr('src', 'assets/icons/Add.png')
                    ).click(function() {
                        var cartId = $(this).attr('data-cart-id');
                        add(cartId);
                    });

                    var removeButton = $('<button>').addClass('remove-btn').append(
                        $('<img>').attr('src', 'assets/icons/close.png')
                    ).text('Remove').data('cart-id', item.cartId).click(function() {
                        removeCartItem(item.cartId);
                    });

                    var row = $('<tr>').addClass('cart-item').attr({id: 'cartItem_' + item.cartId, 'data-pro-id': item.productId });

                    var productDetailsColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-details').append(
                            $('<img>').attr('src', 'assets/' + item.productImage).addClass('pro-img'),
                            $('<div>').addClass('pro-details').append(
                                $('<h3>').text(item.productName),
                                $('<span>').text('Color: Black'),
                                removeButton
                            )
                        )
                    );

                    var quantityColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-element').append(
                            $('<div>').addClass('quantity-wrapper').append(
                                minusButton,
                                $('<input>').attr({
                                    type: 'text',
                                    value: item.quantity,
                                    id: 'quantity_' + item.cartId
                                }),
                                addButton
                            )
                        )
                    );

                    var priceColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-element').append(
                            $('<div>').addClass('price').text('$' + item.price)
                        )
                    );

                    var subtotal = item.quantity * item.price;
                    var subtotalColumn = $('<td>').append(
                        $('<div>').addClass('cart-product-element').append(
                            $('<div>').addClass('sub-total').attr({id: 'subtotal_' + item.cartId}).text('$' + subtotal.toFixed(2))
                        )
                    );

                    sumSubtotal += subtotal;
                    row.append(productDetailsColumn, quantityColumn, priceColumn, subtotalColumn);
                    tbody.append(row);

                });
                
                $('.cart-sum-sub-total .price').text('$' + sumSubtotal.toFixed(2));
                $('.cart-sum-total .price').text('$' + sumSubtotal.toFixed(2));
                
            },
            error: function() {
                alert('Error fetching cart items.');
            }
        });
    }
    
    
    function fetchOrderSummary(){
        $.ajax({
            url: 'OrderSummaryServlet',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var orderSummaryList = $('.order-summary-list');
                var sumSubtotal = 0;
                var shippingMethod = "";
                var total = 0;

                orderSummaryList.empty(); // Clear existing content

                $.each(data, function(index, item) {
                    var product = $('<div>').addClass('list-item').append( // Add 'list-item' class
                        $('<div>').addClass('product').append(
                            $('<img>').addClass('pro-img').attr('src', 'assets/' + item.productImg), // Add 'pro-img' class
                            $('<div>').addClass('details').append(
                                $('<h3>').text(item.productName),
                                $('<span>').text('Quantity: ' + item.quantity)
                            )
                        ),
                        $('<div>').addClass('price').css('display', 'none').text('$' + item.productPrice.toFixed(2)), // Add 'price' class
                        $('<div>').addClass('sub-total').text('$' + (item.productPrice * item.quantity).toFixed(2)) // Add 'sub-total' class
                    );

                    orderSummaryList.append(product);

                    sumSubtotal += item.productPrice * item.quantity;
                    total = item.total;

                    shippingMethod = item.shippingMethod;

                });

                // Add classes to shipping, subtotal, and total elements
                orderSummaryList.append(
                    $('<div>').addClass('shipping').append(
                        $('<span>').addClass('text').text('Shipping'),
                        $('<span>').addClass('value').text(shippingMethod)
                    ),
                    $('<div>').addClass('shipping').append(
                        $('<span>').addClass('text').text('SubTotal'),
                        $('<span>').addClass('value').text('$' + sumSubtotal.toFixed(2))
                    ),
                    $('<div>').addClass('total-cost').append(
                        $('<span>').addClass('text').text('Total'),
                        $('<span>').addClass('value').text('$' + total.toFixed(2))
                    )
                );
            },
            error: function() {
                alert('Error fetching cart items.');
            }
    });
}
    
    function fetchContactInformation() {
        $.ajax({
            url: 'ContactInformation',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.length > 0) {
                    var contactInfo = data[0]; // Assuming only one contact information is returned

                    $('#fname').val(contactInfo.firstName); // Set first name value
                    $('#lname').val(contactInfo.lastName); // Set last name value
                    $('#email').val(contactInfo.email); // Set email value
                    $('#phone').val(contactInfo.phoneNo); // Set phone number value
                }
            },
            error: function() {
                alert('Error fetching contact information.');
            }
        });
    }

    
    fetchCartItemsAndUpdateTotal();
    fetchOrderSummary();
    fetchContactInformation();
     
 });
    
//Remove Cart Item
function removeCartItem(cartId) {
    $.ajax({
        url: 'RemoveCartItemServlet',
        type: 'POST',
        data: { cart_id: cartId },
        success: function(response) {
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error('Error removing item:', error);
        }
    });
}

//Send Cart Data
function sendData() {
    var total = $('.cart-sum-total .price').text().trim();
    var total = total.replace('$', '');
    var cartItems = [];
    var shipping = parseInt($('input[name=shipping-method]:checked').val());
    if(shipping === 15){
        shippingMethod = 'Express Shipping';
    }else {
        shippingMethod = "Free Shiping";
    }

    $('.cart-item').each(function() {
      var cartId = $(this).attr('id').split('_')[1];
      var proId = $(this).data('pro-id');
      var quantity = parseInt($('input[id^=quantity_]', this).val()); 

      cartItems.push({
        cartId: cartId,
        productId: proId,
        quantity: quantity
      });
    });
    
    console.log(JSON.stringify(cartItems));
    $.ajax({
        url: contextPath + '/CartDetailsServlet',
        type: 'POST',
        data: {
            total_price: total,
            cart_items: JSON.stringify(cartItems), 
            shipping_method: shippingMethod
        },
        success: function(response) {
            if (response.startsWith("Success")) {
                window.location.href = 'checkout.jsp';
            } else {
                console.error("Error in processing order:", response);
                alert("Error in processing order. Please try again later.");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            alert("Error sending data. Please try again later.");
        }
    });
}
