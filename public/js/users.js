document.getElementById('editUser').addEventListener('submit', function(event) {
  event.preventDefault();

  const userId = document.getElementById('idUser').value;

  this.action = `http://localhost:8080/api/users/premium/${userId}`;

  this.submit();
});

document.addEventListener('DOMContentLoaded', function() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function(event) {
      event.preventDefault();
      
      fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin'
      })
      .then(response => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
    });
  }
});
