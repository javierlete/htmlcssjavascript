/*eslint-env browser */
/*eslint no-console: "off" */
/*jslint browser:true devel:true */
/*global $*/

// TODO: Códigos IATA

var url = 'http://localhost:3000/';

$(function () {
    'use strict';
    
    $('#fecha_salida').datetimepicker();
    
    $.getJSON(url + 'vuelos', function (vuelos) {
        $(vuelos).each(function () {
            var pedazos = this.fecha_salida.split('T');
            
            console.log(pedazos[0], pedazos[1]);
            
            console.log(pedazos.join('T'));
            
            $('tbody').append(
                '<tr><td>' + this.id + '</td><td>' + this.aeropuerto_origen + '</td><td>' + this.aeropuerto_destino + '</td><td>' + this.compania_aerea + '</td><td>' + this.fecha_salida + '</td><td>' + this.fecha_llegada + '</td><td><a class="btn btn-primary" href="#">Editar</a> <a class="btn btn-danger" href="#">Borrar</a></tr>'
            );
        });
    });
});