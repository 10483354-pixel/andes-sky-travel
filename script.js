/* =========================================================
   ANDES SKY TRAVEL
   SISTEMA DE RESERVAS
   ========================================================= */


/* =========================================================
   VARIABLES
   ========================================================= */

let tipoVuelo = "nacional";

let tipoViaje = "ida-vuelta";

let monedaActual = "PEN";

let vueloSeleccionado = null;

let asientosSeleccionados = [];

let pasajeros = {
    adultos: 1,
    ninos: 0,
    infantes: 0
};

let codigoReservaActual = "";

let precioBaseActual = 0;


/* =========================================================
   TASA DE CAMBIO
   ========================================================= */

const TASA_CAMBIO = 3.50;


/* =========================================================
   🇵🇪 AEROPUERTOS NACIONALES
   ========================================================= */

const aeropuertosPeru = [

    {
        ciudad: "Lima",
        pais: "Perú",
        codigo: "LIM",
        aeropuerto: "Jorge Chávez"
    },

    {
        ciudad: "Arequipa",
        pais: "Perú",
        codigo: "AQP",
        aeropuerto: "Rodríguez Ballón"
    },

    {
        ciudad: "Cusco",
        pais: "Perú",
        codigo: "CUZ",
        aeropuerto: "Alejandro Velasco Astete"
    },

    {
        ciudad: "Trujillo",
        pais: "Perú",
        codigo: "TRU",
        aeropuerto: "Capitán FAP Carlos Martínez"
    },

    {
        ciudad: "Piura",
        pais: "Perú",
        codigo: "PIU",
        aeropuerto: "Guillermo Concha Iberico"
    },

    {
        ciudad: "Iquitos",
        pais: "Perú",
        codigo: "IQT",
        aeropuerto: "Coronel FAP Francisco Secada"
    },

    {
        ciudad: "Tarapoto",
        pais: "Perú",
        codigo: "TPP",
        aeropuerto: "Cadete FAP Guillermo del Castillo"
    },

    {
        ciudad: "Chiclayo",
        pais: "Perú",
        codigo: "CIX",
        aeropuerto: "Capitán FAP José Quiñones"
    },

    {
        ciudad: "Juliaca",
        pais: "Perú",
        codigo: "JUL",
        aeropuerto: "Inca Manco Cápac"
    },

    {
        ciudad: "Tacna",
        pais: "Perú",
        codigo: "TCQ",
        aeropuerto: "Coronel FAP Carlos Ciriani"
    }

];


/* =========================================================
   🌎 AEROPUERTOS INTERNACIONALES
   =========================================================

   IMPORTANTE:

   Cuando el usuario selecciona INTERNACIONAL,
   ya NO cargamos la lista de departamentos
   del Perú.

   Se utiliza este catálogo internacional.

   Incluye Perú como punto de conexión internacional,
   pero ahora se muestra como:

   Lima - Perú (LIM)

   y no simplemente como "Lima".
   ========================================================= */

const aeropuertosInternacionales = [

    {
        ciudad: "Lima",
        pais: "Perú",
        codigo: "LIM"
    },

    {
        ciudad: "Cusco",
        pais: "Perú",
        codigo: "CUZ"
    },

    {
        ciudad: "Santiago",
        pais: "Chile",
        codigo: "SCL"
    },

    {
        ciudad: "Buenos Aires",
        pais: "Argentina",
        codigo: "EZE"
    },

    {
        ciudad: "Bogotá",
        pais: "Colombia",
        codigo: "BOG"
    },

    {
        ciudad: "Cartagena",
        pais: "Colombia",
        codigo: "CTG"
    },

    {
        ciudad: "São Paulo",
        pais: "Brasil",
        codigo: "GRU"
    },

    {
        ciudad: "Río de Janeiro",
        pais: "Brasil",
        codigo: "GIG"
    },

    {
        ciudad: "Ciudad de México",
        pais: "México",
        codigo: "MEX"
    },

    {
        ciudad: "Miami",
        pais: "Estados Unidos",
        codigo: "MIA"
    },

    {
        ciudad: "Nueva York",
        pais: "Estados Unidos",
        codigo: "JFK"
    },

    {
        ciudad: "Los Ángeles",
        pais: "Estados Unidos",
        codigo: "LAX"
    },

    {
        ciudad: "Madrid",
        pais: "España",
        codigo: "MAD"
    },

    {
        ciudad: "Barcelona",
        pais: "España",
        codigo: "BCN"
    },

    {
        ciudad: "París",
        pais: "Francia",
        codigo: "CDG"
    },

    {
        ciudad: "Roma",
        pais: "Italia",
        codigo: "FCO"
    },

    {
        ciudad: "Londres",
        pais: "Reino Unido",
        codigo: "LHR"
    },

    {
        ciudad: "Ámsterdam",
        pais: "Países Bajos",
        codigo: "AMS"
    },

    {
        ciudad: "Frankfurt",
        pais: "Alemania",
        codigo: "FRA"
    },

    {
        ciudad: "Tokio",
        pais: "Japón",
        codigo: "NRT"
    },

    {
        ciudad: "Dubái",
        pais: "Emiratos Árabes Unidos",
        codigo: "DXB"
    }

];


