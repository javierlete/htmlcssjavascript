/*eslint-env browser */
/*eslint no-console: "off" */
/*jslint browser:true devel:true */

var cuadroTextoNombre;
var cuadroTextoNif;

function validarLetraNif(nif) {
    'use strict';
    
    var letras, numero, letra, resto;
    
    letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    
    numero = nif.substring(0, nif.length - 1);
    
    letra = nif.charAt(8);
    
    resto = numero % 23;
    
    return letras.charAt(resto) === letra;
}

function cuandoEnvieFormulario(evento) {
    'use strict';
    
    var nombre, saludo, nif;
    
    evento.preventDefault();
    
    console.log('Acaban de intentar enviar el formulario');
    
    console.log(cuadroTextoNombre);
    
    nombre = cuadroTextoNombre.value;
    nif = cuadroTextoNif.value;
    
    console.log('nombre=', nombre);
    console.log('nif=', nif);
    
    if (nombre.trim().length === 0) {
        cuadroTextoNombre.style = 'border: 1px solid red';
        cuadroTextoNombre.focus();
    }
    
    if (nombre === 'JAVIER') {
        cuadroTextoNombre.style = 'background: lightgreen';
    }
    
    if (!validarLetraNif(nif)) {
        cuadroTextoNif.style = 'border: 1px solid red';
    } else {
        cuadroTextoNif.style = 'border: 1px solid black';
    }
    
    saludo = document.getElementById('saludo');
    
    saludo.innerHTML = 'Hola ' + nombre;
    
    //document.forms[0].innerHTML = '';
    
    //return false;
}

function cuandoPulsenTeclaEnCuadroDeTextoNombre() {
    'use strict';
    
    cuadroTextoNombre.style = 'border: 1px solid black';
    cuadroTextoNombre.value = cuadroTextoNombre.value.toUpperCase();
}

function cuandoCargue() {
    'use strict';
    
    cuadroTextoNombre = document.getElementById('nombre');
    
    cuadroTextoNif = document.getElementById('nif');
    
    console.log('Acaba de cargar el documento');
    
    document.forms[0].onsubmit = cuandoEnvieFormulario;
    
    cuadroTextoNombre.onkeyup = cuandoPulsenTeclaEnCuadroDeTextoNombre;
}

window.onload = cuandoCargue;
