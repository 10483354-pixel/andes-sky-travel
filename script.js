/* =====================================================
   ANDES SKY TRAVEL
   SISTEMA DE RESERVAS
===================================================== */


/* =====================================================
   VARIABLES
===================================================== */

let tipoViaje = "ida-vuelta";

let vueloSeleccionado = null;

let vuelosDisponibles = [];

let asientosSeleccionados = {};

let pasajerosRegistrados = [];

let codigoReservaActual = "";


/* =====================================================
   PRECIOS
===================================================== */

const precios = {

    "Cusco": 289,

    "Arequipa": 249,

    "Iquitos": 390,

    "Santiago": 680,

    "Buenos Aires": 1100,

    "Cartagena": 850,

    "Miami": 1480,

    "Nueva York": 1750,

    "Madrid": 1850,

    "París": 2450,

    "Roma": 2600,

    "Londres": 2750,

    "Tokio": 3900,

    "Dubái": 3200

};


/* =====================================================
   ASIENTOS OCUPADOS
===================================================== */

const asientosOcupados = [

    "1B",
    "2C",
    "3A",
    "4D",
    "5B",
    "6C",
    "7A",
    "8D",
    "9B",
    "10C",
    "12A",
    "14D",
    "16B",
    "18C"

];


/* =====================================================
   CÓDIGOS DE AEROPUERTOS
===================================================== */

const aeropuertos = {

    "Lima": "LIM",

    "Cusco": "CUZ",

    "Arequipa": "AQP",

    "Iquitos": "IQT",

    "Santiago": "SCL",

    "Buenos Aires": "EZE",

    "Bogotá": "BOG",

    "Cartagena": "CTG",

    "Miami": "MIA",

    "Nueva York": "JFK",

    "Madrid": "MAD",

    "París": "CDG",

    "Roma": "FCO",

    "Londres": "LHR",

    "Tokio": "NRT",

    "Dubái": "DXB"

};


/* =====================================================
   TIPO DE VIAJE
===================================================== */

function seleccionarTipoViaje(tipo, boton) {

    tipoViaje = tipo;


    document
        .querySelectorAll(".trip-option")
        .forEach(
            function(elemento) {

                elemento.classList.remove(
                    "selected"
                );

            }
        );


    boton.classList.add(
        "selected"
    );


    const retorno =
        document.getElementById(
            "fechaRetorno"
        );


    if (tipo === "solo-ida") {

        retorno.disabled = true;

        retorno.value = "";

    } else {

        retorno.disabled = false;

    }

}


/* =====================================================
   TOTAL DE PASAJEROS
===================================================== */

function obtenerCantidadPasajeros() {

    const adultos =
        Number(
            document.getElementById(
                "adultos"
            ).value
        ) || 0;


    const ninos =
        Number(
            document.getElementById(
                "ninos"
            ).value
        ) || 0;


    const infantes =
        Number(
            document.getElementById(
                "infantes"
            ).value
        ) || 0;


    return adultos + ninos + infantes;

}


/* =====================================================
   GENERAR PASAJEROS
===================================================== */

function generarPasajeros() {

    const adultos =
        Number(
            document.getElementById(
                "adultos"
            ).value
        );


    const ninos =
        Number(
            document.getElementById(
                "ninos"
            ).value
        );


    const infantes =
        Number(
            document.getElementById(
                "infantes"
            ).value
        );


    const total =
        adultos +
        ninos +
        infantes;


    const contenedor =
        document.getElementById(
            "contenedorPasajeros"
        );


    contenedor.innerHTML = "";


    pasajerosRegistrados = [];

    asientosSeleccionados = {};


    if (total === 0) {

        contenedor.innerHTML = `

            <div class="message">

                👥 Selecciona pasajeros.

            </div>

        `;

        return;

    }


    let numero = 1;


    for (
        let i = 1;
        i <= adultos;
        i++
    ) {

        crearPasajero(
            numero,
            "Adulto",
            contenedor
        );

        numero++;

    }


    for (
        let i = 1;
        i <= ninos;
        i++
    ) {

        crearPasajero(
            numero,
            "Niño",
            contenedor
        );

        numero++;

    }


    for (
        let i = 1;
        i <= infantes;
        i++
    ) {

        crearPasajero(
            numero,
            "Infante",
            contenedor
        );

        numero++;

    }


    generarAsientos();

    actualizarContador();

    calcularTotal();

}


