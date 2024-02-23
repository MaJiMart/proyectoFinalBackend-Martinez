(function () {
  document.getElementById('formLogin').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      email: document.getElementById('inputEmail').value,
      password: document.getElementById('inputPass').value,
    };
    fetch('api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/profile.html';
      })
      .catch((error) => {
        console.error('error', error);
      });
  });
})();
