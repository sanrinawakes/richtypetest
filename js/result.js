document.addEventListener("DOMContentLoaded", () => {
  // 依存が揃っているか
  const R = window.RICHTYPE;
  const profiles = window.MONEY_TYPE_PROFILES;

  const noData = document.getElementById("noData");
  const hero = document.getElementById("hero");
  const scoreCard = document.getElementById("scoreCard");
  const detailCard = document.getElementById("detailCard");

  // 必要最低限のDOMが無い場合は何もしない（事故防止）
  if (!noData || !hero || !scoreCard || !detailCard) {
    // ここで止める。HTMLが別物になっている可能性が高い。
    return;
  }

  // 結果データが無ければ noData を出す
  if (!R || typeof R.loadResult !== "function" || !profiles) {
    noData.style.display = "block";
    return;
  }

  const result = R.loadResult();
  if (!result || !result.primaryKey || !result.scores) {
    noData.style.display = "block";
    return;
  }

  const primaryKey = result.primaryKey;
  const secondaryKey = result.secondaryKey || null;

  const primaryProfile = profiles[primaryKey];
  const secondaryProfile = secondaryKey ? profiles[secondaryKey] : null;

  if (!primaryProfile) {
    noData.style.display = "block";
    return;
  }

  // ========= HERO描画 =========
  const badgeEl = document.getElementById("badge");
  const typeNameEl = document.getElementById("typeName");
  const taglineEl = document.getElementById("tagline");
  const primaryEl = document.getElementById("primary");
  const secondaryEl = document.getElementById("secondary");
  const blendNoteEl = document.getElementById("blendNote");

  if (!badgeEl || !typeNameEl || !taglineEl || !primaryEl || !secondaryEl || !blendNoteEl) {
    noData.style.display = "block";
    return;
  }

  badgeEl.textContent = primaryProfile.badge || "TYPE";
  typeNameEl.textContent = primaryProfile.name || "";
  taglineEl.textContent = primaryProfile.tagline || "";

  primaryEl.textContent = `${primaryProfile.name}（${primaryProfile.code}）`;
  secondaryEl.textContent = secondaryProfile ? `${secondaryProfile.name}（${secondaryProfile.code}）` : "—";
  blendNoteEl.textContent = result.blend?.note || "";

  hero.style.display = "block";

  // ========= SCORE描画 =========
  const barsEl = document.getElementById("bars");
  if (!barsEl) {
    noData.style.display = "block";
    return;
  }

  const order = (R.TYPE_ORDER && Array.isArray(R.TYPE_ORDER)) ? R.TYPE_ORDER : Object.keys(result.scores);
  const scores = result.scores;

  const max = Math.max(...Object.values(scores).filter(v => typeof v === "number"), 1);
  barsEl.innerHTML = "";

  order.forEach((key) => {
    const p = profiles[key];
    if (!p) return;

    const v = typeof scores[key] === "number" ? scores[key] : 0;
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
    barsEl.appendChild(row);
  });

  scoreCard.style.display = "block";

  // ========= DETAIL描画 =========
  const essenceEl = document.getElementById("essence");
  const jobsEl = document.getElementById("jobs");
  const doMoreEl = document.getElementById("doMore");
  const pitfallsEl = document.getElementById("pitfalls");
  const lowUseEl = document.getElementById("lowUse");
  const highUseEl = document.getElementById("highUse");
  const signalsEl = document.getElementById("signals");
  const experimentEl = document.getElementById("experiment");

  if (!essenceEl || !jobsEl || !doMoreEl || !pitfallsEl || !lowUseEl || !highUseEl || !signalsEl || !experimentEl) {
    noData.style.display = "block";
    return;
  }

  // profiles.js のHTMLをそのまま流し込み
  essenceEl.innerHTML = primaryProfile.essence || "";
  jobsEl.innerHTML = primaryProfile.jobs || "";
  doMoreEl.innerHTML = primaryProfile.doMore || "";
  pitfallsEl.innerHTML = primaryProfile.pitfalls || "";
  lowUseEl.innerHTML = primaryProfile.lowUse || "";
  highUseEl.innerHTML = primaryProfile.highUse || "";
  signalsEl.innerHTML = primaryProfile.signals || "";
  experimentEl.innerHTML = primaryProfile.experiment || "";

  // ========= BLEND描画 =========
  const blendPanel = document.getElementById("blendPanel");
  const blendGuide = document.getElementById("blendGuide");

  if (blendPanel && blendGuide) {
    // 初期は非表示のまま
    if (secondaryProfile && result.blend?.isBlend) {
      blendPanel.style.display = "block";

      const tipsMap = primaryProfile.blendTips || {};
      const specific = tipsMap[secondaryKey];

      const fallback = `
        <p><b>主軸：${primaryProfile.name}</b> と <b>補助：${secondaryProfile.name}</b> を併用する複合型です。</p>
        <ul>
          <li>迷ったら<b>主軸の勝ち筋</b>に戻る</li>
          <li>崩れる時は主軸と補助の罠が同時に出やすい</li>
          <li>主軸で伸ばし、補助で安定させる（全部やらない）</li>
        </ul>
      `;

      blendGuide.innerHTML = specific
        ? `<p>${specific}</p><hr style="border:0;border-top:1px solid rgba(255,255,255,.12);margin:12px 0">${fallback}`
        : fallback;
    }
  }

  detailCard.style.display = "block";

  // ========= COPY（短い結果コピー） =========
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const text =
        `【金持ちタイプ診断】\n` +
        `主軸：${primaryProfile.name}（${primaryProfile.code}）\n` +
        `補助：${secondaryProfile ? secondaryProfile.name : "—"}\n` +
        `判定：${result.blend?.note || ""}`;

      try {
        await navigator.clipboard.writeText(text);
        const prev = copyBtn.textContent;
        copyBtn.textContent = "コピーしました";
        setTimeout(() => (copyBtn.textContent = prev), 1500);
      } catch {
        // クリップボード不可の場合はalertで出す
        alert(text);
      }
    });
  }

  // ========= COPY（公式結果全文コピー：myGPT用） =========
  const copyAllBtn = document.getElementById("copyAllBtn");
  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", async () => {
      // 画面に表示されているもの＝公式結果としてそのままコピー（事故らない）
      // hero/detail/scoreが見える状態で押す前提
      const heroText = hero.innerText || "";
      const scoreText = scoreCard.innerText || "";
      const detailText = detailCard.innerText || "";

      const full =
        `【金持ちタイプ診断｜公式結果】\n\n` +
        heroText.trim() + `\n\n` +
        scoreText.trim() + `\n\n` +
        detailText.trim() + `\n`;

      try {
        await navigator.clipboard.writeText(full);
        alert("診断結果をすべてコピーしました。\nそのまま myGPT に貼り付けてください。");
      } catch {
        alert(full);
      }
    });
  }
});