/* =====================================================
   CREAR PASAJERO
===================================================== */

function crearPasajero(
    numero,
    tipo,
    contenedor
) {


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "passenger";


    div.innerHTML = `

        <div class="passenger-header">

            <h3>
                👤 Pasajero ${numero}
            </h3>

            <span class="passenger-tag">
                ${tipo.toUpperCase()}
            </span>

        </div>


        <div class="form-grid">


            <div class="form-group">

                <label>
                    Nombres
                </label>

                <input
                    type="text"
                    id="nombre${numero}"
                    placeholder="Nombres">

            </div>


            <div class="form-group">

                <label>
                    Apellidos
                </label>

                <input
                    type="text"
                    id="apellido${numero}"
                    placeholder="Apellidos">

            </div>


            <div class="form-group">

                <label>
                    Tipo de documento
                </label>

                <select id="tipoDoc${numero}">

                    <option value="">
                        Seleccione
                    </option>

                    <option value="DNI">
                        DNI
                    </option>

                    <option value="Pasaporte">
                        Pasaporte
                    </option>

                    <option value="CE">
                        Carné de Extranjería
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label>
                    Número de documento
                </label>

                <input
                    type="text"
                    id="documento${numero}"
                    placeholder="Número">

            </div>


            <div class="form-group">

                <label>
                    Fecha de nacimiento
                </label>

                <input
                    type="date"
                    id="nacimiento${numero}">

            </div>


            <div class="form-group">

                <label>
                    Nacionalidad
                </label>

                <select id="nacionalidad${numero}">

                    <option value="Peruana">
                        Peruana
                    </option>

                    <option value="Chilena">
                        Chilena
                    </option>

                    <option value="Argentina">
                        Argentina
                    </option>

                    <option value="Colombiana">
                        Colombiana
                    </option>

                    <option value="Estadounidense">
                        Estadounidense
                    </option>

                    <option value="Española">
                        Española
                    </option>

                    <option value="Francesa">
                        Francesa
                    </option>

                    <option value="Italiana">
                        Italiana
                    </option>

                    <option value="Otra">
                        Otra
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label>
                    Género
                </label>

                <select id="genero${numero}">

                    <option value="">
                        Seleccione
                    </option>

                    <option value="Masculino">
                        Masculino
                    </option>

                    <option value="Femenino">
                        Femenino
                    </option>

                    <option value="Otro">
                        Otro
                    </option>

                </select>

            </div>


            <div class="form-group">

                <label>
                    Correo electrónico
                </label>

                <input
                    type="email"
                    id="email${numero}"
                    placeholder="correo@ejemplo.com">

            </div>

        </div>

    `;


    contenedor.appendChild(
        div
    );

}


/* =====================================================
   GENERAR VUELOS
===================================================== */

