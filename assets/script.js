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


// Quiz
const BtnStart = document.getElementById("start-btn");
const fleche = document.querySelector('.fleche');
const SectionStart = document.getElementById("start");
const QuizSection = document.getElementById("quiz");
// Pour régler la liste de proposition
const list = document.querySelector('.test');
const proposition = document.querySelector('.proposition')
// Les données dans le quiz
const question = document.getElementById('question');
const options = document.querySelector('.quiz_options');
const totalQuestion = document.querySelector('#nombre_question');
const numQuestion = document.querySelector('#num_question');
// initialisation
let correctAnswer = "", score = count = 0, nombreQuestion = 10;

// list.addEventListener('click', () => {
//     console.log('success');
// });


// Pour commencer le quiz
BtnStart.addEventListener('click', () => {
    SectionStart.style.display = "none";
    fleche.style.visibility = "hidden";
    QuizSection.style.display = "block";
});

// Afficher le numéro de question
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    totalQuestion.textContent = nombreQuestion;
    // score.textContent = score;
    numQuestion.textContent = count;
})

// Fonction pour prendre les données en utilisant fetch
async function loadQuestion() {
    const APIUrl = 'https://batman-api.sayna.space/questions';
    const result = await fetch(APIUrl);
    const data = await result.json();
    showQuestion(data[3]);

}

function showQuestion(data) {
    // Pour régler l'erreur dans la quetion 1
    // data.response[1].isGood = false; 
    // data.response[2].isGood = false; 

    let correctAnswer = "";
    let incorrectAnswer = [];

    for (let i = 0; i < data.response.length; i++) {
        if (data.response[i].isGood === true) {
          correctAnswer = data.response[i].text;
        } 
        else {
            incorrectAnswer.push(data.response[i].text);
        }
    }
    let optionList = incorrectAnswer;
    optionList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)),0,correctAnswer );
    // // Affichage de la quesiton 
    question.innerHTML = `${data.question}`;
    options.innerHTML = `
    ${optionList.map((option, index) => `
        <li><input type='checkbox' class='proposition' id=${index+1}">${option}</li>
        `).join('')}
    `;
    question.appendChild(options);
    selectOption();
}

// choix de réponse
function selectOption() {
    options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            if(options.querySelector('.selected')) {
                const activeOption = options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
            console.log('hi')
        });
    });
}