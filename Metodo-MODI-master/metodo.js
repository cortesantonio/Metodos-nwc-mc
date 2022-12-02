// Las posciiones que el usuario introduce
var posicion = new Array();
// Es la posicion que entra en la tabla cuando se hace una iteracion, es x, y
var entraGobal = new Array();
// Es la tabla auxiliar, que tiene los valoses basicas y no basicas
var respaldoGlobal = new Array();
// Es la matriz que guarda las posiciones donde estan las variables basicas o positivas del respaldoGlobal
var posBasicas = new Array();
var teta;

function initBasicas( matriz, row, col ) {
	for( var i = 0; i < row; ++i )
	{
		matriz[ i ] = new Array();
		for( var j = 0; j < col; ++j )
			matriz[ i ][ j ] = -1;
	}
}

function posFilas( x )
{
	return x.rowIndex;
}

function posColumnas( x )
{
	return x.cellIndex;
}

function reiniciar()
{
	var div_pos = document.getElementById( "posiciones-usuario" );

	while( posicion.length != 0 )
		posicion.pop();

	if( div_pos != null )
		div_pos.innerHTML = "<br>";
}

function dibujarOtraTabla( matriz, respaldo, posBasicas, row, col, u, v )
{
	respaldoGlobal = respaldo;
	var padre = document.getElementById( "resultado" );
	var tabla = document.createElement( "table" );
	var botones = document.createElement( "div" );
	var botones = document.createElement( "div" );
	var res = document.createElement( "div" );
	var mayor = -1000000;
	var x, y;
	var pos = new Array();
	botones.id = "botones-div";
	//tabla.id = "tabla-horizontales";
	tabla.id = "tabla-final";
	var div = document.createElement( "div" );
	//div.id = "proceso-iteracion";
	div.id = "div-final";
	padre.appendChild( div );


	var div_pos = document.createElement( "div" );
	padre.appendChild( div_pos );

	res.innerHTML="<br>";
	padre.appendChild( res );

	padre.appendChild( botones );
	div.innerHTML+="<br>";

	div.appendChild( tabla );

	for( i = 0; i < col + 1; ++i )
	{
		var celda = document.createElement( "td" );
		celda.className = "horizontales";
		if( i == 0 )
			var vtext = " ";
		else
			var vtext = "v" + ( i + 1 ) + " = " + v[ i - 1 ];
		var texto = document.createTextNode( vtext );
		celda.appendChild( texto );
		tabla.appendChild( celda );
	}

	for( i = 0; i < row; ++i )
	{
		var fila = document.createElement( "tr" );
		fila.id = "fila-" + i;
		fila.setAttribute("onclick", "posFilas( this );");
		for( j = 0; j < col + 1; ++j )
		{
			if( j == 0 )
			{
				var celda = document.createElement( "td" );
				var vtext = "U" + i + " = " + u[ i ];
				var nodo = document.createTextNode( vtext );
				celda.id = "celdas";
				celda.appendChild( nodo );
				fila.appendChild( celda );
			}
			else {
				var celda = document.createElement( "td" );
				celda.id = "celda-" + i + "-" + ( j - 1 );
				celda.className = "superiores";
				if( respaldo[ i ][ j - 1 ] != Infinity  )
				{
					if( posBasicas[ i ][ j - 1 ] != -1 )
					{
						celda.setAttribute("onclick", "posColumnas( this );");
						celda.setAttribute( "onclick", "agregarPosicion( this )" );
					}
					var cel = document.createElement( "td" );
					cel.id = "cel-" + i + "-" + ( j - 1 );
					if( posBasicas[ i ][ j - 1 ] == -1 )
						cel.className = "basicas-no";
					else
						cel.className = "basicas";
					if( respaldo[ i ][ j - 1 ] > 0 & posBasicas[ i ][ j - 1 ] == -1 )
					{
						if( respaldo[ i ][ j - 1 ] > mayor )
						{
							mayor = respaldo[ i ][ j - 1 ];
							x = i;
							y = j - 1;
							cel.className = "var-entra";
						}
					}
					var nodo = document.createTextNode( respaldo[ i ][ j - 1 ] + " " );
					cel.appendChild( nodo );
					celda.appendChild( cel );
					var text = document.createTextNode( matriz[ i ][ j - 1 ] );
				}
				else
					var text = document.createTextNode( matriz[ i ][ j - 1 ] );
				celda.appendChild( text );
				fila.appendChild( celda );
			}

		}
		tabla.appendChild( fila );
	}
	if( x >= 0 & y >= 0 )
	{
		div_pos.innerHTML = "<br>";
		div_pos.id = "posiciones-usuario";
		//var text  = document.createTextNode( "Texto" );
	//	div_pos.appendChild( text );

		div.appendChild( tabla );
		botones.innerHTML = "<br>";
		var boton = document.createElement( "button" );
		boton.type = "button";
		boton.id = "btn-iniciar";
		boton.className = "btn btn-success";
		boton.innerHTML = "Reiniciar";
		boton.setAttribute( "onclick", "reiniciar();" );
		botones.appendChild( boton );

		botones.innerHTML += " ";

		var boton2 = document.createElement( "button" );
		boton2.type = "button";
		boton2.id = "btn-continuar";
		boton2.className = "btn btn-success";
		boton2.innerHTML = "Continuar";
		boton2.setAttribute( "onclick", "continuar();" );
		botones.appendChild( boton2 );

		return pos = [ x, y ];
	}

	console.log( "respaldoGlobal -> " + respaldoGlobal );
	console.log( "matriz -> " + matriz  );
	var total = 0;

	for( var i= 0; i < row; ++i )
		for( var j = 0; j < col; ++j )
		{
			if( respaldoGlobal[ i ][ j ] != Infinity & respaldoGlobal[ i ][ j ] > 0 )
				total += respaldoGlobal[ i ][ j ] * matriz[ i ][ j ];
		}

	console.log( "costoMinimo = " + total );
	res.id = "costominimo";

	var txt = document.createTextNode( "Costo-Minimo = " + total );
	res.appendChild( txt );

	var boton3 = document.createElement( "button" );
	boton3.type = "button";
	boton3.id = "btn-continuar";
	boton3.className = "btn btn-success";
	boton3.innerHTML = "Limpiar";
	boton3.setAttribute( "onclick", "limpiar();" );
	botones.appendChild( boton3 );

	return;
}

