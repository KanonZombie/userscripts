// ==UserScript==
// @name        eStarland.com pesos
// @namespace   http://zombie
// @description eStarland.com pesos
// @include     https://www.estarland.com/product-description/*
// @require     https://raw.githubusercontent.com/KanonZombie/userscripts/master/funciones.js
// @require     https://code.jquery.com/jquery-2.2.4.js
// @version     1
// @grant       none
// ==/UserScript==
function Configurar()
{
	var keyGuardada = localStorage.getItem('apiKey');
  var apiKey = prompt('ApiKey openexchangerates:', keyGuardada);
  if (apiKey)
  {
    localStorage.setItem('apiKey', apiKey);
  }
}

exportFunction(Configurar, window, {defineAs:'Configurar'});

try
{
  $('div.header_user_info').append('<a href="javascript:void(0)" onclick="Configurar()">Config</a>');

  var cotizDolar = ObtenerCotizacionDolar();
  //var precio = parseFloat( $('.products_details_cart_col2_r > p:nth-child(1) > span:nth-child(1)').html().replace(/\$/, "") );

  //$('.products_details_cart_col2_r > p:nth-child(1) > span:nth-child(1)').append('<p>(AR$ '+ FormatearImporte( precio * cotizDolar * 1.5 ) + ')</p>')
  $('.products_details_cart_col2_r > p:nth-child(1) > span').each( function( key, value ) { 
    var precio = parseFloat( $( value ).html().replace(/\$/, "") );
    console.log( precio ) ;
    $( value ).append('<p>(Item AR$ '+ FormatearImporte( precio * cotizDolar * 1.5 ) + ')' )
    var envio = 44;
    $( value ).append('<p>(Envio: AR$ '+ FormatearImporte( envio * cotizDolar * 1.5 ) + ')' )
    var envio = 44;
    $( value ).append('<p>(Total: AR$ '+ FormatearImporte( ( precio + envio ) * cotizDolar * 1.5 ) + ')' )
  } );

}
catch( err )
{
  console.log( err );
  console.log( err.message );
}
