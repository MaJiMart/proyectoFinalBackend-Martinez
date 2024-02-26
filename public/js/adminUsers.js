(function () {
  fetch('/admin-users')
    .then((response) => response.json())
    .then((data) => {
      const htmlText = 
      `<p>Name: ${data.first_name} ${data.last_name}</p>
      <p>Email: ${data.email}</p>
      <p>Role: ${data.role}</p>`;
      const span = document.getElementById('adminData');
      span.innerHTML = htmlText;
    })
    .then((data) => {
      
      const span = document.getElementById('usersTable');
      span.innerHTML = htmlText;
    })
    .catch((error) => {
      console.error('error', error);
    });
})();