/* =========================================================
   PRECIOS NACIONALES
   MONEDA BASE: USD
   ========================================================= */

const preciosNacionales = {

    "LIM-CUZ": 120,
    "LIM-AQP": 95,
    "LIM-TRU": 85,
    "LIM-PIU": 90,
    "LIM-IQT": 110,
    "LIM-TPP": 105,
    "LIM-CIX": 90,
    "LIM-JUL": 115,
    "LIM-TCQ": 125,

    "CUZ-LIM": 120,
    "AQP-LIM": 95,
    "TRU-LIM": 85,
    "PIU-LIM": 90,
    "IQT-LIM": 110,
    "TPP-LIM": 105,
    "CIX-LIM": 90,
    "JUL-LIM": 115,
    "TCQ-LIM": 125

};


/* =========================================================
   PRECIOS INTERNACIONALES
   MONEDA BASE: USD
   ========================================================= */

const preciosInternacionales = {

    "LIM-SCL": 280,
    "LIM-EZE": 350,
    "LIM-BOG": 250,
    "LIM-CTG": 290,
    "LIM-GRU": 320,
    "LIM-GIG": 340,
    "LIM-MEX": 390,
    "LIM-MIA": 420,
    "LIM-JFK": 650,
    "LIM-LAX": 690,
    "LIM-MAD": 720,
    "LIM-BCN": 760,
    "LIM-CDG": 850,
    "LIM-FCO": 890,
    "LIM-LHR": 930,
    "LIM-AMS": 950,
    "LIM-FRA": 970,
    "LIM-NRT": 1250,
    "LIM-DXB": 1100,

    "SCL-LIM": 280,
    "EZE-LIM": 350,
    "BOG-LIM": 250,
    "MIA-LIM": 420,
    "JFK-LIM": 650,
    "MAD-LIM": 720,
    "CDG-LIM": 850,
    "FCO-LIM": 890,
    "LHR-LIM": 930,
    "NRT-LIM": 1250,
    "DXB-LIM": 1100

};


/* =========================================================
   SERVICIOS
   ========================================================= */

const preciosServicios = {

    hotel: 150,
    comida: 30,
    equipaje: 80,
    traslado: 50,
    seguro: 70,
    wifi: 25

};


/* =========================================================
   ASIENTOS OCUPADOS
   ========================================================= */

const asientosOcupados = [

    "1B",
    "2C",
    "3A",
    "4D",
    "5B",
    "6C",
    "7A",
    "8D",
    "10B",
    "12C",
    "14A",
    "16D",
    "18B",
    "20C"

];


/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarOrigenes();

        cargarEstadoAeropuertos();

        establecerFechaMinima();

    }
);


/* =========================================================
   PESTAÑAS
   ========================================================= */

function mostrarPanel(panel, boton) {

    document
        .querySelectorAll(".panel")
        .forEach(
            p =>
                p.classList.remove(
                    "active-panel"
                )
        );


    document
        .querySelectorAll(".tab")
        .forEach(
            t =>
                t.classList.remove(
                    "active"
                )
        );


    if (panel === "reservar") {

        document
            .getElementById(
                "panelReservar"
            )
            .classList.add(
                "active-panel"
            );

    }

    else if (panel === "administrar") {

        document
            .getElementById(
                "panelAdministrar"
            )
            .classList.add(
                "active-panel"
            );

    }

    else {

        document
            .getElementById(
                "panelEstado"
            )
            .classList.add(
                "active-panel"
            );

    }


    boton.classList.add(
        "active"
    );

}