function generarVuelos() {

    const origen =
        document.getElementById(
            "origen"
        ).value;


    const destino =
        document.getElementById(
            "destino"
        ).value;


    const fecha =
        document.getElementById(
            "fechaIda"
        ).value;


    const lista =
        document.getElementById(
            "listaVuelos"
        );


    if (
        !origen ||
        !destino ||
        !fecha
    ) {

        lista.innerHTML = `

            <div class="message">

                ✈️ Selecciona origen,
                destino y fecha.

            </div>

        `;

        return;

    }


    if (origen === destino) {

        lista.innerHTML = `

            <div class="message">

                ⚠️ Origen y destino
                deben ser diferentes.

            </div>

        `;

        return;

    }


    const precio =
        precios[destino] || 800;


    const internacional =
        obtenerCodigoAeropuerto(
            origen
        ) !== "" &&
        ![
            "LIM",
            "CUZ",
            "AQP",
            "IQT"
        ].includes(
            obtenerCodigoAeropuerto(
                destino
            )
        );


    let suplemento =
        internacional ? 300 : 0;


    vuelosDisponibles = [

        {

            codigo: "AST-201",

            salida: "06:30",

            llegada: "08:00",

            duracion: "1h 30m",

            escalas: "Directo",

            precio:
                precio + suplemento

        },


        {

            codigo: "AST-305",

            salida: "10:20",

            llegada: "13:10",

            duracion: "2h 50m",

            escalas: "1 escala",

            precio:
                precio +
                suplemento +
                120

        },


        {

            codigo: "AST-417",

            salida: "18:40",

            llegada: "21:50",

            duracion: "3h 10m",

            escalas: "1 escala",

            precio:
                precio +
                suplemento +
                180

        }

    ];


    lista.innerHTML = "";


    vuelosDisponibles.forEach(
        function(
            vuelo,
            indice
        ) {


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "flight";


            div.onclick =
                function() {

                    seleccionarVuelo(
                        indice,
                        div
                    );

                };


            div.innerHTML = `

                <div>

                    <div class="flight-code">

                        ✈ ${vuelo.codigo}

                    </div>

                    <div class="flight-company">

                        ANDES SKY TRAVEL

                    </div>

                </div>


                <div class="flight-times">


                    <div>

                        <div class="flight-time">

                            ${vuelo.salida}

                        </div>

                        <div class="flight-city">

                            ${obtenerCodigoAeropuerto(
                                origen
                            )}

                        </div>

                    </div>


                    <div class="flight-duration">

                        ───── ✈ ─────

                        <br>

                        ${vuelo.duracion}

                        <br>

                        ${vuelo.escalas}

                    </div>


                    <div>

                        <div class="flight-time">

                            ${vuelo.llegada}

                        </div>

                        <div class="flight-city">

                            ${obtenerCodigoAeropuerto(
                                destino
                            )}

                        </div>

                    </div>

                </div>


                <div class="flight-price">

                    <strong>

                        S/ ${vuelo.precio}

                    </strong>

                    <small>
                        por pasajero
                    </small>

                </div>

            `;


            lista.appendChild(
                div
            );

        }
    );

}


/* =====================================================
   SELECCIONAR VUELO
===================================================== */

function seleccionarVuelo(
    indice,
    elemento
) {


    document
        .querySelectorAll(".flight")
        .forEach(
            function(
                vuelo
            ) {

                vuelo.classList.remove(
                    "selected"
                );

            }
        );


    elemento.classList.add(
        "selected"
    );


    vueloSeleccionado =
        vuelosDisponibles[
            indice
        ];


    calcularTotal();

}


/* =====================================================
   GENERAR ASIENTOS
===================================================== */

function generarAsientos() {


    const total =
        obtenerCantidadPasajeros();


    const mapa =
        document.getElementById(
            "mapaAsientos"
        );


    if (!total) {

        mapa.innerHTML = `

            <div class="message">

                💺 Selecciona pasajeros
                para habilitar los asientos.

            </div>

        `;

        return;

    }


    mapa.innerHTML = "";


    for (
        let fila = 1;
        fila <= 20;
        fila++
    ) {


        const row =
            document.createElement(
                "div"
            );


        row.className =
            "seat-row";


        const numero =
            document.createElement(
                "div"
            );


        numero.className =
            "row-number";


        numero.textContent =
            fila;


        row.appendChild(
            numero
        );


        const letras = [
            "A",
            "B",
            "PASILLO",
            "C",
            "D"
        ];


        letras.forEach(
            function(
                letra
            ) {


                if (
                    letra === "PASILLO"
                ) {

                    const espacio =
                        document.createElement(
                            "div"
                        );

                    row.appendChild(
                        espacio
                    );

                    return;

                }


                const codigo =
                    fila + letra;


                const boton =
                    document.createElement(
                        "button"
                    );


                boton.className =
                    "seat";


                boton.textContent =
                    codigo;


                if (
                    asientosOcupados.includes(
                        codigo
                    )
                ) {

                    boton.classList.add(
                        "occupied"
                    );

                    boton.disabled =
                        true;

                } else {

                    boton.onclick =
                        function() {

                            seleccionarAsiento(
                                codigo,
                                boton
                            );

                        };

                }


                row.appendChild(
                    boton
                );

            }
        );


        mapa.appendChild(
            row
        );

    }

}


/* =====================================================
   SELECCIONAR ASIENTO
===================================================== */

function seleccionarAsiento(
    codigo,
    boton
) {


    const cantidad =
        obtenerCantidadPasajeros();


    const seleccionados =
        Object.keys(
            asientosSeleccionados
        );


    if (
        seleccionados.includes(
            codigo
        )
    ) {

        delete asientosSeleccionados[
            codigo
        ];


        boton.classList.remove(
            "selected"
        );


        actualizarContador();

        return;

    }


    if (
        seleccionados.length >=
        cantidad
    ) {

        alert(
            "Ya seleccionaste todos los asientos necesarios."
        );

        return;

    }


    asientosSeleccionados[
        codigo
    ] =
        seleccionados.length + 1;


    boton.classList.add(
        "selected"
    );


    actualizarContador();

}


