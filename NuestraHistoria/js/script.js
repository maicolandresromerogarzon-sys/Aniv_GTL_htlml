```javascript
/* =========================================================
   NUESTRA HISTORIA
   JAVASCRIPT
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

/*
   FECHA DE INICIO DE LA RELACIÓN

   Año: 2026
   Mes: febrero
   Día: 13

   IMPORTANTE:
   JavaScript cuenta los meses desde 0:
   enero = 0
   febrero = 1
   marzo = 2
*/

const fechaInicio = new Date(
    2026,
    1,
    13,
    0,
    0,
    0
);


/* =========================================================
   CONTADOR
========================================================= */

function actualizarContador() {

    const ahora = new Date();

    const diferencia =
        ahora.getTime() -
        fechaInicio.getTime();


    /*
       Si por alguna razón la fecha actual
       es anterior a la fecha de inicio,
       mostramos cero.
    */

    if (diferencia < 0) {

        document.getElementById("dias").textContent = "0";

        document.getElementById("meses").textContent = "0";

        document.getElementById("horas").textContent = "0";

        document.getElementById("minutos").textContent = "0";

        return;
    }


    /* =====================================================
       DÍAS
    ====================================================== */

    const dias =
        Math.floor(
            diferencia /
            (1000 * 60 * 60 * 24)
        );


    /* =====================================================
       HORAS TOTALES
    ====================================================== */

    const horas =
        Math.floor(
            diferencia /
            (1000 * 60 * 60)
        );


    /* =====================================================
       MINUTOS TOTALES
    ====================================================== */

    const minutos =
        Math.floor(
            diferencia /
            (1000 * 60)
        );


    /* =====================================================
       MESES APROXIMADOS
    ====================================================== */

    let meses =
        (ahora.getFullYear() -
            fechaInicio.getFullYear()) * 12;

    meses +=
        ahora.getMonth() -
        fechaInicio.getMonth();


    /*
       Si todavía no hemos llegado al mismo
       día del mes, quitamos un mes.
    */

    if (
        ahora.getDate() <
        fechaInicio.getDate()
    ) {

        meses--;

    }


    if (meses < 0) {
        meses = 0;
    }


    /* =====================================================
       MOSTRAR INFORMACIÓN
    ====================================================== */

    document.getElementById("dias")
        .textContent =
        dias.toLocaleString("es-CO");


    document.getElementById("meses")
        .textContent =
        meses.toLocaleString("es-CO");


    document.getElementById("horas")
        .textContent =
        horas.toLocaleString("es-CO");


    document.getElementById("minutos")
        .textContent =
        minutos.toLocaleString("es-CO");

}


/*
   Actualizar inmediatamente
*/

actualizarContador();


/*
   Actualizar cada segundo
*/

setInterval(
    actualizarContador,
    1000
);


/* =========================================================
   ABRIR LA HISTORIA
========================================================= */

function abrirHistoria() {

    const pantallaInicio =
        document.getElementById("inicio");

    const paginaHistoria =
        document.getElementById("historia");


    /*
       Desaparece el frasco
    */

    pantallaInicio.classList.add("ocultar");


    /*
       Después aparece la página
    */

    setTimeout(
        function () {

            paginaHistoria.classList.add("mostrar");

        },
        500
    );

}


/* =========================================================
   CAMBIAR DE SECCIÓN
========================================================= */

function mostrarSeccion(
    nombre,
    boton
) {

    /*
       Obtener todas las secciones
    */

    const secciones =
        document.querySelectorAll(".seccion");


    /*
       Ocultar todas
    */

    secciones.forEach(
        function (seccion) {

            seccion.classList.remove("activa");

        }
    );


    /*
       Mostrar la seleccionada
    */

    const seleccionada =
        document.getElementById(nombre);


    if (seleccionada) {

        seleccionada.classList.add("activa");

    }


    /*
       Quitar estado activo de botones
    */

    const botones =
        document.querySelectorAll(".boton-menu");


    botones.forEach(
        function (b) {

            b.classList.remove("activo-menu");

        }
    );


    /*
       Activar botón seleccionado
    */

    if (boton) {

        boton.classList.add("activo-menu");

    }


    /*
       Volver al principio del contenido
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   ABRIR FOTO GRANDE
========================================================= */

function abrirFoto(
    ruta
) {

    const visor =
        document.getElementById("visorFoto");

    const foto =
        document.getElementById("fotoGrande");


    foto.src = ruta;


    visor.classList.add("abierto");


    /*
       Bloquear desplazamiento
       mientras la foto está abierta
    */

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CERRAR FOTO
========================================================= */

function cerrarFoto() {

    const visor =
        document.getElementById("visorFoto");


    visor.classList.remove("abierto");


    document.body.style.overflow =
        "";

}


/* =========================================================
   CERRAR FOTO CON ESC
========================================================= */

document.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "Escape"
        ) {

            cerrarFoto();

        }

    }
);


/* =========================================================
   PREVENIR ERRORES SI NO EXISTE ALGÚN ELEMENTO
========================================================= */

window.addEventListener(
    "load",
    function () {

        console.log(
            "Nuestra Historia ha cargado correctamente ♡"
        );

        console.log(
            "Fecha de inicio:",
            fechaInicio.toLocaleDateString(
                "es-CO"
            )
        );

    }
);
```
