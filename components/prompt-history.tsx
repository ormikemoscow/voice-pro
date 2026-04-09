"use client"

import { cn } from "@/lib/utils"
import type { PromptHistoryItem } from "@/lib/suno-tags"
import { Copy, Check, Trash2, RotateCcw, Clock } from "lucide-react"
import { useState } from "react"

interface PromptHistoryProps {
  history: PromptHistoryItem[]
  onDelete: (id: string) => void
  onRestore: (item: PromptHistoryItem) => void
}

function HistoryCard({
  item,
  onDelete,
  onRestore,
}: {
  item: PromptHistoryItem
  onDelete: (id: string) => void
  onRestore: (item: PromptHistoryItem) => void
}) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(item.fullPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const timeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timeAgo(item.timestamp)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onRestore(item)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent/20 hover:text-accent transition-all"
            title="Restore"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all"
            title="Copy"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-all"
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {item.styleTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {item.styleTags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {tag}
            </span>
          ))}
          {item.styleTags.length > 6 && (
            <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{item.styleTags.length - 6}
            </span>
          )}
        </div>
      )}

      {item.structureLyrics && (
        <p className="mt-2 line-clamp-2 font-mono text-xs text-muted-foreground leading-relaxed">
          {item.structureLyrics}
        </p>
      )}
    </div>
  )
}

export function PromptHistory({ history, onDelete, onRestore }: PromptHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-12 px-4">
        <Clock className="h-8 w-8 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">No saved prompts yet</p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Build a prompt and save it to see it here
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {history.map((item) => (
        <HistoryCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onRestore={onRestore}
        />
      ))}
    </div>
  )
}
