function ObtenerCotizacionDolar()
{
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
	return cotizDolar;
}

function FormatearImporte( cantidad )
{
	console.log(cantidad);
	return cantidad.toFixed(2);
}
