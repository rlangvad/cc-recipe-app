"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Recipe, CreateRecipe, createRecipeSchema } from "@/lib/types";
import { addRecipe, updateRecipe } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RecipeFormProps {
  open: boolean;
  recipe?: Recipe | null;
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
}

export function RecipeForm({
  open,
  recipe,
  onSave,
  onCancel,
}: RecipeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!recipe;

  const form = useForm<CreateRecipe>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      ingredients: "",
      instructions: "",
      imageURL: "",
    },
  });

  useEffect(() => {
    if (recipe) {
      form.reset({
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        imageURL: recipe.imageURL || "",
      });
    }
  }, [recipe, form]);

  const onSubmit = async (data: CreateRecipe) => {
    setIsSubmitting(true);
    try {
      let savedRecipe: Recipe;

      if (isEditing && recipe) {
        const updated = updateRecipe(recipe.id, data);
        if (!updated) {
          throw new Error("Failed to update recipe");
        }
        savedRecipe = updated;
      } else {
        savedRecipe = addRecipe(data);
      }

      onSave(savedRecipe);
    } catch (error) {
      console.error("Error saving recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEditing ? "Edit Recipe" : "Add New Recipe"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your recipe details"
              : "Share your culinary creation with the world"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipe Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter recipe title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredients</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter ingredients, one per line or separated by commas"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter step-by-step cooking instructions"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isSubmitting
                    ? isEditing
                      ? "Updating Recipe..."
                      : "Adding Recipe..."
                    : isEditing
                    ? "Update Recipe"
                    : "Add Recipe"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  size="lg"
                  className="hover:bg-destructive/10 hover:border-destructive/20"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
