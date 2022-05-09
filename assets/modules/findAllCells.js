import { baseURL } from './env.js';
import openModal from "./openModal.js"
import openModalDelete from './openModalDelete.js';

export default async function findAllCells() {
  const response = await fetch(`${baseURL}/find-cells`);

  const cells = await response.json();

  cells.forEach(function (cell) {
    document.querySelector('#cellList').insertAdjacentHTML(
      'beforeend',
      `
      <div class="cellListItem" id ="cellListItem_${cell._id}">
          <div>
            <div class="cellListItem_name">${cell.name}</div>
            <div class="cellListItem_price">R$ ${cell.price}</div>
            <div class="cellListItem_description">${cell.description}  </div>
            <div class="cellListItem_actions Actions">
            <button class="Actions_edit btn">Editar</button>
            <button class="Actions_delete btn">Apagar</button>
            </div>
      </div>
      <img class="cellListItem_photo"
        src="${cell.photo}"
        alt="${cell.name}"
      />


    </div>
      `,
    );
    const btnsEdit = document.querySelectorAll('.Actions_edit');

    btnsEdit.forEach((btnEdit) => {
      btnEdit.addEventListener('click', function () {
        openModal(cell._id);
      });
    });

    const btnsDelete = document.querySelectorAll('.Actions_delete');

    btnsDelete.forEach((btnsDelete) => {
      btnsDelete.addEventListener('click', function () {
        openModalDelete(cell._id);
      });
    });
  });
}
