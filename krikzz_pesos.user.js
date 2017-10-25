// ==UserScript==
// @name        Kirikzz pesos
// @namespace   http://zombie
// @description krikzz pesos
// @include     https://krikzz.com/store/
// @include     https://krikzz.com/store/order
// @require     https://raw.githubusercontent.com/KanonZombie/userscripts/master/funciones.js
// @version     1
// @grant       none
// ==/UserScript==

var cotizDolar = ObtenerCotizacionDolar();

if ( window.location.href.indexOf('https://krikzz.com/store/')>=0 )
{
  $('.right-block .content_price .product-price').each(function( index ) {
    var precio = parseFloat( $( this ).text().replace(/\$/, "").replace(/,/g,'') );
    var pesos = precio * cotizDolar * 1.5;
    $(this).append( '('+FormatearImporte(pesos)+')' );
  });
}

if ( window.location.href.indexOf('https://krikzz.com/store/order')>=0 )
{
  $('#order-detail-content tr td.price').each(function( index ) {
    var precio = parseFloat( $( this ).text().replace(/\$/, "").replace(/,/g,'') );
    var pesos = precio * cotizDolar * 1.5;
    $(this).append( '('+FormatearImporte(pesos)+')' );
  });
}

