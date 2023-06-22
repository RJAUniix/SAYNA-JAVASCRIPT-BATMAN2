let popup = document.getElementById("popup");
let form = document.getElementById("formulaire-contact");
let emailInput = document.getElementById("email-adress");

function afficherPopup(){  
    let email = emailInput.value;
    if(emailInput.checkValidity()) {
        popup.classList.add("popup-ouvert");
        form.classList.add("hide");
    }
    else{
        alert('Remplissez le formulaire correctement svp!')
    }
}

// zoom progressif des images

function checkVisibility() {
  var cards = document.querySelectorAll('.card');

  cards.forEach(function(card) {
    var cardPosition = card.getBoundingClientRect().top;
    var screenHeight = window.innerHeight;

    if (cardPosition < screenHeight && !card.classList.contains('visible')) {
      card.classList.add('visible');
    } else if (cardPosition >= screenHeight && card.classList.contains('visible')) {
      card.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', checkVisibility);

// Les annimation sur les cards en hover
const cards = document.querySelectorAll('.card');
// Parcourez chaque div "card" et ajoutez un gestionnaire d'événements pour l'événement "mouseenter"
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Sélectionnez le div enfant de la carte actuelle
    const perso = card.querySelector('div');
    // Modifiez le style du div enfant pour l'afficher
    perso.style.display = 'block';
  });

  // Ajoutez également un gestionnaire d'événements pour l'événement "mouseleave" pour masquer le div enfant lorsque le survol est terminé
  card.addEventListener('mouseleave', () => {
    // Sélectionnez à nouveau le div enfant
    const perso = card.querySelector('div');
    // Modifiez le style du div enfant pour le masquer
    perso.style.display = 'none';
  });
});

// Fonction pour effectuer le défilement en douceur
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

function smoothScroll(event) {
event.preventDefault(); 
const targetId = this.getAttribute('href'); // Récupère l'ID de la cible du lien
const targetElement = document.querySelector(targetId); // Sélectionne l'élément cible

if (targetElement) {
    const targetPosition = targetElement.offsetTop; // Obtient la position de l'élément cible

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' 
    });
}
}

// Fonction pour gérer l'apparition progressive des éléments au scrolling
// function handleScroll() {
//     var items = document.querySelectorAll('section');
  
//     items.forEach(function(section) {
//       if (isElementInViewport(section)) {
//         section.style.opacity = '1';
//         section.style.transform = 'translateX(0)';
//       }
//     });
//   }
  
//   // Écouteur d'événement pour déclencher la fonction handleScroll() au scrolling
//   window.addEventListener('scroll', handleScroll);
  
//   // Appeler handleScroll() une fois au chargement initial de la page pour vérifier les éléments déjà visibles
//   handleScroll();