'use strict';

// ========== LANGUAGE ==========

let lang = localStorage.getItem('kinen_lang') || 'ja';

// ========== TRANSLATIONS ==========

const T = {
  ja: {
    appTitle: '禁煙トラッカー',
    setupDescHtml: '禁煙の継続日数・節約金額・身体の回復を<br>毎日確認して、禁煙の歩みを支えます。',
    quitDateLabel: '禁煙開始日を選択',
    dailyCostLabel: '1日あたりのタバコ代（円）',
    dailyCostPlaceholder: '例：600',
    btnStart: '禁煙を始める',
    headerTitle: '禁煙トラッカー',
    streakLabel: '継続中',
    streakUnit: '日禁煙中',
    streakSub: '今日も続けています',
    startedPrefix: '開始日：',
    savingsLabel: 'タバコ代の節約額',
    savingsNoCost: '（設定で1日のタバコ代を入力すると節約金額が表示されます）',
    savingsToday: '今日から節約が始まりました',
    savingsCalc: (cost, days) => `1日${cost.toLocaleString('ja-JP')}円 × ${days}日 = 節約できました！`,
    messageLabel: '今日の一言',
    effectLabel: '身体の回復効果',
    milestonesLabel: 'マイルストーン達成度',
    milestoneAchieved: '達成',
    milestonesDays: (d) => d + '日',
    nextMilestoneMsg: (label, remaining) => `次のマイルストーン「${label}」まで あと ${remaining} 日`,
    allMilestonesMsg: '全マイルストーン達成！あなたは本当に素晴らしい禁煙者です。',
    emergencyBtn: 'タバコが吸いたい…',
    recommendLabel: 'おすすめリンク',
    recommendPrefix: (days) => `禁煙${days}日目におすすめ`,
    btnReset: 'リセット',
    btnShare: 'シェア',
    footer: '一日一日の積み重ねが、あなたの身体を回復へ導く。',
    emergencyModalTitle: '今すぐ試して',
    btnPrev: '‹ 前へ',
    btnNext: '次へ ›',
    resetTitle: '記録をリセットしますか？',
    resetBodyHtml: '現在の記録がすべて消えます。<br>本当にリセットしますか？',
    btnCancel: 'キャンセル',
    btnConfirm: 'リセットする',
    shareText: (days, savings) => {
      let s = `禁煙${days}日達成！🚭`;
      if (savings > 0) s += ` タバコ代${formatCurrency(savings)}節約できました。`;
      s += ' 一日一日の積み重ねで身体が回復しています。';
      return s;
    },
    formatDate: (date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
    alertNoDate: '禁煙開始日を選択してください',
    alertInvalidDate: '日付が正しくありません',
    alertFutureDate: '未来の日付は設定できません',
    shareTitle: '禁煙トラッカー',
    clipboardMsg: 'クリップボードにコピーしました',
    langBtn: 'EN'
  },
  en: {
    appTitle: 'Quit Smoking Tracker',
    setupDescHtml: 'Track your smoke-free days, money saved,<br>and body recovery every day.',
    quitDateLabel: 'Quit Date',
    dailyCostLabel: 'Daily cigarette cost (¥)',
    dailyCostPlaceholder: 'e.g. 600',
    btnStart: 'Start Tracking',
    headerTitle: 'Quit Smoking Tracker',
    streakLabel: 'Ongoing',
    streakUnit: ' days smoke-free',
    streakSub: 'Keep going today!',
    startedPrefix: 'Started: ',
    savingsLabel: 'Money Saved',
    savingsNoCost: '(Enter your daily cost to see savings)',
    savingsToday: 'Your savings start today!',
    savingsCalc: (cost, days) => `¥${cost.toLocaleString()} × ${days} days = saved!`,
    messageLabel: "Today's Message",
    effectLabel: 'Body Recovery',
    milestonesLabel: 'Milestones',
    milestoneAchieved: 'Done',
    milestonesDays: (d) => d + ' days',
    nextMilestoneMsg: (label, remaining) => `Next: "${label}" — ${remaining} days to go`,
    allMilestonesMsg: 'All milestones achieved! You are truly remarkable.',
    emergencyBtn: 'I want to smoke...',
    recommendLabel: 'Recommended',
    recommendPrefix: (days) => `Recommended for day ${days}`,
    btnReset: 'Reset',
    btnShare: 'Share',
    footer: 'Every day counts. Your body is healing.',
    emergencyModalTitle: 'Try This Now',
    btnPrev: '‹ Prev',
    btnNext: 'Next ›',
    resetTitle: 'Reset your record?',
    resetBodyHtml: 'All data will be deleted.<br>Are you sure?',
    btnCancel: 'Cancel',
    btnConfirm: 'Reset',
    shareText: (days, savings) => {
      let s = `${days} days smoke-free! 🚭`;
      if (savings > 0) s += ` Saved ${formatCurrency(savings)} on cigarettes.`;
      s += ' My body is recovering day by day.';
      return s;
    },
    formatDate: (date) => `${date.getFullYear()}/${String(date.getMonth()+1).padStart(2,'0')}/${String(date.getDate()).padStart(2,'0')}`,
    alertNoDate: 'Please select your quit date.',
    alertInvalidDate: 'Invalid date.',
    alertFutureDate: 'Future dates cannot be selected.',
    shareTitle: 'Quit Smoking Tracker',
    clipboardMsg: 'Copied to clipboard',
    langBtn: 'JP'
  }
};

// ========== DATA (Japanese) ==========

const EFFECTS_JA = [
  {
    minDay: 1, maxDay: 3,
    period: '1〜3日目',
    title: 'ニコチン離脱・身体のデトックス開始',
    items: [
      '禁煙20分後：血圧・心拍数が正常に戻る',
      '禁煙12時間後：血中一酸化炭素濃度が正常化',
      '禁煙48時間後：ニコチンが体内からほぼ消える',
      '禁煙72時間後：気管支が広がり呼吸が楽になる'
    ]
  },
  {
    minDay: 4, maxDay: 7,
    period: '4〜7日目',
    title: '味覚・嗅覚の回復',
    items: [
      '味覚・嗅覚が鮮明に戻ってくる',
      '血液循環が改善し始める',
      'エネルギーレベルが上がり始める',
      '禁断症状（イライラ・集中困難）のピークを過ぎる'
    ]
  },
  {
    minDay: 8, maxDay: 14,
    period: '8〜14日目',
    title: '肺の繊毛回復',
    items: [
      '肺の繊毛が回復し、異物を排出しやすくなる',
      '痰・咳が増えるのは回復のサイン',
      '歯・口腔内の状態が改善し始める',
      '皮膚の血色が良くなる'
    ]
  },
  {
    minDay: 15, maxDay: 30,
    period: '15〜30日目',
    title: '血液循環の改善',
    items: [
      '末梢血管の血流が大幅に改善',
      '手足の冷えが和らぐ',
      '肺活量が少しずつ増加する',
      '集中力・記憶力が回復し始める'
    ]
  },
  {
    minDay: 31, maxDay: 90,
    period: '1〜3ヶ月',
    title: '肺機能の著しい改善',
    items: [
      '肺機能が10〜30%改善される',
      '慢性気管支炎の症状が軽減',
      '階段での息切れが明らかに減る',
      '免疫力が向上し風邪をひきにくくなる'
    ]
  },
  {
    minDay: 91, maxDay: 180,
    period: '3〜6ヶ月',
    title: '気道炎症の改善・免疫力向上',
    items: [
      '気道の慢性炎症が大幅に改善',
      '感染症・肺炎リスクが低下',
      '口腔内の健康状態が改善',
      'スタミナ・体力が顕著に向上'
    ]
  },
  {
    minDay: 181, maxDay: 365,
    period: '6ヶ月〜1年',
    title: '心臓病リスクの大幅低下',
    items: [
      '心臓病リスクが喫煙者の半分以下に',
      '脳卒中リスクが大幅に低下',
      '肺機能がさらに回復',
      '肌の状態・ツヤが明らかに改善'
    ]
  },
  {
    minDay: 366, maxDay: Infinity,
    period: '1年以上',
    title: 'がん・心筋梗塞リスクの低下',
    items: [
      '肺がんリスクが喫煙者の半分以下に低下',
      '心筋梗塞リスクが非喫煙者並みに近づく',
      '口腔・食道・膀胱がんリスクも低下',
      'あなたの選択が命を守りました'
    ]
  }
];

const EFFECTS_EN = [
  {
    minDay: 1, maxDay: 3,
    period: 'Day 1–3',
    title: 'Nicotine Withdrawal & Detox Begins',
    items: [
      '20 min after quitting: blood pressure & heart rate normalize',
      '12 hours after quitting: carbon monoxide levels normalize',
      '48 hours after quitting: nicotine is nearly gone from your body',
      '72 hours after quitting: bronchial tubes relax, breathing feels easier'
    ]
  },
  {
    minDay: 4, maxDay: 7,
    period: 'Day 4–7',
    title: 'Taste & Smell Recovery',
    items: [
      'Taste and smell senses become sharper',
      'Blood circulation starts to improve',
      'Energy levels begin to rise',
      'Peak withdrawal symptoms (irritability, difficulty focusing) have passed'
    ]
  },
  {
    minDay: 8, maxDay: 14,
    period: 'Day 8–14',
    title: 'Lung Cilia Regeneration',
    items: [
      'Lung cilia regenerate, helping remove foreign particles',
      'Increased phlegm and coughing are signs of recovery',
      'Teeth and oral health begin to improve',
      'Skin complexion improves'
    ]
  },
  {
    minDay: 15, maxDay: 30,
    period: 'Day 15–30',
    title: 'Improved Blood Circulation',
    items: [
      'Peripheral blood flow significantly improves',
      'Cold hands and feet become less frequent',
      'Lung capacity gradually increases',
      'Concentration and memory begin to recover'
    ]
  },
  {
    minDay: 31, maxDay: 90,
    period: '1–3 Months',
    title: 'Significant Lung Function Improvement',
    items: [
      'Lung function improves by 10–30%',
      'Chronic bronchitis symptoms reduce',
      'Shortness of breath on stairs noticeably decreases',
      'Immune system strengthens; fewer colds'
    ]
  },
  {
    minDay: 91, maxDay: 180,
    period: '3–6 Months',
    title: 'Reduced Airway Inflammation & Stronger Immunity',
    items: [
      'Chronic airway inflammation greatly reduced',
      'Risk of infections and pneumonia decreases',
      'Oral health continues to improve',
      'Stamina and physical endurance noticeably improve'
    ]
  },
  {
    minDay: 181, maxDay: 365,
    period: '6 Months–1 Year',
    title: 'Major Drop in Heart Disease Risk',
    items: [
      'Heart disease risk drops to less than half that of smokers',
      'Stroke risk significantly decreases',
      'Lung function continues to improve',
      'Skin condition and complexion clearly improve'
    ]
  },
  {
    minDay: 366, maxDay: Infinity,
    period: '1 Year+',
    title: 'Reduced Cancer & Heart Attack Risk',
    items: [
      'Lung cancer risk drops to less than half that of smokers',
      'Heart attack risk approaches that of non-smokers',
      'Risk of oral, esophageal & bladder cancer also decreases',
      'Your choice has protected your life'
    ]
  }
];

const MESSAGES_JA = [
  { minDay: 1, maxDay: 3, text: '最初の72時間が山場です。ニコチンは体内からほぼ消えました。今が一番辛くて、一番大切な時間です。' },
  { minDay: 4, maxDay: 7, text: '1週間が見えてきました。味覚・嗅覚が戻り始めています。食事が美味しくなってきたはずです。' },
  { minDay: 8, maxDay: 14, text: '2週間目。肺の繊毛が回復し、痰が出やすくなるのは回復のサインです。' },
  { minDay: 15, maxDay: 30, text: '1ヶ月が近い。血液循環が改善され、手足の末梢まで酸素が届くようになっています。' },
  { minDay: 31, maxDay: 90, text: '素晴らしい！肺機能が著しく改善。階段を上っても息切れが減ってきたはずです。' },
  { minDay: 91, maxDay: 180, text: '3ヶ月超え。気道の炎症が大幅に改善。感染症にかかりにくくなっています。' },
  { minDay: 181, maxDay: 365, text: '半年以上！心臓病リスクが喫煙者の半分以下になりました。' },
  { minDay: 366, maxDay: Infinity, text: '1年以上の禁煙。肺がん・心筋梗塞のリスクが大幅に低下しています。あなたは本物の禁煙者です。' }
];

const MESSAGES_EN = [
  { minDay: 1, maxDay: 3, text: 'The first 72 hours are the hardest. Nicotine has nearly left your body. This is the toughest and most important time.' },
  { minDay: 4, maxDay: 7, text: 'One week is in sight. Your taste and smell are coming back. Food should be tasting better now.' },
  { minDay: 8, maxDay: 14, text: 'Two weeks in. Lung cilia are regenerating. More phlegm is actually a sign of recovery.' },
  { minDay: 15, maxDay: 30, text: 'Almost a month! Blood circulation is improving, delivering oxygen all the way to your fingertips.' },
  { minDay: 31, maxDay: 90, text: 'Amazing! Lung function has improved significantly. You should notice less breathlessness on stairs.' },
  { minDay: 91, maxDay: 180, text: 'Over 3 months! Airway inflammation has greatly reduced. You are getting sick less often.' },
  { minDay: 181, maxDay: 365, text: 'Over 6 months! Your heart disease risk is now less than half that of a smoker.' },
  { minDay: 366, maxDay: Infinity, text: 'Over 1 year smoke-free! Your risks of lung cancer and heart attack have dropped significantly. You are a true non-smoker.' }
];

const EMERGENCY_TIPS_JA = [
  {
    icon: '🕐',
    title: '「今だけ我慢」の法則',
    body: '「今から5分だけ吸わない」と決める。\nニコチン渇望は5〜10分でピークが過ぎます。\n5分後には必ず楽になります。'
  },
  {
    icon: '💧',
    title: '水を飲む',
    body: 'コップ1杯の水をゆっくり飲む。\n口や喉への刺激欲求を水で満たすことができます。\n冷たい水が特に効果的です。'
  },
  {
    icon: '🚶',
    title: 'その場を離れる',
    body: '喫煙者がいる場所・タバコを連想する場所から離れる。\n環境を変えるだけで渇望が大幅に和らぎます。'
  },
  {
    icon: '🧘',
    title: '深呼吸',
    body: '4秒吸って、7秒止めて、8秒かけて吐く。\nタバコの「吸う」行為への欲求を深呼吸で代替できます。'
  },
  {
    icon: '🏃',
    title: '身体を動かす',
    body: '5分の散歩、腕立て伏せ、スクワットなど。\n運動でドーパミンが分泌され、ニコチン渇望が弱まります。'
  },
  {
    icon: '🍬',
    title: '口に何か入れる',
    body: 'ガム、飴、ナッツ、野菜スティックなど。\n口の刺激欲求を別のもので満たしましょう。'
  },
  {
    icon: '📞',
    title: '誰かに電話する',
    body: '「今タバコが吸いたくなっている」と話す。\n言葉にするだけで衝動が弱まります。\n禁煙サポートラインへの電話も有効です。'
  },
  {
    icon: '📝',
    title: 'メモを書く',
    body: '「なぜ禁煙しているか」を書き出す。\n節約できたお金・回復した肺・家族の笑顔を思い浮かべてください。'
  },
  {
    icon: '🛁',
    title: 'シャワーを浴びる',
    body: '温かいシャワーが気分をリセットします。\nシャワー中に渇望のピークが過ぎることも多いです。'
  },
  {
    icon: '📞',
    title: '禁煙サポートラインに電話',
    body: '禁煙支援専門電話「禁煙マラソン」や「禁煙外来」に相談する。\n専門家のサポートが最も効果的です。'
  }
];

const EMERGENCY_TIPS_EN = [
  {
    icon: '🕐',
    title: 'The "Just 5 Minutes" Rule',
    body: 'Tell yourself: "I won\'t smoke for just 5 more minutes."\nNicotine cravings peak and pass within 5–10 minutes.\nYou will feel better very soon.'
  },
  {
    icon: '💧',
    title: 'Drink Water',
    body: 'Slowly drink a full glass of water.\nThe sensation of drinking satisfies the oral urge.\nCold water works especially well.'
  },
  {
    icon: '🚶',
    title: 'Change Your Environment',
    body: 'Move away from smokers or places associated with smoking.\nSimply changing your surroundings can greatly reduce cravings.'
  },
  {
    icon: '🧘',
    title: 'Deep Breathing',
    body: 'Inhale for 4 seconds, hold for 7, exhale for 8.\nThis replaces the physical act of "inhaling" that your body craves.'
  },
  {
    icon: '🏃',
    title: 'Get Physical',
    body: 'Take a 5-minute walk, do push-ups or squats.\nExercise releases dopamine and weakens nicotine cravings.'
  },
  {
    icon: '🍬',
    title: 'Put Something in Your Mouth',
    body: 'Try gum, candy, nuts, or vegetable sticks.\nSatisfy the oral fixation with something healthy.'
  },
  {
    icon: '📞',
    title: 'Call Someone',
    body: 'Say out loud: "I\'m craving a cigarette right now."\nJust saying it reduces the urge.\nCalling a quit-smoking hotline is also very effective.'
  },
  {
    icon: '📝',
    title: 'Write It Down',
    body: 'Write down why you are quitting.\nThink about: money saved, healthier lungs, your family\'s smiles.'
  },
  {
    icon: '🛁',
    title: 'Take a Shower',
    body: 'A warm shower resets your mood.\nCravings often pass completely during a shower.'
  },
  {
    icon: '📞',
    title: 'Call a Quit Smoking Helpline',
    body: 'Consult a professional quit-smoking support line or clinic.\nProfessional support significantly increases your success rate.'
  }
];

const EMERGENCY_AFFIRMATIONS_JA = [
  'この渇望は5分で過ぎ去ります。あなたの肺は、今この瞬間も回復しています。',
  'タバコを吸わない選択をするたびに、未来の自分が救われています。',
  '今この5分を乗り越えるたびに、あなたの禁煙は本物になっていく。',
  '今日一日だけでいい。今この一瞬だけでいい。',
  '弱さを認めることが、最初の強さです。あなたは十分に強い。'
];

const EMERGENCY_AFFIRMATIONS_EN = [
  'This craving will pass in 5 minutes. Your lungs are healing right now.',
  'Every time you choose not to smoke, you are saving your future self.',
  'Each craving you overcome makes your smoke-free life more real.',
  'Just for today. Just for this one moment.',
  'Admitting weakness is the first sign of strength. You are strong enough.'
];

const MILESTONES_JA = [
  { label: '1日', days: 1 },
  { label: '3日', days: 3 },
  { label: '1週間', days: 7 },
  { label: '2週間', days: 14 },
  { label: '1ヶ月', days: 30 },
  { label: '3ヶ月', days: 90 },
  { label: '6ヶ月', days: 180 },
  { label: '1年', days: 365 },
  { label: '2年', days: 730 },
  { label: '3年', days: 1095 }
];

const MILESTONES_EN = [
  { label: '1 Day', days: 1 },
  { label: '3 Days', days: 3 },
  { label: '1 Week', days: 7 },
  { label: '2 Weeks', days: 14 },
  { label: '1 Month', days: 30 },
  { label: '3 Months', days: 90 },
  { label: '6 Months', days: 180 },
  { label: '1 Year', days: 365 },
  { label: '2 Years', days: 730 },
  { label: '3 Years', days: 1095 }
];

const RECOMMEND_LINKS_JA = [
  {
    minDay: 1, maxDay: 7,
    icon: '📞',
    title: '禁煙支援専門電話',
    desc: '無料で禁煙の相談ができる専門電話。ニコチン依存症の専門家がサポートします。',
    url: 'https://www.nosmoke-life.jp/'
  },
  {
    minDay: 8, maxDay: 30,
    icon: '🏥',
    title: '禁煙外来を探す（厚生労働省）',
    desc: '保険適用の禁煙外来でニコチンパッチ・薬物療法を活用できます。一人で頑張るより格段に成功率が上がります。',
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/tobacco/'
  },
  {
    minDay: 31, maxDay: 90,
    icon: '🌐',
    title: 'e-ヘルスネット（禁煙）',
    desc: '厚生労働省の禁煙情報ポータル。禁煙の効果・方法・サポート情報が充実しています。',
    url: 'https://www.e-healthnet.mhlw.go.jp/information/tobacco'
  },
  {
    minDay: 91, maxDay: Infinity,
    icon: '🏆',
    title: '禁煙マラソン',
    desc: '長期禁煙者のためのオンラインコミュニティ。仲間と励まし合いながら禁煙を続けられます。',
    url: 'https://www.nosmoke-life.jp/'
  }
];

const RECOMMEND_LINKS_EN = [
  {
    minDay: 1, maxDay: 7,
    icon: '📞',
    title: 'Quit Smoking Support Hotline',
    desc: 'Free consultation with smoking cessation specialists. (Site in Japanese)',
    url: 'https://www.nosmoke-life.jp/'
  },
  {
    minDay: 8, maxDay: 30,
    icon: '🏥',
    title: 'Find a Quit Smoking Clinic (Japan)',
    desc: 'Insurance-covered clinics offering nicotine patches and medication therapy. (Site in Japanese)',
    url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/tobacco/'
  },
  {
    minDay: 31, maxDay: 90,
    icon: '🌐',
    title: 'e-Health Net – Tobacco',
    desc: 'Ministry of Health quit-smoking information portal. (Site in Japanese)',
    url: 'https://www.e-healthnet.mhlw.go.jp/information/tobacco'
  },
  {
    minDay: 91, maxDay: Infinity,
    icon: '🏆',
    title: 'Quit Smoking Marathon',
    desc: 'Online community for long-term non-smokers. Stay motivated together. (Site in Japanese)',
    url: 'https://www.nosmoke-life.jp/'
  }
];

// ========== DATA ACCESSORS ==========

function getEffects()       { return lang === 'en' ? EFFECTS_EN : EFFECTS_JA; }
function getMessages()      { return lang === 'en' ? MESSAGES_EN : MESSAGES_JA; }
function getTips()          { return lang === 'en' ? EMERGENCY_TIPS_EN : EMERGENCY_TIPS_JA; }
function getAffirmations()  { return lang === 'en' ? EMERGENCY_AFFIRMATIONS_EN : EMERGENCY_AFFIRMATIONS_JA; }
function getMilestones()    { return lang === 'en' ? MILESTONES_EN : MILESTONES_JA; }
function getLinks()         { return lang === 'en' ? RECOMMEND_LINKS_EN : RECOMMEND_LINKS_JA; }
function tr()               { return T[lang]; }

// ========== STATE ==========

let startDate = null;
let dailyCost = 0;

function loadState() {
  const saved = localStorage.getItem('kinen_start');
  if (saved) startDate = new Date(saved);
  const cost = localStorage.getItem('kinen_daily_cost');
  if (cost) dailyCost = parseInt(cost, 10) || 0;
}

function saveState(date, cost) {
  localStorage.setItem('kinen_start', date.toISOString());
  localStorage.setItem('kinen_daily_cost', cost);
  startDate = date;
  dailyCost = cost;
}

function clearState() {
  localStorage.removeItem('kinen_start');
  localStorage.removeItem('kinen_daily_cost');
  localStorage.removeItem('kinen_bg');
  startDate = null;
  dailyCost = 0;
}

// ========== CALCULATIONS ==========

function getDays() {
  if (!startDate) return 0;
  const now = new Date();
  const diff = now - startDate;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

function getSavings(days) {
  return dailyCost * days;
}

function getEffect(days) {
  const effects = getEffects();
  return effects.find(e => days >= e.minDay && days <= e.maxDay) || effects[0];
}

function getDailyMessage(days) {
  const msgs = getMessages();
  const msg = msgs.find(m => days >= m.minDay && days <= m.maxDay);
  return msg ? msg.text : msgs[0].text;
}

function formatCurrency(num) {
  return '¥ ' + num.toLocaleString('ja-JP');
}

function getRecommendLink(days) {
  const links = getLinks();
  return links.find(r => days >= r.minDay && days <= r.maxDay) || links[0];
}

// ========== LANGUAGE ==========

function applyLang() {
  const t = T[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.textContent = t.langBtn;
  });

  localStorage.setItem('kinen_lang', lang);
}

function toggleLang() {
  lang = lang === 'ja' ? 'en' : 'ja';
  applyLang();
  if (startDate) render();
  if (document.getElementById('emergency-modal').classList.contains('open')) {
    renderTip();
  }
}

// ========== RENDER ==========

function render() {
  const t = tr();
  const days = getDays();
  const effect = getEffect(days);
  const message = getDailyMessage(days);
  const savings = getSavings(days);

  document.getElementById('streak-days').textContent = days;

  if (startDate) {
    document.getElementById('streak-start').textContent = t.startedPrefix + t.formatDate(startDate);
  }

  document.getElementById('savings-amount').textContent = formatCurrency(savings);
  if (dailyCost > 0 && days > 0) {
    document.getElementById('savings-detail').textContent = t.savingsCalc(dailyCost, days);
  } else if (dailyCost === 0) {
    document.getElementById('savings-detail').textContent = t.savingsNoCost;
  } else {
    document.getElementById('savings-detail').textContent = t.savingsToday;
  }

  document.getElementById('message-text').textContent = message;

  document.getElementById('effect-period').textContent = effect.period;
  document.getElementById('effect-title').textContent = effect.title;
  const ul = document.getElementById('effect-list');
  ul.innerHTML = '';
  effect.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });

  const milestones = getMilestones();
  const container = document.getElementById('milestones');
  container.innerHTML = '';
  let nextMilestone = null;
  milestones.forEach(m => {
    const done = days >= m.days;
    if (!done && !nextMilestone) nextMilestone = m;
    const row = document.createElement('div');
    row.className = `milestone${done ? ' done' : ''}`;
    row.innerHTML = `
      <span class="milestone-check">${done ? '✅' : '○'}</span>
      <span class="milestone-name">${m.label}</span>
      <span class="milestone-days-label">${done ? t.milestoneAchieved : t.milestonesDays(m.days)}</span>
    `;
    container.appendChild(row);
  });

  const nextEl = document.getElementById('next-milestone');
  if (nextMilestone) {
    const remaining = nextMilestone.days - days;
    nextEl.textContent = t.nextMilestoneMsg(nextMilestone.label, remaining);
  } else {
    nextEl.textContent = t.allMilestonesMsg;
  }

  renderRecommend(days);
}

