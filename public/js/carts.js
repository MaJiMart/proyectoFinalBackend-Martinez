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
        const response = await fetch(
          `/api/carts/${cid}/products/${pid}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          this.closest('div').remove();
          window.location.href = `/cart/${cid}`;
        } else {
          console.error('Failed to delete product:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    });
  });

  //Vaciar carrito
  const emptyButton = document.querySelector('#emptyButton');
  emptyButton.addEventListener('click', async function (event) {
    event.preventDefault();
    const cid = this.getAttribute('data-cid');
    console.log(cid);
    try {
      const response = await fetch(`/api/carts/${cid}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const divProducts = document.getElementById('divProducts');
        divProducts.innerHTML = '';

        const totalPay = document.getElementById('totalPay');
        totalPay.textContent = 'Total to pay: €0';

        console.log('Cart emptied successfully');
      } else {
        console.error('Failed to empty cart:', response.statusText);
      }
    } catch (error) {
      console.error('Error emptying cart:', error);
    }
  });

  // Terminar compra
  const finishButton = document.getElementById('finishButton');
  finishButton.addEventListener('click', async function (event) {
    event.preventDefault();
    const cid = this.getAttribute('data-cid');
    if (!cid) {
      console.error('No se pudo obtener el ID del carrito');
      return;
    }

    try {
      const response = await fetch(
        `/api/carts/${cid}/purchase`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        }
      );

      if (response.ok) {
        console.log('Compra realizada con éxito');
        alert('Compra realizada con éxito');
        window.location.href = '/products';
      } else {
        console.error('Error al realizar la compra:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  });
});
