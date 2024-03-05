document.addEventListener('DOMContentLoaded', function () {
  const subtotalElements = document.querySelectorAll('#divProducts > div');

  // Calcular y mostrar el subtotal para cada producto
  subtotalElements.forEach(function(subtotalElement) {
    const priceElement = subtotalElement.querySelector('#proPrice');
    const quantity = parseInt(subtotalElement.querySelector('#quant').textContent);
    const price = parseFloat(priceElement.textContent.replace(' €', ''));
    const subtotal = price * quantity;
    subtotalElement.querySelector('#subtotal').textContent = `${subtotal.toFixed(2)} €`;
  });

  // Calcular y mostrar el total a pagar
  const subtotals = Array.from(subtotalElements).map(function(subtotalElement) {
    return parseFloat(subtotalElement.querySelector('#subtotal').textContent.replace(' €', ''));
  });
  
  const totalPay = subtotals.reduce(function(acc, subtotal) {
    return acc + subtotal;
  }, 0);
  
  document.getElementById('totalPay').textContent = 'Total to pay: ' + totalPay.toFixed(2) + '€';

  
});