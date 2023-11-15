<?php
print '<form method="post">';
if($_SESSION['key'] == 1){
	$sql="select * from customer";
	if($result = $mysqli->query($sql)){
		print '<select name="selection">';
		print "<option value=0 selected='selected'>All Customers</option>";
		while($row = $result->fetch_assoc()) {
			print" <option value=$row[id]>$row[Lname]</option>";
		}	
	}else{
		print "Error: ". $mysqli->error; //print the error
	}

	print '</select><input type="submit" class="btn btn-primary" value="SELECT"></form>';
}else{
	print "you are not admin";
}

if(isset($_REQUEST['selected'])) {
	$sele=$_POST['selection'];
	$sql2 = 'select * from orders where customer=11';
if($result = $mysqli->query($sql2)){
	print "<table><tr><td>Date</td>Order id<td></td></tr>";
	while($roww = $result->fetch_assoc()) {
        print "<tr><td href='index.php?p=AdminOrders&selectedid=$roww[id]'>$roww[id]</td><td>$roww[oDate]</td></tr>";
    }
	print "</table>";
}else{
	print "Error: ". $mysqli->error; //print the error
}
}
if(isset($_REQUEST['selectedid'])){
	$getid="select * from orderdetails where Orders=$_REQUEST['selectedid']";	
	$getproductdetails="select * from product where ID=?";
	$result1 = $mysqli->query($getid);
	$order = $result->fetch_assoc();
	$id=$order['ID'];
	
	$stmt = $mysqli->prepare($getproductdetails);
	print $mysqli->error;
	$stmt->bind_param("i",$id);
	$stmt->execute();
	$result = $stmt->get_result();
	print"<table><th><td>Title</td>Quantity<td></th>"
	while ($row = $result->fetch_assoc()) {
		print "<tr><td>$row['Title']</td>$row['Quantity']<td></tr>";
	}
}
?>