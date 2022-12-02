// En esta funcion nos aseguramos que si nos indiquen cuantos origenes y rutas son.
function validarCantCostDeman(){
    origenes = document.getElementById("origenes").value;
    rutas = document.getElementById("rutas").value;
    if (origenes > 0 && rutas > 0) {
        ingresarDatos();
    } else {
        alert("Sos animal, ¿Como se supone que crearas la tabla si no indicas los origenes y destinos?");
    }
}