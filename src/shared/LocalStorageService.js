function setOnLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

function getOnLocalStorage(name) {
  return localStorage.getItem(name);
}

export {setOnLocalStorage, getOnLocalStorage};
