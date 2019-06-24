/*eslint-env browser */
/*eslint no-console: "off" */
/*jslint browser:true devel:true */
/*global $*/

$(function () {
    'use strict';

    $.getJSON('https://swapi.co/api/films', function (resultado) {
        console.log(resultado);

        var peliculas = resultado.results;

        console.log(peliculas);

        $(peliculas).each(function () {

            $('#peliculas').append('<li><a href="#" data-url="' + this.url + '">' + this.title + '</a></li>');
        });

        $('#peliculas a').click(function (e) {
            e.preventDefault();

            $.getJSON(this.dataset.url, function (pelicula) {
                console.log(pelicula.opening_crawl);
                
                $('#apertura').text(pelicula.opening_crawl);
            });
        });
    });
});
