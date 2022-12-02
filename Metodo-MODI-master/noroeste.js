function limpiar() {
	var padre = document.getElementById( "resultado" );
	padre.innerHTML = "";
}

function limpiarTodo()
{
	document.getElementById('capturas').innerHTML = "";
	document.getElementById('resultado').innerHTML = "";
}

function crearMatriz()
{
	limpiarTodo();
	var nFil = parseFloat(document.getElementById('fila').value);
	var nCol = parseFloat(document.getElementById('columna').value);
	var tabary = new Array();

	for(var i = 0; i <= nFil; i++)
	{
		tabary[i] = new Array(nCol);
		for(var j = 0; j <= nCol; j++)
			tabary[i][j] = "<input type=text value=3 id=x" + i + j + " size=3>";
	}

	var oTable = document.createElement("TABLE");
	var oTHead = document.createElement("THEAD");
	var oTBody = document.createElement("TBODY");
	var oRow, oCell;
  	oTable.appendChild(oTHead);
  	oTable.appendChild(oTBody);
 	oTable.setAttribute("class","bg5");
 	oRow = document.createElement("TR");
	oTHead.appendChild(oRow);

	for (var i = 0; i <= nCol+1; i++)
	{
	    oCell = document.createElement("TH");
		if(i == 0)
		    oCell.innerHTML = " ";
		else if(i == nCol + 1)
		    oCell.innerHTML = "Oferta";
		else
		    oCell.innerHTML = "D" + i;
		oRow.appendChild(oCell);
  	}

	for (var i = 0; i < tabary.length; i++)
	{
	    oRow = document.createElement("TR");
	    oCell = document.createElement("TH");

	    if(i == tabary.length - 1)
		    oCell.innerHTML = "demanda";
	    else
		    oCell.innerHTML = "S" + (i+1);
	    oRow.appendChild(oCell);
	    oTBody.appendChild(oRow);

	    for (var j = 0; j < tabary[i].length; j++)
	    {
		    oCell = document.createElement("TD");
			if((i == tabary.length-1) && (j == tabary[i].length-1))
			      oCell.innerHTML = "";
			else
			      oCell.innerHTML = tabary[i][j];
		    oRow.appendChild(oCell);
	    }
	}

	oRow = document.createElement("TR");
    oTBody.appendChild(oRow);
	oCell = document.createElement("TD");
	oCell.setAttribute("colspan",(nCol+2));
	oCell.innerHTML = "<br> <input type=button value='Calcular' onclick='calcular()'>";
	oCell.innerHTML += "<input type=button value='Limpiar' onclick='limpiarTodo()'></center>";
    oRow.appendChild(oCell);
	var frtb = document.getElementById("capturas");
	frtb.appendChild(oTable);
}

function leerDemanda()
{
	var demanda = new Array();
	var columnas = document.getElementById( "columna" ).value;
	for( var i = 0; i < columnas; ++i )
	{
		var key = "demanda" + i;
		demanda[ i ] = parseInt(document.getElementById( key ).value);
	}

	return demanda;
}

function leerOferta()
{
	var oferta = new Array();
	var fila = document.getElementById( "fila" ).value;
	for( var i = 0; i < fila; ++i )
	{
		var key = "oferta" + i;
		oferta[ i ] = parseInt(document.getElementById( key ).value);
	}
	return oferta;
}

function calcular()
{
	var filas = parseInt(document.getElementById( 'fila').value);
	var columnas = parseInt(document.getElementById( 'columna' ).value);
	var matriz = new Array();
	var oferta = new Array();
	var demanda =  new Array();
	var respaldo;
	var si = 0, di = 0;

	matriz[ 0 ] = [377,329,338,378];
	matriz[ 1 ] = [434,331,422,397];
	matriz[ 2 ] = [ 333,285,389,304 ];
	matriz[ 3 ] = [ 292,264,296,285 ];
	oferta = [ 1, 1, 1, 1 ];
	demanda = [ 1, 1, 1, 1 ];
	filas = 4;
	columnas = 4;

	respaldo = voguel( matriz, demanda, oferta, filas, columnas );

	//dibujarOptima( matriz, respaldo, filas, columnas );
	dibujarVoguel( matriz, respaldo, filas, columnas );
	multiplicadores( matriz, respaldo, filas, columnas );

	console.log( "respaldoGlobal --> " + respaldoGlobal );
}

