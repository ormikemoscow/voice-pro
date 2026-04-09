// Client-side lyrics template engine for Suno
// Generates structured song lyrics based on topic, mood, and style tags

interface LyricsConfig {
  topic: string
  tags: string[]
  language: "en" | "ru"
}

interface LyricBlock {
  tag: string
  lines: string[]
}

// --- Russian lyrics templates by mood/theme ---
const RU_VERSE_TEMPLATES: Record<string, string[][]> = {
  love: [
    [
      "Ты рядом, и мир замирает на миг",
      "В глазах твоих — звёзды и тишина",
      "Я слышу, как сердце стучит в такт",
      "Одна мелодия — на двоих",
    ],
    [
      "Твой голос — как свет в темноте ночной",
      "Я помню каждый взгляд, каждый вздох",
      "Слова растворяются в тишине",
      "Но чувства — громче любых слов",
    ],
    [
      "Мы шли сквозь дождь, не замечая туч",
      "Ты был(а) моим якорем в шторме дней",
      "Касание рук — электрический ток",
      "И время остановилось для нас",
    ],
  ],
  night: [
    [
      "Ночной город дышит неоном огней",
      "Асфальт отражает далёкие сны",
      "Я иду по проспектам пустых улиц",
      "И тени танцуют на стенах домов",
    ],
    [
      "Луна разливает серебряный свет",
      "На крыши, на окна, на тихий бульвар",
      "В ночи всё звучит по-другому, нежней",
      "И мысли плывут, как туман над рекой",
    ],
  ],
  freedom: [
    [
      "Распахну окно — и навстречу ветру",
      "Оставлю позади весь этот шум",
      "Дорога впереди — без конца и края",
      "И я наконец-то свободен от пут",
    ],
    [
      "Кричу в небеса, и мне эхо в ответ",
      "Ни стен, ни границ — только горизонт",
      "Я знаю, что завтра начнётся с нуля",
      "И это — лучшее, что может быть",
    ],
  ],
  sadness: [
    [
      "Дождь за окном рисует мою печаль",
      "Пустая комната и тишина в ответ",
      "Я перечитываю старые письма",
      "И каждое слово — как лезвие",
    ],
    [
      "Фотографии на стене выцветают",
      "Как наши обещания — день за днём",
      "Я знаю, что время залечит раны",
      "Но сегодня мне нечем дышать",
    ],
  ],
  energy: [
    [
      "Музыка грохочет — и кровь кипит",
      "Ритм пробивает сквозь стены и пол",
      "Мы — поколение неспящих ночей",
      "И каждый удар — это наш рок-н-ролл",
    ],
    [
      "Стоп — нет предела, нет тормозов",
      "Мы разгоняемся до скорости звука",
      "Адреналин — моё топливо",
      "И я не собираюсь останавливаться",
    ],
  ],
  default: [
    [
      "Я смотрю в окно — мир меняет цвета",
      "Каждый день приносит что-то новое",
      "Я ищу ответы в тишине утра",
      "И нахожу их в простых вещах",
    ],
    [
      "Время бежит, не оглядываясь назад",
      "А мы стоим на перекрёстке дорог",
      "Выбор за нами — налево, направо",
      "Но главное — делать шаг",
    ],
  ],
}

const RU_CHORUS_TEMPLATES: Record<string, string[][]> = {
  love: [
    [
      "Это ты — моя мелодия в ночи",
      "Это ты — мой свет среди темноты",
      "Я буду рядом, пока бьётся сердце",
      "Потому что ты — это всё, что мне нужно",
    ],
  ],
  night: [
    [
      "Танцуй в неоновом свете",
      "Забудь обо всём до утра",
      "Ночь принадлежит нам одним",
      "И мы не отпустим её никогда",
    ],
  ],
  freedom: [
    [
      "Я свободен, я лечу над землёй",
      "Небо — мой единственный закон",
      "Ни цепей, ни стен — только ветер и я",
      "И я знаю — это мой путь домой",
    ],
  ],
  sadness: [
    [
      "Но я буду помнить, буду ждать",
      "Даже если ты не вернёшься назад",
      "В каждом дожде — отголосок тебя",
      "И я не хочу забывать",
    ],
  ],
  energy: [
    [
      "Громче, громче — не молчи!",
      "Пусть весь мир услышит нас",
      "Мы горим, как тысяча свечей",
      "И никто не потушит этот огонь!",
    ],
  ],
  default: [
    [
      "Это наш момент, это наш рассвет",
      "Мы идём вперёд, оставляя след",
      "Не оглядываясь — только вперёд",
      "Жизнь — это движение, жизнь — это полёт",
    ],
  ],
}

