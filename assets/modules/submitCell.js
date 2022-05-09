import { baseURL } from './env.js';
import showMessageAlert from './showMessageAlert.js'
import closeModal from './closeModal.js';

export default async function submitCell() {
  const id = document.querySelector('#id').value;
  const name = document.querySelector('#name').value;
  const price = document.querySelector('#price').value;
  const description = document.querySelector('#description').value;
  const photo = document.querySelector('#photo').value;

  const cell = {
    id,
    name,
    price,
    description,
    photo,
  };

  const editionModeAtivated = id != '';

  const endpoint =
    baseURL + (editionModeAtivated ? `/update/${id}` : `/create`);

  const response = await fetch(endpoint, {
    method: editionModeAtivated ? 'put' : 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    node: 'cors',
    body: JSON.stringify(cell),
  });
  const newCell = await response.json();
  document.location.reload(true);

  if (newCell.message != undefined) {
    localStorage.setItem('messagem', newCell.message);
    localStorage.setItem('type', 'danger');

    msgAlert.innerText = localStorage.getItem('message');
    msgAlert.classList.add(localStorage.getItem('type'));
    showMessageAlert();
    return;
  }
  if (editionModeAtivated) {
    localStorage.setItem('messagem', 'Celular atualizado com sucesso!');
    localStorage.setItem('type', 'sucess');

    msgAlert.innerText = localStorage.getItem('message');
    msgAlert.classList.add(localStorage.getItem('type'));
  } else {
    localStorage.setItem('messagem', 'Celular cadastrado com sucesso!');
    localStorage.setItem('type', 'sucess');

    msgAlert.innerText = localStorage.getItem('message');
    msgAlert.classList.add(localStorage.getItem('type'));
  }
  document.location.reload(true);

  closeModal();
}
