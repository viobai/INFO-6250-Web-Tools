"use strict";
(function() {
  let stateTodos = [];

  const MESSAGES = {
    networkError: 'Trouble connecting to the network.  Please try again',
    default: 'Something went wrong.  Please try again',
  };

  populateTodos();
  addAbilityToRefresh();
  addAbilityToToggleComplete();
  addAbilityToAddTodo();
  addAbilityToRemoveTodo();

  /////////////////////////////////

  function populateTodos() {
    fetchTodos()
    .then( rawTodos => {
      stateTodos = rawTodos;
      render();
      renderStatus('');
    })
    .catch( error => {
      renderStatus(error);
    });
  }

  function addAbilityToAddTodo() {
    const buttonEl = document.querySelector('.add');
    const inputEl = document.querySelector('.to-add');
    buttonEl.addEventListener('click', (e) => {
      e.preventDefault();
      const task = inputEl.value;
      fetchAddTodo(task)
      .then( ({ id }) => {
        inputEl.value = '';
        stateTodos.push( { id, task, done: false });
        render({ add: id });
        renderStatus('');
      })
      .catch( err => {
        renderStatus('poop');
      });
    });
  }

  function addAbilityToRemoveTodo() {
    const listEl = document.querySelector('.todos');
    listEl.addEventListener('click', (e) => {
      e.preventDefault();
      if(!e.target.classList.contains('todo__delete')) {
        return;
      }
      const id = e.target.dataset.id;
      fetchDeleteTodo(id)
      .then( populateTodos )
      .catch( err => {
        renderStatus('poop');
      });
    });
  }

  function addAbilityToToggleComplete() {
    const listEl = document.querySelector('.todos');
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('todo__text')) {
        return;
      }

      const index = e.target.dataset.index;
      const id = e.target.dataset.id;
      fetchUpdateTodo(id, { done: !stateTodos[index].done } )
      .then( todo => {
        stateTodos[index] = todo;
        render();
        renderStatus('');
      })
      .catch( err => {
        renderStatus('poop');
      });

    });
  }

  function addAbilityToRefresh() {
    const buttonEl = document.querySelector('.refresh');
    buttonEl.addEventListener('click', () => {
      populateTodos();
    });
  }

  function fetchAddTodo(task) {
    return fetch('/api/todos', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( { task } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchDeleteTodo(id) {
    return fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchUpdateTodo( id, todoUpdates ) {
    return fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( todoUpdates ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function fetchTodos() {
    return fetch('/api/todos')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  function render( { add } = {} ) {
    // The add param puts an extra class on that todo
    const html = stateTodos.map( (todo, index) => `
      <li class="todo">
        <span
          data-index="${index}"
          data-id="${todo.id}"
          class="todo__text ${ todo.done ? "todo__text--complete" : "" } ${add === todo.id ? "todo__text--added" : "" } "
        >
          ${todo.task}
        </span>
        <button
          data-index="${index}"
          data-id="${todo.id}"
          class="todo__delete"
        >
          &#10060;
        </button>
      </li>
    `).join('');
    const todosEl = document.querySelector('.todos');
    todosEl.innerHTML = html;
  }

  function renderStatus(message) {
    const statusEl = document.querySelector('.status');
    if( !message ) {
      statusEl.innerText = '';
      return;
    }
    const key = message?.error ? message.error : 'default';
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }

})();
