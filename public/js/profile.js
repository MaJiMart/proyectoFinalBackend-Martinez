(function () {
  fetch('/current')
    .then((response) => response.json())
    .then((data) => {
      const htmlText = `<p>Name: ${data.first_name} ${data.last_name}</p>
    <p>Email: ${data.email}</p>
    <p>Role: ${data.role}</p>`;
      const span = document.getElementById('spanProfile');
      span.innerHTML = htmlText;
    })
    .catch((error) => {
      console.error('error', error);
    });

  //Ejemplo de autorización Admin
  fetch('/admin')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('error', error);
    });
})();
