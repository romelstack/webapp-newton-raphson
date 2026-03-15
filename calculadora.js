const display = document.querySelector('#input-ec');
const botones = document.querySelectorAll('.boton-calculadora');
display.focus();

botones.forEach(boton => {
    boton.addEventListener('mousedown', function(e){
        e.preventDefault();
    })
})

display.addEventListener('blur', function(){
    setTimeout(() => {
        const posicionSeleccion = display.selectionStart;

        const texto = display.value.slice(0, posicionSeleccion + 1);

        pixelesAncho = canva(texto);
        
        display.scrollLeft = pixelesAncho - (display.clientWidth / 2);
    }, 0);
})

botonSeno = document.querySelector('#sin');
botonSeno.addEventListener('click', function(){
    insertarValor('sin(', true);
})
botonCoseno = document.querySelector('#cos');
botonCoseno.addEventListener('click', function(){
    insertarValor('cos(', true);
})
botonTangente = document.querySelector('#tan');
botonTangente.addEventListener('click', function(){
    insertarValor('tan(', true);
})
botonEuler = document.querySelector('#euler');
botonEuler.addEventListener('click', function(){
    insertarValor('exp(', true);
})
botonExponente = document.querySelector('#expo');
botonExponente.addEventListener('click', function(){
    insertarValor('^', false);
})
botonRaiz = document.querySelector('#raiz');
botonRaiz.addEventListener('click', function(){
    insertarValor('sqrt(', true);
})
botonDEL = document.querySelector('#DEL');
botonDEL.addEventListener('click', function(){
    display.focus();
    const ecuacion = display.value;
    const extensionEcuacion = ecuacion.length;
    const posicionSeleccion = display.selectionStart;

    if(posicionSeleccion > 0){
        const mitad1 = ecuacion.slice(0, posicionSeleccion - 1);
        const mitad2 = ecuacion.slice(posicionSeleccion, extensionEcuacion);
        const texto = ecuacion.slice(0, posicionSeleccion);

        let nuevaEcuacion = mitad1;
        nuevaEcuacion += mitad2;
    
        const nuevaSeleccion = mitad1.length;
        
        display.value = nuevaEcuacion;

        pixelesAncho = canva(texto);
        
        display.setSelectionRange(nuevaSeleccion, nuevaSeleccion);
        display.scrollLeft = pixelesAncho - (display.clientWidth / 2);        
    }
})
botonAC = document.querySelector('#AC');
botonAC.addEventListener('click', function(){
    display.value = '';
})
botonMultiplicar = document.querySelector('#multiplicar');
botonMultiplicar.addEventListener('click', function(){
    insertarValor('*', false);
})
botonParentesis = document.querySelector('#parentesis-cerrado');
botonParentesis.addEventListener('click', function(){
    insertarValor(')', false);
})
botonX = document.querySelector('#x');
botonX.addEventListener('click', function(){
    insertarValor('x', false);
})
botonDivir = document.querySelector('#dividir');
botonDivir.addEventListener('click', function(){
    insertarValor('/', false);
})
botonSumar = document.querySelector('#sumar');
botonSumar.addEventListener('click', function(){
    insertarValor('+', false);
})
botonRestar = document.querySelector('#restar');
botonRestar.addEventListener('click', function(){
    insertarValor('-', false);
})

boton1 = document.getElementById('1');
boton1.addEventListener('click', function(){
    insertarValor('1', false);
})
boton2 = document.getElementById('2');
boton2.addEventListener('click', function(){
    insertarValor('2', false);
})
boton3 = document.getElementById('3');
boton3.addEventListener('click', function(){
    insertarValor('3', false);
})
boton4 = document.getElementById('4');
boton4.addEventListener('click', function(){
    insertarValor('4', false);
})
boton5 = document.getElementById('5');
boton5.addEventListener('click', function(){
    insertarValor('5', false);
})
boton6 = document.getElementById('6');
boton6.addEventListener('click', function(){
    insertarValor('6', false);
})
boton7 = document.getElementById('7');
boton7.addEventListener('click', function(){
    insertarValor('7', false);
})
boton8 = document.getElementById('8');
boton8.addEventListener('click', function(){
    insertarValor('8', false);
})
boton9 = document.getElementById('9');
boton9.addEventListener('click', function(){
    insertarValor('9', false);
})
boton0 = document.getElementById('0');
boton0.addEventListener('click', function(){
    insertarValor('0', false);
})
botonComa = document.getElementById('coma');
botonComa.addEventListener('click', function(){
    insertarValor('.', false);
})
botonIzquierda = document.getElementById('izquierda');
botonIzquierda.addEventListener('click', function(){
    moverSeleccion(true);
})
botonDerecha = document.getElementById('derecha');
botonDerecha.addEventListener('click', function(){
    moverSeleccion(false);
})

function insertarValor(valor, parentesis = false){
    display.focus();
    const ecuacion = display.value;
    const extensionEcuacion = ecuacion.length;
    const posicionSeleccion = display.selectionStart;

    const mitad1 = ecuacion.slice(0, posicionSeleccion);
    const mitad2 = ecuacion.slice(posicionSeleccion, extensionEcuacion);

    let nuevaEcuacion = mitad1;
    nuevaEcuacion += valor;
    if(parentesis){
        nuevaSeleccion = nuevaEcuacion.length;
        nuevaEcuacion += ')';
    } else {
        nuevaSeleccion = nuevaEcuacion.length;
    }
    nuevaEcuacion += mitad2;
    
    display.value = nuevaEcuacion;

    pixelesAncho = canva(mitad1);

    display.setSelectionRange(nuevaSeleccion, nuevaSeleccion);
    display.scrollLeft = pixelesAncho - (display.clientWidth / 2);
    display.focus();
}

function moverSeleccion(valorDireccion){
    display.focus();
    const posicionSeleccion = display.selectionStart;
    let texto;

    if(valorDireccion){
        texto = display.value.slice(0, posicionSeleccion);
    } else {
        texto = display.value.slice(0, posicionSeleccion + 1); 
    }

    pixelesAncho = canva(texto);
    
    display.scrollLeft = pixelesAncho - (display.clientWidth / 2);

    if(valorDireccion){
        if(posicionSeleccion != 0){
            display.setSelectionRange(posicionSeleccion - 1, posicionSeleccion - 1);
        }
    } else {
        display.setSelectionRange(posicionSeleccion + 1, posicionSeleccion + 1);
    }
}

function canva(texto){
    const canvas = document.createElement('CANVAS');
    const contexto = canvas.getContext('2d');

    const estilo = window.getComputedStyle(display);
    contexto.font = `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`;

    const pixelesAncho = contexto.measureText(texto).width;
    
    return pixelesAncho;
}