import { msgAlert } from "./env.js";

export default function closeMessageAlert() {
  setTimeout(function () {
    msgAlert.innerText = '';
    msgAlert.classList.remove(localStorage.getItem('type'));
    localStorage.clear();
  }, 3000);
}
