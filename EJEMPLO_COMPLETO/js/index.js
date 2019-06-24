/*eslint-env browser */
/*eslint no-console: "off" */
/*jslint browser:true devel:true */
/*global $*/

var url = 'http://localhost:3000/';

$(function () {
    'use strict';
    
    $.getJSON(url + 'vuelos', function (vuelos) {
        $(vuelos).each(function () {
            $('tbody').append(
                '<tr><td>' + this.id + '</td><td>' + this.aeropuerto_origen + '</td><td>' + this.aeropuerto_destino + '</td><td>' + this.compania_aerea + '</td><td>' + this.fecha_salida + '</td><td>' + this.fecha_llegada + '</td></tr>'
            );
        });
    });
});