/* =====================================================
   CONTADOR DE ASIENTOS
===================================================== */

function actualizarContador() {


    const total =
        obtenerCantidadPasajeros();


    const seleccionados =
        Object.keys(
            asientosSeleccionados
        ).length;


    document.getElementById(
        "contadorAsientos"
    ).textContent =

        `${seleccionados} / ${total}`;

}


/* =====================================================
   CALCULAR TOTAL
===================================================== */

function calcularTotal() {


    const cantidad =
        obtenerCantidadPasajeros();


    let precioVuelo =
        vueloSeleccionado
        ?
        vueloSeleccionado.precio
        :
        0;


    let multiplicador = 1;


    const clase =
        document.getElementById(
            "clase"
        ).value;


    switch (
        clase
    ) {


        case "Premium":

            multiplicador =
                1.25;

            break;


        case "Ejecutiva":

            multiplicador =
                1.65;

            break;


        case "Primera":

            multiplicador =
                2.30;

            break;


        default:

            multiplicador =
                1;

    }


    let subtotal =
        precioVuelo *
        cantidad *
        multiplicador;


    let servicios =
        0;


    document
        .querySelectorAll(
            ".service input"
        )
        .forEach(
            function(
                checkbox
            ) {


                if (
                    checkbox.checked
                ) {

                    servicios +=
                        Number(
                            checkbox.value
                        );

                }

            }
        );


    const total =
        subtotal +
        servicios;


    document.getElementById(
        "precioTotal"
    ).textContent =

        `S/ ${total.toFixed(2)}`;

}


/* =====================================================
   VALIDAR PASAJEROS
===================================================== */

function validarPasajeros() {


    const total =
        obtenerCantidadPasajeros();


    pasajerosRegistrados =
        [];


    for (
        let i = 1;
        i <= total;
        i++
    ) {


        const nombre =
            document.getElementById(
                `nombre${i}`
            ).value.trim();


        const apellido =
            document.getElementById(
                `apellido${i}`
            ).value.trim();


        const tipoDoc =
            document.getElementById(
                `tipoDoc${i}`
            ).value;


        const documento =
            document.getElementById(
                `documento${i}`
            ).value.trim();


        const nacimiento =
            document.getElementById(
                `nacimiento${i}`
            ).value;


        const nacionalidad =
            document.getElementById(
                `nacionalidad${i}`
            ).value;


        const genero =
            document.getElementById(
                `genero${i}`
            ).value;


        const email =
            document.getElementById(
                `email${i}`
            ).value.trim();


        if (
            !nombre ||
            !apellido ||
            !tipoDoc ||
            !documento ||
            !nacimiento ||
            !nacionalidad ||
            !genero ||
            !email
        ) {


            alert(
                `Completa los datos del pasajero ${i}.`
            );


            return false;

        }


        pasajerosRegistrados.push({

            nombre:
                nombre,

            apellido:
                apellido,

            tipoDocumento:
                tipoDoc,

            documento:
                documento,

            nacimiento:
                nacimiento,

            nacionalidad:
                nacionalidad,

            genero:
                genero,

            email:
                email

        });

    }


    return true;

}


/* =====================================================
   CONFIRMAR RESERVA
===================================================== */

