<div class="container-fluid">
      <div class="row">
        <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">

<ul>
<?php
$books = array("Name", "ID"); 
	print "<h3>Products MENU</h3>";
	
	print "<ul class='nav nav-pills flex-column'>
				<li class='nav-item'><a class=nav-link' href='index.php'>".
				"$books[0]</a></li></ul>";
	print "<br>";
	print "<ul class='nav nav-pills flex-column'>
				<li class='nav-item'><a class=nav-link' href='index.php'>".
				"$books[1]</a></li></ul>";
	
?>
</ul>
</nav>
