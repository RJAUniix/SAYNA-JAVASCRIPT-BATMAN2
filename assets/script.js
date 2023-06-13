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


// Sélectionnez tous les liens ancrés de votre site
const links = document.querySelectorAll('a[href^="#"]');

// Ajoutez un gestionnaire d'événements de clic à chaque lien ancré
links.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

// Fonction pour effectuer le défilement en douceur
function smoothScroll(event) {
// Empêche le comportement par défaut du lien
event.preventDefault(); 

const targetId = this.getAttribute('href'); // Récupère l'ID de la cible du lien
const targetElement = document.querySelector(targetId); // Sélectionne l'élément cible

if (targetElement) {
    const targetPosition = targetElement.offsetTop; // Obtient la position de l'élément cible

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth' // Utilise l'option "smooth" pour un défilement en douceur
    });
}
}


// Quiz
const BtnStart = document.getElementById("start-btn");
const fleche = document.querySelector('.fleche');
const SectionStart = document.getElementById("start");
const QuizSection = document.getElementById("quiz");

BtnStart.addEventListener('click', () => {
    SectionStart.style.display = "none";
    fleche.style.visibility = "hidden";
    QuizSection.style.display = "block";
});

