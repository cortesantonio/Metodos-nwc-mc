window.eq = false;


const generarTabla = () => {
  var bodegas = parseInt(document.getElementById('fil').value);
  var fabricas = parseInt(document.getElementById('col').value);
  var main = document.getElementById("mainTabla");
  var tabla = document.getElementById("tabla")
  const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  if (tabla != null) {
    tabla.parentNode.removeChild(tabla);
  }
  if (bodegas >= 2 && fabricas >= 2 && bodegas <= 8 && fabricas <= 8) {


    var formu = document.createElement("form");
    formu.setAttribute("id", "tabla");
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    for (var i = 0; i <= bodegas + 1; i++) {
      var filas = document.createElement("tr");
      for (var j = 0; j <= fabricas + 1; j++) {
        var columnas = document.createElement("td");
        if (i == 0 && j > 0 && j <= fabricas) {
          var textoCelda1 = document.createTextNode("Fabrica " + abc[j - 1]);
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
    window.eq = false;

  } else {
    alert('Valores ingresados no estan dentro de los parametros')
    location.reload()
    window.eq = true;

  }

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
  if(!window.eq){
    var bodegas = parseInt(document.getElementById('fil').value);
    var fabricas = parseInt(document.getElementById('col').value);
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
      alert('Problema ya equilibrado');
      window.eq = true;

    } else {
  
      if (sumCol > sumFil) {
        tabla = document.getElementsByTagName("tbody")[0];
        var tr = document.createElement('tr')
  
        for (let x = 0; x <= fabricas + 1; x++) {
          if (x == fabricas + 1) {
            var td = document.createElement("td");
            td.innerHTML = `<input value=${sumCol - sumFil} />`
            tr.appendChild(td)
          } else if (x == 0) {
            var td = document.createElement("td");
            td.innerHTML = ''
            tr.appendChild(td)
          } else {
            var td = document.createElement("td");
            td.innerHTML = '<input value=0 />'
            tr.appendChild(td)
          }
  
        }
        tabla.insertBefore(tr, tabla.children[bodegas + 1])
        window.eq = true;

      }
      else if (sumFil > sumCol) {
  
        fila = document.getElementsByTagName("tr");
  
        for (let x = 1; x < fila.length; x++) {
  
          if (x == fila.length - 1) {
            td = document.createElement('td');
            td.innerHTML = `<input value=${sumFil - sumCol} />`;
            fila[x].insertBefore(td, fila[x].children[fabricas + 1])
          } else {
            td = document.createElement('td');
            td.innerHTML = '<input value=0 />';
            fila[x].insertBefore(td, fila[x].children[fabricas + 1])
          }
        }
        window.eq = true;

      }
  
    }
  }
  
}

const metodoNwc = () => {
  const resultadoGUI = document.getElementById('resultado2');
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

  var resultado = nwc(tabla);
  resultadoGUI.innerHTML = 'Metodo NWC: ' + resultado;
  setTimeout(equilibrarTabla, 50);
}

const nwc = (tabla) =>{
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



