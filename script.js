const contenedorInput = document.querySelector('.contenedor-input');
const botonCalcular = document.querySelector('#boton-calcular');

document.addEventListener('DOMContentLoaded', function(){
    botonCalcular.addEventListener('click', function(){
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

        resultadosFinal.forEach(_resultadoFinal => {
            console.log(_resultadoFinal);
            const resultadoDisplay = document.createElement('H2');
            resultadoDisplay.textContent = _resultadoFinal;
            contenedorInput.appendChild(resultadoDisplay);
        });

//        if(resultado === -9999.99){
//            display.classList.remove('exito');
//            display.classList.add('error');
//            display.textContent = 'Error en la sintaxis de la ecuación.';
//        } else {
//            display.classList.remove('error');
//            display.classList.add('exito');
//            display.textContent = `Resultado: ${resultado.toFixed(5)}`;
//        }

        resultados.delete();
    })
})