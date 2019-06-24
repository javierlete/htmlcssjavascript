/*eslint-env browser */
/*eslint no-console: "off" */
/*jslint browser:true devel:true */
/*global $*/

$(function() {
   $.getJSON('https://swapi.co/api/films', function(resultado) {
       console.log(resultado);
       
       var peliculas = resultado.results;
       
       console.log(peliculas);
       
       $(peliculas).each(function() {
          $('#peliculas').append('<li>' + this.title + '</li>'); 
       });
   });
});