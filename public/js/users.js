/* document.addEventListener('DOMContentLoaded', function () {
  const idImput = document.getElementById('idUser');
  const editBtn = document.getElementById('editButton')

  const urlParams = new URLSearchParams(window.location.search);
  const uidParam = urlParams.get('uid');

  if(uidParam) {
    idImput.value = uidParam
  }

  function redirect() {
    const uid = idImput.value
    const newURL = `users/premium?${uid}`;
    window.location.href = newURL;
  }

  editBtn.addEventListener('submit', redirect)
}) */

document.getElementById('editUser').addEventListener('submit', function(event) {
  // Prevenir que el formulario se envíe automáticamente
  event.preventDefault();
  
  // Obtener el valor del input
  var userId = document.getElementById('idUser').value;
  
  // Actualizar la acción del formulario con el id capturado
  this.action = `http://localhost:8080/api/users/premium/${userId}`;
  
  // Enviar el formulario
  this.submit();
});