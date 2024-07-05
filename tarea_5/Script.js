let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function actualizarListaClientes() {
    const clientesUl = document.getElementById("clientesUl");
    clientesUl.innerHTML = "";
    clientes.forEach((cliente, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${index + 1}.<br>Cédula: ${cliente.cedula}<br>Dirección: ${cliente.direccion}<br>Apellidos: ${cliente.apellidos}<br>Nombres: ${cliente.nombres}<br>Teléfono: ${cliente.telefono}<br>Correo: ${cliente.correo}`;
        clientesUl.appendChild(li);
    });
}

document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    const cedula = document.getElementById('cedula').value;
    const apellido1 = document.getElementById('apellido1').value;
    const nombre1 = document.getElementById('nombre1').value;
    const estadocivil = document.getElementById('estadocivil').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const fechanacimiento = document.getElementById('fechanacimiento').value;
    const direccion = document.getElementById('direccion').value;
    const celular = document.getElementById('celular').value;
    const correo = document.getElementById('correo').value;

    // Validar nombre y apellido sin números
    const nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre1);
    const apellidoValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido1);

    // Validate cédula (10 digits)
    if (!/^\d{10}$/.test(cedula)) {
        alert('Por favor, ingrese un número de cédula válido (10 dígitos).');
        return;
    }

    // Validate names (only letters and at least 2 characters)
    if (!nombreValido) {
        alert("El nombre solo puede contener letras.");
        return;
    }

    if (!apellidoValido) {
        alert("El apellido solo puede contener letras.");
        return;
    }

    // Validate Estado Civil
    if (!estadocivil) {
        alert('Por favor, seleccione un estado civil.');
        return;
    }

    // Validate Sexo
    if (!sexo) {
        alert('Por favor, seleccione un sexo.');
        return;
    }

    // Validate Fecha de Nacimiento
    if (!fechanacimiento) {
        alert('Por favor, ingrese una fecha de nacimiento.');
        return;
    }

    // Validate Dirección (only letters and spaces)
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(direccion)) {
        alert('Por favor, ingrese una dirección válida (solo letras y espacios).');
        return;
    }

    // Validate Celular (10 digits)
    if (!/^\d{10}$/.test(celular)) {
        alert('Por favor, ingrese un número de celular válido (10 dígitos).');
        return;
    }

    // Validate Correo Electrónico
    if (!validateEmail(correo)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    const nuevoCliente = {
        cedula: cedula,
        direccion: direccion,
        apellidos: apellido1,
        nombres: nombre1,
        telefono: celular,
        correo: correo
    };

    clientes.push(nuevoCliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    actualizarListaClientes();
    this.reset();
    alert("Cliente registrado correctamente");
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('apellido1').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });

    document.getElementById('nombre1').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });

    actualizarListaClientes();
});
