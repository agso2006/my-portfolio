<!doctype html>
<?php
	session_start();
?>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../../../favicon.ico">

    <title>ΑΔΙΣΕ: Εργαστήριο 3</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/dashboard.css" rel="stylesheet">
  </head>
<body>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">Εργαστήριο 3</a>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="index.php?p=start">Αρχική</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="?p=shopinfo">Το κατάστημα μας</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="?p=products">Τα Προϊόντα  μας</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="?p=cart">Καλάθι αγορών</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="?p=login">Login</a>
            </li>
             <li class="nav-item">
              <a class="nav-link" href="?p=contact">Επικοινωνία</a>
            </li>        
			</ul>
        </div>
      </nav>
    </header>
<div class="container-fluid">
      <div class="row">
        <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
          
		  <?php
			require "internal/dbconnect.php";
			?>
		  
		  <?php
			require "internal/menuleft.php";
			?>
	
</nav>
<main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3">
<p>
<?php
	if( ! isset($_SESSION['username'])) {
	$_SESSION['username']='?';
}
	if( ! isset($_SESSION['cart'])) {
	$_SESSION['cart']='?';
}

	if( ! isset($_REQUEST['p'])) {
		$_REQUEST['p']='start';
	}
	$p = $_REQUEST['p'];
	
	switch($p){
	case 'start':		require "internal/start.php";
						break;
	case 'adminCustomers':require "internal/adminCustomers.php";
						break;
	case 'adminproducts':require "internal/adminproducts.php";
						break;
	case 'buy_cart':	require "internal/buy_cart.php";
						break;
	case 'empty_cart':	require "internal/empty_cart.php";
						break;
	case 'showcart':	require "internal/showcart.php";
						break;					
	case 'add_cart':	require "internal/add_cart.php";
						break;					
	case 'shopinfo':	require "internal/shopinfo.php";
						break;
	case 'catinfo':		require "internal/catinfo.php";
						break;				
	case 'productinfo':	require "internal/productinfo.php";
						break;										
	case 'products':	require "internal/products.php";
						break;
	case 'cart':		require "internal/cart.php";
						break;			 
	case 'login':		require "internal/login.php";
						break;			 
	case 'contact':		require "internal/contact.php";
						break;
	case 'logout':		require "internal/logout.php";
						break;
	case 'after_login_user':require "internal/after_login_user.php";
							break;
	case 'after_login_admin':require "internal/after_login_admin.php";
							break;
	case 'dbconnect':		require "internal/dbconnect.php";
							break;
	case 'do_login':		require "internal/do_login.php";
							break;
	case 'customerlist':	require "internal/after_login_admin.php";
							require "internal/customerlist.php";
							break;	
	case 'orderlist':		require "internal/after_login_admin.php";
							require "internal/showall_orders.php";
							break;			
	case 'myordersadmin':	require "internal/after_login_admin.php";
							require "internal/customerlist.php";
							break;	
	case 'myordersuser':	require "internal/after_login_user.php";
							require "internal/customerlist.php";
							break;
	case 'myinfoadmin':		require "internal/after_login_admin.php";
							require "internal/myinfo.php";
							break;				
	case 'myinfouser':		require "internal/after_login_user.php";
							require "internal/myinfo.php";
							break;		
	case 'myinfo':			require "internal/myinfo.php";
							break;							
	default:
		print "Η σελίδα δεν υπάρχει";
	}
?>


</p>     </main>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="javascript/jquery-3.2.1.slim.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="javascript/popper.min.js"></script>
    <script src="javascript/bootstrap.min.js"></script>
  </body>
</html>
