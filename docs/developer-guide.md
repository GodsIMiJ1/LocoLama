# Developer Guide

This guide is intended for developers who want to understand, modify, or contribute to the LocoLama project.

## Table of Contents

- [Project Architecture](#project-architecture)
- [Development Environment Setup](#development-environment-setup)
- [Code Structure](#code-structure)
- [Key Components](#key-components)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Theme System](#theme-system)
- [Testing](#testing)
- [Contributing Guidelines](#contributing-guidelines)

## Project Architecture

LocoLama is built using Next.js, a React framework that enables server-side rendering and generating static websites. The application follows a component-based architecture with the following high-level structure:

```
LocoLama/
├── app/                  # Next.js app directory (pages, layouts, routes)
├── components/           # React components
├── lib/                  # Utility libraries and API clients
├── public/               # Static assets
└── utils/                # Helper functions
```

### Key Technologies

- **Next.js**: React framework for the frontend
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling
- **localStorage API**: For client-side data persistence
- **Ollama API**: For interacting with local LLMs

## Development Environment Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Git
- Ollama installed and running

### Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/GodsIMiJ1/LocoLama.git
   cd LocoLama
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3030](http://localhost:3030) in your browser

### Development Tools

We recommend using the following tools:

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Hero

- **Browser DevTools** for debugging
  - React Developer Tools extension
  - Application tab for inspecting localStorage

## Code Structure

### Directory Structure Explained

- **`app/`**: Contains Next.js pages and API routes
  - `page.tsx`: Main chat interface
  - `layout.tsx`: Root layout with theme provider
  - `api/`: API route handlers

- **`components/`**: Reusable React components
  - UI components (ChatWindow, MessageBubble, etc.)
  - Functional components (ModelSelector, GPUMonitor, etc.)
  - Layout components (ConversationSidebar, etc.)

- **`lib/`**: Libraries and clients
  - `ollamaClient.ts`: Client for Ollama API

- **`utils/`**: Helper functions
  - `storage.ts`: LocalStorage utilities
  - `theme.ts`: Theme utilities

- **`public/`**: Static assets
  - Images, icons, and other static files

## Key Components

### ChatWindow

The main component that displays the chat interface. It handles:
- Rendering messages
- Displaying the welcome screen
- Managing the chat scroll position

```typescript
// components/ChatWindow.tsx
export default function ChatWindow({
  messages,
  isLoading,
  isStreaming,
  streamingUserMessage,
  model,
  onStreamingComplete
}: ChatWindowProps) {
  // Component implementation
}
```

### ConversationSidebar

Manages the list of conversations and provides functionality to:
- Select conversations
- Create new conversations
- Delete conversations
- Search through conversations

### ModelSelector

Allows users to select and configure LLM models:
- Choose from available models
- Set model size (7B, 13B)
- Adjust temperature

### GPUMonitor

Displays system resource usage:
- CPU usage
- Memory usage
- GPU usage (if available)
- Ollama running status

### StreamingMessage

Handles streaming responses from the LLM:
- Connects to the streaming API
- Renders tokens as they arrive
- Manages the streaming state

## API Integration

### Ollama Client

The `ollamaClient.ts` file contains functions for interacting with the Ollama API:

```typescript
// lib/ollamaClient.ts
export async function getModels(): Promise<string[]> {
  // Implementation
}

export async function generateCompletion(
  prompt: string,
  model: string
): Promise<string> {
  // Implementation
}
```

### API Routes

The application uses Next.js API routes to proxy requests to Ollama:

- `app/api/chat/route.ts`: Handles chat completions
- `app/api/system-stats/route.ts`: Fetches system resource usage

## State Management

LocoLama uses React's built-in state management with hooks:

- **`useState`**: For component-level state
- **`useEffect`**: For side effects like API calls
- **`useContext`**: For theme state

### Chat State

The main chat state is managed in `app/page.tsx` and includes:

- Current chat ID
- Messages in the current chat
- Loading and streaming states
- Input field value

### Persistence

Chat data is persisted in localStorage using utility functions in `utils/storage.ts`:

```typescript
// utils/storage.ts
export function saveChat(chat: Chat): void {
  // Implementation
}

export function getChats(): Chat[] {
  // Implementation
}
```

## Theme System

LocoLama supports light and dark themes using:

- CSS variables for theme colors
- React context for theme state
- localStorage for persisting theme preference

### Theme Provider

The `ThemeProvider` component in `components/ThemeProvider.tsx` manages the theme state and provides it to all components.

### CSS Variables

Theme colors are defined as CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #ffffff;
  --cardBackground: #ffffff;
  --primaryText: #1a1a1a;
  /* Other variables */
}

[data-theme='dark'] {
  --background: #121212;
  --cardBackground: #1e1e1e;
  --primaryText: #ffffff;
  /* Other variables */
}
```

## Testing

### Manual Testing

For manual testing:

1. Ensure Ollama is running with at least one model
2. Start the development server
3. Test all features:
   - Chat functionality
   - Model selection
   - Streaming mode
   - Conversation management
   - Theme switching

### Automated Testing

Future versions will include:

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Cypress

## Contributing Guidelines

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Use functional components with hooks
- Follow the Airbnb React/JSX Style Guide

### Commit Messages

Use conventional commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure code quality and test your changes
5. Submit a pull request with a clear description

### Development Workflow

1. Pick an issue or create one
2. Discuss the approach if needed
3. Implement the feature or fix
4. Test thoroughly
5. Submit a pull request
6. Address review feedback

## License

All contributions must comply with the Flame Public Use License v1.0.
