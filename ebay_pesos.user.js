// ==UserScript==
// @name        Ebay en pesos
// @namespace   Zombie
// @description Ebay en pesos
// @include     https://www.ebay.com/itm/*
// @require     https://raw.githubusercontent.com/KanonZombie/userscripts/master/funciones.js
// @require     https://code.jquery.com/jquery-2.2.4.js
// @version     1.01
// @grant       none
// ==/UserScript==

function Configurar()
{
	var keyGuardada = localStorage.getItem('apiKey');
  var apiKey = prompt('ApiKey openexchangerates:', keyGuardada);
  localStorage.setItem('apiKey', apiKey);
}

exportFunction(Configurar, window, {defineAs:'Configurar'});

function OverrideShipping()
{
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_envio';
  var shippingGuardado = localStorage.getItem(clave);
  var shipping = prompt('Shipping guardado:', shippingGuardado);
  localStorage.setItem(clave, shipping);
  //location.reload(); 
}

exportFunction(OverrideShipping, window, {defineAs:'OverrideShipping'});

function QuitarShipping()
{
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_envio';
	localStorage.removeItem(clave);
  //location.reload(); 
}

exportFunction(QuitarShipping, window, {defineAs:'QuitarShipping'});

function AgregarNota()
{
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_nota';
  var shippingGuardado = localStorage.getItem(clave);
  var shipping = prompt('Nota:', shippingGuardado);
  localStorage.setItem(clave, shipping);
}

exportFunction(AgregarNota, window, {defineAs:'AgregarNota'});

$('#gh-eb').append('<li id="gh-cart22" class="gh-eb-li rt"><a href="javascript:void(0)" onclick="window.Configurar()">Config</a></li>')

var htmlARS = '<div class="notranslate u-cb convPrice vi-binConvPrc padT10 "><table width="100%">';
htmlARS += '<tr><td colspan=2>Precios ARS - dolar a  $<span id="zombie_cotiz">0</span></td></tr>';
htmlARS += '<tr><td>Item:</td><td align="right"><div id="zombie_precio">0</div></td></tr>';
htmlARS += '<tr><td>Envío:</td><td align="right"><div id="zombie_envio">0</div></td></tr>';
htmlARS += '<tr><td>Impuesto:</td><td align="right"><div id="zombie_aduana">0</div></td></tr>';
htmlARS += '<tr><td>Total:</td><td align="right"><div id="zombie_total">0</div></td></tr>';
htmlARS += '<tr><td>Total sin shipping:</td><td align="right"><div id="zombie_totalNoShip">0</div></td></tr>';
htmlARS += '</table></div>';
htmlARS += '<div class="mp-prc-red" style="font-size: 75%"><a href="javascript:void(0)" onclick="window.OverrideShipping()">Override Shipping</a> - <a href="javascript:void(0)" onclick="window.QuitarShipping()">Eliminar</a></div>';
htmlARS += '<div id="zombie_nota" style="font-size: 75%"></div>';
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

setInterval(AplicarPrecio, 1000);

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
  console.log( precio );
  precioShipping = parseFloat( shippingTXT.replace(/^\$/, "").replace().replace(/,/g,'') );
  
  var item_id = $('#descItemNumber').html();
  var clave = item_id + '_envio';
  var shippingGuardado = localStorage.getItem(clave);
  if (shippingGuardado)
  {
    //localStorage.setItem( item_id + '_envio', parseFloat( 93 ) );
    precioShipping = parseFloat( localStorage.getItem( item_id + '_envio' ) );
    noshipping = false;
  }
  
  $('#zombie_precio').html( FormatearImporte( precio * cotizDolar ) );
  if (!noshipping)
  {
    $('#zombie_envio').html( FormatearImporte( precioShipping * cotizDolar ) );
  }
  
  var impuesto = ( ( precio + precioShipping)  /2 );
  $('#zombie_aduana').html( FormatearImporte( impuesto * cotizDolar ) );
  
  var total = parseFloat(Math.round( (precio + precioShipping + impuesto ) * 100) / 100).toFixed(2);
  $('#zombie_total').html( FormatearImporte( total * cotizDolar ) );
  
  if (!noshipping)
  {
    $('#zombie_totalNoShip').html( FormatearImporte( precio * 1.5 * cotizDolar ) );
  }
  
  if (noshipping)
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


