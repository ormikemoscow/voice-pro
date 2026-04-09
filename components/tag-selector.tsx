"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { TAG_CATEGORIES, type TagCategory } from "@/lib/suno-tags"
import {
  Music, Heart, Mic, Guitar, Zap, SlidersHorizontal, Clock,
  ChevronDown, ChevronUp, Search
} from "lucide-react"

const ICON_MAP: Record<string, React.ElementType> = {
  music: Music,
  heart: Heart,
  mic: Mic,
  guitar: Guitar,
  zap: Zap,
  sliders: SlidersHorizontal,
  clock: Clock,
}

interface TagSelectorProps {
  selectedTags: string[]
  onToggleTag: (tag: string) => void
}

function CategorySection({
  category,
  selectedTags,
  onToggleTag,
}: {
  category: TagCategory
  selectedTags: string[]
  onToggleTag: (tag: string) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [search, setSearch] = useState("")
  const Icon = ICON_MAP[category.icon] || Music

  const filteredTags = search
    ? category.tags.filter((t) => t.toLowerCase().includes(search.toLowerCase()))
    : category.tags

  const visibleTags = isExpanded ? filteredTags : filteredTags.slice(0, 12)
  const selectedCount = category.tags.filter((t) => selectedTags.includes(t)).length

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", category.color)}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-foreground">{category.nameRu}</h3>
            <p className="text-xs text-muted-foreground">{category.name}</p>
          </div>
          {selectedCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
              {selectedCount}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${category.name.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
                isSelected
                  ? category.color + " border-current"
                  : "border-border bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {!isExpanded && filteredTags.length > 12 && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="mt-2 text-xs text-primary hover:underline"
        >
          +{filteredTags.length - 12} more
        </button>
      )}
    </div>
  )
}

export function TagSelector({ selectedTags, onToggleTag }: TagSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      {TAG_CATEGORIES.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          selectedTags={selectedTags}
          onToggleTag={onToggleTag}
        />
      ))}
    </div>
  )
}
