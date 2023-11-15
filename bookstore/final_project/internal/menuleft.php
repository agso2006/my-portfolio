<ul class="nav nav-pills flex-column">

<?php
//1)prepare 2)execute 3)get_result();
$stmt = $mysqli->prepare("SELECT * from category order by Name");


/*1)$sql = "SELECT * from category order by Name;";
2)if (! $stmt = $mysqli->prepare($sql)) {       
	echo "Error: " . $mysqli->error;
}*/
/*
If( ! $stmt->execute() ) {

echo "Error: " . $mysqli->error;

}*/
$stmt->execute();
$result = $stmt->get_result();
print "<h3>Products MENU</h3>";
while ($row = $result->fetch_assoc()){
	print "<li class='nav-item'>
	<a class='nav-link' href='index.php?p=catinfo&catid=$row[ID]'>"."$row[Name]</a></li>";
}

?>
</ul>
