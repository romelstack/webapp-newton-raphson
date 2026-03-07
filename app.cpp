#include <iostream>
#include <cmath>
#include <functional>
#include <string>
#include <emscripten.h>

#define exprtk_disable_string_capabilities
#define exprtk_disable_rtl_io_file
#define exprtk_disable_rtl_vecops
#include "exprtk.hpp" 

using namespace std;

EMSCRIPTEN_KEEPALIVE
double calcularDerivada(function<double(double)> f, double x) {
    double h = 1e-6;
    return (f(x + h) - f(x - h)) / (2.0 * h);
}

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    double calcularRaizWeb(const char* ecuacion_cstr) {
        string ecuacion(ecuacion_cstr);
        
        double variable_x;
        exprtk::symbol_table<double> tabla_simbolos;
        tabla_simbolos.add_variable("x", variable_x);
        tabla_simbolos.add_constants();

        exprtk::expression<double> expresion;
        expresion.register_symbol_table(tabla_simbolos);

        exprtk::parser<double> analizador;
        if (!analizador.compile(ecuacion, expresion)) {
            return -9999.99;
        }

        function<double(double)> f = [&](double valor_evaluar) {
            variable_x = valor_evaluar; 
            return expresion.value(); 
        };
        
        double a = 0, b = 0.5;
        while (f(a) * f(b) >= 0 && a < 100) {
            a += 0.5;
			b += 0.5;
        }
        
        if (a >= 100) {
            a = 0; b = -0.5;
            while (f(a) * f(b) >= 0 && a > -100) {
                a -= 0.5;
				b -= 0.5;
            }
        }
        
        double x_inicial = a;
        double x_siguiente = 0;
        double condicion = 0;
        
        do {
            double imgDerivada = calcularDerivada(f, x_inicial);
            if (abs(imgDerivada) < 1e-10) break;
            
            double imgFuncion = f(x_inicial);
            x_siguiente = x_inicial - (imgFuncion / imgDerivada);
            
            condicion = abs(x_siguiente - x_inicial);
            x_inicial = x_siguiente;
        } while(condicion > 1e-7); 
        
        return x_siguiente;
    }
}
