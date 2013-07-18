<!DOCTYPE html>
<html>
<body>
<h1>Valores post</h1>
<table border>
<tr>
<th>Clave</th><th>Valor</th>
<?php 
foreach($_POST as $k=>$v) {
 echo "<tr><td>$k</td><td>$v</td></tr>" ;
}
?>
</tr>
</table>
</body>
</html>