function dibujarVoguel( matriz, respaldo, row, col )
{
	var padre = document.getElementById( "resultado" );
	var tabla = document.createElement( "table" );
	tabla.id = "tabla-voguel";

	for( i = 0; i < row; ++i )
	{
		var fila = document.createElement( "tr" );
		for( j = 0; j < col; ++j )
		{
			var celda = document.createElement( "td" );
			celda.className = "superiores";
			if( respaldo[ i ][ j ] != Infinity )
			{
				var cel = document.createElement( "td" );
				cel.className = "basicas";
				var nodo = document.createTextNode( respaldo[ i ][ j ] + " " );
				cel.appendChild( nodo );
				celda.appendChild( cel );
				var text = document.createTextNode( matriz[ i ][ j ] );
			}
			else
				var text = document.createTextNode( matriz[ i ][ j ] );
			celda.appendChild( text );
			fila.appendChild( celda );
		}
		tabla.appendChild( fila );
	}
	padre.appendChild( tabla );
}

function menor( matriz, row, col, inf, indexH, indexV )
{
	var menor = 1000000;
	var indice, indice2;
	var valor;

	if( inf[ 2 ] == 1 )
	{
		for( var i = 0; i < row; ++i )
			if( matriz[ i ][ inf[ 1 ] ] < menor & indexV[ i ] == -1 )
			{
				menor = matriz[ i ][ inf[ 1 ] ];
				indice = i;
				indice2 = inf[ 1 ];
			}
	}
	else {
		for( var i = 0; i < col; ++i )
			if( matriz[ inf[ 1 ] ][ i ] < menor & indexH[ i ] == -1 )
			{
				menor = matriz[ inf[ 1 ] ][ i ];
				indice = inf[ 1 ];
				indice2 = i;
			}
	}
	return valor=[ menor, indice, indice2 ];
}

function mayor( vector, col )
{
	var mayor = -100000;

	for( var i = 0; i < col; ++i )
		if( vector[ i ] > mayor  )
			mayor = vector[ i ];

	return mayor;
}

function higher( Horizontal, Vertical, row, col )
{
	var mayor = -100000;
	var indice;
	var orientacion;
	var inf;

	for( var i = 0; i < row; ++i )
		if( mayor < Vertical[ i ] )
		{
			mayor = Vertical[ i ];
			orientacion = 0;
			indice = i;
		}

	for( var i = 0; i < col; ++i )
		if( mayor < Horizontal[ i ]  )
		{
			mayor = Horizontal[ i ];
			orientacion = 1;
			indice = i;
		}


	return inf = [ mayor, indice, orientacion ];
}

function comprobar( A, B, row, col )
{
	for( var i = 0; i < row; ++i )
		if( A[ i ] < 0 )
			return 0;

	for( var i = 0; i < col; ++i )
		if( B[ i ] < 0 )
			return 0;

	return 1;
}

function comprobar2( A, B, row, col )
{
	for( var i = 0; i < row; ++i )
		if( A[ i ] != 0 )
			return 0;

	for( var i = 0; i < col; ++i )
		if( B[ i ] != 0 )
			return 0;

	return 1;
}

