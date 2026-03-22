const contenedorResultado = document.querySelector('.contenedor-resultado');
const botonCalcular = document.querySelector('#boton-calcular');
const botonIgual = document.querySelector('#igual');

document.addEventListener('DOMContentLoaded', function(){
    botonCalcular.addEventListener('click', function(){
        calcularResultado();
    });
    botonIgual.addEventListener('click', function(){
        calcularResultado();
    });
})

function calcularResultado(){
    const ecuacion = document.querySelector('#input-ec').value;
    const resultados = Module.calcularRaizWeb(ecuacion);

    let resultadosJS = [];
    for(let i = 0; i < resultados.size(); i++){
        resultadosJS.push(resultados.get(i));
    }

    let resultadosJS_Fixed = [];
    resultadosJS.forEach(resultado => {
        resultadosJS_Fixed.push(resultado.toFixed(5));
    });

    let resultadosFinal = [];
    resultadosJS_Fixed.forEach(_resultadoJS_Fixed => {
        if(!(resultadosFinal.includes(_resultadoJS_Fixed)) && _resultadoJS_Fixed != '-0.00000'){
            resultadosFinal.push(_resultadoJS_Fixed);
        }
    });
    
    let resultadoDisplayAnterior = document.querySelector('.resultado');
    while(resultadoDisplayAnterior){
        resultadoDisplayAnterior.remove();
        resultadoDisplayAnterior = document.querySelector('.resultado');
    }


    if(resultadosFinal[0]  == -9999.99000){
        const errorDisplay = document.createElement('H2');
        errorDisplay.classList.add('error');
        errorDisplay.classList.add('resultado');
        errorDisplay.textContent = 'Error en la sintaxis de la ecuación.';
        contenedorResultado.appendChild(errorDisplay);
    } else if(resultadosFinal[0] == -8888.88000 || resultadosFinal.length === 0){
        const sinRaicesDisplay = document.createElement('H2');
        sinRaicesDisplay.classList.add('error');
        sinRaicesDisplay.classList.add('resultado');
        sinRaicesDisplay.textContent = 'La función no tiene raíces reales en el rango evaluado.';
        contenedorResultado.appendChild(sinRaicesDisplay);
    } else {
        const tituloResultado = document.createElement('H2');
        tituloResultado.classList.add('exito');
        tituloResultado.classList.add('resultado');
        tituloResultado.textContent = 'Raíces encontradas:';
        contenedorResultado.appendChild(tituloResultado);

        resultadosFinal.forEach(_resultadoFinal => {
            const resultadoDisplay = document.createElement('H2');
            resultadoDisplay.classList.add('exito');
            resultadoDisplay.classList.add('resultado');
            resultadoDisplay.textContent = _resultadoFinal;
            contenedorResultado.appendChild(resultadoDisplay);
        });
    }

    resultados.delete();
}