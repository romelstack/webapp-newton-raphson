#include <iostream>
#include <cmath>
#include <functional>
#include <string>
#include <emscripten.h>
#include <emscripten/bind.h>

#define exprtk_disable_string_capabilities
#define exprtk_disable_rtl_io_file
#define exprtk_disable_rtl_vecops
#include "exprtk.hpp" 

using namespace std;
using namespace emscripten;

EMSCRIPTEN_KEEPALIVE
double calcularDerivada(std::function<double(double)> f, double x) {
    double h = 1e-6;
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

EMSCRIPTEN_KEEPALIVE
vector<double> calcularRaizWeb(string ecuacion_cstr) {
    string ecuacion(ecuacion_cstr);
    
    double variable_x;
    exprtk::symbol_table<double> tabla_simbolos;
    tabla_simbolos.add_variable("x", variable_x);
    tabla_simbolos.add_constants();

    exprtk::expression<double> expresion;
    expresion.register_symbol_table(tabla_simbolos);

    exprtk::parser<double> analizador;
    if (!analizador.compile(ecuacion, expresion)) {
        vector<double> resultado;
        resultado.push_back(-9999.99);
        return resultado;
    }

    std::function<double(double)> f = [&](double valor_evaluar) {
        variable_x = valor_evaluar; 
        return expresion.value(); 
    };
    
    vector<double> intercepciones;
    double a = 0, b = 0.5;
    while (a < 100) {
        a += 0.5;
        b += 0.5;
        if(f(a) * f(b) >= 0){
            intercepciones.push_back(a);
        }
    }
    
    double x_inicial = a;
    double x_siguiente = 0;
    double condicion = 0;
    
    vector<double> resultados;
    for(double valor : intercepciones){
        x_inicial = valor;        
        do {
            double imgDerivada = calcularDerivada(f, x_inicial);
            if (abs(imgDerivada) < 1e-10) break;
            
            double imgFuncion = f(x_inicial);
            x_siguiente = x_inicial - (imgFuncion / imgDerivada);
            
            condicion = abs(x_siguiente - x_inicial);
            x_inicial = x_siguiente;
        } while(condicion > 1e-7);
        resultados.push_back(x_siguiente);
    }
    return resultados;
}

EMSCRIPTEN_BINDINGS
(app){
    register_vector<double>("VectorDouble");
    emscripten::function("calcularRaizWeb", &calcularRaizWeb);
}
