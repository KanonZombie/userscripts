function ObtenerCotizacionDolar()
{
	var fechaConsulta = new Date( localStorage.getItem('fechaConsulta') );
	var today = new Date();

	fechaConsulta.setHours(0,0,0,0);
	today.setHours(0,0,0,0);

	if ( fechaConsulta == null || fechaConsulta <  today )
	{
		var keyGuardada = localStorage.getItem('apiKey');

		if ( keyGuardada )
		{
			$.ajax({
				url: "https://openexchangerates.org/api/latest.json?app_id=" + keyGuardada,
				async:false
			}).done(function( data ) {
				console.log( "Actualizando cotizacion dolar" );
				localStorage.setItem('fechaConsulta', today);
				localStorage.setItem('cotizDolar', parseFloat( data["rates"]["ARS"] ));
				});
		}
		else
		{
			var cotizDolar = parseFloat( localStorage.getItem('cotizDolar') );
			if ( !cotizDolar )
			{
				console.log( "Api Key y cotizacion no configurada. Seteando config default" );
				localStorage.setItem('cotizDolar', 20 );
			}
		}
	}

	var cotizDolar = parseFloat( localStorage.getItem('cotizDolar') );
	return cotizDolar;
}

function FormatearImporte( cantidad )
{
	return cantidad.toFixed(2);
}
