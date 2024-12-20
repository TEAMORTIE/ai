window.openModal = function (modalId) {
  document.getElementById(modalId).style.display = "block";
  document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
};

window.closeModal = function (modalId) {
  document.getElementById(modalId).style.display = "none";
  document
    .getElementsByTagName("body")[0]
    .classList.remove("overflow-y-hidden");
};

// Close all modals when press ESC
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode === 27) {
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
    let modals = document.getElementsByClassName("modal");
    Array.prototype.slice.call(modals).forEach((i) => {
      i.style.display = "none";
    });
  }
};

// copier coller ////////////////////////////////////////
function copyToClipboard() {
  // Sélectionner le texte
  const text = document.getElementById("textToCopy").textContent;

  // Copier dans le presse-papiers
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Afficher un message de confirmation
      const message = document.getElementById("copiedMessage");
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 2000); // Cache le message après 2 secondes
    })
    .catch((err) => {
      console.error("Erreur lors de la copie :", err);
    });
}
