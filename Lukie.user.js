// ==UserScript==
// @name        SuperLukie
// @namespace   Zombie
// @description Lukie
// @include     https://www.lukiegames.com/*
// @require     https://raw.githubusercontent.com/KanonZombie/userscripts/master/funciones.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

function Configurar()
{
	var keyGuardada = localStorage.getItem('apiKey');
  var apiKey = prompt('ApiKey openexchangerates:', keyGuardada);
  localStorage.setItem('apiKey', apiKey);
}

exportFunction(Configurar, window, {defineAs:'Configurar'});

$('div.menu-links ul').append('<li class="div hidden-mobile"></li><li><a href="javascript:void(0)" onclick="Configurar()"> Config </a></li>')

if ( window.location.href.indexOf('https://www.lukiegames.com/view_wishlist.asp')>=0 )
{
    $('div.wishlistView .row .wl-items .product-name-options .name')
    .each( function() 
          {
            var url = $(this).find('a').attr('href');
      //console.log(url);
            $(this).append('<div id="' + url.replace(".", "_") + '"><i>checkeando dispobibilidad</i></div>');

            $.ajax({
              url : "https://www.lukiegames.com/" + url,
              success : function(result)
                        {
                           if ( result.indexOf('<div id="availability">Out of Stock</div>') > -1 )
                           {
                              //console.log( url + ' sin stock' );
                              $('#'+url.replace(".", "_")).html('<span style="color: red; font-weight: bold">sin stock</span>');
                           }
                           else
                           {
                              $('#'+url.replace(".", "_")).html('<span style="color: green; font-weight: bold">en stock</span>');
                           }
                        },
              error: function(result)
                    {
                      $('#'+url.replace(".", "_")).html('<span style="color: red; font-weight: bold">' + result.statusText + '</span>');
                    }
              });

          } 
       )

}

$('div.item')
  .each( function()
         {
          console.log( $(this) );
          var oferta = $(this).find('.sale_price span');
          if ( oferta.length > 0 )
          {
             console.log( "oferta:" + oferta.html() );
          }
          else
          {
             var fullprice = find('.full_price2 s');
             console.log( "fullprice :" + fullprice.html() );
          }

          //.each( function() { console.log( $(this).html() ) } );
         } );