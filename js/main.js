/**
 * javascrip principal que arma el mapa y hace las solicitudes al archivo php de los datos de las ubicaciones
 * @author Cesar Bello <cesarbellob@gmail.com>
 * @version 0.1
 */

$(document).ready(function () {
// aqui se obtiene la ubicacion actual del usuario desde el navegador si el usuario concede los permisos
// se ejecuta la funcion callback que se pasa por parametro
    if (typeof navigator.geolocation == 'object') {
        navigator.geolocation.getCurrentPosition(function (p) {
            // se obtienen la latitud y la longitud
            var lat = p.coords.latitude;
            var lon = p.coords.longitude;

            // se utilizo la libreria gmaps.js para renderizar los datos en json que trae el api foursquare
            map = new GMaps({
                div: '#map',
                lat: lat,
                lng: lon,
                zoom: 15,
                scrollwheel: false,
                zoomControl: true,
                zoomControlOpt: {
                    style: 'SMALL',
                    position: 'TOP_LEFT'
                },
                panControl: false,
            });
            // configuracion inicial del mapa de google
            map.addMapType("osm", {
                getTileUrl: function (coord, zoom) {
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenStreetMap",
                maxZoom: 18
            });

            // marca en el mapa que indica la ubicacion del usuario
            map.addMarker({
                lat: lat,
                lng: lon,
                infoWindow: {
                    content: '<p>Mi Ubicacion</p>'
                }
            });


            var items, markers_data = [];

            // peticion al archivo php que devuelve los datos de ubicacion de los restaurantes
            // ejecuta un calback donde se agrega la informacion de las marcas al mapa
            $.getJSON('buscar_restaurantes_json.php?lat=' + lat + '&lon=' + lon, function (data) {

                // se recorren los lugares devueltos por foursquare para agregarlos en un array con la informacion de cada lugar y 
                // estructura que necesita el mapa de google para agregaros como marca en el mapa
                $.each(data.response.venues, function (i, venues) {
                    console.log(venues.contact, venues.shortUrl);
                    content = '<p>Nombre: <strong>' + venues.name
                            + '</strong> <br>Direccion: <strong>' + venues.location.address + '</strong>';

                    if (typeof venues.contact.phone !== "undefined") {
                        content += ' <br>Telefono: <strong>' + venues.contact.formattedPhone + '</strong>';
                    }
                    if (typeof venues.contact.twitter !== "undefined") {
                        content += ' <br>Twitter: <a href="https://twitter.com/' + venues.contact.twitter + '">@' + venues.contact.twitter + '</a>';
                    }
                    content += '</p>';

                    markers_data.push({
                        lat: venues.location.lat,
                        lng: venues.location.lng,
                        title: venues.name,
                        icon: {
                            size: new google.maps.Size(32, 32),
                            url: 'https://foursquare.com/img/categories/food/default.png'
                        },
                        infoWindow: {// html de la descripcion del restaurante o lugar
                            content: '<p>' + content + '</p>'
                        }
                    });
                    //map
                });
                // plot
                map.addMarkers(markers_data);
            });
            //evento que se dispara al hacer click sobre los links del listado de ligares abajo del mapa, tiene la funcion de mover el mapa y colocar el lugar en el centro de mismo
            $(document).on('click', '.pan-to-marker', function (e) {
                e.preventDefault();
                var position, lat, lng, $index;

                $index = $(this).data('marker-index');

                position = map.markers[$index].getPosition();

                lat = position.lat();
                lng = position.lng();

                map.setCenter(lat, lng);
            });

            map.addMapType("osm", {
                getTileUrl: function (coord, zoom) {
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenStreetMap",
                maxZoom: 18
            });
            //llena la lista de lugares abajo del mapa
            map.on('marker_added', function (marker) {
                var index = map.markers.indexOf(marker);
                $('#results').append('<li><a href="#" class="pan-to-marker" data-marker-index="' + index + '">' + marker.title + '</a></li>');

                if (index == map.markers.length - 1) {
                    map.fitZoom();
                }
            });
        });
    }
});