let template = document.createElement("template");
const listado = document.querySelector(".listadoContactos--listado");


fetch("http://www.raydelto.org/agenda.php").then((resultados) => {
    return resultados.json();
}).then((resultados) => {
    resultados.forEach(contacto => {
        console.log(contacto);
        template.innerHTML = `
        <div class="listadoContactos--listado--item">
        <svg class="icon">
        <use xlink:href="#icon-user"></use>
        </svg>
        <h6 class="listadoContactos--listado--item--text">${contacto.nombre} ${contacto.apellido}</h6>
        </div>
        `;
        listado.append(template.content.cloneNode(true));
    });
});

// const item = document.querySelectorAll(".listadoContactos--listado--item");
