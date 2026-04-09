"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { generateStylePrompt, generateFullOutput } from "@/lib/suno-tags"
import { Copy, Check, Save, X } from "lucide-react"

interface PromptPreviewProps {
  selectedTags: string[]
  structureLyrics: string
  onRemoveTag: (tag: string) => void
  onSaveToHistory: (title: string) => void
}

export function PromptPreview({
  selectedTags,
  structureLyrics,
  onRemoveTag,
  onSaveToHistory,
}: PromptPreviewProps) {
  const [copiedStyle, setCopiedStyle] = useState(false)
  const [copiedFull, setCopiedFull] = useState(false)
  const [title, setTitle] = useState("")
  const [showSave, setShowSave] = useState(false)

  const stylePrompt = generateStylePrompt(selectedTags)
  const fullOutput = generateFullOutput(selectedTags, structureLyrics)

  const copyToClipboard = async (text: string, type: "style" | "full") => {
    await navigator.clipboard.writeText(text)
    if (type === "style") {
      setCopiedStyle(true)
      setTimeout(() => setCopiedStyle(false), 2000)
    } else {
      setCopiedFull(true)
      setTimeout(() => setCopiedFull(false), 2000)
    }
  }

  const handleSave = () => {
    onSaveToHistory(title || "Untitled Song")
    setTitle("")
    setShowSave(false)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Selected Tags
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {selectedTags.length} tags
              </span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="group flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-all hover:bg-destructive/20 hover:text-destructive hover:border-destructive/30"
              >
                {tag}
                <X className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Style Prompt */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">
            Style of Music
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              paste into Suno
            </span>
          </h3>
          <button
            type="button"
            onClick={() => copyToClipboard(stylePrompt, "style")}
            disabled={!stylePrompt}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              stylePrompt
                ? "bg-primary/20 text-primary hover:bg-primary/30"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}
          >
            {copiedStyle ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedStyle ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className={cn(
          "rounded-lg border border-border bg-background p-3 font-mono text-sm leading-relaxed",
          stylePrompt ? "text-foreground" : "text-muted-foreground/50"
        )}>
          {stylePrompt || "Select tags to build your style prompt..."}
        </div>
      </div>

      {/* Full Output */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Full Output</h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSave(!showSave)}
              className="flex items-center gap-1.5 rounded-lg bg-accent/20 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/30 transition-all"
            >
              <Save className="h-3.5 w-3.5" />
              Save
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(fullOutput, "full")}
              disabled={!fullOutput}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                fullOutput
                  ? "bg-primary/20 text-primary hover:bg-primary/30"
                  : "bg-secondary text-muted-foreground cursor-not-allowed"
              )}
            >
              {copiedFull ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedFull ? "Copied!" : "Copy All"}
            </button>
          </div>
        </div>

        {showSave && (
          <div className="mb-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Song title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        )}

        <pre className={cn(
          "whitespace-pre-wrap rounded-lg border border-border bg-background p-3 font-mono text-sm leading-relaxed max-h-[400px] overflow-y-auto",
          fullOutput ? "text-foreground" : "text-muted-foreground/50"
        )}>
          {fullOutput || "Your full song prompt will appear here..."}
        </pre>
      </div>
    </div>
  )
}
