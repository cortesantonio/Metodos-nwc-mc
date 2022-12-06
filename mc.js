const metodoMC = () => {
    const resultadoGUI = document.getElementById('resultado');
  
  
    var res = mc();
    resultadoGUI.innerText = 'Metodo Minimo Costo: ' + res;
    setTimeout(equilibrarTabla, 50);
  }

const mc = () => {
    var bodegas = parseInt(document.getElementById('fil').value);
    var fabricas = parseInt(document.getElementById('col').value);

    var costos = [];
    var dem = [];
    var offer = [];
    var rf = [];
    var cf = [];
    var resultado = 0;
    var c2 = 0;
    var c1 = 0;
    var p = 0;
    var q = 0;
    var i = 0;
    var j = 0;

    
    var idValores = 0;
    for (i = 0; i < 5; i++) costos[i] = [];
    for (i = 0; i < bodegas; i++) {
        for (j = 0; j < fabricas; j++) {
            idValores++;
            costos[i][j] = parseInt(document.getElementById("t".concat((i + 1), "_", j + 1)).value)
        }
    }


    idValores = 0;
    for (i = 0; i < bodegas; i++) {
        idValores++;
        offer[i] = parseInt(document.getElementById("t".concat((i + 1), "_", fabricas + 1)).value);

    }


    idValores = 0;
    for (i = 0; i < fabricas; i++) {
        idValores++;
        dem[i] = parseInt(document.getElementById("t".concat((fabricas + 1), "_", i + 1)).value);

    }

    for (i = 0; i < bodegas; i++) {

        rf[i] = 0;

    }

    for (i = 0; i < fabricas; i++) {

        cf[i] = 0;

    }

    while (bodegas > 0 && fabricas > 0) {

        min = 1000;

        for (i = 0; i < bodegas; i++) {

            if (rf[i] != 1) {

                for (j = 0; j < fabricas; j++) {

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

        if (offer[p] < dem[q]) {

            c1 = offer[p];
        }
        else {

            c1 = dem[q];
        }

        for (i = 0; i < bodegas; i++) {

            if (rf[i] != 1) {

                for (j = 0; j < fabricas; j++) {

                    if (cf[j] != 1) {

                        if (min == costos[i][j]) {

                            if (offer[i] < dem[j]) {

                                c2 = offer[i];

                            }
                            else {

                                c2 = dem[j];

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
        if (offer[p] < dem[q]) {

            resultado += costos[p][q] * offer[p];
            dem[q] -= offer[p];
            rf[p] = 1;
            bodegas--;

        }
        else if (offer[p] > dem[q]) {

            resultado = resultado + costos[p][q] * dem[q];
            offer[p] -= dem[q];
            cf[q] = 1;
            fabricas--;

        }
        else if (offer[p] == dem[q]) {

            resultado = resultado + costos[p][q] * offer[p];
            rf[p] = 1;
            cf[q] = 1;

            bodegas--;
            fabricas--;
            
        }
    }
    return resultado;
}