const RU_BRIDGE_TEMPLATES: string[][] = [
  [
    "(тихо, почти шёпотом)",
    "И когда всё затихнет вокруг",
    "Я услышу твоё дыхание",
    "Как единственный звук",
    "Который имеет значение",
  ],
  [
    "(с нарастанием)",
    "Может, всё было не зря",
    "Может, боль — это путь к свету",
    "И когда я закрою глаза",
    "Я пойму — ответ был рядом",
  ],
]

// --- English lyrics templates by mood/theme ---
const EN_VERSE_TEMPLATES: Record<string, string[][]> = {
  love: [
    [
      "You're standing there, the world fades away",
      "Stars in your eyes light up the darkest day",
      "I hear my heartbeat sync with yours in time",
      "One melody — yours and mine",
    ],
    [
      "Your voice cuts through the silence of the night",
      "I remember every glance, every sigh",
      "Words dissolve into the evening air",
      "But feelings speak louder, I swear",
    ],
  ],
  night: [
    [
      "Neon city breathing through the rain",
      "Asphalt mirrors echoing the pain",
      "Walking down the empty boulevard",
      "Shadows dancing, playing every card",
    ],
    [
      "Moonlight spills like silver on the ground",
      "Every whisper amplifies the sound",
      "In the dark everything feels so real",
      "Thoughts are drifting — what do I feel?",
    ],
  ],
  freedom: [
    [
      "Open up the window, face the wind",
      "Leave behind the noise, let life begin",
      "The road ahead has no end in sight",
      "And I'm finally free tonight",
    ],
  ],
  sadness: [
    [
      "Rain against the window paints my blues",
      "Empty room, nothing left to lose",
      "Reading through the letters, old and worn",
      "Every word cuts like a thorn",
    ],
  ],
  energy: [
    [
      "Music's crashing through the floor",
      "Beat is pumping, wanting more",
      "We're the generation wide awake",
      "Every hit — a ground we break",
    ],
  ],
  default: [
    [
      "Looking out the window, colors change",
      "Every day is something new and strange",
      "Searching for the answers in the dawn",
      "Finding them where least expected — carry on",
    ],
  ],
}

const EN_CHORUS_TEMPLATES: Record<string, string[][]> = {
  love: [
    [
      "You're my melody in the dark of night",
      "You're the spark that sets my soul alight",
      "I'll be here as long as my heart beats",
      "Cause you're everything I need",
    ],
  ],
  night: [
    [
      "Dance under the neon glow",
      "Forget it all, let the rhythm flow",
      "The night belongs to you and me",
      "And we'll never set it free",
    ],
  ],
  freedom: [
    [
      "I'm free, I'm soaring through the sky",
      "No chains, no walls — just the open wide",
      "Nothing but the wind and me",
      "And I know — this is where I'm meant to be",
    ],
  ],
  sadness: [
    [
      "But I'll remember, I will wait",
      "Even if you never come back again",
      "In every raindrop, there's a trace of you",
      "And I don't want to forget, it's true",
    ],
  ],
  energy: [
    [
      "Louder, louder — don't you stop!",
      "Let the whole world hear us rock",
      "We're burning like a thousand lights",
      "And no one's putting out this fire tonight!",
    ],
  ],
  default: [
    [
      "This is our moment, this is our time",
      "Moving forward, leaving marks behind",
      "Never looking back — just straight ahead",
      "Life is motion, life is what we said",
    ],
  ],
}

const EN_BRIDGE_TEMPLATES: string[][] = [
  [
    "(softly, almost whispered)",
    "And when everything goes silent",
    "I will hear you breathing still",
    "The only sound",
    "That ever mattered, ever will",
  ],
  [
    "(building up)",
    "Maybe none of it was in vain",
    "Maybe pain's the road to light again",
    "And when I close my eyes to see",
    "The answer's always been with me",
  ],
]

