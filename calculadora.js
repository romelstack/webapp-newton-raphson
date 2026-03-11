const display = document.querySelector('#input-ec');

    botonSeno = document.querySelector('#sin');
    botonSeno.addEventListener('click', function(){
        display.value += 'sin(';
    
    })
    botonCoseno = document.querySelector('#cos');
    botonCoseno.addEventListener('click', function(){
        display.value += 'cos(';

    })
    botonTangente = document.querySelector('#tan');
    botonTangente.addEventListener('click', function(){
        display.value += 'tan(';
    })
    botonExponente = document.querySelector('#expo');
    botonExponente.addEventListener('click', function(){
        display.value += '^';
    })
    botonRaiz = document.querySelector('#raiz');
    botonRaiz.addEventListener('click', function(){
        display.value += '√(';
    })
    botonDEL = document.querySelector('#DEL');
    botonDEL.addEventListener('click', function(){
        display.value = display.value.slice(0, -1);
    })
    botonAC = document.querySelector('#AC');
    botonAC.addEventListener('click', function(){
        display.value = '';
    })
    botonMultiplicar = document.querySelector('#multiplicar');
    botonMultiplicar.addEventListener('click', function(){
        display.value += '.';
    })
    botonParentesis = document.querySelector('#parentesis-cerrado');
    botonParentesis.addEventListener('click', function(){
        display.value += ')';
    })
    botonX = document.querySelector('#x');
    botonX.addEventListener('click', function(){
        display.value += 'x';
    })
    botonDivir = document.querySelector('#dividir');
    botonDivir.addEventListener('click', function(){
        display.value += '/';
    })
    botonSumar = document.querySelector('#sumar');
    botonSumar.addEventListener('click', function(){
        display.value += '+';
    })
    botonRestar = document.querySelector('#restar');
    botonRestar.addEventListener('click', function(){
        display.value += '-';
    })
    
    boton1 = document.getElementById('1');
    boton1.addEventListener('click', function(){
        display.value += '1';
    })
    boton2 = document.getElementById('2');
    boton2.addEventListener('click', function(){
        display.value += '2';
    })
    boton3 = document.getElementById('3');
    boton3.addEventListener('click', function(){
        display.value += '3';
    })
    boton4 = document.getElementById('4');
    boton4.addEventListener('click', function(){
        display.value += '4';
    })
    boton5 = document.getElementById('5');
    boton5.addEventListener('click', function(){
        display.value += '5';
    })
    boton6 = document.getElementById('6');
    boton6.addEventListener('click', function(){
        display.value += '6';
    })
    boton7 = document.getElementById('7');
    boton7.addEventListener('click', function(){
        display.value += '7';
    })
    boton8 = document.getElementById('8');
    boton8.addEventListener('click', function(){
        display.value += '8';
    })
    boton9 = document.getElementById('9');
    boton9.addEventListener('click', function(){
        display.value += '9';
    })
    boton0 = document.getElementById('0');
    boton0.addEventListener('click', function(){
        display.value += '0';
    })
    botonComa = document.getElementById('coma');
    botonComa.addEventListener('click', function(){
        display.value += ',';
    })

