/* =========================================================
   ANDES SKY TRAVEL
   SISTEMA DE RESERVAS DE VUELOS
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   VARIABLES PRINCIPALES
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

let precioBaseActual = 0;
let codigoReservaActual = "";

const TASA_CAMBIO = 3.50;


/* =========================================================
   AEROPUERTOS NACIONALES
   ========================================================= */

const aeropuertosPeru = [

    {
        ciudad: "Lima",
        pais: "Perú",
        codigo: "LIM"
    },

    {
        ciudad: "Arequipa",
        pais: "Perú",
        codigo: "AQP"
    },

    {
        ciudad: "Cusco",
        pais: "Perú",
        codigo: "CUZ"
    },

    {
        ciudad: "Trujillo",
        pais: "Perú",
        codigo: "TRU"
    },

    {
        ciudad: "Piura",
        pais: "Perú",
        codigo: "PIU"
    },

    {
        ciudad: "Iquitos",
        pais: "Perú",
        codigo: "IQT"
    },

    {
        ciudad: "Tarapoto",
        pais: "Perú",
        codigo: "TPP"
    },

    {
        ciudad: "Chiclayo",
        pais: "Perú",
        codigo: "CIX"
    },

    {
        ciudad: "Juliaca",
        pais: "Perú",
        codigo: "JUL"
    },

    {
        ciudad: "Tacna",
        pais: "Perú",
        codigo: "TCQ"
    }

];


/* =========================================================
   AEROPUERTOS INTERNACIONALES
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
   PRECIOS BASE NACIONALES
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
   ========================================================= */

const preciosInternacionales = {

    "LIM-SCL": 290,
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

    "SCL-LIM": 290,
    "EZE-LIM": 350,
    "BOG-LIM": 250,
    "CTG-LIM": 290,
    "GRU-LIM": 320,
    "GIG-LIM": 340,
    "MEX-LIM": 390,
    "MIA-LIM": 420,
    "JFK-LIM": 650,
    "LAX-LIM": 690,
    "MAD-LIM": 720,
    "BCN-LIM": 760,
    "CDG-LIM": 850,
    "FCO-LIM": 890,
    "LHR-LIM": 930,
    "AMS-LIM": 950,
    "FRA-LIM": 970,
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

        cambiarTipoViaje();

    }
);


/* =========================================================
   TIPO DE VUELO
   ========================================================= */

function seleccionarTipoVuelo(tipo) {

    tipoVuelo = tipo;


    const nacional =
        document.getElementById(
            "btnNacional"
        );

    const internacional =
        document.getElementById(
            "btnInternacional"
        );


    if (nacional) {

        nacional.classList.remove(
            "selected"
        );

    }


    if (internacional) {

        internacional.classList.remove(
            "selected"
        );

    }


    if (
        tipo === "nacional"
    ) {

        if (nacional) {

            nacional.classList.add(
                "selected"
            );

        }

    }

    else {

        if (internacional) {

            internacional.classList.add(
                "selected"
            );

        }

    }


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


    if (!origen) {
        return;
    }


    origen.innerHTML = "";


    let lista;


    if (
        tipoVuelo === "nacional"
    ) {

        lista =
            aeropuertosPeru;

    }

    else {

        lista =
            aeropuertosInternacionales;

    }


    lista.forEach(
        function (aeropuerto) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                aeropuerto.codigo;


            if (
                tipoVuelo === "nacional"
            ) {

                option.textContent =
                    `${aeropuerto.ciudad} (${aeropuerto.codigo})`;

            }

            else {

                option.textContent =
                    `${aeropuerto.ciudad} - ${aeropuerto.pais} (${aeropuerto.codigo})`;

            }


            origen.appendChild(
                option
            );

        }
    );


    /*
       Para internacional,
       Lima será el origen inicial.
    */

    if (
        tipoVuelo === "internacional" &&
        lista.some(
            function (a) {
                return a.codigo === "LIM";
            }
        )
    ) {

        origen.value =
            "LIM";

    }


    actualizarDestino();

}