function voguel( matriz, demanda, oferta,row, col )
{
	var respaldo = new Array();
	var men;
	var limit = row + col - 1;
	var horizontal, indexH;
	var vertival, indexV;
	var end = 1;
	var inf;
	var seguir = 0;
	var seguir2 = 0;

	for (var i = 0; i < row; i++)
	{
		respaldo[i]=new Array();
		for (var j=0; j < col;j++)
			respaldo[ i ][ j ] = matriz[i][j];
	}
								// inf = [mayor, indice, orientacion ]
	 							// Indice de la fila o columna donde esta el menor
								// Horizontal o vertival, donde se encuentra el menor
								// 0 -> vertical, 1 -> Horizontal
	indexV = inicializar( row );
	indexH = inicializar( col );

	//for( var i = 0; i < limit; ++i )
	for( var i = 0; i < limit & seguir == 0 & seguir2 == 0; ++i )
	{
	/*	console.log( "--------------------------------------"  );
		console.log( "iteracion: " + i );
		console.log( "indexH -> " + indexH );
		console.log( "indexV -> " + indexV );
		console.log( "Matriz -> " + matriz );
		console.log( "Respaldo -> " + respaldo );
*/
		horizontal = difHorizontal( matriz, row, col, indexH, indexV );
		vertical = difVertical( matriz, row, col, indexV, indexH );
	//	console.log( "Horizontal -> " + horizontal );
	//	console.log( "vertical -> " + vertical );

		inf = higher( horizontal, vertical, row, col );
		//console.log( " Inf --> " + inf );
		men = menor( matriz, row, col, inf, indexH, indexV );
		//console.log( " Menor --> " + men );

		if (true) {
			if( demanda[ men[ 2 ] ] > oferta[ men[ 1 ] ] )
			{
				indexV[ men[ 1 ] ] = men[ 1 ];
				respaldo[ men[ 1 ] ][ men[ 2 ] ] = oferta[ men[ 1 ] ];
				demanda[ men[ 2 ] ] = demanda[ men[ 2 ] ] - oferta[ men[ 1 ] ];
				oferta[ men[ 1 ] ] = 0;

				// Si es horizontal, entonces en la vertical se tapan los demas
				for( var j = 0; j < col; ++j )
					if( j != men[ 2 ] &  indexH[ j ] == -1 )
						respaldo[ men[ 1 ] ][ j ] = Infinity;
			}
			else if( demanda[ men[ 2 ] ] < oferta[ men[ 1 ] ] )
			{
				indexH[ men[ 2 ] ] = men[ 2 ];
				respaldo[ men[ 1 ] ][ men[ 2 ] ] = demanda[ men[ 2 ] ];
				oferta[ men[ 1 ] ] = oferta[ men[ 1 ] ] - demanda[ men[ 2 ] ];
				demanda[ men[ 2 ] ] = 0;

				for( var j = 0; j < row; ++j )
					if( j != men[ 1 ] & indexV[ j ] == -1 )
						respaldo[ j ][ men[ 2 ] ] = Infinity;
			}
			else {

				seguir = comprobar( indexH, indexV, row, col );


				indexV[ men[ 1 ] ] = men[ 1 ];
				indexH[ men[ 2 ] ] = men[ 1 ];

				respaldo[ men[ 1 ] ][ men[ 2 ] ] = oferta[ men[ 1 ] ];
				demanda[ men[ 2 ] ] = 0;
				oferta[ men[ 1 ] ] = 0;

				for( var j = 0; j < row; ++j )
					if( j != men[ 1 ] & indexV[ j ] == -1 )
					{
						respaldo[ j ][ men[ 2 ] ] = Infinity;
					}

				for( var j = 0; j < col; ++j )
					if( j != men[ 2 ] &  indexH[ j ] == -1 )
						respaldo[ men[ 1 ] ][ j ] = Infinity;

				seguir2 = comprobar2( demanda, oferta, row, col );
			}
		}

//		console.log( "difVertical --> " + horizontal  );
//		console.log( "difHorizontal --> " + vertical  );
//		console.log( "respaldo --> " + respaldo  );
//		console.log( "matriz --> " + matriz );
	}
	return respaldo;
}

