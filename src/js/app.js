let paso = 1;
let pasoInicial = 1;
let pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}


document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});


function iniciarApp() {

    mostrarSeccion(); //Muestra y oculta las secciones
    tabs(); //Cambia la sección cuando se presionen los tabs
    botonesPaginador(); //Agrega o quita los botones del paginador
    paginaAnterior(); //Boton para pasa al siguiente tab
    paginaSiguiente(); //Boton para vover al tab anterior

    consultarAPI(); //Consulta la API en el backend de PHP

    idCliente(); //Añade el id del cliente al objeto de cita
    nombreCliente(); //Añade el nombre del cliente al objeto de cita
    seleccionarFecha(); //Añade la fecha de la cita en el objeto
    seleccionarHora(); //Añade la hora de la cita en el objeto

    mostrarResumen(); //Mostrar el resumen antes de registrarlo

}


function mostrarSeccion() {
    //Ocultar la sección que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');

    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }
    
    //Seleccionar la sección con el paso
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    
    seccion.classList.add('mostrar');

    //Quita la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual');

    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);

    tab.classList.add('actual');

}


function tabs() {

    const botones = document.querySelectorAll('.tabs button');

    botones.forEach( boton => {
        boton.addEventListener('click', function(e) {
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();
        });
    })
}


function botonesPaginador() {

    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');

        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();

}


function paginaAnterior() {

    const paginaAnterior = document.querySelector('#anterior');

    paginaAnterior.addEventListener('click', function() {

        if (paso <= pasoInicial) return;

        paso--;

        botonesPaginador();

    })

}


function paginaSiguiente() {
    
    const paginaSiguiente = document.querySelector('#siguiente');

    paginaSiguiente.addEventListener('click', function() {

        if (paso >= pasoFinal) return;

        paso++;

        botonesPaginador();

    })
    
}


async function consultarAPI() {

    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();

        mostrarServicios(servicios);
        
    } catch (error) {
        console.log(error);
    }
}


function mostrarServicios(servicios) {
    servicios.forEach( servicio => {
        const {id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `${precio} €`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function() {
            seleccionarServicio(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
        
    });
}


function seleccionarServicio(servicio) {
    const {id} = servicio;
    const {servicios} = cita;

    //Identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    //Comprobar si un servicio ya fue agregado
    if (servicios.some(agregado => agregado.id === id)) {
        //Eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);

        divServicio.classList.remove('seleccionado');
    } else {
        //Agregarlo
        cita.servicios = [...servicios, servicio];

        divServicio.classList.add('seleccionado');
    }
}


function idCliente() {
    cita.id = document.querySelector('#id').value;
}


function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
}


function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');

    inputFecha.addEventListener('input', function(e) {

        const dia = new Date(e.target.value).getUTCDay();

        if ([6, 0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana cerrado', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }

    });
}


function seleccionarHora() {
    const inputHora = document.querySelector('#hora');

    inputHora.addEventListener('input', function(e) {

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];

        if (hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Fuera del horario', 'error', '.formulario');
        } else {
            cita.hora = e.target.value;
        }
    });
}


function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    //Previene la creación de alertas duplicadas
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece) {
        setTimeout(() => {
            alerta.remove();
        }, 4500);
    }
}


function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    //Limpiar el contenido de Resumen
    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Faltan datos por introducir', 'error', '.contenido-resumen', false);

        return;
    }

    //Formatear el DIV de resumen
    const {nombre, fecha, hora, servicios} = cita;

    //Heading para servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de Servicios';
    resumen.appendChild(headingServicios);

    //Iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const {id, nombre, precio} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> ${precio} €`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    })

    //Heading para cita en Resumen
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de Cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    //Formatear la fecha en Español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate();
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes, dia));

    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fechaFormateada = fechaUTC.toLocaleDateString('es-ES', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

    //Boton para crear una cita
    const botonReservar = document.createElement('BUTTON');
    botonReservar.classList.add('boton');
    botonReservar.textContent = 'Reservar Cita';
    botonReservar.onclick = reservarCita;

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    resumen.appendChild(botonReservar);
}


async function reservarCita() {
    
    const {nombre, fecha, hora, servicios, id} = cita;

    const idServicios = servicios.map(servicio => servicio.id);

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);


    try {
        //Petición hacia la API
        const url = '/api/citas';

        const respuesta = await fetch(url, {
            method:'POST',
            body: datos
        });

        const resultado = await respuesta.json();

        if (resultado.resultado) {
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "Tu cita fue creada correctamente",
                button: 'Aceptar'
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            })
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Sucedio un Error al guardar la cita",
            button: 'Aceptar'
        });
    }

    
}
