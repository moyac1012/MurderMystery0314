const digestParagraphs = [
  "惨劇の舞台となった屋敷。ガレージで発見されたボスの遺体を巡り、残された者たちは一堂に会した。残された時間はわずか6分。この『全体会議』が、運命を決める最後の審判となる。",
  "沈黙を破った鋭い指摘は、カポの行動を核心へと引きずり出す。遺体を運んだという告白は、場を凍らせるには十分だった。",
  "だが疑惑は一人には留まらない。番犬リッキーが『ブルームーン』の匂いに反応するという証言が、裏庭ルートの可能性を開き、全員のアリバイを揺さぶっていく。",
  "ロープマンの椅子に飛び散った血痕、ブラザーの激昂した自白、そして冷笑と断絶。短い6分は、互いの秘密を暴き合う濃密な戦場へ変わった。",
  "『終了です。』GMの一言で幕が引かれた瞬間、誰が嘘をつき、誰が本物のゴーストなのか――結末への扉だけが静かに開き始めていた。"
];

const quoteData = [
  {
    speaker: "証言者A",
    time: 35,
    text: "カポの部屋から出てきた血を拭った後の布……それ、カポさんが死体を運んだからじゃないんですか？"
  },
  {
    speaker: "カポ",
    time: 56,
    text: "遺体は俺が移動したな。ガレージに放っておくのもあれだと思って、ボスの部屋に連れて行ったんだ。"
  },
  {
    speaker: "証言者B",
    time: 92,
    text: "リッキーが『ブルームーン』っていうタバコの匂いを嗅ぐと、クーンって鳴き声を出すという話を聞きました。"
  },
  {
    speaker: "証言者C",
    time: 124,
    text: "ロープマンさんが座っていた椅子に、血が飛び散っていたのが気になって……"
  },
  {
    speaker: "ブラザー",
    time: 151,
    text: "俺はバールを持って、ロープマンから金を返せって脅そうとしていたんだ！"
  },
  {
    speaker: "GM",
    time: 188,
    text: "終了です。"
  }
];

const digestContainer = document.getElementById("digestContainer");
const quoteList = document.getElementById("quoteList");
const audioPlayer = document.getElementById("audioPlayer");
const seekStatus = document.getElementById("seekStatus");

function formatTime(sec) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function renderDigest() {
  digestParagraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.className = "paragraph";
    p.textContent = paragraph;
    digestContainer.appendChild(p);
  });
}

function renderQuotes() {
  quoteData.forEach((quote) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "quote-btn";

    const meta = document.createElement("span");
    meta.className = "quote-meta";
    meta.textContent = `${quote.speaker} / 推定時刻 ${formatTime(quote.time)}`;

    const body = document.createElement("span");
    body.textContent = `「${quote.text}」`;

    button.append(meta, body);
    button.addEventListener("click", () => playAround(quote));
    li.appendChild(button);
    quoteList.appendChild(li);
  });
}

function playAround(quote) {
  if (!audioPlayer) {
    return;
  }

  const start = Math.max(0, quote.time - 5);
  audioPlayer.currentTime = start;
  audioPlayer.play().catch(() => {
    seekStatus.textContent = "ブラウザの自動再生制限により再生できません。再生ボタンを押してください。";
  });

  seekStatus.textContent = `${quote.speaker} のセリフ前後を再生中（${formatTime(start)} から）`;
}

renderDigest();
renderQuotes();
