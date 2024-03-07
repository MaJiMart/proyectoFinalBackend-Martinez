import { logger } from '../../src/config/logger.js';

document.addEventListener('DOMContentLoaded', function () {
  const formNewPass = document.getElementById('formNewPass');
  formNewPass.addEventListener('submit', async function (event) {
    event.preventDefault();

    const newPass = document.getElementById('newPass').value;
    const repNewPass = document.getElementById('repNewPass').value;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    try {
      const response = await fetch('/api/new-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newPass: newPass,
          repNewPass: repNewPass,
          token: token
        }),
      });
      
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
      window.location.href = '/';
    } catch (error) {
      logger.error('Error:', error.message);
    }
  });
})