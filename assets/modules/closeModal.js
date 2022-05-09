export default function closeModal() {
  document.querySelector('.modal-overlay').style.display = 'none';

  document.querySelector('#name').value = '';
  document.querySelector('#price').value = 0;
  document.querySelector('#description').value = '';
  document.querySelector('#photo').value = '';
}