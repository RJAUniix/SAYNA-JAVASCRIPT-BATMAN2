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

// Les annimation sur les cards en hover
const carte = document.querySelector('.card');

// carte.addEventListener('onmouseover', afficherPerso);
// carte.addEventListener('onmouseout', cacherPerso);

function afficherPerso(e) {
    let perso = document.querySelector('.desc');
    perso = e.target.getAttribute("class");
    console.log(perso);
}
function cacherPerso() {
    let perso = document.querySelector('.desc');
    perso.style.display = "none";
}

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