function detectMood(topic: string, tags: string[]): string {
  const combined = (topic + " " + tags.join(" ")).toLowerCase()

  if (/love|любовь|romance|романт|heart|сердц|kiss|поцелу|passion|страст/i.test(combined)) return "love"
  if (/night|ночь|neon|неон|city|город|dark|тёмн|club|клуб|midnight/i.test(combined)) return "night"
  if (/free|свобод|wind|ветер|fly|лет|road|дорог|dream|мечт|escape/i.test(combined)) return "freedom"
  if (/sad|грус|pain|бол|rain|дожд|alone|одинок|cry|плак|miss|скуч|tear|слез|melanchol/i.test(combined)) return "sadness"
  if (/energy|энерг|dance|танц|fire|огон|loud|громк|power|сила|rock|рок|punk|metal|party|вечеринк/i.test(combined)) return "energy"

  return "default"
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickRandomUnique<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

function personalizeLines(lines: string[], topic: string): string[] {
  const words = topic.split(/\s+/).filter((w) => w.length > 3)
  if (words.length === 0) return lines

  // Inject topic words occasionally as flavor
  return lines.map((line) => {
    // 30% chance to slightly modify a line by prepending a topical word
    if (Math.random() < 0.15 && words.length > 0) {
      const word = pickRandom(words)
      return line.replace(/\.{3}$/, ` — ${word}...`)
    }
    return line
  })
}

export function generateLyrics(config: LyricsConfig): string {
  const { topic, tags, language } = config
  const mood = detectMood(topic, tags)

  const isRu = language === "ru"
  const verseTemplates = isRu ? RU_VERSE_TEMPLATES : EN_VERSE_TEMPLATES
  const chorusTemplates = isRu ? RU_CHORUS_TEMPLATES : EN_CHORUS_TEMPLATES
  const bridgeTemplates = isRu ? RU_BRIDGE_TEMPLATES : EN_BRIDGE_TEMPLATES

  const moodVerses = verseTemplates[mood] || verseTemplates.default
  const moodChorus = chorusTemplates[mood] || chorusTemplates.default

  const blocks: LyricBlock[] = []

  // Intro
  blocks.push({
    tag: "[Intro]",
    lines: [isRu ? "(инструментальное вступление)" : "(instrumental intro)"],
  })

  // Verse 1
  const verse1 = personalizeLines([...pickRandom(moodVerses)], topic)
  blocks.push({ tag: "[Verse 1]", lines: verse1 })

  // Pre-Chorus (50% chance)
  if (Math.random() > 0.5) {
    blocks.push({
      tag: "[Pre-Chorus]",
      lines: isRu
        ? ["И я знаю, что момент настал", "Больше нечего терять"]
        : ["And I know the moment's here", "Nothing left to fear"],
    })
  }

  // Chorus
  const chorus = personalizeLines([...pickRandom(moodChorus)], topic)
  blocks.push({ tag: "[Chorus]", lines: chorus })

  // Verse 2
  const availableVerses = moodVerses.filter((v) => v !== verse1)
  const verse2Source = availableVerses.length > 0 ? pickRandom(availableVerses) : pickRandom(moodVerses)
  const verse2 = personalizeLines([...verse2Source], topic)
  blocks.push({ tag: "[Verse 2]", lines: verse2 })

  // Chorus again
  blocks.push({ tag: "[Chorus]", lines: chorus })

  // Bridge
  const bridge = pickRandom(bridgeTemplates)
  blocks.push({ tag: "[Bridge]", lines: [...bridge] })

  // Final Chorus
  blocks.push({ tag: "[Chorus]", lines: chorus })

  // Outro
  blocks.push({
    tag: "[Outro]",
    lines: isRu
      ? ["(затихая)", chorus[0] || "..."]
      : ["(fading out)", chorus[0] || "..."],
  })

  // Build the output string
  return blocks.map((block) => `${block.tag}\n${block.lines.join("\n")}`).join("\n\n")
}