function confirmarReserva() {


    const origen =
        document.getElementById(
            "origen"
        ).value;


    const destino =
        document.getElementById(
            "destino"
        ).value;


    const fechaIda =
        document.getElementById(
            "fechaIda"
        ).value;


    const fechaRetorno =
        document.getElementById(
            "fechaRetorno"
        ).value;


    const contacto =
        document.getElementById(
            "contactoNombre"
        ).value.trim();


    const email =
        document.getElementById(
            "contactoEmail"
        ).value.trim();


    const telefono =
        document.getElementById(
            "contactoTelefono"
        ).value.trim();


    const total =
        obtenerCantidadPasajeros();


    /* VALIDACIONES */


    if (
        !origen ||
        !destino
    ) {

        alert(
            "Selecciona origen y destino."
        );

        return;

    }


    if (
        origen === destino
    ) {

        alert(
            "El origen y destino deben ser diferentes."
        );

        return;

    }


    if (!fechaIda) {

        alert(
            "Selecciona la fecha de ida."
        );

        return;

    }


    if (
        tipoViaje !== "solo-ida" &&
        !fechaRetorno
    ) {

        alert(
            "Selecciona la fecha de retorno."
        );

        return;

    }


    if (
        fechaRetorno &&
        fechaRetorno <= fechaIda
    ) {

        alert(
            "La fecha de retorno debe ser posterior a la fecha de ida."
        );

        return;

    }


    if (!total) {

        alert(
            "Selecciona al menos un pasajero."
        );

        return;

    }


    if (
        !validarPasajeros()
    ) {

        return;

    }


    if (
        !vueloSeleccionado
    ) {

        alert(
            "Selecciona un vuelo."
        );

        return;

    }


    const cantidadAsientos =
        Object.keys(
            asientosSeleccionados
        ).length;


    if (
        cantidadAsientos !== total
    ) {

        alert(
            `Selecciona ${total} asiento(s).`
        );

        return;

    }


    if (
        !contacto ||
        !email ||
        !telefono
    ) {

        alert(
            "Completa los datos de contacto."
        );

        return;

    }


    /* CÓDIGO */


    codigoReservaActual =
        "AST-" +
        Math.floor(
            100000 +
            Math.random() *
            900000
        );


    /* PRECIO */


    const clase =
        document.getElementById(
            "clase"
        ).value;


    let multiplicador = 1;


    switch (
        clase
    ) {

        case "Premium":

            multiplicador =
                1.25;

            break;


        case "Ejecutiva":

            multiplicador =
                1.65;

            break;


        case "Primera":

            multiplicador =
                2.30;

            break;

    }


    const subtotal =
        vueloSeleccionado.precio *
        total *
        multiplicador;


    let servicios =
        0;


    document
        .querySelectorAll(
            ".service input"
        )
        .forEach(
            function(
                checkbox
            ) {

                if (
                    checkbox.checked
                ) {

                    servicios +=
                        Number(
                            checkbox.value
                        );

                }

            }
        );


    const totalFinal =
        subtotal +
        servicios;


    /* PASAJEROS */


    let pasajerosHTML =
        "";


    pasajerosRegistrados.forEach(
        function(
            pasajero,
            indice
        ) {


            const asiento =
                Object.keys(
                    asientosSeleccionados
                ).find(
                    function(
                        codigo
                    ) {

                        return (
                            asientosSeleccionados[
                                codigo
                            ] ===
                            indice + 1
                        );

                    }
                );


            pasajerosHTML += `

                <div class="confirmed-passenger">

                    <span>

                        ${pasajero.nombre}
                        ${pasajero.apellido}

                    </span>

                    <span class="confirmed-seat">

                        ${asiento}

                    </span>

                </div>

            `;

        }
    );


    /* REPORTE */


    const resultado =
        document.getElementById(
            "resultado"
        );


    resultado.innerHTML = `

        <div class="booking"
             id="reporteReserva">


            <div class="booking-header">

                <div>

                    <small>
                        ANDES SKY TRAVEL
                    </small>

                    <h2>
                        ✓ RESERVA CONFIRMADA
                    </h2>

                </div>


                <div class="booking-code">

                    <span>
                        CÓDIGO DE RESERVA
                    </span>

                    <strong>
                        ${codigoReservaActual}
                    </strong>

                </div>

            </div>


            <div class="booking-body">


                <div class="route">


                    <div class="airport">

                        <small>
                            ORIGEN
                        </small>

                        <h3>
                            ${obtenerCodigoAeropuerto(
                                origen
                            )}
                        </h3>

                        <p>
                            ${origen}
                        </p>

                    </div>


                    <div class="airport">

                        <small>
                            DESTINO
                        </small>

                        <h3>
                            ${obtenerCodigoAeropuerto(
                                destino
                            )}
                        </h3>

                        <p>
                            ${destino}
                        </p>

                    </div>

                </div>


                <div class="booking-details">


                    <div class="detail">

                        <span>
                            Fecha ida
                        </span>

                        <strong>

                            ${formatearFecha(
                                fechaIda
                            )}

                        </strong>

                    </div>


                    <div class="detail">

                        <span>
                            Retorno
                        </span>

                        <strong>

                            ${
                                fechaRetorno
                                ?
                                formatearFecha(
                                    fechaRetorno
                                )
                                :
                                "Solo ida"
                            }

                        </strong>

                    </div>


                    <div class="detail">

                        <span>
                            Vuelo
                        </span>

                        <strong>

                            ${vueloSeleccionado.codigo}

                        </strong>

                    </div>


                    <div class="detail">

                        <span>
                            Clase
                        </span>

                        <strong>
                            ${clase}
                        </strong>

                    </div>


                    <div class="detail">

                        <span>
                            Pasajeros
                        </span>

                        <strong>
                            ${total}
                        </strong>

                    </div>

                </div>


                <div class="passenger-list">

                    <h3>
                        Pasajeros y asientos
                    </h3>

                    ${pasajerosHTML}

                </div>


                <div class="booking-details">


                    <div class="detail">

                        <span>
                            Contacto
                        </span>

                        <strong>
                            ${contacto}
                        </strong>

                    </div>


                    <div class="detail">

                        <span>
                            Correo
                        </span>

                        <strong>
                            ${email}
                        </strong>

                    </div>


                    <div class="detail">

                        <span>
                            Teléfono
                        </span>

                        <strong>
                            ${telefono}
                        </strong>

                    </div>


                    <div class="detail">

                        <span>
                            Servicios
                        </span>

                        <strong>
                            S/ ${servicios.toFixed(2)}
                        </strong>

                    </div>


                    <div class="detail">

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            S/ ${totalFinal.toFixed(2)}
                        </strong>

                    </div>

                </div>


                <div class="report-buttons">


                    <button
                        class="report-btn primary"
                        onclick="imprimirReporte()">

                        🖨️ Imprimir / Guardar PDF

                    </button>


                    <button
                        class="report-btn"
                        onclick="guardarReserva()">

                        💾 Guardar reserva

                    </button>

                </div>


            </div>

        </div>

    `;


    /* GUARDAR INFORMACIÓN */


    const reserva = {

        codigo:
            codigoReservaActual,

        origen:
            origen,

        destino:
            destino,

        fechaIda:
            fechaIda,

        fechaRetorno:
            fechaRetorno,

        vuelo:
            vueloSeleccionado.codigo,

        clase:
            clase,

        pasajeros:
            pasajerosRegistrados,

        asientos:
            asientosSeleccionados,

        contacto:
            contacto,

        email:
            email,

        telefono:
            telefono,

        total:
            totalFinal

    };


    localStorage.setItem(
        "ultimaReserva",
        JSON.stringify(
            reserva
        )
    );


    document
        .getElementById(
            "confirmacion"
        )
        .scrollIntoView({
            behavior:
                "smooth"
        });

}


