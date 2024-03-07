import { logger } from '../../src/config/logger.js';

document.addEventListener('DOMContentLoaded', function () {
  const subtotalElements = document.querySelectorAll('#divProducts > div');

  // Calcular y mostrar el subtotal para cada producto
  subtotalElements.forEach(function (subtotalElement) {
    const priceElement = subtotalElement.querySelector('#proPrice');
    const quantity = parseInt(
      subtotalElement.querySelector('#quant').textContent
    );
    const price = parseFloat(priceElement.textContent.replace(' €', ''));
    const subtotal = price * quantity;
    subtotalElement.querySelector(
      '#subtotal'
    ).textContent = `${subtotal.toFixed(2)} €`;
  });

  // Calcular y mostrar el total a pagar
  const subtotals = Array.from(subtotalElements).map(function (
    subtotalElement
  ) {
    return parseFloat(
      subtotalElement.querySelector('#subtotal').textContent.replace(' €', '')
    );
  });

  const totalPay = subtotals.reduce(function (acc, subtotal) {
    return acc + subtotal;
  }, 0);

  document.getElementById('totalPay').textContent =
    'Total to pay: ' + totalPay.toFixed(2) + '€';

  // Eliminar producto
  const deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async function (event) {
      event.preventDefault();
      const cid = this.getAttribute('data-cid');
      const pid = this.getAttribute('data-pid');
      try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          this.closest('div').remove();
          window.location.href = `/cart/${cid}`;
        } else {
          logger.warning('Failed to delete product:', response.statusText);
        }
      } catch (error) {
        logger.error('Error deleting product:', error);
      }
    });
  });

  //Vaciar carrito
  const emptyButton = document.querySelector('#emptyButton');
  emptyButton.addEventListener('click', async function (event) {
    event.preventDefault();
    const cid = this.getAttribute('data-cid');
    try {
      const response = await fetch(`/api/carts/${cid}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const divProducts = document.getElementById('divProducts');
        divProducts.innerHTML = '';

        const totalPay = document.getElementById('totalPay');
        totalPay.textContent = 'Total to pay: €0';

        logger.info('Cart emptied successfully');
      } else {
        logger.warning('Failed to empty cart:', response.statusText);
      }
    } catch (error) {
      logger.error('Error emptying cart:', error);
    }
  });

  // Terminar compra
  const finishButton = document.getElementById('finishButton');
  finishButton.addEventListener('click', async function (event) {
    event.preventDefault();
    const cid = this.getAttribute('data-cid');
    if (!cid) {
      logger.error('No se pudo obtener el ID del carrito');
      return;
    }

    const divProducts = document.getElementById('divProducts');
    const productsCount = divProducts.querySelectorAll('div').length;
    if (productsCount === 0) {
      alert('Oops!\nThe cart is empty! Choose at least one product');
      window.location.href = '/products';
      return;
    }

    try {
      const response = await fetch(`/api/carts/${cid}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        logger.info('Compra realizada con éxito');
        alert('Compra realizada con éxito');
        window.location.href = '/products';
      } else {
        logger.warning('Error al realizar la compra:', response.statusText);
      }
    } catch (error) {
      logger.error('Error al realizar la compra:', error);
    }
  });
});
