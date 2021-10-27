"use strict";
(function iife() {

 const inventories = [
    {
      name: 'avocado',
      quantity: 0,
    },
    {
      name: 'mango',
      quantity: 50,
    },
    {
      name: 'salmon',
      quantity: 100,
    },
    {
      name: 'nishiki rice',
      quantity: 0,
    },
  ];

  const listEl = document.querySelector('#store-inventory .inventory');
  const inputEl = document.querySelector('#store-inventory input');
  const buttonEl = document.querySelector('#store-inventory button');
  const inputDupeAlertEl = document.querySelector('#store-inventory .inputDupeAlert');
  inputDupeAlertEl.style.display = 'none';

  disableButtonIfNoInput();
  addAbilityToDeleteProduct();
  addAbilityToAddProduct();
  addAbilityToDecrementProductQuantity();
  addAbilityToIncrementProductQuantity();

  render(inventories);

  // updates the page to display all inventories
  function render( inventories ) {
    const html = inventories.map( (product, index) => {
      return `
        <li>
          <button class="decrement" ${product.quantity == 0 ? "disabled" : ""} data-index="${index}">-</button>
          <span class="todo" data-index="${index}">${product.quantity}</span>
          <button class="increment" data-index="${index}">+</button>
          <span class="todo" data-index="${index}">${product.name}</span>
          <span class="delete" data-index="${index}">X</span>
        </li>
      `;
    }).join('');

    listEl.innerHTML = html;
    buttonEl.disabled = !inputEl.value;
  };

  // disable 'Add Product' button if input is empty or space only
  function disableButtonIfNoInput() {
    inputEl.addEventListener('input', () => {
      const trimmedInput = inputEl.value.trim();
      buttonEl.disabled = !trimmedInput;
    });
  }

  // add product if there is no duplication
  function addAbilityToAddProduct() {
    buttonEl.addEventListener('click', (e) => {
      const trimmedInput = inputEl.value.trim().toLowerCase();  
      const exist = inventories.some(product => 
          product.name === trimmedInput
      );

      if (!exist) {
        const newProduct = {
            name: trimmedInput,
            quantity: 0,
        };
        inventories.push(newProduct);
        inputDupeAlertEl.style.display = 'none'; // hide duplicate product message
      } else {
        inputDupeAlertEl.style.display = 'block'; // show duplicate product message
      }
      
      inputEl.value = '';
      render(inventories);
    });
  }

  // delete product
  function addAbilityToDeleteProduct() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('delete')) {
        return;
      }
      const index = e.target.dataset.index;
      inventories.splice(index, 1);
      render(inventories);
    });
  }

  // increment product quantity
  function addAbilityToIncrementProductQuantity() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('increment')) {
        return;
      }
      const index = e.target.dataset.index;
      inventories[index].quantity = inventories[index].quantity + 1;
      render(inventories);
    });
  }

  // decrement product quantity if quantity exceeds 0
  function addAbilityToDecrementProductQuantity() {
    listEl.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if(!e.target.classList.contains('decrement')) {
        return;
      }
      inventories[index].quantity = inventories[index].quantity - 1;
      render(inventories);
    });
  }
})();
