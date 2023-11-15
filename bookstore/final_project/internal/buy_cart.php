<?php
//echo "$_SESSION[username]";
//if($_SESSION['username']='?') {
//	echo "Δεν έχετε κάνει <a href='?p=login'>login</a><br>";
//}
//else{
	print_r($_SESSION);
	if($_SESSION['is_admin']==1){
		require "internal/after_login_admin.php";
	}
	else if($_SESSION['is_admin']==0) {
		require "internal/after_login_user.php";
	}
	else{
		echo "Δεν έχετε κάνει <a href='?p=login'>login</a><br>";
	}
		$result = $mysqli -> query('select id from customer where uname="'.$_SESSION['username'].'"');
		echo "Returned rows are: " . $result -> num_rows;
		echo "<br>$_SESSION[username]<br>";
		$customer = $result->fetch_array();
		print_r($customer);
		$result2 = $mysqli -> query("insert into orders (Customer,oDate) values ($customer[id],now())");
		$order_id = $mysqli->insert_id;
		echo "<br>Έγινε εισαγωγή στο orders με order_id=$order_id<br>";
		
		print_r($_SESSION['cart']);
    
		foreach($_SESSION['cart'] as $p => $q) {
			$sql2 = "select title from product where id=$p";
			$result3 = $mysqli->query($sql2);
			$product = $result3->fetch_assoc();
			$mysqli->query("insert into orderdetails (Orders,Quantity,Product) values ($order_id,$q,$p)");
			echo ("<p> Έγινε εισαγωγή στον πίνακα orderdetails το προϊόν: $product[title], ποσότητα:$q </p>");
		}
		
//}
?>
