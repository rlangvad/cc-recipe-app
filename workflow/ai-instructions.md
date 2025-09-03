# AI Instructions

Based on: https://github.com/snarktank/ai-dev-tasks/.

## Step summarized

1. Prompt to initialize the PRD creation

```
Use @create-prd.md
Here's the feature I want to build: [Describe your feature in detail]
Reference these files to help you: [Optional: @file1.py @file2.ts]
```

2. With your PRD drafted (e.g., MyFeature-PRD.md), the next step is to generate a detailed, step-by-step implementation plan for your AI Developer.

```
Now take @MyFeature-PRD.md and create tasks using @generate-tasks.md1
```

3. You'll now have a well-structured task list, often with tasks and sub-tasks, ready for the AI to start working on. This provides a clear roadmap for implementation.

4. Tell the AI to start with the first task (e.g., 1.1):

```
Please start on task 1.1 and use @process-task-list.md
```
