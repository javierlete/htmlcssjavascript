/*eslint-env browser */
/*jslint browser:true devel:true */

'use strict';

//alert('Hola a todos');

var nombre;

nombre = prompt('¿Cómo te llamas?', 'Dime tu nombre');

if(nombre === 'Javier Lete'){
    alert('Hola profesor');
} else {
    alert('Hola ' + nombre);
}

var mes = parseInt(prompt('Dime un número de mes'));

var dias;

switch(mes){
    case 2: dias = 28; break;
    case 4:
    case 6:
    case 9:
    case 11: dias = 30; break;
    default: dias = 31;
}

alert('El mes ' + mes + ' tiene ' + dias + ' días');

var n = 1;
var resultado = '';

while(n <= 10){
    resultado = resultado + n; //resultado += n;
    n++;
}

//alert(resultado);

n = 1;

do{
    resultado += n;
    n++;
}while(n <= 10);

//alert(resultado);

for(var i = 1; i <= 10; i++){
    resultado += i;
}

alert(resultado);
