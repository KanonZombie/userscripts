// ==UserScript==
// @name        Ebay en pesos
// @namespace   Zombie
// @description Ebay en pesos
// @include     https://www.ebay.com/itm/*
// @require     https://raw.githubusercontent.com/KanonZombie/userscripts/master/funciones.js
// @require     https://code.jquery.com/jquery-2.2.4.js
// @version     1.03
// @grant				GM.xmlHttpRequest
// ==/UserScript==

var linkScript = 'https://raw.githubusercontent.com/KanonZombie/userscripts/master/ebay_pesos.user.js';

GM.xmlHttpRequest({
  method: "GET",
  url: linkScript,
  onload: function(response)
  {
     var ultimaVersion = parseFloat( /\/\/ @version     (\d{0,9}\.\d{0,9})/.exec( response.responseText)[1] )
     if (ultimaVersion > 1.03)
     {
		     console.log( "Esta disponible una nueva version del script (" + ultimaVersion +")");
				 $('#gh-eb').append('<li id="gh-cart22" class="gh-eb-li rt"><a href="'+linkScript+'">update: '+ultimaVersion+'</a></li>')
       
     }
  }
}
);


function Configurar()
{
	var keyGuardada = localStorage.getItem('apiKey');
  var apiKey = prompt('ApiKey openexchangerates:', keyGuardada);
  if (apiKey)
  {
    localStorage.setItem('apiKey', apiKey);
  }
}

exportFunction(Configurar, unsafeWindow, {defineAs:'Configurar'});

function OverrideShipping()
{
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_envio';
  var shippingGuardado = localStorage.getItem(clave);
  var shipping = prompt('Shipping guardado:', shippingGuardado);
  if (shipping)
  {
  	localStorage.setItem(clave, shipping);
  }
  //location.reload(); 
}

exportFunction(OverrideShipping, unsafeWindow, {defineAs:'OverrideShipping'});

function OverridePrecio()
{
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_precio';
  var shippingGuardado = localStorage.getItem(clave);
  var shipping = prompt('Precio guardado:', shippingGuardado);
  if (shipping)
  {
  	localStorage.setItem(clave, shipping);
  }
  //location.reload(); 
}

exportFunction(OverridePrecio, unsafeWindow, {defineAs:'OverridePrecio'});

function QuitarShipping()
{
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_envio';
	localStorage.removeItem(clave);
  //location.reload(); 
}

exportFunction(QuitarShipping, unsafeWindow, {defineAs:'QuitarShipping'});

function QuitarPrecio()
{
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_precio';
	localStorage.removeItem(clave);
  //location.reload(); 
}

exportFunction(QuitarPrecio, unsafeWindow, {defineAs:'QuitarPrecio'});

function AgregarNota()
{
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_nota';
  var shippingGuardado = localStorage.getItem(clave);
  var shipping = prompt('Nota:', shippingGuardado);
  if ( shipping )
  {
    localStorage.setItem(clave, shipping);
  }
}

exportFunction(AgregarNota, unsafeWindow, {defineAs:'AgregarNota'});

//unsafeWindow.AgregarNota = AgregarNota;
//unsafeWindow.QuitarPrecio = QuitarPrecio;
//unsafeWindow.QuitarShipping = QuitarShipping;
//unsafeWindow.OverridePrecio = OverridePrecio;
//unsafeWindow.OverrideShipping = OverrideShipping;
//unsafeWindow.Configurar = Configurar;

$('#gh-eb').append('<li id="gh-cart22" class="gh-eb-li rt"><a href="javascript:void(0)" onclick="window.Configurar()">Config</a></li>')

var htmlARS = '<div class="notranslate u-cb convPrice vi-binConvPrc padT10 "><table width="100%">';
//var htmlARS = '<div class="si-cnt si-cnt-eu vi-grBr vi-padn0 c-std"><table width="100%" class="si-inner">';
htmlARS += '<tr><td colspan=3>Precios ARS - dolar a  $<span id="zombie_cotiz">0</span></td></tr>';
htmlARS += '<tr><td>Item:</td><td align="right"><div id="zombie_precio">0</div></td><td><a href="javascript:void(0)" onclick="window.OverridePrecio()">➕</a> <a href="javascript:void(0)" onclick="window.QuitarPrecio()">❌</a></td></tr>';
htmlARS += '<tr><td>Envío:</td><td align="right"><div id="zombie_envio">0</div></td><td><a href="javascript:void(0)" onclick="window.OverrideShipping()">➕</a> <a href="javascript:void(0)" onclick="window.QuitarShipping()">❌</a></td></tr>';
htmlARS += '<tr><td>Impuesto:</td><td align="right"><div id="zombie_aduana">0</div></td><td></td></tr>';
htmlARS += '<tr><td>Total:</td><td align="right"><div id="zombie_total">0</div></td><td></td></tr>';
//htmlARS += '<tr><td>Total sin shipping:</td><td align="right"><div id="zombie_totalNoShip">0</div></td><td></td></tr>';
htmlARS += '</table></div>';
//htmlARS += '<div class="mp-prc-red" style="font-size: 75%"><a href="javascript:void(0)" onclick="window.OverrideShipping()">+</a> - <a href="javascript:void(0)" onclick="window.QuitarShipping()">Eliminar</a></div>';
htmlARS += '<div id="zombie_nota" style="font-size: 75%; font-style: italic;"></div>';
htmlARS += '<div class="mp-prc-red" style="font-size: 75%"><a href="javascript:void(0)" onclick="window.AgregarNota()">Agregar Nota</a></div>';
htmlARS += '<div id="zombie_mensajeShipping" class="mp-prc-red" style="font-size: 75%"></div>';

