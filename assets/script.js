const baseURL = 'http://localhost:3000/cells';

async function findAllCells() {
  const response = await fetch(`${baseURL}/find-cells`);

  const cells = await response.json();

  cells.forEach(function (cell) {
    document.querySelector('#cellList').insertAdjacentHTML(
      'beforeend',
      `
      <div class="cellListItem" id ="cellListItem_${cell.id}">
          <div>
            <div class="cellListItem_name">${cell.name}</div>
            <div class="cellListItem_price">R$ ${cell.price}</div>
            <div class="cellListItem_description">${cell.description}  </div>
            <div class="cellListItem_actions Actions">
            <button class="Actions_edit btn" onclick="openModal('${cell.id}')">Editar</button>
            <button class="Actions_delete btn" onclick="openModalDelete('${cell.id}')">Apagar</button>
            </div>
      </div>
      <img class="cellListItem_photo"
        src="${cell.photo}"
        alt="${cell.name}"
      />


    </div>
      `,
    );
  });
}

async function findByIdCells() {
  const id = document.querySelector('#idCell').value;
  const response = await fetch(`${baseURL}/find-cells/${id}`);
  const cell = await response.json();

  const chosedCellDiv = document.querySelector('#chosedCell');

  chosedCellDiv.innerHTML = `
  <div class="cellCardItem" id ="cellListItem_${cell.id}">
  <div>
    <div class="cellCardItem_name">${cell.name}</div>
    <div class="cellCardItem_price">R$ ${cell.price}</div>
    <div class="cellCardItem_description">${cell.description}  </div>

    <div class="cellListItem_actions Actions">
    <button class="Actions_edit btn" onclick="openModal(${cell.id})">Editar</button>
    <button class="Actions_delete btn" openModalDelete(${cell.id})">Apagar</button>
    </div>
</div>
<img class="cellCardItem_photo"
src="${cell.photo}"
alt="${cell.name}"
/>
</div>`;
}
findAllCells();

async function openModal(id = null) {
  if (id != null) {
    document.querySelector('#tittle-header-modal').innerText =
      'Atualizar um celular';

    document.querySelector('#button-form-modal').innerText = 'Atualizar';

    const response = await fetch(`${baseURL}/find-cells/${id}`);
    const cell = await response.json();

    document.querySelector('#name').value = cell.name;
    document.querySelector('#price').value = cell.price;
    document.querySelector('#description').value = cell.description;
    document.querySelector('#photo').value = cell.photo;
    document.querySelector('#id').value = cell.id;
  } else {
    document.querySelector('#tittle-header-modal').innerText =
      'Cadastrar um celular';
    document.querySelector('#button-form-modal').innerText = 'Cadastrar';
  }
  document.querySelector('#overlay').style.display = 'flex';
}

function closeModal() {
  document.querySelector('.modal-overlay').style.display = 'none';

  document.querySelector('#name').value = '';
  document.querySelector('#price').value = 0;
  document.querySelector('#description').value = '';
  document.querySelector('#photo').value = '';
}

async function registerCell() {
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

  const editionModeAtivated = id > 0;

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

  const html = `
<div class="cellCardItem" id ="cellListItem_${cell.id}">
<div>
  <div class="cellCardItem_name">${newCell.name}</div>
  <div class="cellCardItem_price">R$ ${newCell.price}</div>
  <div class="cellCardItem_description">${newCell.description}  </div>

  <div class="cellListItem_actions Actions">
  <button class="Actions_edit btn" onclick="openModal(${cell.id})">Editar</button>
  <button class="Actions_delete btn" openModalDelete(${cell.id})">Apagar</button>
  </div>
</div>
<img class="cellCardItem_photo"
src="${newCell.photo}"
alt="${newCell.name}"
/>
</div>`;

  if (editionModeAtivated) {
    document.querySelector(`#cellListItem_${id}`).outerHTML = html;
  } else {
    document
      .querySelector('#cellList')
      .insertAdjacentHTML('beforeend', html);
  }
  closeModal();
}

function openModalDelete(id) {
  document.querySelector('#overlay-delete').style.display = 'flex';

  const btnYes = document.querySelector('.btn_delete_yes');

  btnYes.addEventListener('click', function () {
    deleteCell(id);
  });
}

function closeModalDelete() {
  document.querySelector('#overlay-delete').style.display = 'none';
}

async function deleteCell(id) {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });

  const result = await response.json();
  alert(result.message);

  document.getElementById('cellList').innerHTML = '';

  closeModalDelete();
  findAllCells();
}
