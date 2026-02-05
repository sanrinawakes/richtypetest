document.addEventListener("DOMContentLoaded", () => {

  const result = window.RICHTYPE?.loadResult();
  const profiles = window.MONEY_TYPE_PROFILES;

  const noData = document.getElementById("noData");
  const hero = document.getElementById("hero");
  const scoreCard = document.getElementById("scoreCard");
  const detailCard = document.getElementById("detailCard");

  if (!result || !profiles) {
    noData.style.display = "block";
    return;
  }

  const primaryProfile = profiles[result.primaryKey];
  const secondaryProfile = result.secondaryKey
    ? profiles[result.secondaryKey]
    : null;

  /* ========= HERO ========= */
  document.getElementById("badge").textContent = primaryProfile.badge;
  document.getElementById("typeName").textContent = primaryProfile.name;
  document.getElementById("tagline").textContent = primaryProfile.tagline;
  document.getElementById("primary").textContent =
    `${primaryProfile.name}（${primaryProfile.code}）`;
  document.getElementById("secondary").textContent =
    secondaryProfile
      ? `${secondaryProfile.name}（${secondaryProfile.code}）`
      : "—";
  document.getElementById("blendNote").textContent = result.blend.note;

  hero.style.display = "block";

  /* ========= COPY ========= */
  document.getElementById("copyBtn").addEventListener("click", async () => {
    const text =
      `【金持ちタイプ診断】\n` +
      `主軸：${primaryProfile.name}（${primaryProfile.code}）\n` +
      `補助：${secondaryProfile ? secondaryProfile.name : "—"}\n` +
      `判定：${result.blend.note}`;

    try {
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById("copyBtn");
      btn.textContent = "コピーしました";
      setTimeout(() => (btn.textContent = "結果をコピー"), 1500);
    } catch {
      alert(text);
    }
  });

  /* ========= SCORE ========= */
  const order = window.RICHTYPE.TYPE_ORDER;
  const scores = result.scores;
  const max = Math.max(...Object.values(scores), 1);
  const bars = document.getElementById("bars");

  bars.innerHTML = "";

  order.forEach(key => {
    const p = profiles[key];
    const v = scores[key] || 0;
    const pct = Math.round((v / max) * 100);

    const row = document.createElement("div");
    row.className = "bar";
    row.innerHTML = `
      <div class="bar__head">
        <div class="bar__name">${p.name}</div>
        <div class="bar__value">${v} pt</div>
      </div>
      <div class="bar__track">
        <div class="bar__fill" style="width:${pct}%"></div>
      </div>
    `;
    bars.appendChild(row);
  });

  scoreCard.style.display = "block";

  /* ========= DETAIL ========= */
  document.getElementById("essence").innerHTML = primaryProfile.essence;
  document.getElementById("jobs").innerHTML = primaryProfile.jobs;
  document.getElementById("doMore").innerHTML = primaryProfile.doMore;
  document.getElementById("pitfalls").innerHTML = primaryProfile.pitfalls;
  document.getElementById("lowUse").innerHTML = primaryProfile.lowUse;
  document.getElementById("highUse").innerHTML = primaryProfile.highUse;
  document.getElementById("signals").innerHTML = primaryProfile.signals;
  document.getElementById("experiment").innerHTML = primaryProfile.experiment;

  /* ========= BLEND ========= */
  const blendPanel = document.getElementById("blendPanel");
  const blendGuide = document.getElementById("blendGuide");

  if (secondaryProfile && result.blend.isBlend) {
    blendPanel.style.display = "block";

    const tipsMap = primaryProfile.blendTips || {};
    const specific = tipsMap[result.secondaryKey];

    const fallback = `
      <p><b>主軸：${primaryProfile.name}</b> と
      <b>補助：${secondaryProfile.name}</b> を併用する複合型です。</p>
      <ul>
        <li>迷ったら<b>主軸の勝ち筋</b>に戻る</li>
        <li>崩れる時は主軸と補助の罠が同時に出やすい</li>
        <li>主軸で伸ばし、補助で安定させる</li>
      </ul>
    `;

    blendGuide.innerHTML = specific
      ? `<p>${specific}</p><hr>${fallback}`
      : fallback;
  }

  detailCard.style.display = "block";
  // ===================================================
// 診断結果「全文コピー」ボタン用
// ===================================================
document.getElementById("copyAllBtn")?.addEventListener("click", async () => {
  const result = window.RICHTYPE.loadResult();
  const profiles = window.MONEY_TYPE_PROFILES;

  if (!result || !profiles) {
    alert("診断結果が見つかりません");
    return;
  }

  const primaryKey = result.primaryKey;
  const secondaryKey = result.secondaryKey;

  let text = "【金持ちタイプ診断｜結果データ】\n\n";

  // 主軸タイプ
  text += "■ 主軸タイプ\n";
  text += `${profiles[primaryKey].name}（${primaryKey}）\n\n`;

  // 補助タイプ
  text += "■ 補助タイプ\n";
  text += secondaryKey
    ? `${profiles[secondaryKey].name}（${secondaryKey}）\n\n`
    : "なし\n\n";

  // スコア内訳
  text += "■ スコア内訳\n";
  Object.entries(result.scores).forEach(([key, value]) => {
    text += `${key}: ${value}\n`;
  });

  // Q6 / Q10
  const q6Index = result.answers[5]; // Q6
  const q10Index = result.answers[9]; // Q10

  text += "\n■ Q6（問題・相談が起きたとき）\n";
  text += `選択：${["A","B","C","D"][q6Index]}\n`;

  text += "\n■ Q10（余裕がないとき）\n";
  text += `選択：${["A","B","C","D"][q10Index]}\n`;

  try {
    await navigator.clipboard.writeText(text);
    alert("診断結果をすべてコピーしました。\nmyGPTに貼り付けてください。");
  } catch (e) {
    alert("コピーに失敗しました");
  }
});
