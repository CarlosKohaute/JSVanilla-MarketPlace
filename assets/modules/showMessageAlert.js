import closeMessageAlert from './closeMessageAlert.js'
import {msgAlert} from './env.js'
export default function showMessageAlert() {
  msgAlert.innerText = localStorage.getItem('message');

  msgAlert.classList.add(localStorage.getItem('type'));
  closeMessageAlert();
}
