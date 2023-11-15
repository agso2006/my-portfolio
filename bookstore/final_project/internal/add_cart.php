Προστέθηκε με επιτυχία στο καλάθι...
<?php
if(!is_array($_SESSION['cart'])) {
 $_SESSION['cart']=array();
}
$prodid = $_REQUEST['pid']; 
$qty = $_REQUEST['qty'];
$_SESSION['cart'][$prodid] += $qty; 
print "<br>Προστέθηκαν $qty τεμάχια στο καλάθι σας";
require "internal/showcart.php"
?>
