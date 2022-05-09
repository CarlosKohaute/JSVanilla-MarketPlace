import { baseURL } from './env.js';
import showMessageAlert from './showMessageAlert.js';
import closeMessageAlert from './closeMessageAlert.js';
import openModal from './openModal.js';
import openModalDelete from './openModalDelete.js';

export default async function findByIdCells() {
  const id = document.querySelector('#search-input').value;

  if (id == '') {
    localStorage.setItem('messagem', 'Digite um ID para pesquisar!');
    localStorage.setItem('type', 'danger');

    msgAlert.innerText = localStorage.getItem('message');
    msgAlert.classList.add(localStorage.getItem('type'));
    showMessageAlert();
    closeMessageAlert();
    return;
  }
  const response = await fetch(`${baseURL}/find-one-cell/${id}`);
  const cell = await response.json();

  if (cell.message != undefined) {
    localStorage.setItem('messagem', cell.message);
    localStorage.setItem('type', 'danger');

    msgAlert.innerText = localStorage.getItem('message');
    msgAlert.classList.add(localStorage.getItem('type'));
    showMessageAlert();
    return;
  }

  document.querySelector('.list-all').style.display = 'block';
  document.querySelector('.cellList').style.display = 'none';
  const chosedCellDiv = document.querySelector('#chosedCell');

  chosedCellDiv.innerHTML = `
  <div class="cellCardItem" id ="cellListItem_${cell._id}">
  <div>
    <div class="cellCardItem_name">${cell.name}</div>
    <div class="cellCardItem_price">R$ ${cell.price}</div>
    <div class="cellCardItem_description">${cell.description}  </div>

    <div class="cellListItem_actions Actions">
    <button class="Actions_edit btn" >Editar</button>
    <button class="Actions_delete btn">Apagar</button>
    </div>
</div>
<img class="cellCardItem_photo"
src="${cell.photo}"
alt="${cell.name}"
/>
</div>`;

  document.querySelectorAll('.Actions_edit').forEach((btnEdit) => {
    btnEdit.addEventListener('click', function () {
      openModal(cell._id);
    });
  });
  document.querySelectorAll('.Actions_delete').forEach((btnDelete) => {
    btnDelete.addEventListener('click', function () {
      openModalDelete(cell._id);
    });
  });
}
