// ==UserScript==
// @name        Mega Build
// @namespace   Zombie
// @version     0.2
// @updateURL   https://github.com/KanonZombie/userscripts/raw/master/MegaBuild.user.js
// @include     https://newautobuild.zoologicnet.com.ar/*
// @require     https://code.jquery.com/jquery-2.2.4.js
// @grant		    GM.xmlHttpRequest
// ==/UserScript==

const _nombreScript = 'Mega Build';
const _linkScript = 'https://github.com/KanonZombie/userscripts/raw/master/MegaBuild.user.js';

Notification.requestPermission().then(function(result) {
	  console.log('Estado permisos de notificaciones: ',result);
});

CheckCambiosProcesos();
setInterval( function() { CheckCambiosProcesos() }, 60000 ) ;

if (  window.location.href.indexOf( "/AutobuildEstado/VerAutobuild/" ) > 0 )
{
  var nroCorrida = window.location.href.match(/\/AutobuildEstado\/VerAutobuild\/([0-9]*)/)[1];

  $('.contGral > h4:nth-child(6)').append( '<div><button id="Memorizar" class="row btn colorcorrida text-white bancodeprueba" onclick="localStorage.setItem(\'MegaBuild_nroCorrida\', ' + nroCorrida + ');">Memorizar</button></div>' );

  $(document).ready(function()
                    {
    									setTimeout(function()
                                 {
                        							$('#MainTBody > tr > td.enproceso').each( function(i, td)
                                                                               {
																																							   //console.log( td );
 																					                                       //td.click();
																																							 } );
                      					 }
                                 , 1000
                                 )
  									}
                    );
}

if (  window.location.href.indexOf( "Home/Index" ) > 0 )
{
  var nroCorrida = localStorage.getItem('MegaBuild_nroCorrida');

  if ( nroCorrida )
  {
	  $('li.ic2:nth-child(2) > a:nth-child(1)').attr("href", "/AutobuildEstado/VerAutobuild/" + nroCorrida);
  }

  $('li.ic2:nth-child(4) > a:nth-child(1)').attr("href", "/Maquina/Index");
}

if (  window.location.href.indexOf( "AutobuildEstado/ActivosBancoPrueba" ) > 0 )
{
  ColorearFilas( "tr.row" );

  var grillaOld = $('#grilla').clone();
  var navOld = $('#cuerpo > nav:nth-child(2)').clone();
  var tituloOld = $('.subtitulo').clone();

  $('#cuerpo > nav:nth-child(2)').remove();

  var userData = $('.user-data')[0].textContent;

  var usuarioLogueado = /Bienvenido, (.+)/g.exec(userData)[1];

  $('.subtitulo h2')[0].textContent = 'Bancos de ' + usuarioLogueado;

  var filas = $("tr.row");

  for ( i=1; i<filas.length; i++ )
  {
    var usuario = filas[i].cells[1].textContent.trim();

    if ( usuario != usuarioLogueado )
    {
      filas[i].remove();
    }
  }

  $("#cuerpo").append( tituloOld );
  $("#cuerpo").append( navOld );
  $("#cuerpo").append( grillaOld );
}

if (  window.location.href.indexOf( "Maquina/Index" ) > 0 )
{
	var filas = $('.tabla-detalles > tbody:nth-child(1) > tr')

  for ( i=1; i<filas.length; i++ )
  {
    var proceso = filas[i].cells[6].textContent.trim();
    if ( proceso !== '' )
    {
      let contenido = filas[i].cells[6].children[1].innerHTML ;
      var idProceso = contenido.match(/\(([0-9]*)\)/)[1];

      var match = contenido.replace(/\(([0-9]*)\)/g, "(<a href='/AutobuildEstado/VerAutobuild/"+idProceso+"'>" + idProceso + "</a>)");

      filas[i].cells[6].children[1].innerHTML = match;
    }
  }

  setInterval( function() { location.reload() }, 30000 ) ;
}

