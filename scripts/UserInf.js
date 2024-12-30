export class UserInfo {
  constructor({ nameSelector, hobbieSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._hobbieElement = document.querySelector(hobbieSelector);
  }

  // Método público para obtener la información del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobbie: this._hobbieElement.textContent,
    };
  }

  // Método público para establecer la nueva información del usuario
  setUserInfo({ name, hobbie }) {
    this._nameElement.textContent = name;
    this._hobbieElement.textContent = hobbie;
  }
}
