const btnToggle = document.querySelector("#data-theme-toggle");

function handleChangeColor() {
  btnToggle.addEventListener("click", (e) => {
    const checked = e.currentTarget.checked;

    if (checked) {
      document.documentElement.setAttribute("color-mode", "dark"); // Modifica el atributo color-mode en el tag html de nuestro index
      localStorage.setItem("color-mode", "dark"); // Guardamos el modo en el localStraoge
    } else {
      document.documentElement.setAttribute("color-mode", "light"); // Cambiamos a modo light
      localStorage.setItem("color-mode", "light"); // Guardamos el modo en localStorage
    }
  });
}

function checkColorMode() {
  const colorMode = localStorage.getItem("color-mode");
  if (colorMode === "dark") {
    document.documentElement.setAttribute("color-mode", "dark");
    btnToggle.checked = true;
  } else {
    btnToggle.checked = false;
    document.documentElement.setAttribute("color-mode", "light");
  }
}

export { handleChangeColor, checkColorMode };
