// ==UserScript==
// @name        Ebay en pesos
// @namespace   Zombie
// @description Ebay en pesos
// @include     https://www.ebay.com/itm/*
// @require     https://raw.githubusercontent.com/KanonZombie/userscripts/master/funciones.js
// @version     1
// @grant       none
// ==/UserScript==

// #isum-shipCostDiv

$('#gh-eb').append('<li id="gh-cart22" class="gh-eb-li rt"><a href="javascript:void(0)" onclick="Configurar()">Config</a></li>')

unsafeWindow.Configurar = function()
{
	var keyGuardada = localStorage.getItem('apiKey');
  var apiKey = prompt('ApiKey openexchangerates:', keyGuardada);
  localStorage.setItem('apiKey', apiKey);
}

var precio = 0;
var precioTXT = '';

var precioShipping = 0;
var shippingTXT = '';

var noshipping = false;

var cotizDolar = ObtenerCotizacionDolar();

var precioConvertido = $('#convbinPrice').contents();

if ( precioConvertido.length > 0 )
{
  precioTXT = precioConvertido[0].textContent
}
else
{
  //#prcIsum_bidPrice
  if ( $('#mm-saleDscPrc').length > 0 )
    {
      if ( $('#convbidPrice').length > 0 )
      {
        console.log( $('#convbidPrice').contents()[0] );
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

console.log(precioTXT);

var precioShippingConv = $('#convetedPriceId').html();

if ( precioShippingConv != null )
{
  shippingTXT = $('#convetedPriceId').html().replace(/^US \$/, "").replace(/,/g,'');
  console.log(shippingTXT);
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
console.log(shippingTXT);

precio = parseFloat( precioTXT.replace(/^US \$/, "").replace().replace(/,/g,'') );
precioShipping = parseFloat( shippingTXT.replace(/^\$/, "").replace().replace(/,/g,'') );

var htmlARS = '<div class="notranslate u-cb convPrice vi-binConvPrc padT10 "><table width="100%">';

htmlARS += '<tr><td colspan=2>Precios ARS - dolar a  $' + FormatearImporte( cotizDolar ) +'</td></tr>';
htmlARS += '<tr><td>Item:</td><td align="right">' + FormatearImporte( precio * cotizDolar ) + '</td></tr>';

if (!noshipping)
{
  htmlARS += '<tr><td>Envío:</td><td align="right">' + FormatearImporte( precioShipping * cotizDolar ) + '</td></tr>';
}

var impuesto = ( ( precio + precioShipping)  /2 );
htmlARS += '<tr><td>Impuesto:</td><td align="right">' + FormatearImporte( impuesto * cotizDolar ) + '</td></tr>';

var total = parseFloat(Math.round( (precio + precioShipping + impuesto ) * 100) / 100).toFixed(2);
htmlARS += '<tr><td>Total:</td><td align="right">' + FormatearImporte( total * cotizDolar ) + '</td></tr>';

if (!noshipping)
{
  htmlARS += '<tr><td>Total sin shipping:</td><td align="right">' + FormatearImporte( precio * 1.5 * cotizDolar ) + '</td></tr>';
}

htmlARS += '</table></div>';
console.log(htmlARS);

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

console.log($('#vi-mskumap-none'));
if (noshipping)
{
  $('#vi-mskumap-none').append( '<div class="mp-prc-red" style="font-size: 75%">No hay info de shipping</span></div>' )
}
