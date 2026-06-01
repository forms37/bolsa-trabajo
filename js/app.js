let todasLasVacantes = [];

async function cargarVacantes() {

  const respuesta =
    await fetch("vacantes.json");

  todasLasVacantes =
    await respuesta.json();

  cargarFiltros();

  renderizarVacantes();

}

function cargarFiltros() {

  const ciudades =
    [...new Set(
      todasLasVacantes.map(v => v.ciudad)
    )];

  const modalidades =
    [...new Set(
      todasLasVacantes.map(v => v.modalidad)
    )];

  const jornadas =
    [...new Set(
      todasLasVacantes.map(v => v.jornada)
    )];

  agregarOpciones(
    "filtroCiudad",
    ciudades
  );

  agregarOpciones(
    "filtroModalidad",
    modalidades
  );

  agregarOpciones(
    "filtroJornada",
    jornadas
  );

}

function agregarOpciones(id, valores){

  const select =
    document.getElementById(id);

  valores.sort();

  valores.forEach(valor => {

    const opcion =
      document.createElement("option");

    opcion.value = valor;
    opcion.textContent = valor;

    select.appendChild(opcion);

  });

}

function renderizarVacantes() {

  const texto =
    document
      .getElementById("buscar")
      .value
      .toLowerCase();

  const ciudad =
    document
      .getElementById("filtroCiudad")
      .value;

  const modalidad =
    document
      .getElementById("filtroModalidad")
      .value;

  const jornada =
    document
      .getElementById("filtroJornada")
      .value;

  const filtradas =
    todasLasVacantes.filter(v => {

      return (

        (
          v.cargo.toLowerCase().includes(texto) ||
          v.institucion.toLowerCase().includes(texto) ||
          v.ciudad.toLowerCase().includes(texto)
        )

        &&

        (!ciudad || v.ciudad === ciudad)

        &&

        (!modalidad || v.modalidad === modalidad)

        &&

        (!jornada || v.jornada === jornada)

      );

    });

  document.getElementById("contadorVacantes")
.textContent =
filtradas.length +
" vacantes activas";

  const contenedor =
    document.getElementById("vacantes");

  contenedor.innerHTML = "";

  filtradas.forEach(v => {

    contenedor.innerHTML += `
      <article class="tarjeta">

        <h2>${v.cargo}</h2>

        <div class="empresa">
          ${v.institucion}
        </div>

        <div class="dato">
          📍 ${v.ciudad}
        </div>

        <div class="dato">
          💼 ${v.modalidad}
        </div>

        <div class="dato">
          ⏰ ${v.jornada}
        </div>

        <div class="dato">
          📅 Cierre:
          ${v.fechaCierre}
        </div>

        <h4>Funciones</h4>
        <ul>
          ${v.funciones.map(f =>
            `<li>${f}</li>`
          ).join("")}
        </ul>

        <h4>Requisitos</h4>
        <ul>
          ${v.requisitos.map(r =>
            `<li>${r}</li>`
          ).join("")}
        </ul>

        <h4>Beneficios</h4>
        <ul>
          ${v.beneficios.map(b =>
            `<li>${b}</li>`
          ).join("")}
        </ul>

        <p>
          <strong>Correo:</strong>
          ${v.correo}
        </p>

        <a
          class="boton"
          target="_blank"
          href="https://wa.me/${v.whatsapp}">
          WhatsApp
        </a>

      </article>
    `;

  });

}

document
  .getElementById("buscar")
  .addEventListener(
    "input",
    renderizarVacantes
  );

document
  .getElementById("filtroCiudad")
  .addEventListener(
    "change",
    renderizarVacantes
  );

document
  .getElementById("filtroModalidad")
  .addEventListener(
    "change",
    renderizarVacantes
  );

document
  .getElementById("filtroJornada")
  .addEventListener(
    "change",
    renderizarVacantes
  );

cargarVacantes();