function agregarPosicion( x ) {
	var variable = document.getElementById( "posiciones-usuario" );
	if( posicion.length == 0 )
	{
		var key = "( "+ entraGobal[ 0 ] + ", "+ entraGobal[ 1 ] + " ) - ";
		var txt = document.createTextNode( key );
		variable.appendChild( txt );
	}

	var x = [ posFilas( x.parentNode ), posColumnas( x ) - 1 ];
	posicion.push( x );
	var key = "( "+ x[ 0 ] + ", "+ x[ 1 ] + " ) - ";
	var txt = document.createTextNode( key );
	variable.appendChild( txt );

}

function continuar()
{
//	console.log( "Respaldo --> " + respaldoGlobal );
// 	console.log( "Posiciones --> " + posicion );

	teta = Infinity;
	var matriz;
	var x = entraGobal[ 0 ];
	var y = entraGobal[ 1 ];

//	console.log( entraGobal );
	var signo = "+";

	for( i = 0; i < posicion.length; ++i )
	{
		if( x == posicion[ i ][ 0 ] || y == posicion[ i ][ 1 ] )
		{
			if( signo == "+" )
				signo = "-";
			else
				signo = "+";

			x = posicion[ i ][ 0 ];
			y = posicion[ i ][ 1 ];
		}
		else {
			alert( "Operacion incorrecta. Intenta otra vez" );
			reiniciar();
		}
	}
	if( signo == "-" & ( x == entraGobal[ 0 ] || y == entraGobal[ 1 ] ) )
	{
		for( var i = 0; i < posicion.length; i += 2 )
			if( respaldoGlobal[ posicion[ i ][ 0 ] ][ posicion[ i ][ 1 ] ] < teta )
				teta = respaldoGlobal[ posicion[ i ][ 0 ] ][ posicion[ i ][ 1 ] ];

		respaldoGlobal[ entraGobal[ 0 ] ][ entraGobal[ 1 ]  ] = teta;
		for( var i = 0; i < posicion.length; ++i )
		{
			var val = respaldoGlobal[ posicion[ i ][ 0 ] ][ posicion[ i ][ 1 ] ];
			if( i % 2 == 0 )
			{
				respaldoGlobal[ posicion[ i ][ 0 ] ][ posicion[ i ][ 1 ] ] = val - teta;
			}
			else
				respaldoGlobal[ posicion[ i ][ 0 ] ][ posicion[ i ][ 1 ] ] = val + teta;
		}

//		console.log( "Teta = " + teta );
//		console.log( "respaldoGlobal --> " + respaldoGlobal );

/*		var temp = new Array();
		temp[ 0 ] = [61, 72, 45, 55, 66];
		temp[ 1 ] = [69, 78, 60, 49, 56];
		temp[ 2 ] = [59, 66, 63, 61, 47];
*/
//		matriz = leerTabla();

		var matriz = new Array();

	matriz[ 0 ] = [ 377,329,338,378 ];
	matriz[ 1 ] = [ 434,331,422,397 ];
	matriz[ 2 ] = [ 333,285,389,304 ];
	matriz[ 3 ] = [ 292,264,296,285 ];
	oferta = [ 1, 1, 1, 1 ];
	demanda = [ 1, 1, 1, 1 ];

		// Hasta aqui las operaciones han sido correctas
		var v = new Array();
		var u = new Array();
		var pos = new Array();

	//	console.log( "Entrada --> " + entraGobal );
		var filas = 4;
		var columnas = 4;

		initBasicas( posBasicas, filas, columnas );
//		console.log( "-------------------------------------------" );

		for( var i = 0; i < filas; ++i )
			for( var j = 0; j < columnas; ++j )
			{
				if( respaldoGlobal[ i ][ j ] <= 0 )
					respaldoGlobal[ i ][ j ] = Infinity;
			}

	//	console.log( "respaldoGloabl Antes --> " + respaldoGlobal );
		calcularBasicas( matriz, respaldoGlobal, filas, columnas, v, u, posBasicas );
		entraGobal = dibujarOtraTabla( matriz, respaldoGlobal, posBasicas, filas, columnas, u, v );

		var p = document.getElementById( "posiciones-usuario" );
		p.parentNode.removeChild( p );
		reiniciar();
	//	console.log( "-------------------------------------------" );
	//	console.log( "Entrada --> " + entraGobal );
	//	console.log( "respaldoGloabl --> " + respaldoGlobal );
//		console.log( "matriz --> " + temp );
	//	console.log( "posBasicas --> "+ posBasicas );

	//	console.log( "V --> " + v );
	//	console.log( "U --> "+ u );
	//	console.log( "Teta = " + teta );

	}
	else {
		alert( "Operacion incorrecta. Intenta otra vez" );
		reiniciar();
	}
}


