// ==UserScript==
// @name        Mega Build
// @namespace   Zombie
// @version     0.1b
// @include     https://newautobuild.zoologicnet.com.ar/*
// @require     https://code.jquery.com/jquery-2.2.4.js
// @grant		    GM.xmlHttpRequest
// ==/UserScript==

const _nombreScript = 'Mega Build';

//console.log();
Notification.requestPermission().then(function(result) {
	  console.log('Estado permisos de notificaciones: ',result);
});

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

  let MegaBuild_Procesos = new Map();
  
  for ( i=1; i<filas.length; i++ )
  {
    var proceso = filas[i].cells[6].textContent.trim();
    if ( proceso !== '' )
    {
      let contenido = filas[i].cells[6].children[1].innerHTML ;
      var idProceso = contenido.match(/\(([0-9]*)\)/)[1];

      var match = contenido.replace(/\(([0-9]*)\)/g, "(<a href='/AutobuildEstado/VerAutobuild/"+idProceso+"'>" + idProceso + "</a>)");
      
      filas[i].cells[6].children[1].innerHTML = match;
      
	  	//console.log( filas[i].cells[1].textContent.trim() );
	  	//console.log(match);
      
      var usuarioDelBP;
      $.ajax({
        url: 'https://newautobuild.zoologicnet.com.ar/AutobuildEstado/VerAutobuild/'+idProceso,
        method: 'GET',
        async: false,
        success: function (data) {
          usuarioDelBP = data.match(/<th class="colorcorrida" scope="row">Usuario:<\/th>\W+?<td>(.+?)<\/td>/)[1];
          console.log( usuarioDelBP );
  		 }
    	});
      console.log( usuarioDelBP );
      
      var nombrePC = filas[i].cells[1].textContent.trim().toUpperCase();
      var detalleProceso = contenido + " perteneciente a " + usuarioDelBP.trim().toUpperCase() ;
  
      MegaBuild_Procesos.set( nombrePC, detalleProceso );
      
    }
  }
  
  //.has('bird'); // false
  //.delete('dog');
  //.clear();
  //.size;

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