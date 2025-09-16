"use client";

import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ viewMode, onViewModeChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center gap-1 p-1 bg-muted rounded-lg", className)}>
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "h-8 px-3 transition-all duration-200",
          viewMode === "grid"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Switch to grid view"
        aria-pressed={viewMode === "grid"}
      >
        <Grid3X3 className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className={cn(
          "h-8 px-3 transition-all duration-200",
          viewMode === "list"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Switch to list view"
        aria-pressed={viewMode === "list"}
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  );
}