function dibujarOptima( matriz, respaldo, row, col )
{
	var padre = document.getElementById( "resultado" );
	var tabla = document.createElement( "table" );
	tabla.id = "tabla-voguel";

	for( i = 0; i < row; ++i )
	{
		var fila = document.createElement( "tr" );
		for( j = 0; j < col; ++j )
		{
			var celda = document.createElement( "td" );
			celda.className = "superiores";
			if( respaldo[ i ][ j ] != Infinity )
			{
				var cel = document.createElement( "td" );
				cel.className = "basicas";
				var nodo = document.createTextNode( respaldo[ i ][ j ] + " " );
				cel.appendChild( nodo );
				celda.appendChild( cel );
				var text = document.createTextNode( matriz[ i ][ j ] );
			}
			else
				var text = document.createTextNode( matriz[ i ][ j ] );
			celda.appendChild( text );
			fila.appendChild( celda );
		}
		tabla.appendChild( fila );
	}
	padre.appendChild( tabla );
}


function esquinaNoroeste(matriz, oferta, demanda, row, col)
{
	var ofertaAux = oferta;
	var demandaAux = demanda;
	var resultado = new Array();

	for (var i = 0; i <= row; i++)
	{
		resultado[i]=new Array();
		for (var j=0; j <= col;j++)
			resultado[i][j]=Infinity;
	}

	var i = 0;
	var j = 0;
	var x = 0;
	var ind = new Array();
	var inde = new Array();
	var valores = new Array();
	do
	{
	  	if(ofertaAux[i] == demandaAux[j])
		{
			valores[x] = ofertaAux[i];
			ind[x] = i;
			inde[x] = j;
			ofertaAux[i] = 0;
			demandaAux[j] = 0;
		}
		else if(ofertaAux[i]<demandaAux[j])
		{
			valores[x] = ofertaAux[i];
			ind[x] = i;
			inde[x] = j;
			demandaAux[j] = demandaAux[j] - ofertaAux[i];
			ofertaAux[i] = 0;
		}
		else if(demandaAux[j]<ofertaAux[i])
		{
			valores[x] = demandaAux[j];
			ind[x] = i;
			inde[x] = j;
			ofertaAux[i] = ofertaAux[i] - demandaAux[j];
			demandaAux[j] = 0;
		}

		if(ofertaAux[i] == 0)
			i++;
		if(demandaAux[j] == 0)
			j++;
		x++;

	  } while(j < demanda.length || i < oferta.length);

	  for (var i = 0, j=0; i < valores.length; i++)
	  	resultado[inde[i]][ind[i]]=valores[i];

	return resultado;
}

function difHorizontal( matriz, row, col, indexH, indexV )
{
	var vectorDif = new Array();
	var vector = new Array();

	for( var i = 0; i < col; ++i )
	{
		if( indexH[ i ] == -1 ) {
			for( var j = 0; j < row; ++j )
				vector[ j ] = matriz[j][i];
			vectorDif[ i ] = twoSmallest( vector, row, indexV );
		}
		else {
			vectorDif[ i ] = -1;
		}
	}
	return vectorDif;
}

function difVertical( matriz, row, col, indexV, indexH )
{
	var vectorDif = new Array();

	for( var i = 0; i < row; ++i )
		if( indexV[ i ] == -1 )
			vectorDif[ i ] = twoSmallest( matriz[i], col, indexH );
		else
			vectorDif[ i ] = -1;

	return vectorDif;
}

function twoSmallest( vector, col, index )
{
	var a = b = 1000000;
	var val;

	for( var i = 0; i < col; ++i )
	{
		if( index[ i ] == -1 )
		{
			if( a > vector[ i ] )
			{
				b = a;
				a = vector[ i];
			}
			else if( b > vector[ i ] & vector[ i ]  != a ) {
				b = vector[ i ];
			}
		}
	}

	if( a > b )
		val = a - b;
	else if( a < b )
		val = b - a;

	if( b == 1000000 )
	{
		return a;
	}

	return val;
}

function inicializar( limit )
{
	var temp = new Array();
	for( var i = 0; i < limit; ++i )
	{
		temp[ i ] = -1;
	}

	return temp;
}