// ========== SCREENS ==========

function showMain() {
  document.getElementById('setup-screen').classList.add('hidden');
  document.getElementById('main-screen').classList.remove('hidden');
  render();
  applyBg();
}

function showSetup() {
  document.getElementById('main-screen').classList.add('hidden');
  document.getElementById('setup-screen').classList.remove('hidden');

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  document.getElementById('start-date-input').value = `${yyyy}-${mm}-${dd}`;

  if (dailyCost > 0) {
    document.getElementById('daily-cost-input').value = dailyCost;
  }
}

// ========== EVENTS ==========

function onStart() {
  const t = tr();
  const val = document.getElementById('start-date-input').value;
  if (!val) { alert(t.alertNoDate); return; }
  const date = new Date(val + 'T00:00:00');
  if (isNaN(date)) { alert(t.alertInvalidDate); return; }
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  if (date > now) { alert(t.alertFutureDate); return; }

  const costVal = document.getElementById('daily-cost-input').value;
  const cost = parseInt(costVal, 10) || 0;

  saveState(date, cost);
  showMain();
}

function onReset() {
  document.getElementById('reset-modal').classList.add('open');
}

function onResetCancel() {
  document.getElementById('reset-modal').classList.remove('open');
}

function onResetConfirm() {
  document.getElementById('reset-modal').classList.remove('open');
  clearState();
  showSetup();
}

