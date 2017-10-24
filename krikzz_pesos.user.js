// ==UserScript==
// @name        Kirikzz pesos
// @namespace   http://zombie
// @description krikzz pesos
// @include     https://krikzz.com/store/
// @version     1
// @grant       none
// ==/UserScript==

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


$('.right-block .content_price .product-price').each(function( index ) {
  console.log( index + ": " + parseFloat( $( this ).text().replace(/\$/, "").replace(/,/g,'') ));
  var precio = parseFloat( $( this ).text().replace(/\$/, "").replace(/,/g,'') );
  var pesos = precio * cotizDolar * 1.5;
  $(this).append( '('+FormatearImporte(pesos)+')' );
});


function FormatearImporte( cantidad )
{
console.log(cantidad);
  return cantidad.toFixed(2);
}
