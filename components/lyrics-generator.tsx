"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { generateLyrics } from "@/lib/lyrics-engine"
import {
  Wand2,
  Loader2,
  Copy,
  Check,
  ArrowRight,
  Globe,
  Sparkles,
  RefreshCw,
} from "lucide-react"

interface LyricsGeneratorProps {
  selectedTags: string[]
  onInsertLyrics: (lyrics: string) => void
}

const TOPIC_SUGGESTIONS = [
  { ru: "Потерянная любовь", en: "Lost love" },
  { ru: "Летняя ночь", en: "Summer night" },
  { ru: "Дорога домой", en: "Road home" },
  { ru: "Танцуй до рассвета", en: "Dance till dawn" },
  { ru: "Свобода и мечты", en: "Freedom and dreams" },
  { ru: "Звездное небо", en: "Starry sky" },
  { ru: "Городские огни", en: "City lights" },
  { ru: "Сила внутри", en: "Power within" },
  { ru: "Одиночество в толпе", en: "Alone in the crowd" },
  { ru: "Неоновый закат", en: "Neon sunset" },
  { ru: "Первый поцелуй", en: "First kiss" },
  { ru: "Бегущий по волнам", en: "Running on waves" },
]

export function LyricsGenerator({
  selectedTags,
  onInsertLyrics,
}: LyricsGeneratorProps) {
  const [topic, setTopic] = useState("")
  const [language, setLanguage] = useState<"en" | "ru">("ru")
  const [copied, setCopied] = useState(false)
  const [generatedLyrics, setGeneratedLyrics] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = useCallback(() => {
    if (!topic.trim() || isGenerating) return

    setIsGenerating(true)
    setGeneratedLyrics("")

    setTimeout(() => {
      const lyrics = generateLyrics({
        topic: topic.trim(),
        tags: selectedTags,
        language,
      })
      setGeneratedLyrics(lyrics)
      setIsGenerating(false)
    }, 600)
  }, [topic, selectedTags, language, isGenerating])

  const handleRegenerate = useCallback(() => {
    if (!topic.trim() || isGenerating) return
    setIsGenerating(true)
    setGeneratedLyrics("")
    setTimeout(() => {
      const lyrics = generateLyrics({
        topic: topic.trim(),
        tags: selectedTags,
        language,
      })
      setGeneratedLyrics(lyrics)
      setIsGenerating(false)
    }, 400)
  }, [topic, selectedTags, language, isGenerating])

  const handleCopy = async () => {
    if (!generatedLyrics) return
    await navigator.clipboard.writeText(generatedLyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInsert = () => {
    if (!generatedLyrics) return
    onInsertLyrics(generatedLyrics)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Topic Input */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            {"На какую тему написать текст песни?"}
          </h3>
        </div>
        <p className="mb-3 text-xs text-muted-foreground leading-relaxed">
          {language === "ru"
            ? "Опишите тему, настроение или историю. Генератор создаст текст со структурными тегами для Suno."
            : "Describe the topic, mood, or story. The generator will create lyrics with Suno structure tags."}
        </p>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleGenerate()
                }
              }}
              placeholder={
                language === "ru"
                  ? "Например: песня о дожде в большом городе, одиночество и надежда..."
                  : "E.g.: a song about rain in a big city, loneliness and hope..."
              }
              disabled={isGenerating}
              className={cn(
                "w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground",
                "placeholder:text-muted-foreground outline-none",
                "focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                "disabled:opacity-50"
              )}
            />
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "ru" : "en")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
              title={language === "en" ? "Switch to Russian" : "Switch to English"}
            >
              <Globe className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
              topic.trim() && !isGenerating
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {isGenerating
                ? language === "ru"
                  ? "Пишу..."
                  : "Writing..."
                : language === "ru"
                  ? "Создать"
                  : "Generate"}
            </span>
          </button>
        </div>

        {/* Language indicator */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {"Язык:"}
          </span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium",
              language === "ru"
                ? "bg-primary/20 text-primary"
                : "bg-accent/20 text-accent"
            )}
          >
            {language === "ru" ? "Русский" : "English"}
          </span>
          {selectedTags.length > 0 && (
            <>
              <span className="text-[10px] text-muted-foreground">|</span>
              <span className="text-[10px] text-muted-foreground">
                {selectedTags.length}{" "}
                {selectedTags.length === 1
                  ? language === "ru"
                    ? "тег стиля"
                    : "style tag"
                  : language === "ru"
                    ? "тегов стиля"
                    : "style tags"}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Topic Suggestions */}
      {!generatedLyrics && !isGenerating && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {language === "ru" ? "Идеи для тем" : "Topic ideas"}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TOPIC_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion.en}
                type="button"
                onClick={() =>
                  setTopic(language === "ru" ? suggestion.ru : suggestion.en)
                }
                className={cn(
                  "rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs",
                  "text-muted-foreground font-medium transition-all",
                  "hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                )}
              >
                {language === "ru" ? suggestion.ru : suggestion.en}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generated Output */}
      {(generatedLyrics || isGenerating) && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              {language === "ru" ? "Сгенерированный текст" : "Generated Lyrics"}
              {isGenerating && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-primary">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {language === "ru" ? "пишу..." : "writing..."}
                </span>
              )}
            </h3>
            {generatedLyrics && !isGenerating && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-all"
                  title={language === "ru" ? "Сгенерировать заново" : "Regenerate"}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  {language === "ru" ? "Ещё" : "Retry"}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-all"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied
                    ? language === "ru"
                      ? "Скопировано!"
                      : "Copied!"
                    : language === "ru"
                      ? "Копировать"
                      : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={handleInsert}
                  className="flex items-center gap-1.5 rounded-lg bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/30 transition-all"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {language === "ru" ? "В структуру" : "Insert"}
                </button>
              </div>
            )}
          </div>

          <pre
            className={cn(
              "whitespace-pre-wrap rounded-lg border border-border bg-background p-3",
              "font-mono text-sm leading-relaxed max-h-[450px] overflow-y-auto",
              generatedLyrics ? "text-foreground" : "text-muted-foreground/50"
            )}
          >
            {generatedLyrics || (language === "ru" ? "Генерирую текст..." : "Generating lyrics...")}
          </pre>
        </div>
      )}
    </div>
  )
}
