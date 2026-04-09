export interface TagCategory {
  id: string
  name: string
  nameRu: string
  icon: string
  color: string
  tags: string[]
}

export const STRUCTURE_TAGS = [
  "[Intro]",
  "[Short Instrumental Intro]",
  "[Verse]",
  "[Verse 1]",
  "[Verse 2]",
  "[Verse 3]",
  "[Pre-Chorus]",
  "[Chorus]",
  "[Post-Chorus]",
  "[Hook]",
  "[Catchy Hook]",
  "[Bridge]",
  "[Build]",
  "[Drop]",
  "[Bass Drop]",
  "[Breakdown]",
  "[Break]",
  "[Percussion Break]",
  "[Interlude]",
  "[Melodic Interlude]",
  "[Instrumental]",
  "[Solo]",
  "[Guitar Solo]",
  "[Piano Solo]",
  "[Outro]",
  "[Refrain]",
  "[Big Finish]",
  "[Fade Out]",
  "[Fade to End]",
  "[End]",
]

export const TAG_CATEGORIES: TagCategory[] = [
  {
    id: "genre",
    name: "Genre",
    nameRu: "Жанр",
    icon: "music",
    color: "bg-primary/20 text-primary border-primary/30",
    tags: [
      "Pop", "Rock", "Indie Rock", "Alternative Rock", "Hard Rock",
      "Metal", "Heavy Metal", "Death Metal", "Black Metal", "Nu Metal",
      "Jazz", "Smooth Jazz", "Acid Jazz", "Bebop",
      "Blues", "Delta Blues", "Chicago Blues",
      "Electronic", "EDM", "House", "Deep House", "Tech House",
      "Techno", "Trance", "Drum and Bass", "Dubstep",
      "Hip-Hop", "Rap", "Trap", "Lo-Fi Hip-Hop", "Boom Bap",
      "R&B", "Soul", "Neo-Soul", "Funk",
      "Country", "Bluegrass", "Folk", "Indie Folk",
      "Classical", "Orchestral", "Chamber Music",
      "Reggae", "Reggaeton", "Dancehall", "Ska",
      "K-Pop", "J-Pop", "J-Rock",
      "Latin", "Salsa", "Bossa Nova", "Samba", "Flamenco",
      "Ambient", "Chillwave", "Synthwave", "Retrowave", "Vaporwave",
      "Punk", "Pop Punk", "Post-Punk", "Emo",
      "Grunge", "Shoegaze", "Dream Pop",
      "Gospel", "Choir", "Hymn",
      "World Music", "Celtic", "African", "Indian Classical",
      "Disco", "New Wave", "Psychedelic",
    ],
  },
  {
    id: "mood",
    name: "Mood",
    nameRu: "Настроение",
    icon: "heart",
    color: "bg-accent/20 text-accent border-accent/30",
    tags: [
      "Energetic", "Upbeat", "Happy", "Joyful", "Euphoric",
      "Melancholic", "Sad", "Emotional", "Nostalgic", "Bittersweet",
      "Calm", "Peaceful", "Relaxing", "Meditative", "Serene",
      "Dark", "Moody", "Mysterious", "Eerie", "Haunting",
      "Epic", "Powerful", "Triumphant", "Anthemic", "Cinematic",
      "Romantic", "Dreamy", "Ethereal", "Whimsical",
      "Aggressive", "Intense", "Angry", "Raw",
      "Groovy", "Funky", "Bouncy", "Playful",
      "Inspirational", "Uplifting", "Hopeful", "Motivational",
      "Chill", "Laid-back", "Lo-fi", "Cozy",
    ],
  },
  {
    id: "vocals",
    name: "Vocals",
    nameRu: "Вокал",
    icon: "mic",
    color: "bg-chart-3/20 text-chart-3 border-chart-3/30",
    tags: [
      "Male Vocals", "Female Vocals", "Deep Male Voice", "High Female Voice",
      "Smooth Vocals", "Raspy Vocals", "Breathy Vocals", "Powerful Vocals",
      "Soft Vocals", "Whispered", "Falsetto", "Vibrato",
      "Operatic", "Choir", "Harmony Vocals", "Layered Vocals",
      "Rap", "Spoken Word", "Narrative", "Talk-Singing",
      "Autotune", "Vocoder", "Robotic Voice",
      "Soulful", "Gritty", "Silky", "Airy",
      "Duet", "A Cappella", "Call and Response",
      "Instrumental", "No Vocals",
    ],
  },
  {
    id: "instruments",
    name: "Instruments",
    nameRu: "Инструменты",
    icon: "guitar",
    color: "bg-chart-4/20 text-chart-4 border-chart-4/30",
    tags: [
      "Acoustic Guitar", "Electric Guitar", "Bass Guitar", "12-String Guitar",
      "Piano", "Grand Piano", "Electric Piano", "Rhodes",
      "Synthesizer", "Analog Synth", "FM Synth", "Pad Synth",
      "Drums", "808 Drums", "Live Drums", "Electronic Drums",
      "Bass", "Sub Bass", "Slap Bass", "Upright Bass",
      "Violin", "Cello", "Viola", "String Section",
      "Trumpet", "Saxophone", "Trombone", "Flute",
      "Organ", "Hammond Organ", "Church Organ",
      "Harp", "Banjo", "Mandolin", "Ukulele",
      "Theremin", "Kalimba", "Steel Drums", "Sitar",
      "Percussion", "Congas", "Bongos", "Tambourine",
    ],
  },
  {
    id: "tempo",
    name: "Tempo & Energy",
    nameRu: "Темп и Энергия",
    icon: "zap",
    color: "bg-chart-5/20 text-chart-5 border-chart-5/30",
    tags: [
      "Very Slow", "Slow", "Moderate", "Medium Tempo",
      "Fast", "Very Fast", "Uptempo",
      "60 BPM", "80 BPM", "100 BPM", "120 BPM", "140 BPM", "160 BPM", "180 BPM",
      "Ballad", "Mid-tempo", "High Energy", "Low Energy",
      "Building Energy", "Crescendo", "Decrescendo",
      "Steady Beat", "Syncopated", "Polyrhythmic", "Swing",
    ],
  },
  {
    id: "production",
    name: "Production",
    nameRu: "Продакшн",
    icon: "sliders",
    color: "bg-primary/20 text-primary border-primary/30",
    tags: [
      "Lo-Fi", "Hi-Fi", "Raw", "Polished", "Overproduced",
      "Reverb", "Heavy Reverb", "Dry", "Echo", "Delay",
      "Distortion", "Fuzz", "Overdrive", "Clean",
      "Compressed", "Dynamic", "Punchy",
      "Layered", "Minimal", "Dense", "Sparse",
      "Vinyl Crackle", "Tape Saturation", "Analog",
      "Stereo", "Wide Mix", "Mono",
      "Radio Edit", "Extended Mix", "Remix",
      "Live Recording", "Studio Quality", "Bedroom Pop",
    ],
  },
  {
    id: "era",
    name: "Era & Style",
    nameRu: "Эпоха и Стиль",
    icon: "clock",
    color: "bg-accent/20 text-accent border-accent/30",
    tags: [
      "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "Modern",
      "Retro", "Vintage", "Classic", "Contemporary", "Futuristic",
      "British Invasion", "Motown", "Disco Era", "New Wave",
      "Grunge Era", "MTV Era", "Digital Age",
      "Old School", "New School", "Underground", "Mainstream",
      "Experimental", "Avant-Garde", "Progressive",
    ],
  },
]

