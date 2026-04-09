"use client"

import { useState, useRef, useCallback } from "react"
import { STRUCTURE_TAGS, generateRandomStyle } from "@/lib/suno-tags"
import { cn } from "@/lib/utils"
import {
  PenLine,
  Plus,
  Copy,
  Check,
  ArrowRight,
  Trash2,
  Type,
  AlignLeft,
  Info,
  Shuffle,
  Upload,
  X,
  Sparkles,
} from "lucide-react"

interface CustomLyricsEditorProps {
  onInsertLyrics: (lyrics: string) => void
  selectedTags: string[]
  onApplyRandomStyle: (tags: string[]) => void
}

const VOCAL_HINTS = [
  "(whispered)",
  "(belting)",
  "(spoken)",
  "(ad-lib)",
  "(harmonies)",
  "(falsetto)",
  "(screaming)",
  "(rapping)",
  "(humming)",
  "(choir)",
  "(deep voice)",
  "(high pitch)",
]

const TEMPLATES = [
  {
    name: "Verse-Chorus",
    nameRu: "Куплет-Припев",
    text: "[Verse 1]\n\n\n[Chorus]\n\n\n[Verse 2]\n\n\n[Chorus]\n\n\n[Outro]\n",
  },
  {
    name: "Full Song",
    nameRu: "Полная песня",
    text: "[Intro]\n\n\n[Verse 1]\n\n\n[Pre-Chorus]\n\n\n[Chorus]\n\n\n[Verse 2]\n\n\n[Pre-Chorus]\n\n\n[Chorus]\n\n\n[Bridge]\n\n\n[Chorus]\n\n\n[Outro]\n",
  },
  {
    name: "Rap/Hip-Hop",
    nameRu: "Рэп/Хип-Хоп",
    text: "[Intro]\n\n\n[Verse 1]\n(rapping)\n\n\n[Hook]\n\n\n[Verse 2]\n(rapping)\n\n\n[Hook]\n\n\n[Bridge]\n\n\n[Verse 3]\n(rapping)\n\n\n[Hook]\n\n\n[Outro]\n",
  },
  {
    name: "Ballad",
    nameRu: "Баллада",
    text: "[Intro]\n(whispered)\n\n\n[Verse 1]\n\n\n[Verse 2]\n\n\n[Chorus]\n(belting)\n\n\n[Verse 3]\n\n\n[Chorus]\n(belting)\n\n\n[Outro]\n(whispered)\n[Fade Out]\n",
  },
  {
    name: "EDM/Drop",
    nameRu: "EDM/Дроп",
    text: "[Intro]\n\n\n[Verse 1]\n\n\n[Build]\n\n\n[Drop]\n\n\n[Breakdown]\n\n\n[Verse 2]\n\n\n[Build]\n\n\n[Drop]\n\n\n[Outro]\n",
  },
]

