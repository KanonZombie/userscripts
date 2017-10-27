function ObtenerCotizacionDolar()
{
	var fechaConsulta = new Date( localStorage.getItem('fechaConsulta') );
	var today = new Date();

	fechaConsulta.setHours(0,0,0,0);
	today.setHours(0,0,0,0);

	if ( fechaConsulta == null || fechaConsulta <  today )
	{
	  console.log( "guardando" );

		var keyGuardada = localStorage.getItem('apiKey');

		if ( keyGuardada )
		{
			$.ajax({
				url: "https://openexchangerates.org/api/latest.json?app_id=" + keyGuardada,
				async:false
			}).done(function( data ) {
				alert( "Actualizando cotizacion dolar" );
				//cotizDolar =  ;
				localStorage.setItem('fechaConsulta', today);
				localStorage.setItem('cotizDolar', parseFloat( data["rates"]["ARS"] ));
				});
		}
		else
		{
			console.log( "Api Key no configurada. seteando config default" );
			localStorage.setItem('cotizDolar', 17.50 );
		}
	}

	var cotizDolar = parseFloat( localStorage.getItem('cotizDolar') );
	return cotizDolar;
}

function FormatearImporte( cantidad )
{
	console.log(cantidad);
	return cantidad.toFixed(2);
}
