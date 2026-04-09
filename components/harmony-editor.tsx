"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import {
  Users,
  Volume2,
  Mic2,
  Layers,
  Plus,
  Check,
  ArrowRight,
  RotateCcw,
  Music2,
  Sliders,
  Sparkles,
} from "lucide-react"

interface HarmonyEditorProps {
  onInsertHarmonies: (text: string) => void
  onAddHarmonyTags: (tags: string[]) => void
  selectedTags: string[]
}

type HarmonyType = {
  id: string
  name: string
  nameRu: string
  tag: string
  description: string
  descriptionRu: string
  icon: React.ReactNode
}

type HarmonyIntensity = "subtle" | "moderate" | "rich" | "epic"

type HarmonyPreset = {
  id: string
  name: string
  nameRu: string
  types: string[]
  intensity: HarmonyIntensity
  description: string
  styleTags: string[]
}

const HARMONY_TYPES: HarmonyType[] = [
  {
    id: "harmonies",
    name: "Harmonies",
    nameRu: "Гармонии",
    tag: "(harmonies)",
    description: "Layered vocal harmonies",
    descriptionRu: "Многослойные вокальные гармонии",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    id: "choir",
    name: "Choir",
    nameRu: "Хор",
    tag: "(choir)",
    description: "Full choir sound",
    descriptionRu: "Полный хоровой звук",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "backing",
    name: "Backing Vocals",
    nameRu: "Бэк-вокал",
    tag: "(backing vocals)",
    description: "Supporting background vocals",
    descriptionRu: "Поддерживающий фоновый вокал",
    icon: <Mic2 className="h-4 w-4" />,
  },
  {
    id: "layered",
    name: "Layered Vocals",
    nameRu: "Слои вокала",
    tag: "(layered vocals)",
    description: "Multiple vocal layers",
    descriptionRu: "Множество вокальных слоёв",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    id: "call-response",
    name: "Call & Response",
    nameRu: "Вопрос-Ответ",
    tag: "(call and response)",
    description: "Alternating vocal pattern",
    descriptionRu: "Чередующийся вокальный паттерн",
    icon: <Music2 className="h-4 w-4" />,
  },
  {
    id: "duet",
    name: "Duet",
    nameRu: "Дуэт",
    tag: "(duet)",
    description: "Two-voice harmony",
    descriptionRu: "Двухголосная гармония",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "unison",
    name: "Unison",
    nameRu: "Унисон",
    tag: "(unison)",
    description: "Voices singing together",
    descriptionRu: "Голоса поют вместе",
    icon: <Users className="h-4 w-4" />,
  },
  {
    id: "echo",
    name: "Echo Vocals",
    nameRu: "Эхо вокал",
    tag: "(echo)",
    description: "Echoing vocal effect",
    descriptionRu: "Эффект эха в вокале",
    icon: <Volume2 className="h-4 w-4" />,
  },
]

const INTENSITY_LEVELS: { id: HarmonyIntensity; name: string; nameRu: string; description: string }[] = [
  { id: "subtle", name: "Subtle", nameRu: "Тонкий", description: "Light harmony touches" },
  { id: "moderate", name: "Moderate", nameRu: "Умеренный", description: "Balanced harmonies" },
  { id: "rich", name: "Rich", nameRu: "Насыщенный", description: "Full-bodied harmonies" },
  { id: "epic", name: "Epic", nameRu: "Эпичный", description: "Massive choir-like sound" },
]

const HARMONY_PRESETS: HarmonyPreset[] = [
  {
    id: "gospel",
    name: "Gospel Choir",
    nameRu: "Госпел хор",
    types: ["choir", "harmonies", "call-response"],
    intensity: "epic",
    description: "Powerful gospel-style harmonies",
    styleTags: ["Gospel", "Choir", "Soulful", "Powerful Vocals"],
  },
  {
    id: "pop",
    name: "Pop Harmonies",
    nameRu: "Поп гармонии",
    types: ["harmonies", "backing"],
    intensity: "moderate",
    description: "Clean pop backing vocals",
    styleTags: ["Pop", "Harmony Vocals", "Layered Vocals"],
  },
  {
    id: "rock",
    name: "Rock Anthem",
    nameRu: "Рок антем",
    types: ["choir", "unison"],
    intensity: "rich",
    description: "Stadium rock crowd harmonies",
    styleTags: ["Rock", "Anthemic", "Choir", "Powerful"],
  },
  {
    id: "rnb",
    name: "R&B Layers",
    nameRu: "R&B слои",
    types: ["layered", "harmonies"],
    intensity: "rich",
    description: "Smooth R&B vocal stacks",
    styleTags: ["R&B", "Soulful", "Layered Vocals", "Smooth Vocals"],
  },
  {
    id: "folk",
    name: "Folk Duet",
    nameRu: "Фолк дуэт",
    types: ["duet", "harmonies"],
    intensity: "subtle",
    description: "Intimate folk harmonies",
    styleTags: ["Folk", "Acoustic", "Duet", "Harmony Vocals"],
  },
  {
    id: "electronic",
    name: "Synth Choir",
    nameRu: "Синт хор",
    types: ["choir", "layered", "echo"],
    intensity: "epic",
    description: "Electronic choir textures",
    styleTags: ["Electronic", "Vocoder", "Choir", "Layered"],
  },
]

