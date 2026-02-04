(function () {
  const questions = window.MONEY_TYPE_QUESTIONS;

  const startBtn = document.getElementById("startBtn");
  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");

  const resetBtn = document.getElementById("resetBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const counterText = document.getElementById("counterText");
  const questionText = document.getElementById("questionText");
  const questionHint = document.getElementById("questionHint");
  const choicesEl = document.getElementById("choices");
  const progressFill = document.getElementById("progressFill");

  let current = 0;
  let answers = Array(questions.length).fill(null);

  function showQuiz(){
    intro.style.display = "none";
    quiz.style.display = "block";
    render();
  }

  function resetAll(){
    current = 0;
    answers = Array(questions.length).fill(null);
    localStorage.removeItem(window.RICHTYPE.STORAGE_KEY);
    intro.style.display = "block";
    quiz.style.display = "none";
  }

  function setChoice(idx){
    answers[current] = idx;
    renderChoices();
    nextBtn.disabled = (answers[current] === null);
  }

  function renderChoices(){
    const q = questions[current];
    choicesEl.innerHTML = "";
    q.choices.forEach((c, idx) => {
      const div = document.createElement("div");
      div.className = "choice" + (answers[current] === idx ? " selected" : "");
      div.innerHTML = `<div><span class="choice__label">${c.label}</span><span class="choice__text">${c.text}</span></div>`;
      div.addEventListener("click", () => setChoice(idx));
      choicesEl.appendChild(div);
    });
  }

  function render(){
    const q = questions[current];
    counterText.textContent = `質問 ${current+1} / ${questions.length}`;
    questionText.textContent = q.text;
    questionHint.textContent = q.hint || "";

    const progress = Math.round(((current+1) / questions.length) * 100);
    progressFill.style.width = `${progress}%`;

    prevBtn.disabled = (current === 0);
    nextBtn.disabled = (answers[current] === null);

    renderChoices();
  }

  function goNext(){
    if (answers[current] === null) return;

    if (current < questions.length - 1){
      current++;
      render();
      return;
    }

    // 完了
    window.RICHTYPE.buildResult(answers);
    window.location.href = "./result.html";
  }

  function goPrev(){
    if (current === 0) return;
    current--;
    render();
  }

  startBtn.addEventListener("click", showQuiz);
  resetBtn.addEventListener("click", resetAll);
  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);
})();
