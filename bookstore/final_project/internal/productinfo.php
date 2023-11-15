<?php

$productID = $_REQUEST['pid'];
$stmt = $mysqli->prepare("select * from product where ID=?");
$stmt->bind_param("i",$productID);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()){
	print "<b>$row[Title]</b><br>";
	print "$row[Description]";
}
?>
<form>
<input type="number" value="1" name="qty">
<input type="hidden" value="<?php echo "$productID"; ?>" name="pid"> 
<input type="submit" value="ΠΡΟΣΘΗΚΗ" class="btn btn-primary">
<input type="hidden" name="p" value="add_cart">
</form> 
