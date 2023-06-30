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
  var scallable = document.querySelectorAll('.scallable');

  cards.forEach(function(card) {
    var cardPosition = card.getBoundingClientRect().top;
    var screenHeight = window.innerHeight;

    if (cardPosition < screenHeight && !card.classList.contains('visible')) {
      card.classList.add('visible');
    } else if (cardPosition >= screenHeight && card.classList.contains('visible')) {
      card.classList.remove('visible');
    }
  });

  scallable.forEach(function(image) {
    var cardPosition = image.getBoundingClientRect().top;
    var screenHeight = window.innerHeight;

    if (cardPosition < screenHeight && !image.classList.contains('visible')) {
      image.classList.add('visible');
    } else if (cardPosition >= screenHeight && image.classList.contains('visible')) {
      image.classList.remove('visible');
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

// Pour gérer l'apparition progressive des éléments au scrolling

const ratio = .1
const options = {
  root: null,
  rootMargin: '0px',
  threshold: ratio
}

const handleIntersect = function (entries, observer) {
  entries.forEach(function (entry){
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add('card-section-visible')
      observer.unobserver(entry.target)
    }
  })
}

const observer = new IntersectionObserver(handleIntersect, options)
document.querySelectorAll('.card-section').forEach(function (r) {
  observer.observe(r)
})
