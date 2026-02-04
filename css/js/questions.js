// 10問：金の話を直接聞かず、生活行動と「反射」で型を観測する。
// 各選択肢は、8タイプに加点する（複合型も出るように設計）。

window.MONEY_TYPE_QUESTIONS = [

  {
    id: "q1",
    text: "臨時収入が入ったとき、最初にやりがちなのは？",
    hint: "深く考える前の“最初の動き”で。",
    choices: [
      { label: "A", text: "気になっていた体験や娯楽に使う", score: { influence: 1, creator: 1 } },
      { label: "B", text: "家族や身近な人のために使う",       score: { trust: 2 } },
      { label: "C", text: "しばらく取っておく（安心を確保する）", score: { growth: 2 } },
      { label: "D", text: "増えそうな学び・投資・道具に回す",     score: { decision: 1, mechanic: 1 } },
    ],
  },

  {
    id: "q2",
    text: "突然、人から重めの相談を受けたときの反応は？",
    hint: "理想じゃなく、実際にやりがちな動き。",
    choices: [
      { label: "A", text: "人を巻き込んで解決策を探す（紹介/つなぐ）", score: { connector: 2 } },
      { label: "B", text: "まず相手の気持ちを落ち着かせる（同席して聞く）", score: { trust: 2 } },
      { label: "C", text: "整理して、できるだけ早く選択肢や解決策を出す", score: { decision: 2 } },
      { label: "D", text: "まず事実関係を確認して、結論を急がず全体を整理する", score: { growth: 2 } },
    ],
  },

  {
    id: "q3",
    text: "自由に使える1日ができたら、何をして過ごすことが多い？",
    hint: "「休みの日に勝手にそうなる」を選ぶ。",
    choices: [
      { label: "A", text: "人に会う／外に出る／発信して刺激を取りに行く", score: { influence: 2 } },
      { label: "B", text: "身近な人の相談に乗る／頼まれごとを片づける", score: { trust: 2 } },
      { label: "C", text: "部屋や仕事のやり方を整理して、仕組みを整える", score: { mechanic: 2 } },
      { label: "D", text: "一人で学ぶ／将来のための準備や仕込みをする", score: { growth: 2, creator: 1 } },
    ],
  },

  {
    id: "q4",
    text: "チームや集団で問題が起きたときの立ち位置は？",
    hint: "",
    choices: [
      { label: "A", text: "前に出て方向を示す（決める/任せる）", score: { leader: 2 } },
      { label: "B", text: "間に入って関係を調整する（双方の橋渡し）", score: { connector: 2, trust: 1 } },
      { label: "C", text: "ルールや仕組みを見直す（再発防止を作る）", score: { mechanic: 2, decision: 1 } },
      { label: "D", text: "被害が広がらないよう抑える（止める/保留する）", score: { growth: 2 } },
    ],
  },

  {
    id: "q5",
    text: "買い物や契約で迷ったとき、決め手になりやすいのは？",
    hint: "",
    choices: [
      { label: "A", text: "ワクワクするかどうか", score: { influence: 2, creator: 1 } },
      { label: "B", text: "誰が勧めているか／信頼できるか", score: { trust: 2, connector: 1 } },
      { label: "C", text: "条件や数字に納得できるか", score: { decision: 2, mechanic: 1 } },
      { label: "D", text: "将来の安心につながるか", score: { growth: 2 } },
    ],
  },

  {
    id: "q6",
    text: "想定外のトラブルが起きた直後、最初の5分で実際にやっていることはどれ？",
    hint: "理想じゃなく、気づいたらやってる行動。",
    choices: [
      { label: "A", text: "スマホを開いて関係しそうな人に状況を共有する（投げる）", score: { connector: 2, leader: 1 } },
      { label: "B", text: "目の前の相手の話を止めずに聞き、落ち着くまで同席する", score: { trust: 2 } },
      { label: "C", text: "紙/メモに「何が起きたか」を時系列で書き出す", score: { decision: 2, mechanic: 1 } },
      { label: "D", text: "進行中の動きに“止め”を入れて、被害を広げない判断をする", score: { growth: 2, leader: 1 } },
    ],
  },

  {
    id: "q7",
    text: "他人から言われたことがある評価に一番近いのは？",
    hint: "一度でも言われたことがあるならOK。",
    choices: [
      { label: "A", text: "影響力がある／存在感がある", score: { influence: 2 } },
      { label: "B", text: "安心して任せられる", score: { trust: 2 } },
      { label: "C", text: "判断が的確", score: { decision: 2 } },
      { label: "D", text: "安定感がある", score: { growth: 2 } },
    ],
  },

  {
    id: "q8",
    text: "何かを任されたとき、無意識に気になるのは？",
    hint: "",
    choices: [
      { label: "A", text: "どう見られるか／どう伝わるか", score: { influence: 2 } },
      { label: "B", text: "相手が困らないか／気持ちが荒れないか", score: { trust: 2 } },
      { label: "C", text: "うまく回る仕組みか（手順・担当・抜け漏れ）", score: { mechanic: 2 } },
      { label: "D", text: "リスクや継続性（あとで困らないか）", score: { growth: 2 } },
    ],
  },

  {
    id: "q9",
    text: "一番ストレスを感じやすい状況は？",
    hint: "",
    choices: [
      { label: "A", text: "注目されない／反応がない", score: { influence: 2 } },
      { label: "B", text: "感謝されない／雑に扱われる", score: { trust: 2 } },
      { label: "C", text: "決められない／曖昧なまま進む", score: { decision: 2 } },
      { label: "D", text: "先が見えない／不安定", score: { growth: 2 } },
    ],
  },

  {
    id: "q10",
    text: "余裕がないとき、気づくとやってしまっている行動はどれ？",
    hint: "良い悪いではなく事実。体が勝手に選ぶ逃げ道。",
    choices: [
      { label: "A", text: "スマホ/外出/買い物など、外に刺激を取りに行く", score: { influence: 2, creator: 1 } },
      { label: "B", text: "誰かと一緒に過ごす／連絡して孤立しないようにする", score: { trust: 2, connector: 1 } },
      { label: "C", text: "ノートや頭で状況を整理し続ける（書き出す/計画し直す）", score: { decision: 2, mechanic: 1 } },
      { label: "D", text: "予定や作業を止めて、距離を取る／引きこもる／休む", score: { growth: 2 } },
    ],
  },

];
