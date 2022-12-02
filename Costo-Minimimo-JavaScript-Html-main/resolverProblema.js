function resolverProblema() {
    // Accedemos a las variables globales
    var origenes = window.origenes;
    var rutas = window.rutas;

    // Declaramos todas las variables a usar
    var costos = [];
    var demanda = [];
    var oferta = [];
    var rf = [];
    var cf = [];
    var sum = 0;
    var c2 = 0;
    var c1 = 0;
    var p = 0;
    var q = 0;
    var i = 0;
    var j = 0;

    // Esta variable es para usarla como ID para obtener los valores (costos, demandas, ofertas) y va de 1 en 1
    // Trabajamos los costos como costo1, costo2... Las demandas como demanda1, demanda2... Las ofertas como oferta1, oferta2....
    var idValores = 0;

    // Covertimos el arreglo costos que es 1 dimension a uno de 2 dimenciones
    for (i = 0; i < 5; i++) costos[i] = [];
    // Accedemos a los costos ingresados anteriormente
    for (i = 0; i < origenes; i++) {
        for (j = 0; j < rutas; j++) {
            idValores++;
            costos[i][j] = parseInt(document.getElementById("costo" + idValores).value);
        }
    }
    
    // Hasta este punto ya vale lo que vale origenes * rutas.
    // Por alguna razon afecta a todo el codigo
    // Por esa razon aqui volvemos a inicializar en 0 y asi en todo el codigo.
    idValores = 0;

    // Accedemos a las ofertas ingresadas anteriormente
    for (i = 0; i < origenes; i++) {
        idValores++;
        oferta[i] = parseInt(document.getElementById("oferta" + idValores).value);

    }

    idValores = 0;

    // Accedemos a las demandas ingresadas anteriormente
    for (i = 0; i < rutas; i++) {
        idValores++;
        demanda[i] = parseInt(document.getElementById("demanda" + idValores).value);

    }

        // Inicialozamos en 0 estos arreglos
        for (i = 0; i < origenes; i++) {

            rf[i] = 0;
        }

        for (i = 0; i < rutas; i++) {

            cf[i] = 0;
        }

        //Igualamos estos valores para no tocar a los originales
        var origenes2 = origenes;
        var rutas2 = rutas;

        while (origenes2 > 0 && rutas2 > 0) {

            min = 1000;

            for (i = 0; i < origenes; i++) {

                if (rf[i] != 1) {

                    for (j = 0; j < rutas; j++) {

                        if (cf[j] != 1) {

                            if (min > costos[i][j]) {

                                min = costos[i][j];
                                p = i;
                                q = j;
                            }
                        }
                    }
                }
            }

            if (oferta[p] < demanda[q]) {

                c1 = oferta[p];
            }
            else {

                c1 = demanda[q];
            }

            for (i = 0; i < origenes; i++) {

                if (rf[i] != 1) {

                    for (j = 0; j < rutas; j++) {

                        if (cf[j] != 1) {

                            if (min == costos[i][j]) {

                                if (oferta[i] < demanda[j]) {

                                    c2 = oferta[i];
                                }
                                else {

                                    c2 = demanda[j];
                                }

                                if (c2 > c1) {

                                    c1 = c2;
                                    p = i;
                                    q = j;
                                }
                            }
                        }
                    }
                }
            }
            if (oferta[p] < demanda[q]) {

                sum += costos[p][q] * oferta[p];
                demanda[q] -= oferta[p];
                rf[p] = 1;
                origenes2--;
            }
            else if (oferta[p] > demanda[q]) {

                sum = sum + costos[p][q] * demanda[q];
                oferta[p] -= demanda[q];
                cf[q] = 1;
                rutas2--;
            }
            else if (oferta[p] == demanda[q]) {

                sum = sum + costos[p][q] * oferta[p];
                rf[p] = 1;
                cf[q] = 1;

                origenes2--;
                rutas2--;
            }
        }

        document.write("<br>");
        document.write("<br>");
        document.write("El costo Minimo es: " + sum);
        console.log(sum);

    }
