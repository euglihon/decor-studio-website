<?php

$name = htmlspecialchars($_POST["name"]);
$email = htmlspecialchars($_POST["email"]);
$tel = htmlspecialchars($_POST["tel"]);
$message = htmlspecialchars($_POST["message"]);
$bezspama = htmlspecialchars($_POST["bezspama"]);

$address = "info@dekoracje-papierowe.pl";
$sub = "Dekoracje papierowe";


$mes = "Kontakt Dekoracje-papierowe\n
Name: $name
E-mail: $email
Phone: $tel
Message:
$message";

if (empty($bezspama))
{

$from  = "From: $name <$email> \r\n Reply-To: $email \r\n";
if (mail($address, $sub, $mes, $from)) {
    header('Location: https://dekoracje-papierowe.pl/sent-mail.html');
  }
else {
    header('Location: https://dekoracje-papierowe.pl/not-sent-mail.html');
  }
}
exit;
?>
