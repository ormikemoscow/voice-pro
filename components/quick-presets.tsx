"use client"

import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface Preset {
  name: string
  nameRu: string
  tags: string[]
  structure: string
}

const PRESETS: Preset[] = [
  {
    name: "Pop Hit",
    nameRu: "Поп-хит",
    tags: ["Pop", "Upbeat", "Female Vocals", "Catchy", "Modern", "Synthesizer", "120 BPM"],
    structure: "[Short Instrumental Intro]\n\n[Verse 1]\n\n[Pre-Chorus]\n\n[Chorus]\n\n[Verse 2]\n\n[Pre-Chorus]\n\n[Chorus]\n\n[Bridge]\n\n[Chorus]\n\n[Outro]",
  },
  {
    name: "Lo-Fi Chill",
    nameRu: "Lo-Fi чилл",
    tags: ["Lo-Fi Hip-Hop", "Chill", "Relaxing", "Piano", "Vinyl Crackle", "Slow", "Instrumental"],
    structure: "[Intro]\n\n[Verse 1]\n\n[Melodic Interlude]\n\n[Verse 2]\n\n[Outro]\n[Fade Out]",
  },
  {
    name: "Rock Anthem",
    nameRu: "Рок-гимн",
    tags: ["Rock", "Energetic", "Male Vocals", "Electric Guitar", "Drums", "Powerful", "Anthemic"],
    structure: "[Intro]\n\n[Verse 1]\n\n[Chorus]\n\n[Verse 2]\n\n[Chorus]\n\n[Guitar Solo]\n\n[Bridge]\n\n[Chorus]\n\n[Big Finish]",
  },
  {
    name: "R&B Ballad",
    nameRu: "R&B баллада",
    tags: ["R&B", "Romantic", "Smooth Vocals", "Slow", "Piano", "Emotional", "Soulful"],
    structure: "[Intro]\n\n[Verse 1]\n\n[Pre-Chorus]\n\n[Chorus]\n\n[Verse 2]\n\n[Chorus]\n\n[Bridge]\n\n[Chorus]\n\n[Fade Out]",
  },
  {
    name: "EDM Banger",
    nameRu: "EDM бенгер",
    tags: ["EDM", "Euphoric", "Synthesizer", "808 Drums", "High Energy", "160 BPM", "Female Vocals"],
    structure: "[Intro]\n\n[Build]\n\n[Drop]\n\n[Breakdown]\n\n[Verse 1]\n\n[Build]\n\n[Drop]\n\n[Outro]",
  },
  {
    name: "Trap Beat",
    nameRu: "Трэп",
    tags: ["Trap", "Dark", "808 Drums", "Sub Bass", "Aggressive", "Autotune", "140 BPM"],
    structure: "[Intro]\n\n[Verse 1]\n\n[Hook]\n\n[Verse 2]\n\n[Hook]\n\n[Bridge]\n\n[Hook]\n\n[End]",
  },
  {
    name: "Synthwave",
    nameRu: "Синтвейв",
    tags: ["Synthwave", "Retro", "1980s", "Analog Synth", "Dreamy", "Medium Tempo", "Instrumental"],
    structure: "[Intro]\n\n[Verse 1]\n\n[Chorus]\n\n[Melodic Interlude]\n\n[Verse 2]\n\n[Chorus]\n\n[Solo]\n\n[Fade Out]",
  },
  {
    name: "Jazz Night",
    nameRu: "Джаз вечер",
    tags: ["Smooth Jazz", "Calm", "Saxophone", "Piano", "Upright Bass", "Slow", "Live Recording"],
    structure: "[Intro]\n\n[Verse 1]\n\n[Solo]\n\n[Verse 2]\n\n[Interlude]\n\n[Outro]\n[Fade Out]",
  },
]

interface QuickPresetsProps {
  onApplyPreset: (tags: string[], structure: string) => void
}

export function QuickPresets({ onApplyPreset }: QuickPresetsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Quick Presets</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onApplyPreset(preset.tags, preset.structure)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary/50 px-3 py-3",
              "text-center transition-all",
              "hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
            )}
          >
            <span className="text-xs font-semibold text-foreground">{preset.nameRu}</span>
            <span className="text-[10px] text-muted-foreground">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
