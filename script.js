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
    console.log(ecuacion);
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
    let resultadoAnterior = '-';
    resultadosJS_Fixed.forEach(_resultadoJS_Fixed => {
        if(resultadoAnterior != _resultadoJS_Fixed){
            resultadosFinal.push(_resultadoJS_Fixed);
            resultadoAnterior = _resultadoJS_Fixed;
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
    } else {
        const tituloResultado = document.createElement('H2');
        tituloResultado.classList.add('exito');
        tituloResultado.classList.add('resultado');
        tituloResultado.textContent = 'Raíces encontradas:';
        contenedorResultado.appendChild(tituloResultado);

        resultadosFinal.forEach(_resultadoFinal => {
            console.log(_resultadoFinal);
            const resultadoDisplay = document.createElement('H2');
            resultadoDisplay.classList.add('exito');
            resultadoDisplay.classList.add('resultado');
            resultadoDisplay.textContent = _resultadoFinal;
            contenedorResultado.appendChild(resultadoDisplay);
        });
    }

    resultados.delete();
}