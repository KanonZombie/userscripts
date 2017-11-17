// ==UserScript==
// @name        RottenTomatoes Fixer
// @namespace   http://zombie
// @include     https://www.rottentomatoes.com/m/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

try 
{
  $( "#header-main" ).removeClass( 'header_main_scroll' );
  var mut = new MutationObserver(function(mutations, mut)
                                 {
    console.log(mutations[0].target);
    // Arreglo margen del orto
    $( "#header-main" ).removeClass( 'header_main_scroll' );
  });

  mut.observe(document.querySelector("#header-main"),{
    'attributes': true
  });

  $(document).ready(function() 
                  {
                    // Quitar monstruosidad indescriptible
                    $('#heroImageContainer').remove()

                    // Quitar Sinopsis
                    $('#movieSynopsis').parent().parent().remove()

                    // Quitar Elenco
                    $('.castSection').parent().parent().remove()

                    // Quitar Cines y Horarios
                    $('#showtimes').remove()

                    // Quitar Trailers
                    $('#movie-videos-panel').remove()

                    // Quitar Galeria de fotos
                    $('#movie-photos-panel').remove()

                    // Quitar Streaming
                    $('#watch-it-now').remove()

                    // Quitar Noticias
                    $('#newsSection').remove()
  								});
}
catch( err )
{
  console.log( err );
  console.log( err.message );
}