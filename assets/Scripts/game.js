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

// Fonction pour vérifier si les éléments sont dans la vue lors du défilement
function checkScroll() {
    const windowHeight = window.innerHeight;
  
    // Vérifiez chaque élément fade-in
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
  
      // Ajoutez la classe fade-in lorsque l'élément est dans la moitié inférieure de la fenêtre
      if (elementTop < windowHeight * 0.5 && elementBottom > 0) {
        element.classList.add('fade-in');
      } else {
        element.classList.remove('fade-in');
      }
    });
  
    // Vérifiez chaque élément slide-left
    slideElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
  
      // Ajoutez la classe slide-left lorsque l'élément est dans la moitié inférieure de la fenêtre
      if (elementTop < windowHeight * 0.5 && elementBottom > 0) {
        element.classList.add('slide-left');
      } else {
        element.classList.remove('slide-left');
      }
    });
}

// Quiz

const BtnStart = document.querySelector("#start-btn");
const fleche = document.querySelector(".fleche");
const SectionStart = document.querySelector("#start");
const QuizSection = document.querySelector("#quiz");
const nextBtn = document.querySelector("#nextBtn");
const restartBtn = document.querySelector("#restartQuiz");
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
let correctAnswer = "", score = 0, nombreQuestion = 12 , count = 0, srcImg = "";

function eventListeners() {
    nextBtn.addEventListener('click', checkAnswer);
}


// Pour commencer le quiz
BtnStart.addEventListener('click', () => {
    SectionStart.style.display = "none";
    fleche.style.visibility = "hidden";
    QuizSection.style.display = "block";
});

// Afficher le numéro de question
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    eventListeners();
    setCount();
})

// Fonction pour prendre les données en utilisant fetch
async function loadQuestion() {
    const APIUrl = 'https://batman-api.sayna.space/questions';
    const result = await fetch(APIUrl);
    const data = await result.json();
    // Pour attribuer l'src de chaque images
    for(let i = 0; i <= 11 ; i++){
        data[i].img = "assets/Illustrations_game/Batgame_"+(i+3)+".png";
        if(i == 3) {
            data[i].img = "assets/Illustrations_game/Batgame_10.png";
        }
        else if(i == 4) {
            data[i].img = "assets/Illustrations_game/Batgame_11.png";
        }
        else if(i == 6) {
            data[i].img = "assets/Illustrations_game/Batgame_12.png";
        }
        else if(i == 7) {
            data[i].img = "assets/Illustrations_game/Batgame_19.png";
        }
        else if(i == 8) {
            data[i].img = "assets/Illustrations_game/Batgame_20.png";
        }
        else if(i == 9) {
            data[i].img = "assets/Illustrations_game/Batgame_21.png";
        }
        else if(i == 10) {
            data[i].img = "assets/Illustrations_game/Batgame_7.png";
        }
        else if(i == 11) {
            data[i].img = "assets/Illustrations_game/Batgame_6.png";
        }
    }

    // Pour régler l'erreur dans la quetion 1
    data[0].response[0].text = "Sphynx"; 
    data[0].response[1].isGood = false; 
    data[0].response[2].isGood = false;

    // Pour régler l'erreur dans la quetion 5
    data[4].response[2].isGood = true;

    // Pour commencer le quiz
    showQuestion(data[count]);
}

function showQuestion(data) { 
    let incorrectAnswer = [];

    // Mettre à jour l'image
    quizImg.setAttribute('src',data.img);
    console.log(data);

    for (let i = 0 ; i < data.response.length ; i++) {
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
        const checkbox = option.querySelector('input[type="checkbox"]');

        option.addEventListener('click', () => {
            if(options.querySelector('.selected')) {
                // Désélectionne toutes les options
                options.querySelectorAll('li').forEach((option) => {
                    option.querySelector('input[type="checkbox"]').checked = false;
                });
                
                activeOption = options.querySelector('.selected');
                activeOption.classList.remove('selected');
                    
            }
            option.classList.add('selected');
            checkbox.checked = true;
            nextBtn.disabled = false;
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
}
// Définition de la fonction HTMLDecode
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

// Fonction pour les comptes
function checkCount() {
    if((count+1) == nombreQuestion){
        setComment();
        popup.classList.add("popup-ouvert");
        QuizSection.style.display = "hidden";
    }
    else{
        loadQuestion();
        count++;
    }
    setCount();
}

// La fonction setCount
function setCount() {
    totalQuestion.textContent = nombreQuestion;
    correctScore.textContent = score;
    numQuestion.textContent = count+1;
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
        popupTitre.textContent = "Erreur";
        popupPara.textContent = "Un problème est survenu lors du quiz, veuillez recommencer ultérieurement s'il vous plaît...";
    }
}

// Pour recommencer le quiz
restartBtn.addEventListener('click', restartQuiz);
function restartQuiz() {
    // Réinitialiser les variables
    correctAnswer = "", score = 0, count = 0;

    // Réinitialiser les éléments du quiz
    setCount();

    // Afficher la section de départ
    QuizSection.style.display = "block";

    // Réinitialiser le popup
    popup.classList.remove("popup-ouvert");
    popupPara.textContent = "";
    popupTitre.textContent = "";
    
    loadQuestion();
}