let template = document.createElement("template");
const listado = document.querySelector(".listadoContactos--listado");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const btnRedondo = document.querySelector(".listadoContactos--botonRedondo");
const botonFormulario = document.querySelector(".informacionContacto--formulario--button");
let resultados;


fetch("http://www.raydelto.org/agenda.php")

    .then((data) => {
        return data.json();
    })
    .then((data) => {
        resultados = data;
        data.forEach(contacto => {
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
    })
    .then(() => {
        const item = document.querySelectorAll(".listadoContactos--listado--item");
        // console.log(item);
        item.forEach((element, index) => {
            element.addEventListener('click', () => {
                console.log('click');
                nombre.value = resultados[index].nombre
                apellido.value = resultados[index].apellido;
                telefono.value = resultados[index].telefono;
                nombre.setAttribute('disabled', "");
                apellido.setAttribute('disabled', "");
                telefono.setAttribute('disabled', "");
                botonFormulario.setAttribute('disabled', "");
            })
        });

    });

btnRedondo.addEventListener('click', () => {

    nombre.removeAttribute('disabled');
    apellido.removeAttribute('disabled');
    telefono.removeAttribute('disabled');
    botonFormulario.removeAttribute('disabled');
    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    botonFormulario.value = "";
})

botonFormulario.addEventListener('click', async (e) => {
    e.preventDefault();
    let contacto = {
        'nombre': nombre.value,
        'apellido': apellido.value,
        'telefono': telefono.value
    }
    let response = await fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(contacto)
    });
    console.log(response);
})



