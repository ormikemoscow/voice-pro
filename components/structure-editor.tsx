"use client"

import { STRUCTURE_TAGS } from "@/lib/suno-tags"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

interface StructureEditorProps {
  value: string
  onChange: (value: string) => void
}

export function StructureEditor({ value, onChange }: StructureEditorProps) {
  const insertTag = (tag: string) => {
    const textarea = document.getElementById("lyrics-textarea") as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const before = value.slice(0, start)
      const after = value.slice(end)
      const newValue = before + tag + "\n" + after
      onChange(newValue)
      setTimeout(() => {
        textarea.focus()
        const pos = start + tag.length + 1
        textarea.setSelectionRange(pos, pos)
      }, 0)
    } else {
      onChange(value + (value ? "\n" : "") + tag + "\n")
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Structure Tags
          <span className="ml-2 text-xs font-normal text-muted-foreground">click to insert</span>
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {STRUCTURE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => insertTag(tag)}
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

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Lyrics & Structure
        </h3>
        <textarea
          id="lyrics-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`[Intro]\n\n[Verse 1]\nYour lyrics here...\n\n[Chorus]\nYour chorus lyrics...\n\n[Verse 2]\nMore lyrics...\n\n[Outro]\n[Fade Out]`}
          className={cn(
            "w-full min-h-[300px] rounded-lg border border-border bg-background p-3",
            "font-mono text-sm text-foreground placeholder:text-muted-foreground/50",
            "outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
            "resize-y leading-relaxed"
          )}
        />
      </div>
    </div>
  )
}
