<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="b" uri="/WEB-INF/tlds/buttonTags" %>
<!DOCTYPE html>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>E-Commerce</title>
        
        <!--CSS-->
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" >
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>
    <body>
        <header class="header">
                       
        <%@include file="includes/navbar.jsp" %>
        <%@include file="includes/search.jsp" %>
        
        <div class="container">
            <div class="hero-wrapper">
                <div class="hero-text">
            <h1>More than just a game. It’s a lifestyle.</h1>
            <p>Whether you’re just starting out, have played your whole life or you're a Tour pro, your swing is like a fingerprint.</p>
            <a>
                <b:Button text="Shopping Now" rounded="false" outlined="false"/>
            </a>
        </div>
            </div>
        </div>
        </header>
        
        
        <div class="row">
            <div class="col-md-3">
                <a href="#" class="pro-card-wrapper">
                    <div class="pro-card">
                        <div class="pro-card-img">
                            <div class="pro-add-to-cart">
                                <form id="addToCartForm" method="POST">
                                    <input type="hidden" name="pro_id" value="1" id="pro_id" />
                                    <input type="hidden" name="quantity" value="1" id="quantity" />
                                    <input type="hidden" name="sub_total" value="199.10" id="sub_total" />
                                    <b:Button text="Add To Cart" rounded="false" outlined="false" onclick="addToCart()"/>
                                </form>
                            </div>
                            <div class="new">new</div>
                            <div class="discount">-50%</div>
                            <button class="add-to-wishlist"><img src="assets/icons/wishlist.png" /></button>
                            <img src="assets/pro1.png" />
                        </div>
                        <div class="pro-card-details">
                            <div class="rating">
                                <img src="assets/icons/star.png" />
                            </div>
                            <h2>Loveseat Sofa</h2>
                            <div class="prices">
                                <span class="discount-price">$199.00</span>
                                <span class="price"><s>$400.00</s></span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        
        <script>
            var contextPath = "${pageContext.request.contextPath}";
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="js/index.js"></script>


        
    </body>

        

        
        
    

