$(document).ready(function() {
  // Validación de formulario de registro
  $('#registro-form').validate({
    rules: {
      nombre: {
        required: true,
        minlength: 3
      },
      correo: {
        required: true,
        email: true
      },
      contrasena: {
        required: true,
        minlength: 8
      },
      confirmar_contrasena: {
        required: true,
        minlength: 8,
        equalTo: '#contrasena'
      },
      telefono: {
        required: true,
        digits: true,
        minlength: 7
      }
    },
    messages: {
      nombre: {
        required: 'Por favor ingrese su nombre',
        minlength: 'El nombre debe tener al menos 3 caracteres'
      },
      correo: {
        required: 'Por favor ingrese su correo',
        email: 'Por favor ingrese un correo válido'
      },
      contrasena: {
        required: 'Por favor ingrese una contraseña',
        minlength: 'La contraseña debe tener al menos 8 caracteres'
      },
      confirmar_contrasena: {
        required: 'Por favor confirme su contraseña',
        minlength: 'La contraseña debe tener al menos 8 caracteres',
        equalTo: 'Las contraseñas no coinciden'
      },
      telefono: {
        required: 'Por favor ingrese su número de teléfono',
        digits: 'Por favor ingrese solo números',
        minlength: 'El número de teléfono debe tener al menos 7 dígitos'
      }
    }
  });
});


