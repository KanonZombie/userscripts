// ==UserScript==
// @name        Sega-16 CP Fix - Paypal Remove
// @namespace   http://zombie
// @include     http://www.sega-16.com/forum/subscription.php?folderid=*
// @include     http://www.sega-16.com/forum/*
// @require     http://code.jquery.com/jquery-1.11.2.js
// @require     http://code.jquery.com/ui/1.11.4/jquery-ui.js
// @version     1
// @grant       none
// ==/UserScript==
 
$('#ad_global_below_navbar > span:nth-child(1)').remove();
 
/*
$(document).ready(function () {
  intervalo = window.setInterval(retraso, 2000);
});
 
function retraso()
{
  window.clearInterval(intervalo);
  console.log( $('#ad_global_below_navbar > span:nth-child(1)'));
}
*/
