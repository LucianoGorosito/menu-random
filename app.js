// app.js

// ---------------------------
// Referencias del DOM
// ---------------------------
const platosContainer = document.getElementById("platosContainer");
const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrarModal");
const formAgregar = document.getElementById("formAgregar");
const nombrePlato = document.getElementById("nombrePlato");
const tipoPlato = document.getElementById("tipoPlato");

// ---------------------------
// FUNCIONES INDEX
// ---------------------------
function elegirMenu() {
  const indiceAleatorio = Math.floor(Math.random() * platos.length);
  const platoElegido = platos[indiceAleatorio];
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.textContent = `Hoy podés comer: ${platoElegido.nombre}`;
}

// ---------------------------
// FUNCIONES AGREGAR
// ---------------------------
// ---------------------------
// Leer o inicializar platos
// ---------------------------
let platos = JSON.parse(localStorage.getItem("platos")) || [
  { nombre: "Milanesa con puré", tipo: "plato principal", guarnicion: false },
  { nombre: "Fideos con salsa", tipo: "pastas", guarnicion: false },
  { nombre: "Tarta de verduras", tipo: "plato principal", guarnicion: false },
  { nombre: "Pizza casera", tipo: "plato principal", guarnicion: false },
  { nombre: "Hamburguesas con papas", tipo: "plato principal", guarnicion: true }
];

// ---------------------------
// Mostrar platos como pills
// ---------------------------
function mostrarPlatos() {
  platosContainer.innerHTML = "";

  platos.forEach(plato => {
    const pill = document.createElement("div");

    let bgColor = "";
    let textColor = "";
    let emoji = "";

    if (plato.tipo === "plato principal") {
      bgColor = "bg-blue-200 hover:bg-blue-300";
      textColor = "text-blue-900";
      emoji = "🍽️";
    } else if (plato.tipo === "pastas") {
      bgColor = "bg-orange-200 hover:bg-orange-300";
      textColor = "text-orange-900";
      emoji = "🍝";
    } else if (plato.tipo === "ensalada") {
      bgColor = "bg-green-200 hover:bg-green-300";
      textColor = "text-green-900";
      emoji = "🥗";
    } else {
      bgColor = "bg-gray-200 hover:bg-gray-300";
      textColor = "text-gray-900";
      emoji = "🍽️";
    }

    pill.className = `${bgColor} ${textColor} text-lg px-4 py-2 rounded-full cursor-pointer transition-transform transform hover:scale-105 shadow-sm`;
    pill.textContent = `${emoji} ${plato.nombre}`;
    platosContainer.appendChild(pill);
  });

  // Pill para agregar nuevo
  const pillAgregar = document.createElement("div");
  pillAgregar.id ="pillAgregar"
  pillAgregar.className = "bg-green-200 text-green-900 text-lg px-4 py-2 rounded-full cursor-pointer hover:bg-green-300 transition-transform transform hover:scale-105 shadow-sm";
  pillAgregar.textContent = "➕ Agregar nuevo";
  pillAgregar.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
  platosContainer.appendChild(pillAgregar);
}
// ---------------------------
// Evento para abrir y cerrar modal
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const pillAgregar = document.getElementById("pillAgregar");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const cerrarModal = document.getElementById("cerrarModal");

  if (pillAgregar && modal && cerrarModal) {
    pillAgregar.addEventListener("click", () =>{
        modal.classList.remove("hidden");
        modalContent.classList.add("animate-fadeIn");
})

cerrarModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modalContent.classList.remove("animate-fadeIn");
  formAgregar.reset();
});
}})

// ---------------------------
// Evento para agregar plato
// ---------------------------
formAgregar.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoPlato = {
    nombre: nombrePlato.value,
    tipo: tipoPlato.value,
    guarnicion: document.getElementById("guarnicion").checked
  };

  platos.push(nuevoPlato);
  localStorage.setItem("platos", JSON.stringify(platos));
  mostrarPlatos();
  modal.classList.add("hidden");
  formAgregar.reset();
});

// ---------------------------
// Cargar platos al iniciar
// ---------------------------
mostrarPlatos();
