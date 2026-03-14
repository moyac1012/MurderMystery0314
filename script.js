const digestParts = [
  { type: "text", content: "惨劇の舞台となった屋敷。ガレージで発見されたボスの遺体を巡り、残された者たちは一堂に会した。残された時間はわずか6分。この「全体会議」が、運命を決める最後の審判となる\n。沈黙を破ったのは、鋭い指摘だった。\n" },
  {
    type: "quote",
    speaker: "証言者A",
    time: 35,
    content: "「カポの部屋から出てきた血を拭った後の布……それ、カポさんが死体を運んだからじゃないんですか？」"
  },
  { type: "text", content: "\nカポは動じることなく、淡々と事実を認めた。 " },
  {
    type: "quote",
    speaker: "カポ",
    time: 56,
    content: "「遺体は俺が移動したな。ガレージに放っておくのもあれだと思って、ボスの部屋に連れて行ったんだ。」"
  },
  { type: "text", content: "\n一同に戦慄が走る。だが、議論はさらに深淵へと踏み込んでいく。話題は、屋敷の番犬リッキーの奇妙な行動へと移った。\n" },
  {
    type: "quote",
    speaker: "証言者B",
    time: 92,
    content: "「リッキーが『ブルームーン』っていうタバコの匂いを嗅ぐと、クーンって鳴き声を出すという話を聞きました。」"
  },
  { type: "text", content: "\nこの情報が、アリバイの網の目を引き裂いていく。犯人はリッキーに吠えられずに裏庭を通れる人物。それは、リッキーに懐かれている者か、あるいはそのタバコの匂いを纏った者。\n" },
  {
    type: "quote",
    speaker: "証言者C",
    time: 124,
    content: "「ロープマンさんが座っていた椅子に、血が飛び散っていたのが気になって……それってもしかして、ロープマンが縛り付けられた後に、旦那様が亡くなったってこと？」"
  },
  { type: "text", content: "\n疑惑の矛先が次々と入れ替わる中、ブラザーが激昂したように声を荒らげた。\n" },
  {
    type: "quote",
    speaker: "ブラザー",
    time: 151,
    content: "「俺はバールを持って、ロープマンから金を返せって脅そうとしていたんだ！だが見つからなかったから諦めて、食堂でブランデーを飲んでいた！」"
  },
  { type: "text", content: "\nそのあまりに直情的な告白に、誰かが冷ややかに言い放つ。 " },
  {
    type: "quote",
    speaker: "誰か",
    time: 170,
    content: "「やっぱこいつ、イカれてるんだ。」"
  },
  { type: "text", content: "\n" },
  {
    type: "quote",
    speaker: "GM",
    time: 188,
    content: "「終了です。」"
  },
  { type: "text", content: "\nGMの無慈悲な宣告が響き渡る。たった6分間の、しかし命を削り合うようなやり取り。互いの悪意と秘密が露わになったその時、真実の扉がゆっくりと開き始めた\n。\n誰が嘘をつき、誰が本物の「ゴースト」なのか。結末へのカウントダウンは、既に始まっていた" }
];

const digestContainer = document.getElementById("digestContainer");
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

function renderDigest() {
  const p = document.createElement("p");
  p.className = "paragraph";

  digestParts.forEach((part) => {
    if (part.type === "text") {
      p.appendChild(document.createTextNode(part.content));
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "inline-quote";
    button.textContent = part.content;
    button.addEventListener("click", () => playAround(part));
    p.appendChild(button);
  });

  digestContainer.appendChild(p);
}

renderDigest();
