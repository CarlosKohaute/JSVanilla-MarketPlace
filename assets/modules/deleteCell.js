import {baseURL} from './env.js'
import closeModalDelete from './closeModalDelete.js'

export default async function deleteCell(id) {
  const response = await fetch(`${baseURL}/delete/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });

  const result = await response.json();

  localStorage.setItem('message', result.message);
  localStorage.setItem('type', 'sucess');
  document.location.reload(true);

  closeModalDelete();
}