
<?php
/**
 * 
 * Archivo que hace las solicitudes al API de foursquare
 *  
 * @author Cesar Bello <cesarbellob@gmail.com>
 * @version 0.1
 */
	require_once("FoursquareApi.php");
	//clave privada y publica
	$client_key = "FIEQ1EJKV2ROHUM01ZIZFZLEC4SULFS0RAOF2FD4TH2FUBFI";
	$client_secret = "OS3Y2O5KZE431ZG4E0RQ5XZVLSTQZB2AP3KNPOBZW5K4PEWW";

	if($client_key=="" or $client_secret=="")
	{
        echo 'necesitas proporcionar una api key y secret visita: <a href="https://developer.foursquare.com/">foursquare</a>';
        exit;
	}

	$foursquare = new FoursquareApi($client_key,$client_secret);
	// parametros
	$lat = $_GET["lat"];
	$lon = $_GET["lon"];
	$params = array("ll"=>"$lat,$lon","query"=>"sushi");
	// obtener la data
	echo $foursquare->GetPublic("venues/search",$params);