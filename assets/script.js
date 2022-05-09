import findAllCells from './modules/findAllCells.js';
import showMessageAlert from './modules/showMessageAlert.js';
import closeModal from './modules/closeModal.js';
import submitCell from './modules/submitCell.js';
import openModal from './modules/openModal.js';
import findByIdCells from './modules/findByIdCells.js';
import closeModalDelete from './modules/closeModalDelete.js';

await findAllCells();
showMessageAlert();

document
  .querySelector('#close-modal-submit')
  .addEventListener('click', function () {
    closeModal();
  });

document
  .querySelector('#button-form-modal')
  .addEventListener('click', function () {
    submitCell();
  });

document.querySelector('#add-cell').addEventListener('click', function () {
  openModal();
});

document.querySelector('.search-button').addEventListener('click', function () {
  findByIdCells();
});

document
  .querySelector('#close-modal-delete')
  .addEventListener('click', function () {
    closeModalDelete();
  });

document.querySelector('.btn_delete_no').addEventListener('click', function () {
  closeModalDelete();
});
