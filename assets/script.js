const baseUrl = 'http://localhost:3000/cells';

async function findAllCells() {
  const response = await fetch(`${baseUrl}/find-cells`);

  const cells = await response.json();

  cells.forEach((cell) => {
    document.querySelector('celllist').insertAdjacentHTML(
      'beforeend',
      `
      <div class="CellListItem">
        <div>
            <div class="CellListItem_name">${cell.name}</div>
            <div class="CellListItem_price">R$ ${cell.price}</div>
            <div class="CellListItem_description">${cell.description}</div>
          </div>
            <img class="CellListItem_photo" src=${
              cell.photo
            } alt=${` ${cell.name}`}     
             />
            </div>
              `,
    );
  });
}

const findCellById = async () => {
  const id = document.querySelector('idCell').value;

  const response = await fetch(`${baseUrl}/find-cell/${id}`);

  const cell = await response.json();

  const chosedCellDiv = document.getElementById('chosedCell');

  chosedCellDiv.innerHTML = `<div class="CellCardItem">
  <div>
  <div class="CellListItem_name">${cell.name}</div>
  <div class="CellListItem_price">R$ ${cell.price}</div>
  <div class="CellListItem_description">${cell.description}</div>
</div>
  <img class="CellListItem_photo" src=${cell.photo} alt=${` ${cell.name}`} />
</div>`;
};

findAllCells();