if ( $('#bb_bdp').length>0 )
{
  $('#bb_bdp').append( htmlARS );
}
else
{
  if ( $('#vi-mskumap-none').length>0 )
  {
    $('#vi-mskumap-none').append( htmlARS );
  }
  else
  {
    $('.vi-price').append( htmlARS );
  }
}

//$('#scandal100562').before(htmlARS)

setInterval(AplicarPrecio, 100);

var htmlBuscaValue = '<div class="si-cnt si-cnt-eu vi-grBr vi-padn0 c-std"><table width="100%" class="si-inner">';
htmlBuscaValue += '<tr><td>htmlBuscaValue</td></tr>';
htmlBuscaValue += '<tr><td> <input id="target" type="text" value="caca"> </td></tr>';
htmlBuscaValue += '<tr><td><div id="resultadoBusqueda">resultados...</div></tr>';
htmlBuscaValue += '</table></div>';

$('#scandal100562').before(htmlBuscaValue)

var timer = null;

$( "#target" ).keyup(function() {

  if (timer)
  {
    clearTimeout(timer);
  }

  timer = setTimeout(function() {
      BuscarEnPriceCharting( $('#target').val() )
  }, 500);
});


function BuscarEnGameValueNow( criterio )
{
  GM.xmlHttpRequest({
    method: "GET",
    url: "http://gamevaluenow.com/search?platform=0&search="+criterio,
    onload: function(response)
    {
      $('#resultadoBusqueda').html('');

      if ( response.finalUrl.indexOf( "gamevaluenow.com/search" )>0 )
      {
        console.log( "multiples" )
        var parsed  = $.parseHTML(response.responseText); 
        parsed = $('<div />').append(parsed);

        
        parsed.find('.so_game_row').each( function( indiceFila, valorFila )
                                         {
                                            var link = valorFila.firstElementChild.firstElementChild;
                                            var enlace = "http://gamevaluenow.com/" + link.href.replace(/https:\/\/www.ebay.com\//g,'') ;
                                            var titulo =  link.innerText.trim() + ' ('+valorFila.childNodes[3].firstElementChild.innerText.trim() + ')';
																		        $('#resultadoBusqueda').append( '<a href="'+enlace+'" target="_blank">'+titulo+'</a><br/>' );
                                         });
      }
      else
      { 
			  console.log( "encontrado (" + response.finalUrl + ")" );
        //console.log( response );
				MostrarEncontrado( response.responseText );
      }
    }
  });
}

function BuscarEnPriceCharting( criterio )
{
  console.log( "Handler for .keypress() called." );

  GM.xmlHttpRequest({
    method: "GET",
    url: "https://www.pricecharting.com/search-products?type=videogames&q="+criterio,
    timeout: 1000,
    onload: function(response)
    {
      $('#resultadoBusqueda').html('');

      if ( response.finalUrl.indexOf( "pricecharting.com/search-products?" )>0 )
      {

        var parsed  = $.parseHTML(response.responseText); 
        parsed = $('<div />').append(parsed);

        
        parsed.find('#games_table').find('tbody').find('tr').each( function( indiceFila, valorFila )
                                         {
                                            var link = valorFila.firstElementChild.firstElementChild;
                                            var enlace = "http://gamevaluenow.com/" + link.href.replace(/https:\/\/www.ebay.com\//g,'') ;
                                            var enlace = link.href;
                                            var titulo = link.innerText.trim() + ' (' + valorFila.childNodes[5].firstElementChild.innerText.trim() + ')';
																		        $('#resultadoBusqueda').append( '<a href="'+enlace+'" target="_blank">'+titulo+'</a><br/>' );
                                         });
      }
      else
      { 
				MostrarEncontradoPriceCharting( response.responseText );
      }
    },
  });
}

function MostrarEncontrado( fuente )
{
  $('#resultadoBusqueda').html('');

  var matchTit = /<h1 style="font-size: 26px; display: none" id="game_title">(.+?)<\/h1>/.exec( fuente );
  $('#resultadoBusqueda').append( matchTit[1] + '</br>');
	
  var match = /loosePrice = (parseFloat\('\d+?\.\d+?'\))/.exec( fuente );
  precio = eval( match[1] );
  $('#resultadoBusqueda').append( 'Loose: ' + precio + '</br>' );
}

function MostrarEncontradoPriceCharting( fuente )
{
  $('#resultadoBusqueda').html('');

  var matchTit = /<h1 id="product_name" class="chart_title" title="(\d+)">\s+(.+?)\s+</.exec( fuente );
  $('#resultadoBusqueda').append( matchTit[2] + '</br>');
	
  $('#resultadoBusqueda').append( 'Loose: ' + ExtraerPrecioPriceCharting( fuente, 'used_price' ) + '</br>' );
  $('#resultadoBusqueda').append( 'Completo: ' + ExtraerPrecioPriceCharting( fuente, 'complete_price' ) + '</br>' );
  $('#resultadoBusqueda').append( 'Caja: ' + ExtraerPrecioPriceCharting( fuente, 'box_only_price' ) + '</br>' );
  $('#resultadoBusqueda').append( 'Manual: ' + ExtraerPrecioPriceCharting( fuente, 'manual_only_price' ) + '</br>' );
}

function ExtraerPrecioPriceCharting( fuente, clave )
{
  var patron = '<td id="' + clave + '">\\s+<span class="price js-price">\\s+\\$(\\d+?\\.\\d+?)\\s'
  var match =fuente.match(new RegExp( patron, 'i'));
  precio = FormatearImporte( eval( match[1] ) );
  return precio
}

function AplicarPrecio()
{
  var precio = 0;
  var precioTXT = '';
  var precioShipping = 0;
  var shippingTXT = '';
  var noshipping = false;
  
  var cotizDolar = ObtenerCotizacionDolar();
  $('#zombie_cotiz').html( FormatearImporte( cotizDolar ) );
  
  var precioConvertido = $('#convbinPrice').contents();
  
  if ( precioConvertido.length > 0 )
  {
    precioTXT = precioConvertido[0].textContent
  }
  else
  {
    if ( $('#mm-saleDscPrc').length > 0 )
      {
        if ( $('#convbidPrice').length > 0 )
        {
          precioTXT = $('#convbidPrice').contents()[0].textContent;
        }
        else
        {
          precioTXT = $('#mm-saleDscPrc').html();
        }
      }
    else
      {
        if ( $('#prcIsum').length > 0 )
        {
          precioTXT = $('#prcIsum').attr('content');
        }
        else
        {
          precioTXT = $('#prcIsum_bidPrice').attr('content');
        }
      }
  }
  
  var precioShippingConv = $('#convetedPriceId').html();
  
  if ( precioShippingConv != null )
  {
    shippingTXT = $('#convetedPriceId').html().replace(/^US \$/, "").replace(/,/g,'');
  }
  else
  {
      if ( $('#fshippingCost').contents().length > 1 )
      {
        if ( $('#fshippingCost').contents()[1].textContent == "FREE" )
        {
          shippingTXT = "0";
        }
        else
        {
          shippingTXT = $('#fshippingCost').contents()[1].textContent;
        }
      }
    else
      {
        shippingTXT = '0';
        noshipping = true;
      }
  }
  
  precio = parseFloat( precioTXT.replace(/^US \$/, "").replace().replace(/,/g,'') );
  //console.log(precio);

  var item_id = $('#descItemNumber').html();
	var clavePrecio = item_id + '_precio';
  var precioGuardado = localStorage.getItem(clavePrecio);

  if (precioGuardado)
  {
    precio = parseFloat( precioGuardado );
  }

  precioShipping = parseFloat( shippingTXT.replace(/^\$/, "").replace().replace(/,/g,'') );
  
  var clave = item_id + '_envio';
  var shippingGuardado = localStorage.getItem(clave);
  if (shippingGuardado)
  {
    //localStorage.setItem( item_id + '_envio', parseFloat( 93 ) );
    precioShipping = parseFloat( shippingGuardado );
    noshipping = false;
  }
  
  $('#zombie_precio').html( FormatearImporte( precio * cotizDolar ) );
  if (!noshipping)
  {
    $('#zombie_envio').html( FormatearImporte( precioShipping * cotizDolar ) );
  }
  
  var impuesto = ( ( precio + precioShipping) / 2 );
  
  if ( precio < 25 )
  {
    impuesto = 0;
  }
  
  $('#zombie_aduana').html( FormatearImporte( impuesto * cotizDolar ) );
  
  var total = parseFloat(Math.round( (precio + precioShipping + impuesto ) * 100) / 100).toFixed(2);
  $('#zombie_total').html( FormatearImporte( total * cotizDolar ) );
  
  if (!noshipping)
  {
    $('#zombie_totalNoShip').html( FormatearImporte( precio * 1.5 * cotizDolar ) );
  }
  else
  {
    $('#zombie_mensajeShipping').html( "No hay info de shipping" );
  }
  
  var claveNota = item_id + '_nota';
  var notaGuardado = localStorage.getItem(claveNota);
  if (notaGuardado)
  {
    $('#zombie_nota').html( notaGuardado );
  }  
}