/* =========================================================
   CARGAR DESTINOS
   ========================================================= */

function actualizarDestino() {

    const origen =
        document.getElementById(
            "origen"
        );


    const destino =
        document.getElementById(
            "destino"
        );


    if (
        !origen ||
        !destino
    ) {

        return;

    }


    destino.innerHTML = "";


    let lista;


    if (
        tipoVuelo === "nacional"
    ) {

        lista =
            aeropuertosPeru;

    }

    else {

        lista =
            aeropuertosInternacionales;

    }


    /*
       IMPORTANTE:

       Se excluye solamente el mismo
       aeropuerto seleccionado como origen.

       Todo lo demás queda disponible.
    */

    lista
        .filter(
            function (aeropuerto) {

                return (
                    aeropuerto.codigo !==
                    origen.value
                );

            }
        )
        .forEach(
            function (aeropuerto) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    aeropuerto.codigo;


                if (
                    tipoVuelo === "nacional"
                ) {

                    option.textContent =
                        `${aeropuerto.ciudad} (${aeropuerto.codigo})`;

                }

                else {

                    option.textContent =
                        `${aeropuerto.ciudad} - ${aeropuerto.pais} (${aeropuerto.codigo})`;

                }


                destino.appendChild(
                    option
                );

            }
        );


    actualizarTextoRuta();

}


/* =========================================================
   CAMBIO DE ORIGEN
   ========================================================= */

function cambioOrigen() {

    actualizarDestino();

}


/* =========================================================
   INFORMACIÓN DE RUTA
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
        !origen ||
        !destino ||
        !info
    ) {

        return;

    }


    if (
        !origen.value ||
        !destino.value
    ) {

        info.textContent =
            "Seleccione origen y destino.";

        return;

    }


    if (
        tipoVuelo === "nacional"
    ) {

        info.textContent =
            `${origen.value} → ${destino.value} | Vuelo nacional`;

    }

    else {

        info.textContent =
            `${origen.value} → ${destino.value} | Vuelo internacional`;

    }

}


/* =========================================================
   TIPO DE VIAJE
   ========================================================= */

function cambiarTipoViaje() {

    const elemento =
        document.querySelector(
            'input[name="tipoViaje"]:checked'
        );


    if (!elemento) {
        return;
    }


    tipoViaje =
        elemento.value;


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

        if (campoRetorno) {

            campoRetorno.style.opacity =
                "0.45";

        }


        if (fechaRetorno) {

            fechaRetorno.disabled =
                true;

            fechaRetorno.value =
                "";

        }

    }

    else {

        if (campoRetorno) {

            campoRetorno.style.opacity =
                "1";

        }


        if (fechaRetorno) {

            fechaRetorno.disabled =
                false;

        }

    }

}


/* =========================================================
   PASAJEROS
   ========================================================= */

function cambiarPasajeros(
    tipo,
    cantidad
) {

    pasajeros[tipo] +=
        cantidad;


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


    const elemento =
        document.getElementById(
            tipo
        );


    if (elemento) {

        elemento.textContent =
            pasajeros[tipo];

    }


    if (
        vueloSeleccionado
    ) {

        generarFormularioPasajeros();

        generarAsientos();

        actualizarTotal();

    }

}


