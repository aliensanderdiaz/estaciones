const TABLA = document.querySelector('#tabla-estaciones')
const filtro = document.querySelector('#filtro')
const query = document.querySelector('#query')
const favDialog = document.getElementById("favDialog");

const linkMapa = (lat, lon) => {

    lon = lon * -1
    let g1, m1, s1, g2, m2, s2
    g1 = Math.trunc(lat)
    let temp1 = (lat - g1) * 60
    m1 = Math.trunc(temp1)
    s1 = Math.trunc((temp1 - m1) * 600) / 10


    g2 = Math.trunc(lon)
    let temp2 = (lon - g2) * 60
    m2 = Math.trunc(temp2)
    s2 = Math.trunc((temp2 - m2) * 600) / 10
    // https://www.google.com/maps/place/2%C2%B056'23.0%22N+75%C2%B014'56.5%22W/@2.9397222,-75.2490278,17z/data=!3m1!4b1!4m4!3m3!8m2!3d2.9397222!4d-75.2490278?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D
    // https://www.google.com/maps/place/2%C2%B056'22.9%22N+75%C2%B014'56.5%22W

    return `https://www.google.com/maps/place/${g1}%C2%B0${m1}'${s1}%22N+${g2}%C2%B0${m2}'${s2}%22W`
}

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
    <a href="${linkMapa(estacion.LATITUD, estacion.LONGITUD)}" target="_blank">🌎</a>
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

const dibujar = (estacionesFiltradas = estaciones) => {
    const ENCABEZADO = `
        <tr>
            <th></th>
            <th>CODIGO</th>
            <th>NOMBRE</th>
            <th>CATEGORIA</th>
            <th>TECNOLOGIA</th>
            <th>MUNICIPIO</th>
        </tr>`


    let html_tabla = ENCABEZADO

    estacionesFiltradas.forEach((estacion, i) => {
        let nombre_estacion = estacion.NOMBRE
        let indice = nombre_estacion.indexOf('[')
        nombre_estacion = nombre_estacion.substring(0, indice).trim()
        html_tabla += `
        <tr class="${estacion.TECNOLOGIA.includes('uto') ? 'automatica' : ''} ${estacion.ESTADO === 'Suspendida' ? 'suspendida' : ''}"
            
        >
            <td class="text-end">${i + 1}</td>
            <td class="text-end ${estacion.LLAMADAS ? 'llamadas' : ''}">${estacion.CODIGO}</td>
            <td>
                ${nombre_estacion}
                ${ estacion.tecnico ? ' - ' + estacion.tecnico: '' }
                ${ estacion.tipoInterno ? ' - ' + estacion.tipoInterno: '' }
                <span class="detalles" onclick="mostrarInfo(${estacion.CODIGO})">🔎</span>
            </td>
            <td>${estacion.CATEGORIA}</td>
            <td>${estacion.TECNOLOGIA}</td>
            <td>${estacion.MUNICIPIO}</td>
        </tr>
            `
        // <td>${estacion.ESTADO}</td>
    })

    TABLA.innerHTML = html_tabla
}

dibujar()

filtro.addEventListener('change', (event) => {
    const value = event.target.value
    if (value === 'todas') {
        let estacionesFiltradas = estaciones
        dibujar(estacionesFiltradas)
    }
    if (value === 'activas') {
        let estacionesFiltradas = estaciones.filter(estacion => estacion.ESTADO !== 'Suspendida')
        dibujar(estacionesFiltradas)
    }
    if (value === 'suspendidas') {
        let estacionesFiltradas = estaciones.filter(estacion => estacion.ESTADO === 'Suspendida')
        dibujar(estacionesFiltradas)
    }
    if (value === 'pluviometricas') {
        let estacionesFiltradas = estaciones.filter(estacion => estacion.tipoInterno === 'PM' )
        dibujar(estacionesFiltradas)
    }
    if (value === 'llamadas') {
        let estacionesFiltradas = estaciones.filter(estacion => estacion.LLAMADAS && estacion.ESTADO !== 'Suspendida')
        dibujar(estacionesFiltradas)
    }
    if (value === 'climatologicas') {
        let estacionesFiltradas = estaciones.filter(estacion => estacion.tipoInterno === 'C' )
        dibujar(estacionesFiltradas)
    }
    if (value === 'automaticas') {
        let estacionesFiltradas = estaciones.filter(estacion => estacion.TECNOLOGIA.includes('utom') && estacion.ESTADO !== 'Suspendida')
        dibujar(estacionesFiltradas)
    }
})


query.addEventListener('keyup', (event) => {
    const value = event.target.value
    let estacionesFiltradas = estaciones.filter(
        estacion => estacion.NOMBRE.toLowerCase().includes(value.toLowerCase()) || 
                    estacion.CODIGO.toLowerCase().includes(value.toLowerCase())
    )
    dibujar(estacionesFiltradas)
})