/* =========================================================
   SELECCIONAR TIPO DE VUELO
   ========================================================= */

function seleccionarTipoVuelo(tipo) {

    tipoVuelo = tipo;


    document
        .getElementById(
            "btnNacional"
        )
        .classList.remove(
            "selected"
        );


    document
        .getElementById(
            "btnInternacional"
        )
        .classList.remove(
            "selected"
        );


    if (
        tipo === "nacional"
    ) {

        document
            .getElementById(
                "btnNacional"
            )
            .classList.add(
                "selected"
            );

    }

    else {

        document
            .getElementById(
                "btnInternacional"
            )
            .classList.add(
                "selected"
            );

    }


    /*
       Cada vez que cambia Nacional /
       Internacional se vuelven a
       cargar ORIGEN y DESTINO.
    */

    cargarOrigenes();

}


/* =========================================================
   CARGAR ORÍGENES
   ========================================================= */

function cargarOrigenes() {

    const origen =
        document.getElementById(
            "origen"
        );


    origen.innerHTML = "";


    /*
       🇵🇪 NACIONAL

       Origen:
       solamente aeropuertos del Perú.
    */

    if (
        tipoVuelo === "nacional"
    ) {

        aeropuertosPeru.forEach(
            aeropuerto => {

                agregarOpcion(
                    origen,
                    aeropuerto.codigo,
                    `${aeropuerto.ciudad} (${aeropuerto.codigo})`
                );

            }
        );

    }


    /*
       🌎 INTERNACIONAL

       Origen:
       catálogo de aeropuertos internacionales.

       Ya NO se utiliza la lista
       de departamentos del Perú.
    */

    else {

        aeropuertosInternacionales.forEach(
            aeropuerto => {

                agregarOpcion(
                    origen,
                    aeropuerto.codigo,
                    `${aeropuerto.ciudad} - ${aeropuerto.pais} (${aeropuerto.codigo})`
                );

            }
        );

        /*
           Para una agencia peruana,
           dejamos Lima como origen
           inicial.
        */

        origen.value = "LIM";

    }


    actualizarDestino();

}


/* =========================================================
   AGREGAR OPCIÓN
   ========================================================= */

function agregarOpcion(
    select,
    valor,
    texto
) {

    const option =
        document.createElement(
            "option"
        );


    option.value =
        valor;


    option.textContent =
        texto;


    select.appendChild(
        option
    );

}


/* =========================================================
   CARGAR DESTINOS
   ========================================================= */

function actualizarDestino() {

    const origen =
        document.getElementById(
            "origen"
        ).value;


    const destino =
        document.getElementById(
            "destino"
        );


    destino.innerHTML = "";


    /*
       🇵🇪 NACIONAL

       Origen y destino pertenecen
       únicamente al Perú.
    */

    if (
        tipoVuelo === "nacional"
    ) {

        aeropuertosPeru
            .filter(
                aeropuerto =>
                    aeropuerto.codigo !== origen
            )
            .forEach(
                aeropuerto => {

                    agregarOpcion(
                        destino,
                        aeropuerto.codigo,
                        `${aeropuerto.ciudad} (${aeropuerto.codigo})`
                    );

                }
            );

    }


    /*
       🌎 INTERNACIONAL

       Origen y destino pertenecen
       al catálogo internacional.

       No se carga la lista de
       departamentos nacionales.
    */

    else {

        aeropuertosInternacionales
            .filter(
                aeropuerto =>
                    aeropuerto.codigo !== origen
            )
            .forEach(
                aeropuerto => {

                    agregarOpcion(
                        destino,
                        aeropuerto.codigo,
                        `${aeropuerto.ciudad} - ${aeropuerto.pais} (${aeropuerto.codigo})`
                    );

                }
            );

    }


    actualizarTextoRuta();

}


/* =========================================================
   TEXTO DE RUTA
   ========================================================= */

function actualizarTextoRuta() {

    const origen =
        document.getElementById(
            "origen"
        );


    const destino =
        document.getElementById(
            "destino"
        );


    const info =
        document.getElementById(
            "infoRuta"
        );


    if (
        !origen.value ||
        !destino.value
    ) {

        info.textContent =
            "Seleccione origen y destino.";

        return;

    }


    info.textContent =
        `${origen.value} → ${destino.value} | ` +
        (
            tipoVuelo === "nacional"
                ? "Vuelo nacional dentro del Perú"
                : "Vuelo internacional"
        );

}


