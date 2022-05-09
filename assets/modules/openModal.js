import { baseURL } from './env.js';

export default async function openModal(id = '') {
  if (id != '') {
    document.querySelector('#tittle-header-modal').innerText =
      'Atualizar um celular';

    document.querySelector('#button-form-modal').innerText = 'Atualizar';

    const response = await fetch(`${baseURL}/find-one-cell/${id}`);
    const cell = await response.json();

    document.querySelector('#name').value = cell.name;
    document.querySelector('#price').value = cell.price;
    document.querySelector('#description').value = cell.description;
    document.querySelector('#photo').value = cell.photo;
    document.querySelector('#id').value = cell._id;
  } else {
    document.querySelector('#tittle-header-modal').innerText =
      'Cadastrar um celular';
    document.querySelector('#button-form-modal').innerText = 'Cadastrar';
  }
  document.querySelector('#overlay').style.display = 'flex';
}
