"use client";

import { useState, useEffect } from "react";
import { Recipe } from "@/lib/types";
import { getRecipes } from "@/lib/storage";
import { RecipeList } from "@/components/recipe-list";
import { RecipeForm } from "@/components/recipe-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    setRecipes(getRecipes());
  }, []);

  const handleRecipeAdded = () => {
    setRecipes(getRecipes());
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleRecipeUpdated = () => {
    setRecipes(getRecipes());
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleDeleteRecipe = () => {
    setRecipes(getRecipes());
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            Your Recipe Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Organize your favorite recipes, discover new flavors, and never lose
            track of your culinary creations.
          </p>
        </div>

        {recipes.length === 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              Add your first recipe
            </Button>
          </div>
        )}
      </div>

      {/* Form Dialog */}
      <RecipeForm
        open={showForm}
        recipe={editingRecipe}
        onSave={editingRecipe ? handleRecipeUpdated : handleRecipeAdded}
        onCancel={handleCancelForm}
      />

      {/* Recipe List */}
      <div className="space-y-6 mt-20">
        {recipes.length > 0 && (
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Your Recipes</h3>
            <Button
              variant="outline"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add recipe
            </Button>
          </div>
        )}

        <RecipeList
          recipes={recipes}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
        />
      </div>
    </div>
  );
}
