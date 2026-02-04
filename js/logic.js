(function () {
  const STORAGE_KEY = "richTypeResult_v1";
  const TYPE_ORDER = ["influence","trust","connector","decision","mechanic","growth","leader","creator"];

  function emptyScores(){
    const s = {};
    TYPE_ORDER.forEach(k => s[k] = 0);
    return s;
  }

  function addScores(base, add){
    Object.keys(add || {}).forEach(k => {
      if (typeof base[k] !== "number") base[k] = 0;
      base[k] += add[k];
    });
  }

  function computeScores(answers, questions){
    const scores = emptyScores();
    answers.forEach((choiceIndex, qi) => {
      const q = questions[qi];
      const choice = q?.choices?.[choiceIndex];
      if (!choice || !choice.score) return;
      addScores(scores, choice.score);
    });
    return scores;
  }

  function rank(scores){
    return Object.entries(scores).sort((a,b) => b[1]-a[1]);
  }

  function blendDecision(p1, p2){
    const gap = (p1?.[1] ?? 0) - (p2?.[1] ?? 0);
    if ((p2?.[1] ?? 0) <= 0) return { isBlend:false, note:"単独型（主軸が明確）", gap };
    if (gap <= 1) return { isBlend:true, note:"強い複合型（主軸＋補助が拮抗）", gap };
    if (gap <= 2) return { isBlend:true, note:"複合型（主軸に補助が強く影響）", gap };
    return { isBlend:false, note:"準単独型（主軸が優勢）", gap };
  }

  function buildResult(answers){
    const questions = window.MONEY_TYPE_QUESTIONS;
    const scores = computeScores(answers, questions);
    const ranking = rank(scores);
    const primaryKey = ranking[0][0];
    const secondaryKeyRaw = ranking[1]?.[0] ?? null;
    const blend = blendDecision(ranking[0], ranking[1]);

    const secondaryKey = blend.isBlend ? secondaryKeyRaw : null;

    const result = {
      version: 1,
      createdAt: new Date().toISOString(),
      answers,
      scores,
      ranking,
      primaryKey,
      secondaryKey,
      blend,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    return result;
  }

  function loadResult(){
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  window.RICHTYPE = {
    STORAGE_KEY,
    TYPE_ORDER,
    buildResult,
    loadResult
  };
})();
