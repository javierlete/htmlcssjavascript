/*eslint-env browser */
/*eslint no-console: "off" */
/*jslint browser:true devel:true */
/*global $*/

function validarLetraNif(nif) {
    'use strict';
    
    var letras, numero, letra, resto;
    
    letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    
    numero = nif.substring(0, nif.length - 1);
    
    letra = nif.charAt(8);
    
    resto = numero % 23;
    
    return letras.charAt(resto) === letra;
}

$(function () {
    'use strict';
    
    $('form').submit(function (evento) {
        evento.preventDefault();

        if ($('#nombre').val().trim().length === 0) {
            $('#nombre').addClass('error');
            $('#nombre').focus();
        }

        if ($('#nombre').val() === 'JAVIER') {
            $('#nombre').addClass('javier');
        }

        if (!validarLetraNif($('#nif').val())) {
            $('#nif').addClass('error');
        } else {
            $('#nif').removeClass('error');
        }

        $('#saludo').text('Hola ' + $('#nombre').val());
    });
    
    $('#nombre').keyup(function () {
        $('#nombre').removeClass('error');
        $('#nombre').val($('#nombre').val().toUpperCase());
    });
});
