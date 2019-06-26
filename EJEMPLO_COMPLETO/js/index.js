/*eslint-env browser */
/*eslint no-console: "off" */
/*jslint browser:true devel:true */
/*global $, moment*/

// TODO: Códigos IATA

var url = 'http://localhost:3000/';

function mostrarAlerta(texto, nivel) {
    'use strict';
    
    var alerta = '<div class="alert alert-' + nivel + ' alert-dismissible fade show" role="alert">' + texto + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    
    $('h1').after(alerta);
}

function refrescarVuelos() {
    'use strict';

    $.getJSON(url + 'vuelos', function (vuelos) {
        $('tbody').empty();

        $(vuelos).each(function () {
            var pedazos = this.fecha_salida.split('T');

            console.log(pedazos[0], pedazos[1]);

            console.log(pedazos.join('T'));

            $('tbody').append(
                '<tr><td>' + this.id + '</td><td>' + this.aeropuerto_origen + '</td><td>' + this.aeropuerto_destino + '</td><td>' + this.compania_aerea + '</td><td>' + this.fecha_salida + '</td><td>' + this.fecha_llegada + '</td><td><a class="btn btn-primary btnEditar" href="#" data-id="' + this.id + '">Editar <i class="fas fa-edit"></i></a> <a class="btn btn-danger btnBorrar" href="#" data-id="' + this.id + '">Borrar <i class="far fa-trash-alt"></i></a></tr>'
            );
        });

        $('.btnEditar').click(function (e) {
            e.preventDefault();

            mostrarAlerta('Editando el registro ' + this.dataset.id, 'info');
            
            $.getJSON(url + 'vuelos/' + this.dataset.id, function (vuelo) {

                console.log(vuelo);

                $('#id').val(vuelo.id);

                $('#aeropuerto_origen').val(vuelo.aeropuerto_origen);
                $('#aeropuerto_destino').val(vuelo.aeropuerto_destino);
                $('#compania_aerea').val(vuelo.compania_aerea);
                $('#fecha_salida').val(
                    moment(vuelo.fecha_salida, 'YYYY-MM-DDTHH:mm')
                        .format('DD/MM/YYYY HH:mm')
                );
                $('#fecha_llegada_date').val(
                    moment(vuelo.fecha_llegada, 'YYYY-MM-DDTHH:mm')
                        .format('YYYY-MM-DD')
                );
                $('#fecha_llegada_time').val(
                    moment(vuelo.fecha_llegada, 'YYYY-MM-DDTHH:mm')
                        .format('HH:mm')
                );

                $('form').show();
            });
        });

        $('.btnBorrar').click(function (e) {
            e.preventDefault();

            console.log('Borrar', this.dataset.id);

            $.ajax({
                url: url + 'vuelos/' + this.dataset.id,
                method: 'DELETE'
            }).done(function () {
                console.log('OK');

                refrescarVuelos();
                
                mostrarAlerta('Vuelo borrado correctamente', 'success');
            }).fail(function () {
                console.log('ERROR');
            });
        });
    }).fail(function () {
        mostrarAlerta('No se ha podido cargar la lista de vuelos', 'danger');
    });
}

$(function () {
    'use strict';

    $('form').hide();
    
    mostrarAlerta('Bienvenido a esta aplicación', 'info');

    $('#btnAnadir').click(function (e) {
        e.preventDefault();

        $('input, select').val('');

        $('#id').val('0');

        $('form').show();
    });

    $('#btnAceptar').click(function (e) {
        e.preventDefault();

        var vuelo = {},
            id;

        id = $('#id').val();

        vuelo.aeropuerto_origen = $('#aeropuerto_origen').val();
        vuelo.aeropuerto_destino = $('#aeropuerto_destino').val();
        vuelo.compania_aerea = $('#compania_aerea').val();
        vuelo.fecha_salida = $('#fecha_salida').val();
        vuelo.fecha_llegada = $('#fecha_llegada_date').val() + 'T' + $('#fecha_llegada_time').val();

        //vuelo.fecha_salida = vuelo.fecha_salida.replace(/\//g, '-').replace(' ', 'T');

        vuelo.fecha_salida = moment(vuelo.fecha_salida, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm');

        console.log(vuelo);

        id = +id;

        if (id === 0) {
            $.post(url + 'vuelos', vuelo, function (datos, estado, peticion) {
                console.log(datos, estado, peticion);

                refrescarVuelos();

                $('form').hide();
            });
        } else {
            vuelo.id = id;
            
            $.ajax({
                url: url + 'vuelos/' + id,
                method: 'PUT',
                data: vuelo
            }).done(function (respuesta) {
                console.log(respuesta);
                
                refrescarVuelos();
            }).fail(function () {
                alert('HA HABIDO UN ERROR');
            });
        }
    });

    refrescarVuelos();

});
