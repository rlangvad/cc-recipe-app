"use client";

import { Recipe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Trash2, Calendar, Clock } from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
}

export function RecipeDetail({
  recipe,
  onClose,
  onEdit,
  onDelete,
}: RecipeDetailProps) {
  const ingredients = recipe.ingredients
    .split("\n")
    .filter((ingredient) => ingredient.trim())
    .map((ingredient) => ingredient.trim());

  const instructions = recipe.instructions
    .split("\n")
    .filter((instruction) => instruction.trim())
    .map((instruction) => instruction.trim());

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">
                {recipe.title}
              </DialogTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created {new Date(recipe.createdAt).toLocaleDateString()}
                </div>
                {recipe.updatedAt !== recipe.createdAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Updated {new Date(recipe.updatedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(recipe)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(recipe)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {recipe.imageURL && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={recipe.imageURL}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Ingredients</span>
                  <Badge variant="secondary">{ingredients.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-muted-foreground text-sm mt-1">
                        {index + 1}.
                      </span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Instructions</span>
                  <Badge variant="secondary">{instructions.length} steps</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