/* =========================================================
   TIPO DE VIAJE
   ========================================================= */

function cambiarTipoViaje() {

    tipoViaje =
        document.querySelector(
            'input[name="tipoViaje"]:checked'
        ).value;


    const campoRetorno =
        document.getElementById(
            "campoRetorno"
        );


    const fechaRetorno =
        document.getElementById(
            "fechaRetorno"
        );


    if (
        tipoViaje === "solo-ida"
    ) {

        campoRetorno.style.opacity =
            "0.45";

        fechaRetorno.disabled =
            true;

        fechaRetorno.value =
            "";

    }

    else {

        campoRetorno.style.opacity =
            "1";

        fechaRetorno.disabled =
            false;

    }

}


/* =========================================================
   PASAJEROS
   ========================================================= */

function cambiarPasajeros(
    tipo,
    cantidad
) {

    pasajeros[tipo] += cantidad;


    if (
        pasajeros[tipo] < 0
    ) {

        pasajeros[tipo] = 0;

    }


    if (
        tipo === "adultos" &&
        pasajeros[tipo] < 1
    ) {

        pasajeros[tipo] = 1;

    }


    document
        .getElementById(tipo)
        .textContent =
        pasajeros[tipo];


    actualizarContador();

}


/* =========================================================
   TOTAL PASAJEROS
   ========================================================= */

function obtenerTotalPasajeros() {

    return (

        pasajeros.adultos +

        pasajeros.ninos +

        pasajeros.infantes

    );

}


/* =========================================================
   BUSCAR VUELOS
   ========================================================= */