function multiplicadores( matriz, respaldo, row, col )
{
	// Vector v para guardar valores horizontales,
	// u para vectores vertivales
	respaldoGlobal = respaldo;
//	console.log( "respaldoGloabl en multiplicadores --> " + respaldoGlobal );
	var v = new Array();
	var u = new Array();
	//var posBasicas = new Array();
	var pos = new Array();

	initBasicas( posBasicas, row, col );
	calcularBasicas( matriz, respaldo, row, col, v, u );
	entraGobal = dibujarOtraTabla( matriz, respaldo, posBasicas, row, col, u, v );
}

function init( mat, tam )
{
	for( var i = 0; i < tam; ++i )
		mat[ i ] = Infinity;
}

function calcularBasicas( matriz, respaldo, row, col, v, u )
{
	init( v, col );
	init( u, row );
	v[ 0 ] = 0;

	for( var limit = 0; limit < 2 ; ++limit )
	{
		for( var i = 0; i < row; ++i )
		{
			for( var j = 0; j < col; ++j )
			{
				if( respaldo[ i ][ j ] != Infinity  )
				{
					posBasicas[ i ][ j ] = 1;
					if( u[ i ] == Infinity & v[ j ] != Infinity )
						u[ i ] = matriz[ i ][ j ] - v[ j ];
					else if( u[ i ] != Infinity & v[ j ] == Infinity )
					{
						//console.log( "V -> " + v[ j ] + " = " +  matriz[ i ][ j ] +" - " +  u[ i ] );
						v[ j ] = matriz[ i ][ j ] - u[ i ];
					}
				}
			}
		}
	}
	for( var i = 0; i < row; ++i )
	{
		for( var j = 0; j < col; ++j )
		{
			if( respaldo[ i ][ j ] == Infinity )
			{
			//	console.log("Operaciones: " + u[ i ] + " + " + v[ j ] + " - " + matriz[ i ][ j ] );
				respaldo[ i ][ j ] = u[ i ] + v[ j ] - matriz[ i ][ j ];

			}

		}
	}
	//console.log( "PosBasicas en calcularBasicas --> " + posBasicas );
}
