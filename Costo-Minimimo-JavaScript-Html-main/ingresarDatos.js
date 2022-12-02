
function ingresarDatos() {
    // Creamos las dos variables globales para poder acceder a ellas en cualquier parte del codigo
    window.origenes = document.getElementById("origenes").value;
    window.rutas = document.getElementById("rutas").value;

    // Basicamente esto son los estilos para las celdas, por algna razon no es suficiente con referenciarlos en el html
    document.write("<style> input[type=number], select { width: 10%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; } input[type=submit] { width: 10%; background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; border-radius: 4px; cursor: pointer; } input[type=submit]:hover { background-color: #45a049; } </style>");

    // Creamos la tabla para que ingresen los costos
    document.write("Ingrese Los Costos");
    document.write("<br>");

    // Esta variable la usamos para darle un ID a los datos
    var idValores = 0;

    document.write("<form action='javascript:resolverProblema();'>");
    // Creamos la tabla para que ingresen los costos
    for (var a = 0; a < origenes; a++) {
        for (var b = 0; b < rutas; b++) {
            idValores++;
            document.write("<input type='number' id='costo" + idValores + "' required/>    ");
        }
        document.write("<br>");
    }
    idValores = 0;

    // Creamos la tabla para que ingresen las demandas
    document.write("<br>");
    document.write("Ingrese Las Demandas");
    document.write("<br>");
    for (var a = 0; a < rutas; a++) {
        idValores++;
        document.write("<input type='number' id='demanda" + idValores + "' required/>    ");

    }
    document.write("<br>");
    document.write("<br>");

    idValores = 0;

    // Creamos la tabla para que ingresen las ofertas
    document.write("Ingrese Las Ofertas");
    document.write("<br>");
    for (var b = 0; b < origenes; b++) {
        idValores++;
        document.write("<input type='number' id='oferta" + idValores + "' required/>    ");

    }
    document.write("<br>");
    document.write("<br>");
    document.write("<input type='submit' value='Enviar Datos'>");
    document.write("</form>")

    // document.write("<button type='button' onclick=CostoMinimo.html>Intentar de nuevo</button>");

    document.write("<title>Costo mínimo</title>");
}