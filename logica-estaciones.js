const TABLA = document.querySelector('#tabla-estaciones')
const favDialog = document.getElementById("favDialog");

const mostrarInfo = (codigo) => {
    console.log({ codigo })
    let estacion = estaciones.find(est => est.CODIGO == codigo)
    info.innerHTML = `
    <strong>CODIGO</strong>: ${estacion.CODIGO}
    <br>
    <strong>NOMBRE</strong>: ${estacion.NOMBRE}
    <br>
    <strong>CATEGORIA</strong>: ${estacion.CATEGORIA}
    <br>
    <strong>TECNOLOGIA</strong>: ${estacion.TECNOLOGIA}
    <br>
    <strong>ESTADO</strong>: ${estacion.ESTADO}
    <br>
    <strong>FECHA_INSTALACION</strong>: ${estacion.FECHA_INSTALACION}
    <br>
    <strong>FECHA_SUSPENSION</strong>: ${estacion.FECHA_SUSPENSION}
    <br>
    <strong>ALTITUD</strong>: ${estacion.ALTITUD}
    <br>
    <strong>LATITUD</strong>: ${estacion.LATITUD}
    <br>
    <strong>LONGITUD</strong>: ${estacion.LONGITUD}
    <br>
    <strong>DEPARTAMENTO</strong>: ${estacion.DEPARTAMENTO}
    <br>
    <strong>MUNICIPIO</strong>: ${estacion.MUNICIPIO}
    <br>
    <strong>AREA_HIDROGRAFICA</strong>: ${estacion.AREA_HIDROGRAFICA}
    <br>
    <strong>ZONA_HIDROGRAFICA</strong>: ${estacion.ZONA_HIDROGRAFICA}
    <br>
    <strong>SUBZONA_HIDROGRAFICA</strong>: ${estacion.SUBZONA_HIDROGRAFICA}
    <br>
    <strong>CORRIENTE</strong>: ${estacion.CORRIENTE}
    <br>
    <strong>OBSERVACION</strong>: ${estacion.OBSERVACION}
    <br>
    <strong>SUBRED</strong>: ${estacion.SUBRED}
    `
    favDialog.showModal();
}

const ENCABEZADO = `
        <tr>
            <th>CODIGO</th>
            <th>NOMBRE</th>
            <th>CATEGORIA</th>
            <th>TECNOLOGIA</th>
            <th>MUNICIPIO</th>
            </tr>`
            // <th>ESTADO</th>

let html_tabla = ENCABEZADO

estaciones.forEach(estacion => {
    let nombre_estacion = estacion.NOMBRE
    let indice = nombre_estacion.indexOf('[')
    nombre_estacion = nombre_estacion.substring(0, indice).trim()
    html_tabla += `
        <tr class="${ estacion.ESTADO === 'Suspendida' ? 'suspendida' : '' }"
            onclick="mostrarInfo(${ estacion.CODIGO })"
        >
            <td class="text-end">${estacion.CODIGO}</td>
            <td>${ nombre_estacion }</td>
            <td>${estacion.CATEGORIA}</td>
            <td>${estacion.TECNOLOGIA}</td>
            <td>${estacion.MUNICIPIO}</td>
        </tr>
            `
            // <td>${estacion.ESTADO}</td>
})

TABLA.innerHTML = html_tabla