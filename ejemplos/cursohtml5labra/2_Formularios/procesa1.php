<!DOCTYPE html>
<html>
<body>
<h1>Datos recogidos</h1>
<?php 
  echo 'Hola ' . htmlspecialchars($_POST["cliente"]) . '!'; 
?><br/>
<?php
  if(isset($_POST['correo'])) 
     echo "Email: " . $_POST['correo']  ;
  else
     echo "No has enviado email...te encontraremos igualmente!";
?>.
</body>
</html>