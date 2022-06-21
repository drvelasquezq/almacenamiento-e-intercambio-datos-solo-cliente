const cookieModal = document.querySelector("#cookie_modal");
const btnCookie = document.querySelector("#cookie_button");

function createCookies() {
  document.cookie = `legalTermsAccepted=true; path=/;`;
}

function checkCookies() {
  const cookie = document.cookie.includes("legalTermsAccepted=true");
  if (cookie) {
    cookieModal.classList.remove("active");
  }
}

function addCookieToButton() {
  btnCookie.addEventListener("click", () => {
    createCookies();
    cookieModal.classList.remove("active");
  });
}

function setSessionItems() {
  sessionStorage.setItem("legalTermsAccepted", true);
}

function getSessionItems() {
  sessionStorage.getItem("legalTermsAccepted", true);
}

export {
  createCookies,
  checkCookies,
  addCookieToButton,
  setSessionItems,
  getSessionItems,
};
