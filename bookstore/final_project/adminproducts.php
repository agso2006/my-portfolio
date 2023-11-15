<?php
require "internal/dbconnect.php";

if(isset($_REQUEST['action_save'])){
	$sql2 = 'update product set Title=?, Price=? where id=?';
	$stmt = $mysqli->prepare($sql2);
	$stmt->bind_param("sii",$_REQUEST['Title'],$_REQUEST['Price'],$_REQUEST['pid']);
	$stmt->execute();
	if(!($result2 = $mysqli->query($sql2))){
		print "Error: ". $mysqli->error;
	}else{
		print "Το όνομα και η τιμή του βιβλίου άλλαξαν";
		unset($_REQUEST['action_save']);
		unset($_REQUEST['pid']);
}
}
	

$sql = 'select * from product';
$result = $mysqli->query($sql);
$product = $result->fetch_array();
while($product = $result->fetch_assoc()){
	print "<table>";
	print "<tr><td><a href='index.php?p=adminproducts&pid=$product[ID]'>$product[Title]</a></td><td>$product[Price]€</td></tr>";
	print "</table>";
}

if(isset($_REQUEST['pid'])){
	$product1="select * from product where id=?";
	$stmt = $mysqli->prepare($product1);
	//print $mysqli->error;
	$stmt->bind_param("i", $_REQUEST['pid']);
	$stmt->execute();
	$result1 = $stmt->get_result();
	$row = $result1->fetch_assoc();
	$Title = $row['Title'];
	$Price = $row['Price'];
	print <<<END
	<form method='post' action='index.php?p=adminproducts'>
	<table>
	<tbody><tr><td class="text-right">Title:</td><td><input class="form-control" type="text" name="Title" value="$Title"></td></tr>
	<tr><td class="text-right">Price:</td><td><input class="form-control" type="text" name="Price" value="$Price"></td></tr>
	<tr><td colspan="2" class="text-center"><input type="submit" class="btn btn-primary" value="Ενημέρωση" name="action_save"> 
	</td></tr>
	</tbody></table>
	<input type="hidden" name="pid" value="$row[ID]">
	</form>
END;
}

?>