function onShare() {
  const t = tr();
  const days = getDays();
  const savings = getSavings(days);
  const text = t.shareText(days, savings);
  if (navigator.share) {
    navigator.share({ title: t.shareTitle, text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => alert(t.clipboardMsg))
      .catch(() => alert(text));
  }
}

// ========== BACKGROUND TOGGLE ==========

const BG_STYLES = [
  "linear-gradient(135deg, rgba(26,14,0,0.5), rgba(180,83,9,0.35)), url('./bg-hero.png') center right/cover no-repeat",
  "linear-gradient(135deg, rgba(26,14,0,0.5), rgba(180,83,9,0.35)), url('./bg-hero-male.jpg') center right/cover no-repeat",
  'linear-gradient(135deg, #1a0e00, #431407)'
];
let bgIndex = parseInt(localStorage.getItem('kinen_bg') || '0');

function applyBg() {
  document.querySelector('.streak-card').style.background = BG_STYLES[bgIndex];
}

function toggleBg() {
  bgIndex = (bgIndex + 1) % BG_STYLES.length;
  localStorage.setItem('kinen_bg', bgIndex);
  applyBg();
}

// ========== RECOMMEND LINKS ==========

function renderRecommend(days) {
  const t = tr();
  const item = getRecommendLink(days);
  document.getElementById('recommend-sub').textContent = t.recommendPrefix(days);
  document.getElementById('recommend-icon').textContent = item.icon;
  document.getElementById('recommend-title').textContent = item.title;
  document.getElementById('recommend-desc').textContent = item.desc;
  document.getElementById('recommend-link').href = item.url;
}

// ========== EMERGENCY ==========

let currentTipIndex = 0;

function openEmergency() {
  currentTipIndex = Math.floor(Math.random() * getTips().length);
  renderTip();
  document.getElementById('emergency-modal').classList.add('open');
}

function closeEmergency() {
  document.getElementById('emergency-modal').classList.remove('open');
}

function renderTip() {
  const tips = getTips();
  const tip = tips[currentTipIndex];
  const total = tips.length;
  const affirmations = getAffirmations();

  document.getElementById('tip-number').textContent = `TIP ${currentTipIndex + 1} / ${total}`;
  document.getElementById('tip-icon').textContent = tip.icon;
  document.getElementById('tip-title').textContent = tip.title;
  document.getElementById('tip-body').textContent = tip.body;

  const aff = affirmations[currentTipIndex % affirmations.length];
  document.getElementById('emergency-affirmation').textContent = aff;

  const dotsEl = document.getElementById('tip-dots');
  dotsEl.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = `tip-dot${i === currentTipIndex ? ' active' : ''}`;
    dotsEl.appendChild(d);
  }
}

