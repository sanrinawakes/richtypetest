(function () {
  const result = window.RICHTYPE.loadResult();
  const profiles = window.MONEY_TYPE_PROFILES;

  const noData = document.getElementById("noData");
  const hero = document.getElementById("hero");
  const scoreCard = document.getElementById("scoreCard");
  const detailCard = document.getElementById("detailCard");

  if (!result) {
    noData.style.display = "block";
    return;
  }

  const primaryProfile = profiles[result.primaryKey];
  const secondaryProfile = result.secondaryKey ? profiles[result.secondaryKey] : null;

  // HERO
  document.getElementById("badge").textContent = primaryProfile.badge;
  document.getElementById("typeName").textContent = primaryProfile.name;
  document.getElementById("tagline").textContent = primaryProfile.tagline;
  document.getElementById("primary").textContent = `${primaryProfile.name}（${primaryProfile.code}）`;
  document.getElementById("secondary").textContent = secondaryProfile ? `${secondaryProfile.name}（${secondaryProfile.code}）` : "—";
  document.getElementById("blendNote").textContent = result.blend.note;
  hero.style.display = "block";

  // COPY
  document.getElementById("copyBtn").addEventListener("click", async () => {
    const text = `【金持ちタイプ診断】\n主軸：${primaryProfile.name}（${primaryProfile.code}）\n補助：${secondaryProfile ? secondaryProfile.name : "—"}\n判定：${result.blend.note}\n`;
    try {
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById("copyBtn");
      btn.textContent = "コピーしました";
      setTimeout(() => (btn.textContent = "結果をコピー"), 1500);
    } catch {
      alert(text);
    }
  });

  // SCORE BARS
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
      <div class="bar__track"><div class="bar__fill" style="width:${pct}%"></div></div>
    `;
    bars.appendChild(row);
  });

  scoreCard.style.display = "block";

  // DETAIL
  document.getElementById("essence").innerHTML = primaryProfile.essence;
  document.getElementById("jobs").innerHTML = primaryProfile.jobs;
  document.getElementById("doMore").innerHTML = primaryProfile.doMore;
  document.getElementById("pitfalls").innerHTML = primaryProfile.pitfalls;
  document.getElementById("lowUse").innerHTML = primaryProfile.lowUse;
  document.getElementById("highUse").innerHTML = primaryProfile.highUse;
  document.getElementById("signals").innerHTML = primaryProfile.signals;
  document.getElementById("experiment").innerHTML = primaryProfile.experiment;

  // BLEND
  const blendPanel = document.getElementById("blendPanel");
  const blendGuide = document.getElementById("blendGuide");
  if (secondaryProfile && result.blend.isBlend) {
    blendPanel.style.display = "block";

    const tipsMap = primaryProfile.blendTips || {};
    const specific = tipsMap[result.secondaryKey];

    const fallback = `
      <p><b>主軸：${primaryProfile.name}</b> と <b>補助：${secondaryProfile.name}</b> を併用できる複合型です。</p>
      <ul>
        <li>迷ったら<b>主軸の勝ち筋</b>に戻る（補助に逃げ続けると停滞しやすい）</li>
        <li>崩れる時は<b>主軸の罠</b>＋<b>補助の罠</b>が同時に出やすい。片方を止める</li>
        <li>主軸で伸ばし、補助で安定させる（全部やらない）</li>
      </ul>
    `;

    blendGuide.innerHTML = specific
      ? `<p>${specific}</p><hr style="border:0;border-top:1px solid rgba(255,255,255,.12);margin:12px 0">${fallback}`
      : fallback;
  }

  detailCard.style.display = "block";
})();
