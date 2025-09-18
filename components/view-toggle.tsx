"use client";

import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ currentView, onViewChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center gap-1 p-1 bg-muted rounded-lg", className)}>
      <Button
        variant={currentView === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        className={cn(
          "h-8 px-3 transition-all duration-200",
          currentView === "grid"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-background hover:text-foreground"
        )}
        aria-label="Switch to grid view"
        aria-pressed={currentView === "grid"}
      >
        <Grid3X3 className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      
      <Button
        variant={currentView === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className={cn(
          "h-8 px-3 transition-all duration-200",
          currentView === "list"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-background hover:text-foreground"
        )}
        aria-label="Switch to list view"
        aria-pressed={currentView === "list"}
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  );
}