/* =====================================================
   IMPRIMIR REPORTE
===================================================== */

function imprimirReporte() {

    window.print();

}


/* =====================================================
   GUARDAR RESERVA
===================================================== */

function guardarReserva() {

    const reserva =
        localStorage.getItem(
            "ultimaReserva"
        );


    if (!reserva) {

        alert(
            "No existe una reserva para guardar."
        );

        return;

    }


    alert(
        "✓ Reserva guardada correctamente en el navegador."
    );

}


/* =====================================================
   CÓDIGO AEROPUERTO
===================================================== */

function obtenerCodigoAeropuerto(
    ciudad
) {

    return (
        aeropuertos[
            ciudad
        ] || "---"
    );

}


/* =====================================================
   FORMATEAR FECHA
===================================================== */

function formatearFecha(
    fecha
) {

    if (!fecha) {

        return "---";

    }


    const partes =
        fecha.split("-");


    return (

        partes[2] +
        "/" +
        partes[1] +
        "/" +
        partes[0]

    );

}


/* =====================================================
   FECHA MÍNIMA
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        const hoy =
            new Date()
            .toISOString()
            .split("T")[0];


        document.getElementById(
            "fechaIda"
        ).min =
            hoy;


        document.getElementById(
            "fechaRetorno"
        ).min =
            hoy;


        document.getElementById(
            "fechaIda"
        ).addEventListener(
            "change",
            function() {

                document.getElementById(
                    "fechaRetorno"
                ).min =
                    this.value;

            }
        );


    }
);