export function CustomLyricsEditor({ onInsertLyrics, selectedTags, onApplyRandomStyle }: CustomLyricsEditorProps) {
  const [lyrics, setLyrics] = useState("")
  const [copied, setCopied] = useState(false)
  const [showVocalHints, setShowVocalHints] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [randomStyleLabel, setRandomStyleLabel] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleRandomStyle = useCallback(() => {
    const result = generateRandomStyle()
    onApplyRandomStyle(result.tags)
    setRandomStyleLabel(result.label)
    setTimeout(() => setRandomStyleLabel(""), 3000)
  }, [onApplyRandomStyle])

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === "text/plain") {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const text = ev.target?.result
        if (typeof text === "string") setLyrics(text)
      }
      reader.readAsText(file)
    }
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const text = ev.target?.result
        if (typeof text === "string") setLyrics(text)
      }
      reader.readAsText(file)
    }
  }, [])

  const insertAtCursor = useCallback(
    (text: string) => {
      const textarea = textareaRef.current
      if (!textarea) {
        setLyrics((prev) => prev + (prev ? "\n" : "") + text + "\n")
        return
      }
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const before = lyrics.slice(0, start)
      const after = lyrics.slice(end)
      const newValue = before + text + "\n" + after
      setLyrics(newValue)
      setTimeout(() => {
        textarea.focus()
        const pos = start + text.length + 1
        textarea.setSelectionRange(pos, pos)
      }, 0)
    },
    [lyrics]
  )

  const handleCopy = async () => {
    if (!lyrics.trim()) return
    await navigator.clipboard.writeText(lyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInsert = () => {
    if (!lyrics.trim()) return
    onInsertLyrics(lyrics)
  }

  const handleClear = () => {
    setLyrics("")
    textareaRef.current?.focus()
  }

  const applyTemplate = (template: string) => {
    setLyrics(template)
    textareaRef.current?.focus()
  }

  const charCount = lyrics.length
  const lineCount = lyrics ? lyrics.split("\n").length : 0

  return (
    <div className="flex flex-col gap-3">
      {/* Header Card with Random Style */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PenLine className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              {"Свой текст песни"}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleRandomStyle}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all",
              "bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30",
              "text-primary hover:from-primary/30 hover:to-accent/30 hover:border-primary/50",
              "active:scale-95"
            )}
          >
            <Shuffle className="h-3.5 w-3.5" />
            {"Random Style"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          {"Напишите или вставьте свой текст, загрузите .txt файл, или перетащите файл сюда. Нажмите \"Random Style\" для случайного набора стилевых тегов."}
        </p>

        {/* Random Style Result */}
        {randomStyleLabel && (
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 animate-in fade-in slide-in-from-top-1 duration-300">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              {"Применён стиль: "}{randomStyleLabel}
            </span>
          </div>
        )}

        {/* Applied Tags Display */}
        {selectedTags.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {"Текущие теги стиля"}
              </span>
              <span className="text-[10px] text-muted-foreground">
                ({selectedTags.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/15 border border-primary/25 px-2 py-0.5 text-[10px] font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* File Upload / Paste Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        className={cn(
          "rounded-xl border-2 border-dashed p-4 transition-all text-center cursor-pointer",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border bg-card/50 hover:border-muted-foreground/30"
        )}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click() }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.text"
          className="hidden"
          onChange={handleFileUpload}
        />
        <Upload className={cn("mx-auto h-5 w-5 mb-2", isDragging ? "text-primary" : "text-muted-foreground")} />
        <p className={cn("text-xs font-medium", isDragging ? "text-primary" : "text-muted-foreground")}>
          {isDragging
            ? "Отпустите файл для загрузки"
            : "Перетащите .txt файл сюда или нажмите для загрузки"}
        </p>
        <p className="text-[10px] text-muted-foreground/70 mt-1">
          {"Или просто вставьте текст в редактор ниже (Ctrl+V)"}
        </p>
      </div>

      {/* Templates */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" />
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {"Шаблоны структуры"}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.name}
              type="button"
              onClick={() => applyTemplate(tmpl.text)}
              className={cn(
                "rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs",
                "text-muted-foreground font-medium transition-all",
                "hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
              )}
            >
              {tmpl.nameRu}
            </button>
          ))}
        </div>
      </div>

      {/* Structure Tags */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Type className="h-3.5 w-3.5 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {"Структурные теги"}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowVocalHints(!showVocalHints)}
            className={cn(
              "text-[10px] font-medium px-2 py-0.5 rounded-full transition-all",
              showVocalHints
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {showVocalHints ? "Теги структуры" : "Вокальные хинты"}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {showVocalHints
            ? VOCAL_HINTS.map((hint) => (
                <button
                  key={hint}
                  type="button"
                  onClick={() => insertAtCursor(hint)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg border border-border bg-secondary/50",
                    "px-2 py-1 text-xs font-mono text-muted-foreground",
                    "transition-all hover:bg-accent/20 hover:text-accent hover:border-accent/30"
                  )}
                >
                  <Plus className="h-3 w-3" />
                  {hint}
                </button>
              ))
            : STRUCTURE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => insertAtCursor(tag)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg border border-border bg-secondary/50",
                    "px-2 py-1 text-xs font-mono text-muted-foreground",
                    "transition-all hover:bg-primary/20 hover:text-primary hover:border-primary/30"
                  )}
                >
                  <Plus className="h-3 w-3" />
                  {tag}
                </button>
              ))}
        </div>
      </div>

      {/* Text Editor */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">
            {"Текст песни"}
          </h3>
          <div className="flex items-center gap-2">
            {lyrics.trim() && (
              <>
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-all"
                  title="Очистить"
                >
                  <Trash2 className="h-3 w-3" />
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
                  {copied ? "Скопировано!" : "Копировать"}
                </button>
                <button
                  type="button"
                  onClick={handleInsert}
                  className="flex items-center gap-1.5 rounded-lg bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/30 transition-all"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  {"В структуру"}
                </button>
              </>
            )}
          </div>
        </div>

        <textarea
          ref={textareaRef}
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder={
            "[Verse 1]\nЗдесь пишите ваш текст...\n\n[Chorus]\nПрипев вашей песни...\n\n[Verse 2]\nПродолжение текста...\n\n[Outro]\n[Fade Out]"
          }
          className={cn(
            "w-full min-h-[350px] rounded-lg border border-border bg-background p-3",
            "font-mono text-sm text-foreground placeholder:text-muted-foreground/40",
            "outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
            "resize-y leading-relaxed"
          )}
        />

        {/* Stats bar */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>{charCount} {"символов"}</span>
            <span>{lineCount} {"строк"}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Info className="h-3 w-3" />
            <span>{"Suno лучше работает с 500-3000 символами"}</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          {"Советы для Suno"}
        </h4>
        <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">{"--"}</span>
            {"Используйте [Verse], [Chorus], [Bridge] для разделения частей песни"}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">{"--"}</span>
            {"Добавляйте вокальные хинты: (whispered), (belting), (spoken) для контроля вокала"}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">{"--"}</span>
            {"Каждая секция — 4-6 строк для лучшего результата"}
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">{"--"}</span>
            {"[Instrumental], [Guitar Solo], [Piano Solo] — для музыкальных вставок без вокала"}
          </li>
        </ul>
      </div>
    </div>
  )
}