const SECTION_SUGGESTIONS = [
  { section: "[Chorus]", hint: "Best for harmonies and choir" },
  { section: "[Bridge]", hint: "Great for building harmonies" },
  { section: "[Hook]", hint: "Add power with backing vocals" },
  { section: "[Outro]", hint: "Perfect for fading harmonies" },
  { section: "[Big Finish]", hint: "Epic full choir moment" },
]

export function HarmonyEditor({ onInsertHarmonies, onAddHarmonyTags, selectedTags }: HarmonyEditorProps) {
  const [enabled, setEnabled] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [intensity, setIntensity] = useState<HarmonyIntensity>("moderate")
  const [generatedText, setGeneratedText] = useState("")

  const toggleType = useCallback((typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    )
  }, [])

  const applyPreset = useCallback((preset: HarmonyPreset) => {
    setEnabled(true)
    setSelectedTypes(preset.types)
    setIntensity(preset.intensity)
    onAddHarmonyTags(preset.styleTags.filter((t) => !selectedTags.includes(t)))
  }, [onAddHarmonyTags, selectedTags])

  const generateHarmonySection = useCallback(() => {
    const selectedHarmonies = HARMONY_TYPES.filter((h) => selectedTypes.includes(h.id))
    if (selectedHarmonies.length === 0) return

    const intensityPrefix = {
      subtle: "Light",
      moderate: "",
      rich: "Rich",
      epic: "Full",
    }[intensity]

    let text = "[Chorus]\n"
    
    selectedHarmonies.forEach((harmony, index) => {
      if (index === 0) {
        text += `${harmony.tag}\n`
      } else {
        text += `${harmony.tag} `
      }
    })

    if (intensity === "epic") {
      text += "\n(building) (powerful)\n"
    } else if (intensity === "rich") {
      text += "\n(building)\n"
    }

    text += "\n[Your lyrics here...]\n"
    text += "\n[Bridge]\n"
    
    if (selectedTypes.includes("choir") || selectedTypes.includes("harmonies")) {
      text += "(harmonies building)\n"
    }
    
    text += "\n[Your bridge lyrics...]\n"
    text += "\n[Final Chorus]\n"
    
    selectedHarmonies.forEach((harmony) => {
      text += `${harmony.tag} `
    })
    
    if (intensity === "epic" || intensity === "rich") {
      text += "(belting) (full choir)\n"
    }
    
    text += "\n[Your final chorus lyrics...]\n"
    text += "\n[Outro]\n"
    text += "(fade out) (echoing harmonies)\n"

    setGeneratedText(text)
  }, [selectedTypes, intensity])

  const handleInsert = () => {
    if (generatedText) {
      onInsertHarmonies(generatedText)
    }
  }

  const reset = () => {
    setSelectedTypes([])
    setIntensity("moderate")
    setGeneratedText("")
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header with Toggle */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
              enabled ? "bg-primary/20" : "bg-secondary"
            )}>
              <Users className={cn("h-5 w-5", enabled ? "text-primary" : "text-muted-foreground")} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {"Вокальные гармонии (Хоры)"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {"Добавьте многослойный вокал и хоровые партии"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={cn(
              "relative h-6 w-11 rounded-full transition-all",
              enabled ? "bg-primary" : "bg-secondary"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all",
                enabled ? "left-[22px]" : "left-0.5"
              )}
            />
          </button>
        </div>
      </div>

      {enabled && (
        <>
          {/* Quick Presets */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {"Быстрые пресеты"}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {HARMONY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={cn(
                    "flex flex-col items-start rounded-lg border border-border bg-secondary/50 p-3",
                    "text-left transition-all",
                    "hover:bg-primary/10 hover:border-primary/30"
                  )}
                >
                  <span className="text-xs font-semibold text-foreground">{preset.nameRu}</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Harmony Types Selection */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {"Типы гармоний"}
                </h3>
              </div>
              {selectedTypes.length > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3 w-3 inline mr-1" />
                  {"Сбросить"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {HARMONY_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type.id)
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleType(type.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-3 transition-all",
                      isSelected
                        ? "bg-primary/15 border-primary/40 text-primary"
                        : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      isSelected ? "bg-primary/20" : "bg-background"
                    )}>
                      {type.icon}
                    </div>
                    <div className="text-center">
                      <span className="block text-xs font-semibold">{type.nameRu}</span>
                      <span className="block text-[10px] opacity-70">{type.tag}</span>
                    </div>
                    {isSelected && (
                      <Check className="absolute top-2 right-2 h-3 w-3" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Intensity Control */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="h-3.5 w-3.5 text-muted-foreground" />
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {"Интенсивность"}
              </h3>
            </div>
            <div className="flex gap-2">
              {INTENSITY_LEVELS.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setIntensity(level.id)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 px-3 text-center transition-all",
                    intensity === level.id
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
                  )}
                >
                  <span className="block text-xs font-semibold">{level.nameRu}</span>
                  <span className="block text-[10px] opacity-70">{level.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Suggestions */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Music2 className="h-3.5 w-3.5 text-muted-foreground" />
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {"Где использовать гармонии"}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {SECTION_SUGGESTIONS.map((item) => (
                <div
                  key={item.section}
                  className="flex items-center gap-2 rounded-lg bg-secondary/50 border border-border px-3 py-2"
                >
                  <code className="text-xs font-mono text-primary">{item.section}</code>
                  <span className="text-[10px] text-muted-foreground">{item.hint}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          {selectedTypes.length > 0 && (
            <button
              type="button"
              onClick={generateHarmonySection}
              className={cn(
                "w-full rounded-xl border border-primary/30 bg-primary/10 p-4",
                "flex items-center justify-center gap-2",
                "text-sm font-semibold text-primary",
                "transition-all hover:bg-primary/20 active:scale-[0.99]"
              )}
            >
              <Sparkles className="h-4 w-4" />
              {"Сгенерировать секцию с гармониями"}
            </button>
          )}

          {/* Generated Preview */}
          {generatedText && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {"Сгенерированная структура"}
                </h3>
                <button
                  type="button"
                  onClick={handleInsert}
                  className="flex items-center gap-1.5 rounded-lg bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/30 transition-all"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {"Вставить в структуру"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap rounded-lg border border-border bg-background p-3 font-mono text-xs leading-relaxed text-foreground max-h-[250px] overflow-y-auto">
                {generatedText}
              </pre>
            </div>
          )}

          {/* Selected Harmony Tags Info */}
          {selectedTypes.length > 0 && (
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {"Выбранные теги гармоний"}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedTypes.map((typeId) => {
                  const type = HARMONY_TYPES.find((t) => t.id === typeId)
                  if (!type) return null
                  return (
                    <span
                      key={typeId}
                      className="rounded-full bg-primary/15 border border-primary/25 px-2.5 py-1 text-xs font-mono text-primary"
                    >
                      {type.tag}
                    </span>
                  )
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                {"Добавьте эти теги к строкам вашего текста, где хотите услышать гармонии. Например:"}<br />
                <code className="text-primary font-mono">{"[Chorus]"}</code><br />
                <code className="text-primary font-mono">{"(harmonies) (choir)"}</code><br />
                <code className="text-muted-foreground">{"We rise together..."}</code>
              </p>
            </div>
          )}
        </>
      )}

      {/* Disabled State Info */}
      {!enabled && (
        <div className="rounded-xl border border-dashed border-border bg-card/30 p-6 text-center">
          <Users className="mx-auto h-8 w-8 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground mb-2">
            {"Включите гармонии для добавления хоров и многослойного вокала"}
          </p>
          <p className="text-xs text-muted-foreground/70">
            {"Выберите типы гармоний, настройте интенсивность и сгенерируйте структуру с вокальными хинтами для Suno"}
          </p>
        </div>
      )}
    </div>
  )
}
