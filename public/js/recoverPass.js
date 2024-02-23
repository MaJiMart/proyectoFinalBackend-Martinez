(function () {
  document.getElementById('formRecover').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      email: document.getElementById('inputEmail').value
    };
    fetch('api/recover-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Check your email')
        window.location.href = '/index.html';
      })
      .catch((error) => {
        console.error('error', error);
      });
  });
})();

(function () {
  document.getElementById('formNewPass').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      newPass: document.getElementById('newPass').value,
      repNewPass: document.getElementById('repNewPass').value,
      token: new URLSearchParams(window.location.search).get('token')
    };
    fetch('api/new-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Password reset successful')
        window.location.href = '/index.html';
      })
      .catch((error) => {
        console.error('error', error);
      });
  });
})();

/* (function () {
  // Obtener el token de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  // Agregar el token a la URL de la solicitud GET
  const url = `api/recover-password/:${token}`;
  console.log(url);

  document.getElementById('formNewPass').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      newPass: document.getElementById('newPass').value
    };
    // Utilizar la URL con el token incluido en la solicitud GET
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/index.html';
      })
      .catch((error) => {
        console.error('error', error);
      });
  });
})(); */