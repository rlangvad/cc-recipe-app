# Recipe Manager

A simple recipe management application built with Next.js 15, React 19, and modern web technologies.

## Features

- ✅ Create new recipes with title, ingredients, instructions, and optional image
- ✅ View all recipes in a beautiful card layout
- ✅ Edit existing recipes
- ✅ Delete recipes with confirmation dialog
- ✅ View detailed recipe information
- ✅ Data persistence using localStorage
- ✅ Form validation with React Hook Form and Zod
- ✅ Modern UI with Shadcn/ui components and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Data Storage**: localStorage

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── recipe-form.tsx   # Recipe creation/editing form
│   ├── recipe-list.tsx   # Recipe list display
│   ├── recipe-detail.tsx # Recipe detail view
│   └── delete-dialog.tsx # Delete confirmation dialog
├── lib/                  # Utility functions
│   ├── types.ts          # TypeScript types and Zod schemas
│   ├── storage.ts        # localStorage utilities
│   └── utils.ts          # General utilities
└── public/               # Static assets
```

## Usage

1. **Add a Recipe**: Click the "Add Recipe" button to create a new recipe
2. **View Recipes**: Browse all your recipes in the main page
3. **View Details**: Click "View" on any recipe card to see full details
4. **Edit Recipe**: Click the edit button to modify a recipe
5. **Delete Recipe**: Click the delete button and confirm to remove a recipe

## Data Storage

All recipe data is stored in the browser's localStorage under the key "recipes". The data persists between browser sessions but is specific to each browser/device.

## Future Enhancements

The PRD mentions potential AI integration features:

- Recipe summarization using LLMs
- Automatic ingredient parsing
- Recipe recommendations based on available ingredients

## Development

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Type Check**: `npx tsc --noEmit`
