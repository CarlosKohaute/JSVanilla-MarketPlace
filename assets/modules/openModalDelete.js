import deleteCell from './deleteCell.js'
export default function openModalDelete(id) {
  document.querySelector('#overlay-delete').style.display = 'flex';

  const btnYes = document.querySelector('.btn_delete_yes');

  btnYes.addEventListener('click', function () {
    deleteCell(id);
  });
}
