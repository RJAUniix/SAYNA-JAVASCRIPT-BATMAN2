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

const BtnStart = document.querySelector("#start-btn");
const fleche = document.querySelector(".fleche");
const SectionStart = document.querySelector("#start");
const QuizSection = document.querySelector("#quiz");
const nextBtn = document.querySelector("#nextBtn");
const restartBtn = document.querySelector("#restartBtn");
const popup = document.querySelector("#popup");
const quizImg = document.querySelector("#quizImg");
// contenu du popup
const popupPara = document.querySelector("#encouragement");
const popupTitre = document.querySelector("#titrePopup");

// Pour régler la liste de proposition
const list = document.querySelector('.test');
const proposition = document.querySelector('.proposition');

// Les données dans le quiz
const question = document.querySelector('#question');
const options = document.querySelector('.quiz_options');
const totalQuestion = document.querySelector('#nombre_question');
const numQuestion = document.querySelector('#num_question');
const correctScore = document.querySelector('#score');

// initialisation
let correctAnswer = "", score = 5, nombreQuestion = 12 , count = 1, srcImg = "";

function eventListeners() {
    nextBtn.addEventListener('click', checkAnswer);
}


// Pour commencer le quiz
BtnStart.addEventListener('click', () => {
    SectionStart.style.display = "none";
    fleche.style.visibility = "hidden";
    QuizSection.style.display = "block";
    setComment();
    popup.classList.add("popup-ouvert");
});

// Afficher le numéro de question
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    eventListeners();
    totalQuestion.textContent = nombreQuestion;
    numQuestion.textContent = count;
    correctScore.textContent = score;
})

// Fonction pour prendre les données en utilisant fetch
async function loadQuestion() {
    const APIUrl = 'https://batman-api.sayna.space/questions';
    const result = await fetch(APIUrl);
    const data = await result.json();

    // Pour régler l'erreur dans la quetion 1
    data[0].response[0].text = "Sphynx"; 
    data[0].response[1].isGood = false; 
    data[0].response[2].isGood = false;

    // Pour régler l'erreur dans la quetion 5
    data[4].response[2].isGood = true;

    // Pour attribuer l'src de chaque images
    for(let i = 0; i <= 11 ; i++){
        data[i].img = "./Illustrations_game/Batgame_"+i+".png";
    }

    showQuestion(data[count]);
}

function showQuestion(data) { 
    let incorrectAnswer = [];

    // Mettre à jour l'image
    quizImg.setAttribute('src',data.img);

    for (let i = 0 ; i < data.response.length ; i++) {
        if (data.response[i].isGood === true) {
            correctAnswer = data.response[i].text;
        } 
        else {
            incorrectAnswer.push(data.response[i].text);
        }
    }
    let optionList = incorrectAnswer;
    console.log(incorrectAnswer.length);
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
        });
    });
}

// Tester la réponse
function checkAnswer() {
    nextBtn.disabled = true;
    if(options.querySelector('.selected')) {
        let selectedAnswer = options.querySelector('.selected').textContent;
        if(selectedAnswer.trim() == HTMLDecode(correctAnswer)){
            score++;
        }
        checkCount();
    }
    else {
        alert('Choisissez une reponse svp...');
    }
    nextBtn.disabled = false;
}
// Définition de la fonction HTMLDecode
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

// Fonction pour les comptes
function checkCount() {
    count++;
    setCount();
    if(count == nombreQuestion){
        console.log(score);
    }
    else{
        setTimeout(() => {
            loadQuestion();
        }, 10);
    }
}

// La fonction setCount
function setCount() {
    totalQuestion.textContent = nombreQuestion;
    correctScore.textContent = score;
    numQuestion.textContent = count;
}

// Pour adapter le popup à chaque résultat
function setComment() {
    if (score <= 5) {
        popupTitre.textContent = " C'est pas tout a fait ça...";
        popupPara.textContent = "Oula, heureusement que le Riddler est sous les verrous... Il faut que vous vous repassiez les films, cette fois en enlevant peut-être le masque qui vous a bloqué la vu! Aller rien n'est perdu.";
    }
    else if (score <= 11) {
        popupTitre.textContent = " Pas mal !";
        popupPara.textContent = "Encore un peu d'entraînement avec le Chevalier Noir vous serait bénéfique, mais vous pouvez marcher la tête haute vos connaissances sont là. A vous de les consolider, foncer Gotham est votre terrain de chasse !";
    }
    else if (score = 12) {
        popupTitre.textContent = " Bravo !";
        popupPara.textContent = "Vous êtes véritablement un super fan de l'univer de Batman ! Comics, films, rien en vous échappe. Bruce Wayne a de qui être fier. Gotham est en paix et Batman peut prendre sa retraite, vous veillez au grains !";
    }
    else {
        popupTitre.textContent = "lfsdfsdfsdfsdf";
        popupPara.textContent = "sdfsqdfsqdfsdfsdfsqdf";
    }
}

// Fonction restart quiz
function restartQuiz() {
    score = count = 0;
    setCount();
}

