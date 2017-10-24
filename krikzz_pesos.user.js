// ==UserScript==
// @name        Kirikzz pesos
// @namespace   http://zombie
// @description krikzz pesos
// @include     https://krikzz.com/store/
// @require     https://raw.githubusercontent.com/KanonZombie/userscripts/master/funciones.js
// @version     1
// @grant       none
// ==/UserScript==

var cotizDolar = ObtenerCotizacionDolar();

$('.right-block .content_price .product-price').each(function( index ) {
  console.log( index + ": " + parseFloat( $( this ).text().replace(/\$/, "").replace(/,/g,'') ));
  var precio = parseFloat( $( this ).text().replace(/\$/, "").replace(/,/g,'') );
  var pesos = precio * cotizDolar * 1.5;
  $(this).append( '('+FormatearImporte(pesos)+')' );
});
