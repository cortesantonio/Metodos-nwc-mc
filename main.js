const generarTabla = () => {
  var bodegas = parseInt(document.getElementById('fil').value);
  var fabricas = parseInt(document.getElementById('col').value);
  var main = document.getElementById("mainTabla");
  var tabla = document.getElementById("tabla")
  if (tabla != null) {
    tabla.parentNode.removeChild(tabla);
  }

  var formu = document.createElement("form");
  formu.setAttribute("id", "tabla");
  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");


  for (var i = 0; i <= bodegas + 1; i++) {
    var filas = document.createElement("tr");
    for (var j = 0; j <= fabricas + 1; j++) {
      var columnas = document.createElement("td");
      if (i == 0 && j > 0 && j <= fabricas) {
        var textoCelda1 = document.createTextNode("Fabrica " + j);
        columnas.appendChild(textoCelda1);

      } else if (j == 0 && i > 0 && i <= bodegas) {
        var textoCelda2 = document.createTextNode("Bodega " + i);
        columnas.appendChild(textoCelda2);

      } else if (j > 0 && i > 0 && (i != bodegas + 1 || j != fabricas + 1)) {
        var textoCelda3 = document.createElement("input");
        textoCelda3.setAttribute("id", "t".concat(i.toString(), "_", j.toString()));
        columnas.appendChild(textoCelda3);

      }
      filas.appendChild(columnas);
    }
    tblBody.appendChild(filas);
  }

  tabla.appendChild(tblBody);
  formu.appendChild(tabla);
  main.appendChild(formu);

  const modal = document.getElementById('contenerdormodal');
  modal.style.display = 'none';

}



const newTable = () => {
  // Manipulacion de modal para editar tabla actual.
  var modal = document.getElementById('contenerdormodal');
  modal.style.display = 'flex';
};

const closeModal = () => {
  //manipulacion de modal para ocultar display.
  var modal = document.getElementById('contenerdormodal');
  modal.style.display = 'none';
};

const equilibrarTabla = () => {
  var bodegas = parseInt(document.getElementById('fil').value); // col -> vertical
  var fabricas = parseInt(document.getElementById('col').value); // fil -> horizontal
  let sumCol = 0;
  let sumFil = 0;
  var col = new Array();
  var fil = new Array();

  for (let x = 1; x <= fabricas; x++) {
    col[x - 1] = parseInt(document.getElementById("t".concat((bodegas + 1), "_", x)).value);
  }
  for (let x = 1; x <= bodegas; x++) {
    fil[x - 1] = parseInt(document.getElementById("t".concat((x), "_", fabricas + 1)).value);
  }

  for (let i = 0; i < col.length; i++) {
    sumCol += col[i];
  }
  for (let i = 0; i < fil.length; i++) {
    sumFil += fil[i];
  }

  if (sumCol == sumFil) {
    alert('tabla equilibrada')
  } else {

    if (sumCol>sumFil)
    {
      //agregar fil
      tabla = document.getElementById('tabla');
      for(let y = 0; y >5; y++){
        console.log(tabla[y])
      }
    }
    else if (sumFil> sumCol){
      //agregar col

    }




  }



}

const resuelve = () => {
  const resultadoGUI = document.getElementById('resultado');
  var tabla = new Array();
  var bodegas = parseInt(document.getElementById('fil').value);
  var fabricas = parseInt(document.getElementById('col').value);

  for (var i = 1; i <= bodegas + 1; i++) {
    var col = new Array();
    for (var j = 1; j <= fabricas + 1; j++) {
      if (i <= bodegas || j <= fabricas) {
        col[j - 1] = parseInt(document.getElementById("t".concat(i.toString(), "_", j.toString())).value);
      }
    }
    tabla[i - 1] = col;
  }

  var resultado = algoritmoEsquina(tabla);
  resultadoGUI.innerHTML = 'Metodo NWC: ' + resultado
}


function algoritmoEsquina(tabla) {
  var res = new Array();
  var res1 = new Array();
  var res2 = new Array();
  var resultado = 0;
  var es = 0;
  var dem = 0;
  var offer = 0;
  var i = 0;
  var j = 0;

  while (tabla.length > 1) {
    es = tabla[i][i];
    dem = tabla[i][tabla[i].length - 1];
    offer = tabla[tabla.length - 1][i];
    if (dem > offer) {
      res1[j] = es;
      res2[j] = offer;
      res[j] = es * offer;
      tabla[i][tabla[i].length - 1] -= offer;
      for (var z = 0; z < tabla.length; z++) {
        tabla[z].splice(0, 1);
      }
    } else if (dem < offer) {
      res1[j] = es;
      res2[j] = dem;
      res[j] = es * dem;
      tabla[tabla.length - 1][i] -= dem;
      tabla.splice(0, 1);
    } else {
      res[j] = es * dem;
      res1[j] = es;
      res2[j] = dem;
      tabla.splice(0, 1);
      for (var z = 0; z < tabla.length; z++) {
        tabla[z].splice(0, 1);
      }
    }
    j++;
  }
  for (var k = 0; k < res.length; k++) {
    resultado += res[k];
  }
  return resultado;
}






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