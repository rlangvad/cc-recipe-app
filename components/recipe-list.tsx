"use client";

import { Recipe } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import { useState } from "react";
import { DeleteDialog } from "./delete-dialog";
import { RecipeDetail } from "./recipe-detail";
import { deleteRecipe } from "@/lib/storage";

interface RecipeListProps {
  recipes: Recipe[];
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export function RecipeList({ recipes, onEdit, onDelete }: RecipeListProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);

  const handleDeleteClick = (recipe: Recipe) => {
    setRecipeToDelete(recipe);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (recipeToDelete) {
      const success = deleteRecipe(recipeToDelete.id);
      if (success) {
        onDelete(recipeToDelete.id);
      }
      setDeleteDialogOpen(false);
      setRecipeToDelete(null);
    }
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">
              Your recipe collection is empty
            </h3>
            <p className="text-muted-foreground text-lg">
              Start building your culinary library by adding your first recipe.
              It&apos;s quick and easy!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm"
          >
            {recipe.imageURL ? (
              <div className="aspect-video overflow-hidden rounded-t-lg relative">
                <img
                  src={recipe.imageURL}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-primary/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            )}

            <CardHeader className="pb-3">
              <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors duration-200">
                {recipe.title}
              </CardTitle>
              <CardDescription className="text-sm">
                Added{" "}
                {new Date(recipe.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary border-primary/20"
                  >
                    {recipe.ingredients.split("\n").length} ingredients
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {recipe.instructions.split("\n").length} steps
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setSelectedRecipe(recipe)}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Recipe
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(recipe)}
                    className="hover:bg-primary/10 hover:border-primary/20"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(recipe)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onEdit={onEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        recipe={recipeToDelete}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
