// ==UserScript==
// @name        IOL Dolarizado
// @namespace   Zombie
// @description IOL Dolarizado
// @match       https://iol.invertironline.com/*
// @require     https://code.jquery.com/jquery-2.2.4.js
// @version     1.03
// @icon        https://www.google.com/s2/favicons?sz=64&domain=invertironline.com
// @grant       GM.xmlHttpRequest
// ==/UserScript==

(function () {

    if (window.location.href.includes("/MiCuenta/EstadoCuenta")) {
        let activosValorizados = $('#titulos-valorizados-arg-ar > td:nth-child(4) > span:nth-child(2)')

        let sumaActivosValorizados_text = activosValorizados[0].innerText;

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "TotalDolarizado");
        activosValorizados[0].append(newDiv);
        let DivTotalDolarizado = $("#TotalDolarizado");

        var ActivosValorizados = PriceStringToVal(sumaActivosValorizados_text);

        GM.xmlHttpRequest({
            method: "GET",
            url: "https://iol.invertironline.com/titulo/cotizacion/BCBA/GD30/BONOS-REP.-ARG.-U-S-STEP-UP-V.09-07-30/",
            timeout: 3000,
            onload: function (response) {
                var textoRespuesta = response.responseText;
                const pattern = /<span data-field="UltimoPrecio">(.+?,\d+?)</;
                var precioGD30 = pattern.exec(textoRespuesta)[1];

                GM.xmlHttpRequest({
                    method: "GET",
                    url: "https://iol.invertironline.com/titulo/cotizacion/BCBA/GD30D/BONOS-REP.-ARG.-U-S-STEP-UP-V.09-07-30/",
                    timeout: 3000,
                    onload: function (response) {
                        var textoRespuesta = response.responseText;
                        const pattern = /<span data-field="UltimoPrecio">(.+?,\d+?)</;
                        console.log( pattern.exec(textoRespuesta)[1] )

                        var precioGD30D = pattern.exec(textoRespuesta)[1];

                        let cotizacionMep = PriceStringToVal(precioGD30) / PriceStringToVal(precioGD30D) ;

                        var sumaActivosValorizadosDolarizados = ActivosValorizados / cotizacionMep;

                        DivTotalDolarizado.append("MEP "+FormatearImporte(cotizacionMep)+": USD "+FormatearImporte( sumaActivosValorizadosDolarizados ));

                    },
                });
            },
        });
    }
})();

function PriceStringToVal(sumaActivosValorizados_text)
{
    return eval(sumaActivosValorizados_text.replace(/\./g, "").replace(/,/g, "."))
}

function FormatearImporte(cantidad) {
    return cantidad.toFixed(2);
}
