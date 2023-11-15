<h1>Our products...</h1>

<br>
	<?php
	$query="select * from product order by Title";
	$category="select * from category order by Name";
	$bycat="select * from product where Category=? order by Title";
	
	print "<form method='post'><select name='selection'>";
	print "<option value=0 selected='selected'>All Categories</option>";
	if($result = $mysqli->query($category)){
		while($row = $result->fetch_assoc()) {
			print "<option value=".$row['ID'].">".$row['Name']."</option>";
		}
		print "<input type='submit' name='submitted' value='SHOW'></form></select>";
	}else{
	print "Error: ". $mysqli->error; //print the error
	}
	
print "<table><tr><th>Title</th><th>Price</th></tr>";
if(!isset($_REQUEST['selection'])){
	$_REQUEST['selection']=0;
}
	if($_REQUEST['selection']==0){		
		if( $stmt = $mysqli->prepare($query) ) {
			$stmt->execute();
			$result = $stmt->get_result();
	
		while ($row = $result->fetch_assoc()) {
			print <<<END

				 <tr><td><a href='index.php?p=productinfo&pid=$row[ID]'>$row[Title]</a></td>
				 <td>$row[Price]</td></tr>
END;


		}

	}

	}else{
		$stmt = $mysqli->prepare($bycat);
		print $mysqli->error;
		$stmt->bind_param("i", $_REQUEST['selection']);
		$stmt->execute();
		$result = $stmt->get_result();
		while ($row = $result->fetch_assoc()) {
			print <<<END

				 <tr><td><a href='index.php?p=productinfo&pid=$row[ID]'>$row[Title]</a></td>
				 <td>$row[Price]</td></tr>
END;
		}
	}
print "</table>";
?>
	
