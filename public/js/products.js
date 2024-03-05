document.addEventListener('DOMContentLoaded', function () {
  const categorySelect = document.getElementById('categorySelect');
  const sortSelect = document.getElementById('sortSelect');

  // Obtener los valores de category y sort de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const sortParam = urlParams.get('sort');

  // Establecer las opciones seleccionadas en los select según los parámetros de la URL
  if (categoryParam) {
    categorySelect.value = categoryParam;
  }
  if (sortParam) {
    sortSelect.value = sortParam;
  }

  //Redirigir URL
  function redirectToNewURL() {
    const selectedCategory = categorySelect.value;
    const selectedSort = sortSelect.value;
    const newURL = `/products?category=${selectedCategory}&sort=${selectedSort}`;
    window.location.href = newURL;
  }

  //Eventos
  categorySelect.addEventListener('change', redirectToNewURL);
  sortSelect.addEventListener('change', redirectToNewURL);

  // Función "Add Product" 
  const handleAddToCart = async (productId, cid) => {
    try {
      const response = await fetch(`/api/carts/${cid}/products/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });

      if (response.ok) {
        alert('Product added to cart successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
      alert('Error adding product to cart');
    }
  };

  // Evento "Add Product"
  const addToCartButtons = document.querySelectorAll('#btnAddCart');
  const cid = document.getElementById('datacid').value
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.parentElement.querySelector('#idprod').textContent.split(': ')[1];
      handleAddToCart(productId, cid);
    });
  });
});
