import { z } from "zod";

export const recipeSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
  instructions: z.string().min(1, "Instructions are required"),
  imageURL: z.url().optional().or(z.literal("")),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createRecipeSchema = recipeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateRecipeSchema = createRecipeSchema.partial();

export type Recipe = z.infer<typeof recipeSchema>;
export type CreateRecipe = z.infer<typeof createRecipeSchema>;
export type UpdateRecipe = z.infer<typeof updateRecipeSchema>;
