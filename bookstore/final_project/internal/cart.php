<h3>Καλάθι αγορών</h3>
<table class='table table-striped'> 
<tr><th>Τίτλος</th><th>Τιμή</th></tr>
<?php
if(!is_array($_SESSION['cart'])) {
 $_SESSION['cart']=array();
}
$sql = "select * from product where ID=?";
$stmt = $mysqli->prepare($sql);

$sum = 0;
foreach($_SESSION['cart'] as $p => $q) {
 $stmt->bind_param("i", $p);
 $stmt->execute();
 $result = $stmt->get_result();
 $row = $result->fetch_assoc();
 print "<tr>";
 print "<td>$row[Title]</td>"; 
 print "<td>$row[Price]   €</td>";  
 $sum += ($q * $row['Price']);

 print "</tr>";
  
}
 print "Συνολική τιμή: $sum   €";

?>
</table>

<a href='?p=buy_cart' class='btn btn-primary'>ΑΓΟΡΑ</a>
<a href='?p=empty_cart' class='btn btn-primary'>ΑΔΕΙΑΣΜΑ ΚΑΛΑΘΙΟΥ</a>
