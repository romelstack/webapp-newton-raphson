#define _USE_MATH_DEFINES
#include <cmath>
#include <vector>
#include <iostream>
#include <functional>
#include <emscripten.h>

using namespace std;

extern "C" {
    const double PI = M_PI;

    double funcion(double valorX){
        return ( PI * ( pow( valorX, 3 ) ) ) - 9 * (PI * ( pow( valorX, 2) ) ) + 90;
    }

    double calcularFuncion(function<double(double)> f, double valorX){
        return f(valorX);
    }

    double calcularDerivada(function<double(double)> f, double valorX){
        double h = 1e-6;
        return (f(valorX + h) - f(valorX - h)) / (2.0 * h);
    }

    double* calcularIntervalos() {
        double paso = 0.5;	
            
        double imagen1, imagen2;
        double a = -0.5;
        double b = 0;
        do{
            a += paso;
            b += paso;

            imagen1 = calcularFuncion(funcion, a);
            imagen2 = calcularFuncion(funcion, b);
        } while( !((imagen1 * imagen2) < 0) || a == 100);
            
        double imagen3, imagen4;
        double c = 0.5;
        double d = 0;
        do{
            c -= paso;
            d -= paso;

            imagen3 = calcularFuncion(funcion, c);
            imagen4 = calcularFuncion(funcion, d);
        } while( !((imagen3 * imagen4) < 0) || c == -100);
            
        static double resultados[4];
        resultados[0] = a;
        resultados[1] = b;
        resultados[2] = c;
        resultados[3] = d;

        return resultados;
    }

    double calcularRaicesNewtonRaphson(double x_inicial, function<double(double)> f){
        float condicion, x_siguiente;
        int iteracion = 1;
        do{
            float imagenDerivadaFuncion = calcularDerivada(f, x_inicial);
            if (abs(imagenDerivadaFuncion) < 1e-10) {
                break;
            }
            
            float imagenFuncion = calcularFuncion(f, x_inicial);
            x_siguiente = x_inicial - ( imagenFuncion / imagenDerivadaFuncion);
            condicion = (abs(x_siguiente - x_inicial));
            x_inicial = x_siguiente;

        } while(condicion != 0);

        return x_siguiente;
    }
}