function buscarVuelos() {

    const origen =
        document.getElementById(
            "origen"
        ).value;


    const destino =
        document.getElementById(
            "destino"
        ).value;


    const fechaSalida =
        document.getElementById(
            "fechaSalida"
        ).value;


    const fechaRetorno =
        document.getElementById(
            "fechaRetorno"
        ).value;


    if (
        !fechaSalida
    ) {

        alert(
            "Seleccione la fecha de salida."
        );

        return;

    }


    if (
        tipoViaje === "ida-vuelta" &&
        !fechaRetorno
    ) {

        alert(
            "Seleccione la fecha de retorno."
        );

        return;

    }


    if (
        tipoViaje === "ida-vuelta" &&
        fechaRetorno < fechaSalida
    ) {

        alert(
            "La fecha de retorno no puede ser anterior a la fecha de salida."
        );

        return;

    }


    /*
       VALIDACIÓN NACIONAL
    */

    if (
        tipoVuelo === "nacional" &&
        (
            !preciosNacionales[
                `${origen}-${destino}`
            ]
        )
    ) {

        alert(
            "La ruta nacional seleccionada no se encuentra disponible."
        );

        return;

    }


    /*
       VALIDACIÓN INTERNACIONAL
    */

    if (
        tipoVuelo === "internacional" &&
        (
            !preciosInternacionales[
                `${origen}-${destino}`
            ]
        )
    ) {

        alert(
            "La ruta internacional seleccionada no se encuentra disponible."
        );

        return;

    }


    const ruta =
        `${origen}-${destino}`;


    let precio = 0;


    if (
        tipoVuelo === "nacional"
    ) {

        precio =
            preciosNacionales[
                ruta
            ];

    }

    else {

        precio =
            preciosInternacionales[
                ruta
            ];

    }


    precioBaseActual =
        precio;


    generarVuelos(
        origen,
        destino,
        precio
    );


    document
        .getElementById(
            "resultados"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "resultados"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   GENERAR VUELOS
   ========================================================= */

function generarVuelos(
    origen,
    destino,
    precioBase
) {

    const lista =
        document.getElementById(
            "listaVuelos"
        );


    lista.innerHTML = "";


    const horarios = [

        {
            salida: "06:30",
            llegada: "08:00",
            duracion: "1h 30min",
            escalas: "Directo"
        },

        {
            salida: "10:15",
            llegada: "11:45",
            duracion: "1h 30min",
            escalas: "Directo"
        },

        {
            salida: "15:20",
            llegada: "16:50",
            duracion: "1h 30min",
            escalas: "Directo"
        }

    ];


    horarios.forEach(
        (vuelo, index) => {

            const precio =
                precioBase +
                (index * 15);


            const precioMostrar =
                convertirPrecio(
                    precio
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "flight-card";


            card.innerHTML = `

                <div>

                    <div class="airline-name">
                        ANDES SKY
                    </div>

                    <small>
                        AS ${245 + index}
                    </small>

                </div>


                <div class="flight-route">

                    <div>

                        <div class="flight-time">
                            ${vuelo.salida}
                        </div>

                        <div class="flight-code">
                            ${origen}
                        </div>

                    </div>

                    <span>→</span>

                    <div>

                        <div class="flight-time">
                            ${vuelo.llegada}
                        </div>

                        <div class="flight-code">
                            ${destino}
                        </div>

                    </div>

                </div>


                <div class="flight-duration">

                    <strong>
                        ${vuelo.duracion}
                    </strong>

                    <br>

                    ${vuelo.escalas}

                </div>


                <div class="flight-price">

                    <strong>
                        ${precioMostrar}
                    </strong>

                    <small>
                        por persona
                    </small>

                    <button
                        onclick='seleccionarVuelo(
                            ${JSON.stringify({
                                numero:
                                    `AS${245 + index}`,

                                origen:
                                    origen,

                                destino:
                                    destino,

                                salida:
                                    vuelo.salida,

                                llegada:
                                    vuelo.llegada,

                                duracion:
                                    vuelo.duracion,

                                precio:
                                    precio
                            })}
                        '>

                        SELECCIONAR

                    </button>

                </div>

            `;


            lista.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   SELECCIONAR VUELO
   ========================================================= */

function seleccionarVuelo(
    vuelo
) {

    vueloSeleccionado =
        vuelo;


    asientosSeleccionados =
        [];


    generarFormularioPasajeros();

    generarAsientos();


    document
        .getElementById(
            "seccionPasajeros"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "seccionAsientos"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "servicios"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "seccionContacto"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "seccionPago"
        )
        .classList.remove(
            "hidden"
        );


    actualizarTotal();


    document
        .getElementById(
            "seccionPasajeros"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   FORMULARIO PASAJEROS
   ========================================================= */

function generarFormularioPasajeros() {

    const contenedor =
        document.getElementById(
            "formPasajeros"
        );


    contenedor.innerHTML = "";


    const total =
        obtenerTotalPasajeros();


    for (
        let i = 1;
        i <= total;
        i++
    ) {

        let tipo =
            "Adulto";


        if (
            i >
            pasajeros.adultos
        ) {

            if (
                i <=
                pasajeros.adultos +
                pasajeros.ninos
            ) {

                tipo =
                    "Niño";

            }

            else {

                tipo =
                    "Infante";

            }

        }


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "passenger-card";


        card.innerHTML = `

            <h4>
                Pasajero ${i} - ${tipo}
            </h4>

            <div class="form-grid">

                <div class="field">

                    <label>
                        Nombres
                    </label>

                    <input
                        type="text"
                        id="nombrePasajero${i}"
                        placeholder="Nombres">

                </div>


                <div class="field">

                    <label>
                        Apellidos
                    </label>

                    <input
                        type="text"
                        id="apellidoPasajero${i}"
                        placeholder="Apellidos">

                </div>


                <div class="field">

                    <label>
                        Documento
                    </label>

                    <input
                        type="text"
                        id="documentoPasajero${i}"
                        placeholder="DNI / Pasaporte">

                </div>


                <div class="field">

                    <label>
                        Nacionalidad
                    </label>

                    <input
                        type="text"
                        id="nacionalidadPasajero${i}"
                        placeholder="Nacionalidad">

                </div>

            </div>

        `;


        contenedor.appendChild(
            card
        );

    }

}


/* =========================================================
   ASIENTOS
   ========================================================= */

function generarAsientos() {

    const mapa =
        document.getElementById(
            "mapaAsientos"
        );


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


        ["A", "B", "C", "D"]
            .forEach(
                letra => {

                    const numero =
                        `${fila}${letra}`;


                    const button =
                        document.createElement(
                            "button"
                        );


                    button.className =
                        "seat-button";


                    button.textContent =
                        numero;


                    if (
                        asientosOcupados.includes(
                            numero
                        )
                    ) {

                        button.classList.add(
                            "occupied"
                        );

                        button.disabled =
                            true;

                    }

                    else {

                        button.onclick =
                            function () {

                                seleccionarAsiento(
                                    numero,
                                    button
                                );

                            };

                    }


                    row.appendChild(
                        button
                    );

                }
            );


        mapa.appendChild(
            row
        );

    }


    actualizarContador();

}


/* =========================================================
   SELECCIONAR ASIENTO
   ========================================================= */

function seleccionarAsiento(
    asiento,
    boton
) {

    const cantidadNecesaria =
        obtenerTotalPasajeros();


    if (
        asientosSeleccionados.includes(
            asiento
        )
    ) {

        asientosSeleccionados =
            asientosSeleccionados.filter(
                a =>
                    a !== asiento
            );


        boton.classList.remove(
            "selected"
        );

    }

    else {

        if (
            asientosSeleccionados.length >=
            cantidadNecesaria
        ) {

            alert(
                `Solo puede seleccionar ${cantidadNecesaria} asiento(s).`
            );

            return;

        }


        asientosSeleccionados.push(
            asiento
        );


        boton.classList.add(
            "selected"
        );

    }


    actualizarContador();

}


/* =========================================================
   CONTADOR ASIENTOS
   ========================================================= */

function actualizarContador() {

    const total =
        obtenerTotalPasajeros();


    document
        .getElementById(
            "contadorAsientos"
        )
        .textContent =
        `Asientos seleccionados: ${asientosSeleccionados.length} de ${total}`;

}


/* =========================================================
   CAMBIO DE MONEDA
   ========================================================= */

function cambiarMoneda() {

    monedaActual =
        document.getElementById(
            "moneda"
        ).value;


    /*
       Si ya hay vuelos mostrados,
       los volvemos a generar
       automáticamente con la nueva moneda.
    */

    if (
        vueloSeleccionado
    ) {

        generarVuelos(

            vueloSeleccionado.origen,

            vueloSeleccionado.destino,

            precioBaseActual

        );

    }


    actualizarTotal();

}


/* =========================================================
   CONVERSIÓN DE PRECIOS
   ========================================================= */

function convertirPrecio(
    precioUSD
) {

    let valor;


    if (
        monedaActual === "PEN"
    ) {

        valor =
            precioUSD *
            TASA_CAMBIO;


        return (
            "S/ " +
            valor.toFixed(2)
        );

    }


    else {

        valor =
            precioUSD;


        return (
            "$ " +
            valor.toFixed(2)
        );

    }

}


/* =========================================================
   PRECIO NUMÉRICO CONVERSIÓN
   ========================================================= */

function obtenerPrecioConvertido(
    precioUSD
) {

    if (
        monedaActual === "PEN"
    ) {

        return (
            precioUSD *
            TASA_CAMBIO
        );

    }


    return precioUSD;

}


/* =========================================================
   ACTUALIZAR TOTAL
   ========================================================= */

function actualizarTotal() {

    if (
        !vueloSeleccionado
    ) {

        return;

    }


    const cantidadPasajeros =
        obtenerTotalPasajeros();


    let total =
        vueloSeleccionado.precio *
        cantidadPasajeros;


    const servicios =
        document.querySelectorAll(
            ".service input:checked"
        );


    servicios.forEach(
        servicio => {

            total +=
                preciosServicios[
                    servicio.value
                ];

        }
    );


    const totalConvertido =
        obtenerPrecioConvertido(
            total
        );


    const simbolo =
        monedaActual === "PEN"
            ? "S/ "
            : "$ ";


    document
        .getElementById(
            "precioTotal"
        )
        .textContent =
        simbolo +
        totalConvertido.toFixed(2);

}


/* =========================================================
   CONFIRMAR RESERVA
   ========================================================= */

function confirmarReserva() {

    if (
        !vueloSeleccionado
    ) {

        alert(
            "Debe seleccionar un vuelo."
        );

        return;

    }


    const totalPasajeros =
        obtenerTotalPasajeros();


    if (
        asientosSeleccionados.length !==
        totalPasajeros
    ) {

        alert(
            `Debe seleccionar ${totalPasajeros} asiento(s).`
        );

        return;

    }


    if (
        !validarPasajeros()
    ) {

        return;

    }


    const nombre =
        document
            .getElementById(
                "contactoNombre"
            )
            .value.trim();


    const email =
        document
            .getElementById(
                "contactoEmail"
            )
            .value.trim();


    if (
        !nombre ||
        !email
    ) {

        alert(
            "Complete los datos de contacto."
        );

        return;

    }


    codigoReservaActual =
        generarCodigoReserva();


    mostrarResumen();


    document
        .getElementById(
            "confirmacion"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "codigoReserva"
        )
        .textContent =
        `Código de reserva: ${codigoReservaActual}`;


    document
        .getElementById(
            "confirmacion"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   VALIDAR PASAJEROS
   ========================================================= */

function validarPasajeros() {

    const total =
        obtenerTotalPasajeros();


    for (
        let i = 1;
        i <= total;
        i++
    ) {

        const nombre =
            document
                .getElementById(
                    `nombrePasajero${i}`
                )
                .value.trim();


        const apellido =
            document
                .getElementById(
                    `apellidoPasajero${i}`
                )
                .value.trim();


        const documento =
            document
                .getElementById(
                    `documentoPasajero${i}`
                )
                .value.trim();


        if (
            !nombre ||
            !apellido ||
            !documento
        ) {

            alert(
                `Complete los datos del pasajero ${i}.`
            );

            return false;

        }

    }


    return true;

}


/* =========================================================
   RESUMEN
   ========================================================= */

function mostrarResumen() {

    const resumen =
        document.getElementById(
            "resumenReserva"
        );


    const total =
        document
            .getElementById(
                "precioTotal"
            )
            .textContent;


    resumen.innerHTML = `

        <div class="summary-grid">


            <div class="summary-item">

                <small>
                    CÓDIGO DE RESERVA
                </small>

                <strong>
                    ${codigoReservaActual}
                </strong>

            </div>


            <div class="summary-item">

                <small>
                    TIPO DE VUELO
                </small>

                <strong>
                    ${
                        tipoVuelo === "nacional"
                            ? "🇵🇪 Nacional"
                            : "🌎 Internacional"
                    }
                </strong>

            </div>


            <div class="summary-item">

                <small>
                    VUELO
                </small>

                <strong>
                    ${vueloSeleccionado.numero}
                </strong>

            </div>


            <div class="summary-item">

                <small>
                    ORIGEN
                </small>

                <strong>
                    ${vueloSeleccionado.origen}
                </strong>

            </div>


            <div class="summary-item">

                <small>
                    DESTINO
                </small>

                <strong>
                    ${vueloSeleccionado.destino}
                </strong>

            </div>


            <div class="summary-item">

                <small>
                    HORARIO
                </small>

                <strong>
                    ${vueloSeleccionado.salida}
                    →
                    ${vueloSeleccionado.llegada}
                </strong>

            </div>


            <div class="summary-item">

                <small>
                    PASAJEROS
                </small>

                <strong>
                    ${obtenerTotalPasajeros()}
                </strong>

            </div>


            <div class="summary-item">

                <small>
                    ASIENTOS
                </small>

                <strong>
                    ${asientosSeleccionados.join(", ")}
                </strong>

            </div>


            <div class="summary-item">

                <small>
                    TOTAL
                </small>

                <strong>
                    ${total}
                </strong>

            </div>

        </div>

    `;


    document
        .getElementById(
            "seccionResumen"
        )
        .classList.remove(
            "hidden"
        );

}


/* =========================================================
   CÓDIGO DE RESERVA
   ========================================================= */

function generarCodigoReserva() {

    const numero =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return (
        `AST-2026-${numero}`
    );

}


/* =========================================================
   IMPRIMIR
   ========================================================= */

function imprimirReporte() {

    window.print();

}


/* =========================================================
   GUARDAR RESERVA
   ========================================================= */

function guardarReserva() {

    const reserva = {

        codigo:
            codigoReservaActual,

        tipoVuelo:
            tipoVuelo,

        tipoViaje:
            tipoViaje,

        vuelo:
            vueloSeleccionado,

        pasajeros:
            pasajeros,

        asientos:
            asientosSeleccionados,

        moneda:
            monedaActual,

        total:
            document
                .getElementById(
                    "precioTotal"
                )
                .textContent,

        fecha:
            new Date().toLocaleString()

    };


    localStorage.setItem(

        "ultimaReservaAndesSky",

        JSON.stringify(
            reserva
        )

    );


    alert(
        "La reserva ha sido guardada en este navegador."
    );

}


/* =========================================================
   ADMINISTRAR RESERVA
   ========================================================= */

function buscarReserva() {

    const codigo =
        document
            .getElementById(
                "buscarCodigo"
            )
            .value
            .trim()
            .toUpperCase();


    const reserva =
        localStorage.getItem(
            "ultimaReservaAndesSky"
        );


    const resultado =
        document.getElementById(
            "resultadoBusqueda"
        );


    if (
        !reserva
    ) {

        resultado.innerHTML = `

            <strong>
                No existen reservas guardadas
                en este navegador.
            </strong>

        `;

        return;

    }


    const datos =
        JSON.parse(
            reserva
        );


    if (
        codigo &&
        codigo !== datos.codigo
    ) {

        resultado.innerHTML = `

            <strong>
                No se encontró la reserva.
            </strong>

        `;

        return;

    }


    resultado.innerHTML = `

        <h3>
            Reserva encontrada
        </h3>

        <p>
            <strong>
                Código:
            </strong>

            ${datos.codigo}
        </p>

        <p>
            <strong>
                Tipo:
            </strong>

            ${
                datos.tipoVuelo === "nacional"
                    ? "Nacional"
                    : "Internacional"
            }
        </p>

        <p>
            <strong>
                Vuelo:
            </strong>

            ${datos.vuelo.numero}
        </p>

        <p>
            <strong>
                Ruta:
            </strong>

            ${datos.vuelo.origen}
            →
            ${datos.vuelo.destino}
        </p>

        <p>
            <strong>
                Asientos:
            </strong>

            ${datos.asientos.join(", ")}
        </p>

        <p>
            <strong>
                Total:
            </strong>

            ${datos.total}
        </p>

    `;

}


/* =========================================================
   ESTADO DEL VUELO
   ========================================================= */

function cargarEstadoAeropuertos() {

    const origen =
        document.getElementById(
            "estadoOrigen"
        );


    const destino =
        document.getElementById(
            "estadoDestino"
        );


    aeropuertosPeru.forEach(
        aeropuerto => {

            agregarOpcion(

                origen,

                aeropuerto.codigo,

                `${aeropuerto.ciudad} (${aeropuerto.codigo})`

            );


            agregarOpcion(

                destino,

                aeropuerto.codigo,

                `${aeropuerto.ciudad} (${aeropuerto.codigo})`

            );

        }
    );

}


/* =========================================================
   CONSULTAR ESTADO
   ========================================================= */

function consultarEstado() {

    const origen =
        document
            .getElementById(
                "estadoOrigen"
            )
            .value;


    const destino =
        document
            .getElementById(
                "estadoDestino"
            )
            .value;


    const resultado =
        document
            .getElementById(
                "resultadoEstado"
            );


    if (
        origen === destino
    ) {

        alert(
            "Seleccione ciudades diferentes."
        );

        return;

    }


    resultado.innerHTML = `

        <div class="status-card">

            <h2>
                AS 245
            </h2>

            <p>
                ${origen}
                →
                ${destino}
            </p>

            <p class="status-ok">
                ● A TIEMPO
            </p>

            <p>
                Salida estimada:
                10:15
            </p>

            <p>
                Llegada estimada:
                11:45
            </p>

        </div>

    `;

}


/* =========================================================
   BÚSQUEDA ESTADO
   ========================================================= */

function cambiarBusquedaEstado(
    tipo,
    boton
) {

    document
        .querySelectorAll(
            ".search-option"
        )
        .forEach(
            b =>
                b.classList.remove(
                    "active"
                )
        );


    boton.classList.add(
        "active"
    );


    if (
        tipo === "vuelo"
    ) {

        alert(
            "Modo de búsqueda por número de vuelo activado."
        );

    }

}


/* =========================================================
   FECHAS
   ========================================================= */

function establecerFechaMinima() {

    const hoy =
        new Date()
            .toISOString()
            .split("T")[0];


    document
        .getElementById(
            "fechaSalida"
        )
        .min =
        hoy;


    document
        .getElementById(
            "fechaRetorno"
        )
        .min =
        hoy;


    document
        .getElementById(
            "estadoFecha"
        )
        .min =
        hoy;

}


/* =========================================================
   FIN
   ========================================================= */
