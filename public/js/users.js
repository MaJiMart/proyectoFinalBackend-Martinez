document.addEventListener('DOMContentLoaded', function () {
  //Cambio de Rol
  const editUserForm = document.getElementById('editUser');
  if (editUserForm) {
    editUserForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const uid = document.getElementById('idUser').value;
      const url = `/api/users/premium/${uid}`;

      fetch(url, {
        method: 'PUT',
        credentials: 'same-origin',
      })
        .then((response) => {
          if (response.ok) {
            alert('User role changed successfully');
            window.location.reload();
          } else {
            alert('Missing required documents for premium upgrade');
          }
        })
        .catch((error) => {
          console.error('Error during request:', error);
        });
    });
  }

  //Subir Archivos
  const uploadForm = document.getElementById('uploadDoc');

  if (uploadForm) {
    uploadForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const uid = document.getElementById('idUserDoc').value;
      const documentType = document.getElementById('docType').value;
      const file = document.getElementById('upDoc').files[0];
      const formData = new FormData();

      formData.append('documents', file);
      formData.append('documentType', documentType);

      fetch(`/api/users/${uid}/documents`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert('Document uploaded successfully');
            window.location.reload();
          } else {
            console.error('Error uploading document:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error uploading document:', error);
        });
    });
  }

  //Eliminar usuario
  const deleteUserForm = document.getElementById('deleteUserForm');
  deleteUserForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const uid = document.getElementById('idUserDel').value;
    console.log(uid);
    if (uid) {
      fetch(`/api/users/${uid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        credentials: 'same-origin',
      })
        .then((response) => {
          if (response.ok) {
            alert('User successfully deleted');
            window.location.reload();
          } else {
            console.error('Failed to delete user:', response.status);
            alert('Sorry, the user couldnt be removed.');
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  });

  //Eliminar usuarios inactivos
  const delInactivesLink = document.getElementById('delInactives');
  delInactivesLink.addEventListener('click', function (event) {
      event.preventDefault();

      fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        credentials: 'same-origin',
      })
        .then((response) => {
          if (response.status === 204) {
            alert('Inactive users deleted successfully');
            window.location.reload();
          } else {
            console.error('Error deleting inactive users:', response.statusText);
            alert('There are no inactive users at this time');
          }
        })
        .catch((error) => {
          console.error('Error deleting inactive users:', error);
        });
    });

  //Logout
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
      event.preventDefault();

      fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
      })
        .then((response) => {
          if (response.redirected) {
            window.location.href = response.url;
          }
        })
        .catch((error) => {
          console.error('Error during logout:', error);
        });
    });
  }
});
