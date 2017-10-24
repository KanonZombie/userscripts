// ==UserScript==
// @name        Ebay en pesos
// @namespace   Zombie
// @description Ebay en pesos
// @include     https://www.ebay.com/itm/*
// @version     1
// @grant       none
// ==/UserScript==

// #isum-shipCostDiv

var precio = 0;
var precioTXT = '';

var precioShipping = 0;
var shippingTXT = '';

var noshipping = false;

var fechaConsulta = new Date( localStorage.getItem('fechaConsulta') );
var today = new Date();

fechaConsulta.setHours(0,0,0,0);
today.setHours(0,0,0,0);

if ( fechaConsulta == null || fechaConsulta <  today )
{
  console.log( "guardando" );

  $.ajax({
      url: "https://openexchangerates.org/api/latest.json?app_id=7a53d03067514dce8d68ccfbacf276c4",
      async:false
    }).done(function( data ) {
      alert( "Actualizando cotizacion dolar" );
        //cotizDolar =  ;
        localStorage.setItem('fechaConsulta', today);
        localStorage.setItem('cotizDolar', parseFloat( data["rates"]["ARS"] ));
      });
}

var cotizDolar = parseFloat( localStorage.getItem('cotizDolar') );
//var cotizDolar = 1;
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
console.log($('#mm-saleDscPrc'));
        precioTXT = $('#mm-saleDscPrc').html();
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

//$('#vi-mskumap-none').append( '<div class="notranslate u-cb convPrice vi-binConvPrc padT10 ">Art: <span style="white-space: nowrap;font-weight:bold;">$' + precio * 18 + '<span></span></div>' )
//$('#vi-mskumap-none').append( '<div class="w2b-red">No hay info de shipping</span></div>' )
//$('#vi-mskumap-none').append( '<div class="notranslate u-cb convPrice vi-binConvPrc padT10 ">Ship: <span id="convbinPrice" style="white-space: nowrap;font-weight:bold;">$' + precioShipping * 18 + '<span></span></div>' )
//$('#vi-mskumap-none').append( '<div class="notranslate u-cb convPrice vi-binConvPrc padT10 ">Adu: <span style="white-space: nowrap;font-weight:bold;">$' + impuesto * 18 + '<span></span></div>' )
//$('#vi-mskumap-none').append( '<div class="notranslate u-cb convPrice vi-binConvPrc padT10 ">Total: <span style="white-space: nowrap;font-weight:bold;">$' + total * 18 + '<span></span></div>' )

//$('table.fr > tbody:nth-child(1) > tr td div.normal').parent().append('<div>1000</div>')

function FormatearImporte( cantidad )
{
console.log(cantidad);
  return cantidad.toFixed(2);
}
