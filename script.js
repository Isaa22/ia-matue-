const questions = [
    {
        question: "Qual é o nome verdadeiro do Matuê?",
        options: [
            "Matheus Brasileiro Aguiar",
            "Matheus Fernandes Silva",
            "Matheus Oliveira Santos",
            "Matheus Costa Almeida"
        ],
        correct: 0
    },
    {
        question: "De qual cidade do Ceará o Matuê é natural?",
        options: [
            "Fortaleza",
            "Sobral",
            "Juazeiro do Norte",
            "Caucaia"
        ],
        correct: 1
    },
    {
        question: "Qual foi o álbum de estreia do Matuê lançado em 2020?",
        options: [
            "Máquina do Tempo",
            "Vampiro",
            "Sabor Overdose no Yakisoba",
            "Kenny G"
        ],
        correct: 1
    },
    {
        question: "Qual música do Matuê estourou nacionalmente em 2019?",
        options: [
            "Anos Luz",
            "Máquina do Tempo",
            "Vampiro",
            "Quer Voar"
        ],
        correct: 2
    },
    {
        question: "Qual selo/gravadora o Matuê fundou?",
        options: [
            "30PRAUM",
            "Rap Lab",
            "Mainstreet",
            "Pineapple"
        ],
        correct: 0
    },
    {
        question: "Em qual famoso festival o Matuê se apresentou em 2022?",
        options: [
            "Rock in Rio",
            "Lollapalooza",
            "Coachella",
            "Tomorrowland"
        ],
        correct: 1
    },
    {
        question: "Qual desses artistas já fez feat com o Matuê?",
        options: [
            "Anitta",
            "Wiz Khalifa",
            "Drake",
            "Post Malone"
        ],
        correct: 1
    },
    {
        question: "Qual é o estilo musical principal do Matuê?",
        options: [
            "Sertanejo",
            "Trap",
            "Pagode",
            "Axé"
        ],
        correct: 1
    },
    {
        question: "Qual o nome do álbum do Matuê lançado em 2024?",
        options: [
            "XTRANHO",
            "Máquina do Tempo 2",
            "Vampiro II",
            "30PRAUM"
        ],
        correct: 0
    },
    {
        question: "Qual dessas músicas é do Matuê?",
        options: [
            "Coração de Gelo",
            "Quer Voar",
            "Vai Malandra",
            "Envolver"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    answered = false;
    nextBtn.disabled = true;
    const q = questions[currentQuestion];
    questionNumberEl.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
    questionTextEl.textContent = q.question;
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.classList.add('option');
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        div.innerHTML = `<span class="letter">${letter}</span><span>${option}</span>`;
        div.addEventListener('click', () => selectOption(index, div));
        optionsContainer.appendChild(div);
    });
}

function selectOption(index, element) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const allOptions = document.querySelectorAll('.option');

    allOptions.forEach(opt => opt.classList.add('disabled'));

    if (index === q.correct) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('wrong');
        allOptions[q.correct].classList.add('correct');
    }

    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;

    if (score === questions.length) {
        scoreText.textContent += ' 🔥 Você é fã de verdade do Matuê!';
    } else if (score >= questions.length / 2) {
        scoreText.textContent += ' 👊 Mandou bem!';
    } else {
        scoreText.textContent += ' 😅 Bora ouvir mais Matuê!';
    }
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add('hidden');
    quizBox.classList.remove('hidden');
    loadQuestion();
});

loadQuestion();