export interface PromptHistoryItem {
  id: string
  styleTags: string[]
  structureLyrics: string
  fullPrompt: string
  timestamp: number
  title: string
}

export function generateStylePrompt(tags: string[]): string {
  return tags.join(", ")
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export interface RandomStyleResult {
  tags: string[]
  label: string
}

export function generateRandomStyle(): RandomStyleResult {
  const results: string[] = []

  const genre = TAG_CATEGORIES.find((c) => c.id === "genre")
  const mood = TAG_CATEGORIES.find((c) => c.id === "mood")
  const vocals = TAG_CATEGORIES.find((c) => c.id === "vocals")
  const instruments = TAG_CATEGORIES.find((c) => c.id === "instruments")
  const tempo = TAG_CATEGORIES.find((c) => c.id === "tempo")
  const production = TAG_CATEGORIES.find((c) => c.id === "production")
  const era = TAG_CATEGORIES.find((c) => c.id === "era")

  // Always pick 1-2 genres
  if (genre) results.push(...pickRandom(genre.tags, 1 + Math.floor(Math.random() * 2)))
  // Always pick 1 mood
  if (mood) results.push(...pickRandom(mood.tags, 1))
  // 70% chance for vocal style
  if (vocals && Math.random() > 0.3) results.push(...pickRandom(vocals.tags, 1))
  // 60% chance for instrument
  if (instruments && Math.random() > 0.4) results.push(...pickRandom(instruments.tags, 1 + Math.floor(Math.random() * 2)))
  // 50% chance for tempo
  if (tempo && Math.random() > 0.5) results.push(...pickRandom(tempo.tags, 1))
  // 40% chance for production
  if (production && Math.random() > 0.6) results.push(...pickRandom(production.tags, 1))
  // 30% chance for era
  if (era && Math.random() > 0.7) results.push(...pickRandom(era.tags, 1))

  const genrePart = results.find((t) => genre?.tags.includes(t)) || "Mix"
  const moodPart = results.find((t) => mood?.tags.includes(t)) || ""
  const label = moodPart ? `${moodPart} ${genrePart}` : genrePart

  return { tags: results, label }
}

export function generateFullOutput(styleTags: string[], structureLyrics: string): string {
  const parts: string[] = []
  if (styleTags.length > 0) {
    parts.push(`Style of Music: ${generateStylePrompt(styleTags)}`)
  }
  if (structureLyrics.trim()) {
    parts.push(`\nLyrics:\n${structureLyrics}`)
  }
  return parts.join("\n")
}