function onTipNext() {
  currentTipIndex = (currentTipIndex + 1) % getTips().length;
  renderTip();
}

function onTipPrev() {
  currentTipIndex = (currentTipIndex - 1 + getTips().length) % getTips().length;
  renderTip();
}

// ========== INIT ==========

document.addEventListener('DOMContentLoaded', () => {
  loadState();

  document.getElementById('btn-bg-toggle').addEventListener('click', toggleBg);
  document.getElementById('btn-start').addEventListener('click', onStart);
  document.getElementById('btn-reset').addEventListener('click', onReset);
  document.getElementById('btn-share').addEventListener('click', onShare);
  document.getElementById('btn-cancel').addEventListener('click', onResetCancel);
  document.getElementById('btn-confirm').addEventListener('click', onResetConfirm);
  document.getElementById('btn-emergency').addEventListener('click', openEmergency);
  document.getElementById('btn-emergency-close').addEventListener('click', closeEmergency);
  document.getElementById('btn-tip-next').addEventListener('click', onTipNext);
  document.getElementById('btn-tip-prev').addEventListener('click', onTipPrev);

  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', toggleLang);
  });

  document.getElementById('reset-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) onResetCancel();
  });
  document.getElementById('emergency-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeEmergency();
  });

  applyLang();

  if (startDate) {
    showMain();
  } else {
    showSetup();
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
