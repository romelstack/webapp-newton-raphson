const display = document.querySelector('#display');

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    botones();
}

function botones(){
    botonSeno = document.querySelector('#sin');
    botonSeno.addEventListener('click', function(){
        seno();
    })
    botonCoseno = document.querySelector('#cos');
    botonCoseno.addEventListener('click', function(){
        coseno();
    })
    botonTangente = document.querySelector('#tan');
    botonTangente.addEventListener('click', function(){
        tangente();
    })
    botonExponente = document.querySelector('#expo');
    botonExponente.addEventListener('click', function(){
        expo();
    })
    botonRaiz = document.querySelector('#raiz');
    botonRaiz.addEventListener('click', function(){
        raiz();
    })
    botonDEL = document.querySelector('#DEL');
    botonDEL.addEventListener('click', function(){
        DEL();
    })
    botonAC = document.querySelector('#AC');
    botonAC.addEventListener('click', function(){
        AC();
    })
    botonMultiplicar = document.querySelector('#multiplicar');
    botonMultiplicar.addEventListener('click', function(){
        multiplicar();
    })
    botonDivir = document.querySelector('#dividir');
    botonDivir.addEventListener('click', function(){
        dividir();
    })
    botonSumar = document.querySelector('#sumar');
    botonSumar.addEventListener('click', function(){
        sumar();
    })
    botonRestar = document.querySelector('#restar');
    botonRestar.addEventListener('click', function(){
        restar();
    })
    botonAns = document.querySelector('#ANS');
    botonAns.addEventListener('click', function(){
        ans();
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
}

function seno(){
    display.value += 'SEN(';
}
function coseno(){
    display.value += 'COS(';
}
function tangente(){
    display.value += 'TAN(';
}
function expo(){
    display.value += '^';
}
function raiz(){
    display.value += '√(';
}
function DEL(){
    display.value = display.value.slice(0, -1);
}
function AC(){
    display.value = '';
}
function multiplicar(){
    display.value += '.';
}
function dividir(){
    display.value += '/';
}
function sumar(){
    display.value += '+';
}
function restar(){
    display.value += '-';
}
function ans(){
}





//resultado = Module.cwrap(
//    ["coseno"],
//    ["number"],
//    ["number"]
//);