const btnsToggle = document.querySelectorAll('[name="data-theme-toggle"]');

function handleChangeColor() {
  for (let i = 0; i < btnsToggle.length; i++) {
    btnsToggle[i].addEventListener('click', (e) => {
      const checked = e.currentTarget.checked;
      if (checked) {
        document.documentElement.setAttribute("color-mode", e.currentTarget.value);
        localStorage.setItem("color-mode", e.currentTarget.value);
      }  
    });
  }
}

function checkColorMode() {
  const colorMode = localStorage.getItem("color-mode");
  for (let i = 0; i < btnsToggle.length; i++) {
    if (colorMode === btnsToggle[i].value) {
      document.documentElement.setAttribute("color-mode", btnsToggle[i].value);
      btnsToggle[i].checked = true;
    }
  }
}

export { handleChangeColor, checkColorMode };
