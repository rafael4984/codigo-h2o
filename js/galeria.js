document.addEventListener("DOMContentLoaded", () => {
  const galeriaGrid = document.getElementById("galeriaGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  const TOTAL_IMAGENES = 48;
  const RUTA_CARPETA = "../assets/galeria/";
  let imagenActualIndex = 1;

  // Carga dinámica de las 48 imágenes
  for (let i = 1; i <= TOTAL_IMAGENES; i++) {
    const item = document.createElement("div");
    item.classList.add("galeria-item");

    const imgPath = `${RUTA_CARPETA}galeria (${i}).jpg`;

    item.innerHTML = `
      <img src="${imgPath}" alt="Código H2O - Imagen ${i}" loading="lazy">
      <div class="galeria-overlay">Imagen #${i}</div>
    `;

    item.addEventListener("click", () => {
      abrirLightbox(i);
    });

    galeriaGrid.appendChild(item);
  }

  // Funciones del Lightbox
  function abrirLightbox(index) {
    imagenActualIndex = index;
    actualizarLightbox();
    lightbox.style.display = "flex";
  }

  function actualizarLightbox() {
    lightboxImg.src = `${RUTA_CARPETA}galeria (${imagenActualIndex}).jpg`;
    lightboxCaption.textContent = `Código H2O - Registro Fotográfico (${imagenActualIndex} de ${TOTAL_IMAGENES})`;
  }

  function cerrarLightbox() {
    lightbox.style.display = "none";
  }

  function imagenSiguiente() {
    imagenActualIndex = (imagenActualIndex % TOTAL_IMAGENES) + 1;
    actualizarLightbox();
  }

  function imagenAnterior() {
    imagenActualIndex = (imagenActualIndex - 2 + TOTAL_IMAGENES) % TOTAL_IMAGENES + 1;
    actualizarLightbox();
  }

  // Eventos
  lightboxClose.addEventListener("click", cerrarLightbox);
  lightboxNext.addEventListener("click", imagenSiguiente);
  lightboxPrev.addEventListener("click", imagenAnterior);

  // Cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      cerrarLightbox();
    }
  });

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") cerrarLightbox();
      if (e.key === "ArrowRight") imagenSiguiente();
      if (e.key === "ArrowLeft") imagenAnterior();
    }
  });
});