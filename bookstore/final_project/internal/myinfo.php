<?php
	$sql1 = 'select * from customer where uname="'.$_SESSION['username'].'"';
	$result1 = $mysqli->query($sql1);
	$customer1 = $result1->fetch_array();
if(isset($_REQUEST['action_save'])) {
	$sql2 = 'update customer set Fname="'.$_REQUEST['Fname'].'", Lname="'.$_REQUEST['Lname'].'", Address="'.$_REQUEST['Address'].'", Phone="'.$_REQUEST['Phone'].'" where ID="'.$customer1['ID'].'"';
	if(!($result2 = $mysqli->query($sql2))){
		print "Error: ". $mysqli->error;
	}else{
		print "Τα στοιχεία σου άλλαξαν";
	}
}
//$result3 = $mysqli -> query('select * from customer where uname="'.$_SESSION['username'].'"');
//$customer3 = $result3->fetch_array();
//$sql = 'select * from customer where uname="'.$_SESSION['username'].'"';
//$result = $mysqli->query($sql);
//$customer = $result->fetch_array();
?>
<form method='get'>
<table>
<tr><td class="text-right">Όνομα:</td><td><input class="form-control" type='text' name='Fname' value=<?php echo "$customer1[Fname]"; ?>></td></tr>
<tr><td class="text-right">Επώνυμο:</td><td><input class="form-control" type='text' name='Lname' value=<?php echo "$customer1[Lname]"; ?>></td></tr>
<tr><td class="text-right">Διεύθυνση:</td><td><textarea class="form-control" name='Address' ><?php echo "$customer1[Address]"; ?></textarea></td></tr>
<tr><td class="text-right">Τηλέφωνο:</td><td><input class="form-control" type='text' name='Phone' value=<?php echo "$customer1[Phone]"; ?>></td></tr>
<tr><td colspan="2" class="text-center"><input type='submit' class="btn btn-primary" value='ΑΠΟΘΗΚΕΥΣΗ' name='action_save'> <input type='reset' class="btn btn-primary" value='ΑΝΑΙΡΕΣΗ'>
<input type='hidden' name='p' value='myinfo'>
</td></tr>
</table>
</form>
