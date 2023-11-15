<?php
	echo "Bye bye $_SESSION[username]. We hope we see you again";
	session_unset();
	session_destroy();
?>