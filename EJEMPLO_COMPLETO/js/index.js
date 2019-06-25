/*eslint-env browser */
/*eslint no-console: "off" */
/*jslint browser:true devel:true */
/*global $, moment*/

// TODO: Códigos IATA

var url = 'http://localhost:3000/';

function refrescarVuelos() {
    'use strict';
    
    $.getJSON(url + 'vuelos', function (vuelos) {
        $('tbody').empty();
        
        $(vuelos).each(function () {
            var pedazos = this.fecha_salida.split('T');

            console.log(pedazos[0], pedazos[1]);

            console.log(pedazos.join('T'));

            $('tbody').append(
                '<tr><td>' + this.id + '</td><td>' + this.aeropuerto_origen + '</td><td>' + this.aeropuerto_destino + '</td><td>' + this.compania_aerea + '</td><td>' + this.fecha_salida + '</td><td>' + this.fecha_llegada + '</td><td><a class="btn btn-primary" href="#">Editar <i class="fas fa-edit"></i></a> <a class="btn btn-danger" href="#">Borrar <i class="far fa-trash-alt"></i></a></tr>'
            );
        });
    });
}

$(function () {
    'use strict';
    
    $('button').click(function (e) {
        e.preventDefault();
        
        var vuelo = {};
        
        vuelo.aeropuerto_origen = $('#aeropuerto_origen').val();
        vuelo.aeropuerto_destino = $('#aeropuerto_destino').val();
        vuelo.compania_aerea = $('#compania_aerea').val();
        vuelo.fecha_salida = $('#fecha_salida').val();
        vuelo.fecha_llegada = $('#fecha_llegada_date').val() + 'T' + $('#fecha_llegada_time').val();
        
        //vuelo.fecha_salida = vuelo.fecha_salida.replace(/\//g, '-').replace(' ', 'T');
        
        vuelo.fecha_salida = moment(vuelo.fecha_salida, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
        
        console.log(vuelo);
        
        $.post(url + 'vuelos', vuelo, function (datos, estado, peticion) {
            console.log(datos, estado, peticion);
            
            refrescarVuelos();
        });
    });

    refrescarVuelos();
    
});