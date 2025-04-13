
# Ghost-Trace: An Interactive Terminal Experience

## Project Overview

Ghost-Trace is an interactive terminal experience that simulates the discovery of handwritten notes that have been digitized. The application features a terminal interface where users can explore and interact with a collection of scanned notebook pages alongside their digitally parsed text.

**URL**: https://lovable.dev/projects/6d3dfe4d-7166-4f6c-9597-fa2325c7c5fa

## Key Features

- **Terminal Interface**: Authentic terminal-like experience with command-line interactions.
- **Scratch Viewer**: Interactive viewer that allows users to compare original handwritten notes with their digitally parsed text.
- **Opacity Slider**: Users can adjust the visibility between the original image and the parsed text.
- **Responsive Design**: Works across various device sizes.

## Technologies Used

This project is built with modern web technologies:

- **React**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Vite**: As the frontend build tool
- **Tailwind CSS**: For styling components
- **shadcn/ui**: For UI components

## Project Structure

- `/src/components`: React components including the Terminal and ScratchViewer
- `/src/data`: Contains the log data that powers the application
- `/src/pages`: Page components for routing
- `/public`: Static assets including the scanned notebook images

## Commands

The terminal interface supports various commands that users can try:

- Try typing `help` to see available commands
- Use `view [ID]` to open the Scratch Viewer for a specific log
- Use `list` to see all available logs

## How to Use

### Using Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/6d3dfe4d-7166-4f6c-9597-fa2325c7c5fa) and start interacting with the terminal interface.

### Local Development

If you want to work locally using your own IDE, follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Deployment

To deploy this project, use the Lovable platform:

1. Open [Lovable](https://lovable.dev/projects/6d3dfe4d-7166-4f6c-9597-fa2325c7c5fa)
2. Click on Share -> Publish

## Custom Domain

Yes, you can connect a custom domain to your Lovable project!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
