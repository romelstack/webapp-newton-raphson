const display = document.querySelector('#resultado');
const botonCalcular = document.querySelector('#boton-calcular');

document.addEventListener('DOMContentLoaded', function(){
    botonCalcular.addEventListener('click', function(){
        const ecuacion = document.querySelector('#input-ec').value;
        console.log(ecuacion);
        resultado = Module.ccall(
            'calcularRaizWeb',
            'number',
            ['string'],
            [ecuacion]
        );

        if(resultado === -9999.99){
            display.classList.remove('exito');
            display.classList.add('error');
            display.textContent = 'Error en la sintaxis de la ecuación.';
        } else {
            display.classList.remove('error');
            display.classList.add('exito');
            display.textContent = `Resultado: ${resultado.toFixed(5)}`;

        }
        console.log(resultado);
    })
})