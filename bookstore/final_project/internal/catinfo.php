<table>
<th>Name</th>
<th>Price</th>
<?php
	
	$cat_id = $_REQUEST['catid'];
	$stmt = $mysqli->prepare("select * from product where Category=?");
	$stmt->bind_param("i",$cat_id);
	$stmt->execute();
	$result = $stmt->get_result();
	
	while ($row = $result->fetch_assoc()){
		print "<tr>
		<td><a class='nav-link' href='index.php?p=productinfo&pid=$row[ID]'>"."$row[Title]</a></td>
		<td>$row[Price] €</td>
		</tr>";
	}
	?>
</table>