function spawnNotification(theBody,theIcon,theTitle) {

  if (!theTitle)
  {
    theTitle = _nombreScript;
  }

  if (!theIcon)
  {
    theIcon = "https://images.vexels.com/media/users/3/199841/isolated/lists/96a7cac08ad4539e1888d8f5c82b5f48-icono-de-coronavirus-covid19.png";
  }

	if (Notification.permission === "granted") {
			var options = {
      	body: theBody,
      	icon: theIcon
  		}
  		var n = new Notification(theTitle,options);

    	//https://www.thesoundarchive.com/starwars/WilhelmScream.mp3
      var audio = new Audio("https://www.thesoundarchive.com/ringtones/pacman_death.mp3");
      audio.play();
  }
}

function htmlDecode(input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function CheckCambiosProcesos()
{
     $.ajax({
        url: 'https://newautobuild.zoologicnet.com.ar/Maquina/Index',
        method: 'GET',
        success: function (data) {
          var datoTabla = data.match(/<table class="tabla-detalles table table-striped table-hover">[\s\S]*<\/table>/)[0];

            var filas = datoTabla.match( /<tr>([\s\S]*?)<\/tr>/g );

            let MegaBuild_Procesos = new Map();

            for ( i=1; i<filas.length; i++ )
            {
                var celdas = filas[i].match(/<td>[\s\S]*?<\/td>/g);
                var nombrePC = celdas[1].match( /<td>([\s\S]*?)<\/td>/ )[1].trim().toUpperCase();
                var contenidoProcesando = htmlDecode ( celdas[6].match( /<td>([\s\S]*?)<\/td>/ )[1].trim() );

                var procesando = contenidoProcesando.match(/<p[\s\S]*?>([\s\S]*?)\(([0-9]*)\)<\/p>/ );
                if ( procesando )
                {

                var usuarioDelBP;
                $.ajax({
                    url: 'https://newautobuild.zoologicnet.com.ar/AutobuildEstado/VerAutobuild/'+procesando[2],
                    method: 'GET',
                    async: false,
                    success: function (dataBP) {
                        usuarioDelBP = dataBP.match(/<th class="colorcorrida" scope="row">Usuario:<\/th>\W+?<td>(.+?)<\/td>/)[1];
                    }
                });
                var detalleProceso = procesando[1] + " (" + procesando[2] + ") " + usuarioDelBP.trim().toUpperCase() ;

                MegaBuild_Procesos.set( nombrePC, detalleProceso );

                }
          }

            var oldProcesos = new Map(JSON.parse( localStorage.getItem('MegaBuild_Procesos') ));

            if ( oldProcesos )
            {

                for (let [key, value] of MegaBuild_Procesos)
                {
                    var estadoAnterior = oldProcesos.get( key );
                    if ( !estadoAnterior )
                    {
                        spawnNotification(key + ' empezó a ejecutar ' + value);
                    }
                    else
                    {
                        if( estadoAnterior != value)
                        {
                            spawnNotification(key + ' ahora esta ejecutando ' + value);
                        }
                        else
                        {
                            //console.log(key + ' esta haciendo lo mismo:' + value + " y " + estadoAnterior);
                        }
                    }
                }
            }


            localStorage.setItem('MegaBuild_Procesos', JSON.stringify(Array.from(MegaBuild_Procesos.entries())) );

        } // fin callback
  	});
}

function ColorearFilas( selectorCSS )
{
  var filas = $( selectorCSS );
  for ( i=1; i<filas.length; i++ )
  {
    //style="background-color: #7EF584"
    var usuario2 = filas[i].cells[6].firstElementChild.src;
    if ( usuario2.indexOf( 'error.png' ) > 0 )
    {
      $(filas[i]).css("background-color", "#FFa6a6");
    }

    if ( usuario2.indexOf( 'ok.png' ) > 0 )
    {
      $(filas[i]).css("background-color", "#A6FFA6");
    }
  }
}