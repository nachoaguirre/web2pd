<?php
/*
Web2PD v0.1 - Simple Version
---------
Este script envia valores a Pure Data (http://www.puredata.info) 
a traves del protocolo TCP (para UDP anteponer "udp://" en la variable $web2pd_host).

Licencia: 
La licencia de este software te permite compartirlo, modificarlo, incluso venderlo si no le niegas a nadie hacer lo mismo.

*/

/******************************
    	CONFIGURACION
******************************/
/* 
	HOST  
	Set the IP of the computer running PD (can be a local area or remote ip address).
	You can also connect to a remote machine (ie, having this files in any hosting),
	just remember to open the designed port in your router configuration.
*/
$web2pd_host = "127.0.0.1";
/* Port */
$web2pd_puerto = 13009;


/**** FIN CONFIGURACION *****/

if(isset($_GET["value"])) {
	$mensaje = $_GET["value"];
} else if (isset($_POST["value"])) {
	$mensaje = $_POST["value"];
} else {
	$mensaje = "Error: No se encontro un valor GET o POST!";
}

$fp = fsockopen($web2pd_host,$web2pd_puerto);


function enviarDatos($fp, $mensaje) {
    for ($escrito = 0; $escrito < strlen($mensaje); $escrito += $fwrite) {
		$mensaje = $mensaje.";\\n";
        $fwrite = fwrite($fp, substr($mensaje, $escrito));
        if (!$fwrite) {
            return $fwrite;
        }
    }
    return $escrito;
}

enviarDatos($fp, $mensaje);

