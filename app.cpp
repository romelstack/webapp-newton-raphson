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

    double a = -100, b = -99.5;
    while (a < 0) {
        double fa = f(a), fb = f(b);
        if(std::isfinite(fa) && std::isfinite(fb) && fa * fb < 0){
            intercepciones.push_back(a);
        }
        a += 0.5;
        b += 0.5;
    }

    a = 0; b = 0.5;
    while (a < 100) {
        double fa = f(a), fb = f(b);
        if(std::isfinite(fa) && std::isfinite(fb) && fa * fb < 0){
            intercepciones.push_back(a);
        }
        a += 0.5;
        b += 0.5;
    }
    
    double x_inicial = a;
    double x_siguiente = 0;
    double condicion = 0;
    
    vector<double> resultados;
    for(double valor : intercepciones){
        x_inicial = valor;
        int iteraciones = 0;
        bool valido = true;
        do {
            if (!std::isfinite(x_inicial)) { valido = false; break; }

            double imgDerivada = calcularDerivada(f, x_inicial);
            if (abs(imgDerivada) < 1e-10) break;
            
            double imgFuncion = f(x_inicial);
            if (!std::isfinite(imgFuncion)) { valido = false; break; }

            x_siguiente = x_inicial - (imgFuncion / imgDerivada);

            if (!std::isfinite(x_siguiente)) { valido = false; break; }
            
            condicion = abs(x_siguiente - x_inicial);
            x_inicial = x_siguiente;
            iteraciones++;
        } while(condicion > 1e-7 && iteraciones < 1000);

        if (valido && std::isfinite(x_siguiente) && abs(f(x_siguiente)) < 1e-4) {
            resultados.push_back(x_siguiente);
        }
    }

    if (resultados.empty()) {
        resultados.push_back(-8888.88);
    }
    return resultados;
}

EMSCRIPTEN_BINDINGS
(app){
    register_vector<double>("VectorDouble");
    emscripten::function("calcularRaizWeb", &calcularRaizWeb);
}
