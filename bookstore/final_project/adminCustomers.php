<h1>Customers</h1>
<?php
require "internal/dbconnect.php";
if(isset($_REQUEST['action_save'])){
	$sql = 'update customer set Fname=?, Lname=?, Address=?, Phone=? where id=?';
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("ssssi",$_REQUEST['Fname'],$_REQUEST['Surname'],$_REQUEST['Address'],$_REQUEST['Phone'] ,$_REQUEST['pid']);
	$stmt->execute();
	if(!($result2 = $mysqli->query($sql))){
		print "Error: ". $mysqli->error;
	}else{
		print "Τα στοιχεία σου άλλαξαν";
		unset($_REQUEST['action_save']);
		unset($_REQUEST['pid']);
	}
}
$sql1 = 'select * from customer';
$result1 = $mysqli->query($sql1);
while($customer = $result1->fetch_assoc()){
	print "<ul class='nav-item'><a class='nav-link' href='index.php?p=adminCustomers&pid=$customer[ID]'>"."$customer[Lname]</a></ul>";
}
if(isset($_REQUEST['pid'])){
	$customer1="select * from customer where id=?";
	$stmt = $mysqli->prepare($customer1);
	//print $mysqli->error;
	$stmt->bind_param("i", $_REQUEST['pid']);
	$stmt->execute();
	$result = $stmt->get_result();
	$row = $result->fetch_assoc();
	$Fname = $row['Fname'];
	$Lname = $row['Lname'];
	$Address = $row['Address'];
	$Phone = $row['Phone'];

	print <<<END
	<form method="post">
	<table>
	<tbody><tr><td class="text-right">Name:</td><td><input class="form-control" type="text" name="Fname" value="$Fname"></td></tr>
	<tr><td class="text-right">Surname:</td><td><input class="form-control" type="text" name="Surname" value="$Lname"></td></tr>
	<tr><td class="text-right">Adress:</td><td><textarea class="form-control" name="Address">$Address</textarea></td></tr>
	<tr><td class="text-right">Tel:</td><td><input class="form-control" type="text" name="Phone" value="$Phone"></td></tr>
	<tr><td colspan="2" class="text-center"><input type="submit" class="btn btn-primary" value="Ενημέρωση" name="action_save"> 
	</td></tr>
	</tbody></table>
	</form>
END;
}
/*
$pid = $_REQUEST['pid'];
$stmt = $mysqli->prepare("select * from customer where ID=?");
$stmt->bind_param("i",$pid);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
if(isset($_REQUEST['action_save'])) {
	$sql2 = 'update customer set Fname="'.$_REQUEST['Fname'].'", Lname="'.$_REQUEST['Lname'].'", Address="'.$_REQUEST['Address'].'", Phone="'.$_REQUEST['Phone'].'" where ID="'.$row['ID'].'"';
	if(!($result2 = $mysqli->query($sql2))){
		print "Error: ". $mysqli->error;
	}else{
		print "Τα στοιχεία σου άλλαξαν";
	}
}*/
?>
