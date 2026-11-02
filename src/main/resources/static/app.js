const API_URL = "http://localhost:8080/api/items";

async function obtenerDatos() {
  const respuesta = await fetch(API_URL);
  const datos = await respuesta.json();

  const lista = document.getElementById("listaDatos");
  lista.innerHTML = "";

  datos.forEach(item => {
    const li = document.createElement("li");
    li.textContent = "ID " + item.id + ": " + item.nombre;
    lista.appendChild(li);
  });
}

async function publicarDato() {
  const inputNombre = document.getElementById("inputCrearNombre");
  const nuevoObjeto = { nombre: inputNombre.value };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoObjeto)
  });

  inputNombre.value = "";
  obtenerDatos();
}

async function modificarDato() {
  const id = document.getElementById("inputModificarId").value;
  const nuevoNombre = document.getElementById("inputModificarNombre").value;

  await fetch(API_URL + "/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre: nuevoNombre })
  });

  obtenerDatos();
}

async function eliminarDato() {
  const id = document.getElementById("inputEliminarId").value;

  await fetch(API_URL + "/" + id, { method: "DELETE" });

  obtenerDatos();
}
