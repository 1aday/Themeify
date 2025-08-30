"use client"

import * as React from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function Collapsible({ title, children, defaultOpen = true, className }: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className={cn("border rounded-lg", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-sm">{title}</span>
        <ChevronUp 
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen ? "rotate-0" : "rotate-180"
          )} 
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  )
}
