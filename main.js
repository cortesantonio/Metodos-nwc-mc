const generar_tabla = () => {
  // Obtenemos los valores ingresados desde el modal.
  var fabricas = parseInt(document.getElementById('xfabrica').value);
  var bodegas = parseInt(document.getElementById('ybodega').value);

  const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  // Validamos que estos valores esten dentro de los parametros definidos.
  if (fabricas < 2 || fabricas > 8 || bodegas < 2 || bodegas > 8) {
    alert('Los valores ingresados no estan dentro de los parametros.');
    location.reload()
  } else {
    //obtenemos y limpiamos la tabla.
    var tabla = document.getElementById('tabla');
    tabla.innerHTML = ''
    // creamos el cuerpo de la tabla con su hilera principal.
    var cuerpo = document.createElement('tbody');
    var hileraFabricas = document.createElement('tr');
    for (let i = 0; i < fabricas; i++) {
      if (i == 0) {
        var th_hilera = document.createElement('th');
        th_hilera.innerHTML = 'Fabrica ' + abc[i];
        th_hilera.colSpan = '2';
        hileraFabricas.appendChild(th_hilera)
      } else {
        var th_hilera = document.createElement('th');
        th_hilera.innerHTML = 'Fabrica ' + abc[i];
        hileraFabricas.appendChild(th_hilera)
      }
    } cuerpo.appendChild(hileraFabricas);
    //creamos las hileras de bodegas.

    for (let z = 0; z < bodegas; z++) {
      var hilerabodega = document.createElement('tr');
      for (let x = 0; x <= fabricas +1; x++) {


        if (x == 0) {
          var thHilera = document.createElement('th');
          thHilera.innerHTML = 'Bodega ' + (z + 1);
          hilerabodega.appendChild(thHilera);
        }

        else {
          if (x == (fabricas + 1)) {
            var thHilera = document.createElement('td');
            thHilera.innerHTML = `z - ${z}. x- ${x}  `;
            thHilera.className += 'recuadros'
            hilerabodega.appendChild(thHilera);
          } else {
            var thHilera = document.createElement('td');
            thHilera.innerHTML = `<input placeholder="$" min=0 value="${z}" type="number"> <input placeholder="C" value=${x-1} min=0 type="number">`;
            thHilera.className += 'recuadros'
            hilerabodega.appendChild(thHilera);
          }
        }


      }
      cuerpo.appendChild(hilerabodega);
    };

    var hileraULT = document.createElement('tr');
    hileraULT.className+= 'ultimaHilera'
    for (let i = 0; i < fabricas; i++) {
      if (i == 0) {
        var th_hilera = document.createElement('th');
        th_hilera.innerHTML = `${i}`;
        th_hilera.colSpan = '2';
        hileraULT.appendChild(th_hilera)
      } else {
        var th_hilera = document.createElement('th');
        th_hilera.innerHTML = `${i}`;

        hileraULT.appendChild(th_hilera)
      }
    } cuerpo.appendChild(hileraULT);



    tabla.appendChild(cuerpo);
    const modal = document.getElementById('contenerdormodal');
    modal.style.display = 'none';
  }

};

const tabla_aleatoria = () => {
  var min = 2;
  var max = 8;
  var fabricas = 2;
  var bodegas = 2;
  // Obtenemos los valores ingresados desde el modal
  const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  // Validamos que estos valores esten dentro de los parametros definidos.
  if (fabricas < 2 || fabricas > 8 || bodegas < 2 || bodegas > 8) {
    alert('Los valores ingresados no estan dentro de los parametros.');
    location.reload()
  } else {
    //obtenemos y limpiamos la tabla.
    var tabla = document.getElementById('tabla');
    tabla.innerHTML = ''
    // creamos el cuerpo de la tabla con su hilera principal.
    var cuerpo = document.createElement('tbody');
    var hileraFabricas = document.createElement('tr');
    for (let i = 0; i < fabricas; i++) {
      if (i == 0) {
        var th_hilera = document.createElement('th');
        th_hilera.innerHTML = 'Fabrica ' + abc[i];
        th_hilera.colSpan = '2';
        hileraFabricas.appendChild(th_hilera)
      } else {
        var th_hilera = document.createElement('th');
        th_hilera.innerHTML = 'Fabrica ' + abc[i];
        hileraFabricas.appendChild(th_hilera)
      }
    } cuerpo.appendChild(hileraFabricas);
    //creamos las hileras de bodegas.

    for (let z = 0; z < bodegas; z++) {
      var hilerabodega = document.createElement('tr');
      for (let x = 0; x <= fabricas; x++) {
        if (x == 0) {
          var thHilera = document.createElement('th');
          thHilera.innerHTML = 'Bodega ' + (z + 1);
          hilerabodega.appendChild(thHilera);
        } else {
          var thHilera = document.createElement('td');
          thHilera.innerHTML = '<input placeholder="$" min=0 type="number"> <input placeholder="C" min=0 type="number">';
          thHilera.className += 'recuadros'
          hilerabodega.appendChild(thHilera);
        }
      }
      cuerpo.appendChild(hilerabodega);
    }
    tabla.appendChild(cuerpo);
    const modal = document.getElementById('contenerdormodal');
    modal.style.display = 'none';
  };
};



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