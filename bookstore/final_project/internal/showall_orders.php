<ol>
<?php
	//require "../internal/dbconnect.php";
	$sql1 = "select *, O.ID as OID, C.ID as CID from orders O inner join customer C on O.Customer=C.ID";
	$sql2 = "select *, Quantity*Price as Total from orderdetails D inner join orders O on D.Orders = O.ID inner join product P on P.ID=D.Product where Orders=?";
	
	$result1 = $mysqli->query($sql1);
	while($order = $result1->fetch_assoc()){
		print "<li>OrderID: $order[OID], Date: $order[oDate], Customer: $order[Fname] $order[Lname]<ul>";
		$stmt = $mysqli->prepare($sql2);
		$stmt->bind_param("s",$order['OID']);
		$stmt->execute();
		$result2 = $stmt->get_result();
		while($details = $result2->fetch_assoc()){
			print "<li>$details[Title]: $details[Quantity] x $details[Price]€ = $details[Total]€</li>";
		}
	print "</ul></li>";
	}
?>
</ol>	

<?php
/*
$sql1 = "select orders.id as OID, orders.oDate as ODATE, customer.Fname as CFNAME, customer.Lname as CLNAME from orders inner join customer on orders.Customer=customer.ID";
$sql2 = "select product.Title as PTITLE, orderdetails.Quantity as OQUANTITY, product.Price as PPRICE from product inner join orderdetails on product.ID=orderdetails.Product";
$result1 = $mysqli->query($sql1);
$result2 = $mysqli->query($sql2);
while ($details1 = $result1->fetch_assoc()){
	print "<li>OrderID:  $details1[OID]OrderDate:  $details1[ODATE]<br>CustomerFname:  $details1[CFNAME]<br>CustomerLname:  $details1[CLNAME]";
	while($details2 = $result2->fetch_assoc()){
		print "<br><li>Title: $details2[PTITLE] Quantity:  $details2[OQUANTITY]*$details2[PPRICE]€</li>";
	
	}
	print "</li>";
	}
*/
?>


	