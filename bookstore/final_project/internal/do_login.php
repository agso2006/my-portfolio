Proccessing login.....
<?php
	$u = $_REQUEST['username'];
	$p = $_REQUEST['pass'];
	$sql = "select is_admin,count(*) as ok from customer where uname=? and passwd_enc=PASSWORD(?)";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("ss",$u,$p);
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = $result->fetch_assoc()){	
		if($row['ok'] == 1){
				$_SESSION['username'] = $u;
				if($row['is_admin']==1){
					$_SESSION['is_admin']=1;
					print "Welcome admin";
					require "internal/after_login_admin.php";
				}
				else if ($row['is_admin']==0){
					$_SESSION['is_admin']=0;
					print "Welcome $_SESSION[username]";
					require "internal/after_login_user.php";
				}
				else{
					print "Unknown user. Please try again";
				}
				
				
	//header('Location:?p=after_login');			
		}
	
	}
?>