/* =========================================================
   TOTAL DE PASAJEROS
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
   TODAS LAS RUTAS ESTÁN DISPONIBLES
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


    /*
       VALIDAR FECHA
    */

    if (!fechaSalida) {

        alert(
            "Seleccione la fecha de salida."
        );

        return;

    }


    /*
       VALIDAR RETORNO
    */

    if (
        tipoViaje === "ida-vuelta" &&
        !fechaRetorno
    ) {

        alert(
            "Seleccione la fecha de retorno."
        );

        return;

    }


    /*
       VALIDAR FECHAS
    */

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
       VALIDAR RUTA
    */

    if (
        origen === destino
    ) {

        alert(
            "El origen y el destino deben ser diferentes."
        );

        return;

    }


    /*
       =====================================================
       PRECIO BASE
       =====================================================

       Si la ruta existe en nuestra tabla,
       usamos su precio.

       Si NO existe,
       generamos automáticamente un
       precio según el tipo de vuelo.

       De esta manera TODAS las rutas
       estarán disponibles.
    */

    const ruta =
        `${origen}-${destino}`;


    let precio;


    if (
        tipoVuelo === "nacional"
    ) {

        precio =
            preciosNacionales[ruta];


        /*
           Si no existe la ruta,
           se genera un precio base.
        */

        if (!precio) {

            precio =
                generarPrecioNacional(
                    origen,
                    destino
                );

        }

    }

    else {

        precio =
            preciosInternacionales[ruta];


        /*
           Si no existe la ruta,
           se genera automáticamente.
        */

        if (!precio) {

            precio =
                generarPrecioInternacional(
                    origen,
                    destino
                );

        }

    }


    precioBaseActual =
        precio;


    /*
       GENERAR VUELOS
    */

    generarVuelos(
        origen,
        destino,
        precio
    );


    /*
       MOSTRAR RESULTADOS
    */

    const resultados =
        document.getElementById(
            "resultados"
        );


    if (resultados) {

        resultados.classList.remove(
            "hidden"
        );


        resultados.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   GENERAR PRECIO NACIONAL
   ========================================================= */

function generarPrecioNacional(
    origen,
    destino
) {

    /*
       Precio base académico.
       Se genera según los códigos
       para que todas las rutas
       tengan un precio diferente.
    */

    const numeroOrigen =
        obtenerNumeroCodigo(
            origen
        );


    const numeroDestino =
        obtenerNumeroCodigo(
            destino
        );


    const diferencia =
        Math.abs(
            numeroOrigen -
            numeroDestino
        );


    return (
        80 +
        (diferencia * 3)
    );

}


/* =========================================================
   GENERAR PRECIO INTERNACIONAL
   ========================================================= */

function generarPrecioInternacional(
    origen,
    destino
) {

    const origenInfo =
        buscarAeropuerto(
            origen
        );


    const destinoInfo =
        buscarAeropuerto(
            destino
        );


    /*
       Distancia aproximada académica
       según regiones.
    */

    let precio = 290;


    if (
        destinoInfo
    ) {

        const pais =
            destinoInfo.pais;


        if (
            pais === "Chile"
        ) {

            precio = 290;

        }

        else if (
            pais === "Argentina"
        ) {

            precio = 350;

        }

        else if (
            pais === "Colombia"
        ) {

            precio = 250;

        }

        else if (
            pais === "Brasil"
        ) {

            precio = 320;

        }

        else if (
            pais === "México"
        ) {

            precio = 390;

        }

        else if (
            pais === "Estados Unidos"
        ) {

            precio = 450;

        }

        else if (
            pais === "España"
        ) {

            precio = 720;

        }

        else if (
            pais === "Francia"
        ) {

            precio = 850;

        }

        else if (
            pais === "Italia"
        ) {

            precio = 890;

        }

        else if (
            pais === "Reino Unido"
        ) {

            precio = 930;

        }

        else if (
            pais === "Países Bajos"
        ) {

            precio = 950;

        }

        else if (
            pais === "Alemania"
        ) {

            precio = 970;

        }

        else if (
            pais === "Japón"
        ) {

            precio = 1250;

        }

        else if (
            pais === "Emiratos Árabes Unidos"
        ) {

            precio = 1100;

        }

    }


    /*
       Si el origen también es internacional,
       agregamos una pequeña variación.
    */

    if (
        origenInfo &&
        origenInfo.pais !== "Perú"
    ) {

        precio += 100;

    }


    return precio;

}


/* =========================================================
   OBTENER NÚMERO DE CÓDIGO
   ========================================================= */

function obtenerNumeroCodigo(
    codigo
) {

    let total = 0;


    for (
        let i = 0;
        i < codigo.length;
        i++
    ) {

        total +=
            codigo.charCodeAt(i);

    }


    return total;

}


/* =========================================================
   BUSCAR AEROPUERTO
   ========================================================= */

function buscarAeropuerto(
    codigo
) {

    const todos = [

        ...aeropuertosPeru,

        ...aeropuertosInternacionales

    ];


    return todos.find(
        function (aeropuerto) {

            return (
                aeropuerto.codigo ===
                codigo
            );

        }
    );

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


    if (!lista) {
        return;
    }


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
        function (horario, index) {

            const precio =
                precioBase +
                (index * 15);


            const vuelo = {

                numero:
                    `AS${245 + index}`,

                origen:
                    origen,

                destino:
                    destino,

                salida:
                    horario.salida,

                llegada:
                    horario.llegada,

                duracion:
                    horario.duracion,

                escalas:
                    horario.escalas,

                precio:
                    precio

            };


            /*
               TARJETA
            */

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "flight-card";


            /*
               AEROLÍNEA
            */

            const informacion =
                document.createElement(
                    "div"
                );


            informacion.innerHTML = `

                <div class="airline-name">
                    ANDES SKY
                </div>

                <small>
                    ${vuelo.numero}
                </small>

            `;


            /*
               RUTA
            */

            const ruta =
                document.createElement(
                    "div"
                );


            ruta.className =
                "flight-route";


            ruta.innerHTML = `

                <div>

                    <div class="flight-time">
                        ${vuelo.salida}
                    </div>

                    <div class="flight-code">
                        ${vuelo.origen}
                    </div>

                </div>

                <span>→</span>

                <div>

                    <div class="flight-time">
                        ${vuelo.llegada}
                    </div>

                    <div class="flight-code">
                        ${vuelo.destino}
                    </div>

                </div>

            `;


            /*
               DURACIÓN
            */

            const duracion =
                document.createElement(
                    "div"
                );


            duracion.className =
                "flight-duration";


            duracion.innerHTML = `

                <strong>
                    ${vuelo.duracion}
                </strong>

                <br>

                ${vuelo.escalas}

            `;


            /*
               PRECIO
            */

            const precioDiv =
                document.createElement(
                    "div"
                );


            precioDiv.className =
                "flight-price";


            const precioTexto =
                document.createElement(
                    "strong"
                );


            precioTexto.textContent =
                convertirPrecio(
                    vuelo.precio
                );


            const descripcion =
                document.createElement(
                    "small"
                );


            descripcion.textContent =
                "por persona";


            /*
               BOTÓN SELECCIONAR
            */

            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


            boton.textContent =
                "SELECCIONAR";


            /*
               EVENTO CLICK
            */

            boton.addEventListener(
                "click",
                function () {

                    seleccionarVuelo(
                        vuelo
                    );

                }
            );


            precioDiv.appendChild(
                precioTexto
            );


            precioDiv.appendChild(
                descripcion
            );


            precioDiv.appendChild(
                boton
            );


            /*
               ARMAR TARJETA
            */

            card.appendChild(
                informacion
            );

            card.appendChild(
                ruta
            );

            card.appendChild(
                duracion
            );

            card.appendChild(
                precioDiv
            );


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


    const secciones = [

        "seccionPasajeros",

        "seccionAsientos",

        "servicios",

        "seccionContacto",

        "seccionPago"

    ];


    secciones.forEach(
        function (id) {

            const elemento =
                document.getElementById(
                    id
                );


            if (elemento) {

                elemento.classList.remove(
                    "hidden"
                );

            }

        }
    );


    actualizarTotal();


    alert(
        `Vuelo ${vuelo.numero} seleccionado correctamente.`
    );


    const pasajeros =
        document.getElementById(
            "seccionPasajeros"
        );


    if (pasajeros) {

        pasajeros.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   FORMULARIO PASAJEROS
   ========================================================= */

function generarFormularioPasajeros() {

    const contenedor =
        document.getElementById(
            "formPasajeros"
        );


    if (!contenedor) {
        return;
    }


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
            i > pasajeros.adultos
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
   GENERAR ASIENTOS
   ========================================================= */

function generarAsientos() {

    const mapa =
        document.getElementById(
            "mapaAsientos"
        );


    if (!mapa) {
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


        const letras = [
            "A",
            "B",
            "C",
            "D"
        ];


        letras.forEach(
            function (letra) {

                const numero =
                    `${fila}${letra}`;


                const boton =
                    document.createElement(
                        "button"
                    );


                boton.type =
                    "button";


                boton.className =
                    "seat-button";


                boton.textContent =
                    numero;


                if (
                    asientosOcupados.includes(
                        numero
                    )
                ) {

                    boton.classList.add(
                        "occupied"
                    );


                    boton.disabled =
                        true;

                }

                else {

                    boton.addEventListener(
                        "click",
                        function () {

                            seleccionarAsiento(
                                numero,
                                boton
                            );

                        }
                    );

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
                function (a) {

                    return a !== asiento;

                }
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

    const elemento =
        document.getElementById(
            "contadorAsientos"
        );


    if (!elemento) {
        return;
    }


    const total =
        obtenerTotalPasajeros();


    elemento.textContent =
        `Asientos seleccionados: ${asientosSeleccionados.length} de ${total}`;

}


/* =========================================================
   CAMBIAR MONEDA
   ========================================================= */

function cambiarMoneda() {

    const elemento =
        document.getElementById(
            "moneda"
        );


    if (!elemento) {
        return;
    }


    monedaActual =
        elemento.value;


    /*
       Actualizar vuelos
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
   CONVERTIR PRECIO
   ========================================================= */

function convertirPrecio(
    precioUSD
) {

    if (
        monedaActual === "PEN"
    ) {

        return (

            "S/ " +

            (
                precioUSD *
                TASA_CAMBIO
            ).toFixed(2)

        );

    }


    return (

        "$ " +

        precioUSD.toFixed(2)

    );

}


/* =========================================================
   OBTENER PRECIO CONVERTIDO
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


    const cantidad =
        obtenerTotalPasajeros();


    let total =
        vueloSeleccionado.precio *
        cantidad;


    /*
       SERVICIOS
    */

    const servicios =
        document.querySelectorAll(
            ".service input:checked"
        );


    servicios.forEach(
        function (servicio) {

            if (
                preciosServicios[
                    servicio.value
                ]
            ) {

                total +=
                    preciosServicios[
                        servicio.value
                    ];

            }

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


    const elemento =
        document.getElementById(
            "precioTotal"
        );


    if (elemento) {

        elemento.textContent =
            simbolo +
            totalConvertido.toFixed(2);

    }

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
                .value
                .trim();


        const apellido =
            document
                .getElementById(
                    `apellidoPasajero${i}`
                )
                .value
                .trim();


        const documento =
            document
                .getElementById(
                    `documentoPasajero${i}`
                )
                .value
                .trim();


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
   CONFIRMAR RESERVA
   ========================================================= */

function confirmarReserva() {

    if (
        !vueloSeleccionado
    ) {

        alert(
            "Primero debe seleccionar un vuelo."
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


    const contactoNombre =
        document.getElementById(
            "contactoNombre"
        );


    const contactoEmail =
        document.getElementById(
            "contactoEmail"
        );


    if (
        contactoNombre &&
        !contactoNombre.value.trim()
    ) {

        alert(
            "Ingrese el nombre del contacto."
        );

        return;

    }


    if (
        contactoEmail &&
        !contactoEmail.value.trim()
    ) {

        alert(
            "Ingrese el correo electrónico."
        );

        return;

    }


    codigoReservaActual =
        generarCodigoReserva();


    mostrarResumen();


    const confirmacion =
        document.getElementById(
            "confirmacion"
        );


    if (confirmacion) {

        confirmacion.classList.remove(
            "hidden"
        );

    }


    const codigo =
        document.getElementById(
            "codigoReserva"
        );


    if (codigo) {

        codigo.textContent =
            `Código de reserva: ${codigoReservaActual}`;

    }


    if (confirmacion) {

        confirmacion.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   GENERAR RESUMEN
   ========================================================= */

function mostrarResumen() {

    const resumen =
        document.getElementById(
            "resumenReserva"
        );


    if (!resumen) {
        return;
    }


    const total =
        document.getElementById(
            "precioTotal"
        );


    const precio =
        total
            ? total.textContent
            : "Pendiente";


    resumen.innerHTML = `

        <div class="summary-grid">

            <div class="summary-item">

                <small>
                    CÓDIGO
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
                    ${precio}
                </strong>

            </div>

        </div>

    `;


    const seccion =
        document.getElementById(
            "seccionResumen"
        );


    if (seccion) {

        seccion.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   CÓDIGO DE RESERVA
   ========================================================= */

function generarCodigoReserva() {

    const numero =
        Math.floor(
            1000 +
            Math.random() *
            9000
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
            document.getElementById(
                "precioTotal"
            )
            ?.textContent,

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
        "La reserva ha sido guardada correctamente."
    );

}


/* =========================================================
   BUSCAR RESERVA
   ========================================================= */

function buscarReserva() {

    const campo =
        document.getElementById(
            "buscarCodigo"
        );


    const resultado =
        document.getElementById(
            "resultadoBusqueda"
        );


    if (
        !campo ||
        !resultado
    ) {

        return;

    }


    const codigo =
        campo.value
            .trim()
            .toUpperCase();


    const reserva =
        localStorage.getItem(
            "ultimaReservaAndesSky"
        );


    if (!reserva) {

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

        <div class="status-card">

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

        </div>

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


    if (
        !origen ||
        !destino
    ) {

        return;

    }


    origen.innerHTML = "";

    destino.innerHTML = "";


    aeropuertosPeru.forEach(
        function (aeropuerto) {

            const opcionOrigen =
                document.createElement(
                    "option"
                );


            opcionOrigen.value =
                aeropuerto.codigo;


            opcionOrigen.textContent =
                `${aeropuerto.ciudad} (${aeropuerto.codigo})`;


            origen.appendChild(
                opcionOrigen
            );


            const opcionDestino =
                document.createElement(
                    "option"
                );


            opcionDestino.value =
                aeropuerto.codigo;


            opcionDestino.textContent =
                `${aeropuerto.ciudad} (${aeropuerto.codigo})`;


            destino.appendChild(
                opcionDestino
            );

        }
    );

}


/* =========================================================
   CONSULTAR ESTADO
   ========================================================= */

function consultarEstado() {

    const origen =
        document.getElementById(
            "estadoOrigen"
        );


    const destino =
        document.getElementById(
            "estadoDestino"
        );


    const resultado =
        document.getElementById(
            "resultadoEstado"
        );


    if (
        !origen ||
        !destino ||
        !resultado
    ) {

        return;

    }


    if (
        origen.value ===
        destino.value
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
                ${origen.value}
                →
                ${destino.value}
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
   FECHAS
   ========================================================= */

function establecerFechaMinima() {

    const hoy =
        new Date()
            .toISOString()
            .split("T")[0];


    const fechaSalida =
        document.getElementById(
            "fechaSalida"
        );


    const fechaRetorno =
        document.getElementById(
            "fechaRetorno"
        );


    const estadoFecha =
        document.getElementById(
            "estadoFecha"
        );


    if (fechaSalida) {

        fechaSalida.min =
            hoy;

    }


    if (fechaRetorno) {

        fechaRetorno.min =
            hoy;

    }


    if (estadoFecha) {

        estadoFecha.min =
            hoy;

    }

}


/* =========================================================
   ACTUALIZAR FECHA RETORNO
   ========================================================= */

document.addEventListener(
    "change",
    function (evento) {

        if (
            evento.target &&
            evento.target.id ===
            "fechaSalida"
        ) {

            const fechaRetorno =
                document.getElementById(
                    "fechaRetorno"
                );


            if (fechaRetorno) {

                fechaRetorno.min =
                    evento.target.value;

            }

        }

    }
);


/* =========================================================
   FIN DEL SCRIPT
   ========================================================= */
