<!-- HTML principal de la aplicacion -->
<!-- Cesar Bello <cesarbellob@gmail.com> 27/08/2015 -->

<html>
	<head>
		<script src="js/jquery-1.11.3.min.js"></script>
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
		<script src="js/gmaps.js"></script>		
		
		<style>
		
		#map {
			height:400px;
			background:#6699cc;
		}
		#venues {
			font-size:8px
		}
	</style>
	</head>
	
	<body>
		<h2> A continuaci&oacute;n se muestran los Restaurantes de Sushi mas cercanos a tu Ubicaci&oacute;n, puedes verificar la informaci&oacute;n de ellos haciendo click sobre los &iacute;conos, puedes utilizar los datos de contacto para solicitar informaci&oacute;n de direcciones y precios.</h2>
		<div>
			<div>
				<div id='map'></div>
			</div>
			<div>
				<ul id="results"></ul>
			</div>
		</div>
		<script src="js/main.js"></script>
	</body>
</html>