"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { TagSelector } from "./tag-selector"
import { StructureEditor } from "./structure-editor"
import { PromptPreview } from "./prompt-preview"
import { PromptHistory } from "./prompt-history"
import { QuickPresets } from "./quick-presets"
import { LyricsGenerator } from "./lyrics-generator"
import { CustomLyricsEditor } from "./custom-lyrics-editor"
import { generateFullOutput, type PromptHistoryItem } from "@/lib/suno-tags"
import { Music, Tags, FileText, Clock, Sparkles, RotateCcw, Wand2, PenLine } from "lucide-react"

type Tab = "tags" | "ai" | "custom" | "structure" | "preview" | "history"

export function SongBuilder() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [structureLyrics, setStructureLyrics] = useState("")
  const [history, setHistory] = useState<PromptHistoryItem[]>([])
  const [activeTab, setActiveTab] = useState<Tab>("tags")

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }, [])

  const removeTag = useCallback((tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }, [])

  const saveToHistory = useCallback(
    (title: string) => {
      const item: PromptHistoryItem = {
        id: crypto.randomUUID(),
        styleTags: [...selectedTags],
        structureLyrics,
        fullPrompt: generateFullOutput(selectedTags, structureLyrics),
        timestamp: Date.now(),
        title,
      }
      setHistory((prev) => [item, ...prev])
    },
    [selectedTags, structureLyrics]
  )

  const deleteFromHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const restoreFromHistory = useCallback((item: PromptHistoryItem) => {
    setSelectedTags(item.styleTags)
    setStructureLyrics(item.structureLyrics)
    setActiveTab("preview")
  }, [])

  const applyPreset = useCallback((tags: string[], structure: string) => {
    setSelectedTags(tags)
    setStructureLyrics(structure)
    setActiveTab("preview")
  }, [])

  const insertAiLyrics = useCallback((lyrics: string) => {
    setStructureLyrics(lyrics)
    setActiveTab("structure")
  }, [])

  const clearAll = useCallback(() => {
    setSelectedTags([])
    setStructureLyrics("")
  }, [])

  const tabs = [
    { id: "tags" as Tab, label: "Tags", labelRu: "Теги", icon: Tags, count: selectedTags.length },
    { id: "ai" as Tab, label: "AI Lyrics", labelRu: "AI Текст", icon: Wand2 },
    { id: "custom" as Tab, label: "My Text", labelRu: "Мой текст", icon: PenLine },
    { id: "structure" as Tab, label: "Structure", labelRu: "Структура", icon: FileText },
    { id: "preview" as Tab, label: "Preview", labelRu: "Превью", icon: Sparkles },
    { id: "history" as Tab, label: "History", labelRu: "История", icon: Clock, count: history.length },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground tracking-tight">Suno Song Builder</h1>
              <p className="text-[10px] text-muted-foreground">AI Music Prompt Composer</p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      </header>

      {/* Quick Presets */}
      <div className="mx-auto max-w-5xl px-4 pt-4">
        <QuickPresets onApplyPreset={applyPreset} />
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-[57px] z-40 border-b border-border bg-background/80 backdrop-blur-xl mt-4">
        <div className="mx-auto flex max-w-5xl px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-medium transition-all",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{tab.labelRu}</span>
                <span className="sm:hidden">{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/20 px-1 text-[10px] font-bold text-primary">
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-4 pb-20">
        {activeTab === "tags" && (
          <TagSelector selectedTags={selectedTags} onToggleTag={toggleTag} />
        )}
        {activeTab === "ai" && (
          <LyricsGenerator
            selectedTags={selectedTags}
            onInsertLyrics={insertAiLyrics}
          />
        )}
        {activeTab === "custom" && (
          <CustomLyricsEditor
            onInsertLyrics={insertAiLyrics}
            selectedTags={selectedTags}
            onApplyRandomStyle={setSelectedTags}
          />
        )}
        {activeTab === "structure" && (
          <StructureEditor value={structureLyrics} onChange={setStructureLyrics} />
        )}
        {activeTab === "preview" && (
          <PromptPreview
            selectedTags={selectedTags}
            structureLyrics={structureLyrics}
            onRemoveTag={removeTag}
            onSaveToHistory={saveToHistory}
          />
        )}
        {activeTab === "history" && (
          <PromptHistory
            history={history}
            onDelete={deleteFromHistory}
            onRestore={restoreFromHistory}
          />
        )}
      </main>

      {/* Bottom Status Bar */}
      {(selectedTags.length > 0 || structureLyrics) && activeTab !== "preview" && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {selectedTags.length} tags
              </span>
              {selectedTags.length > 0 && (
                <p className="truncate text-xs text-foreground/70 font-mono">
                  {selectedTags.slice(0, 5).join(", ")}
                  {selectedTags.length > 5 && "..."}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className="flex-shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Preview
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
