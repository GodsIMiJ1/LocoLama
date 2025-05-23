# Advanced Features Guide

LocoLama includes several advanced features that enhance your local AI chat experience. This guide explains these features in detail and how to use them effectively.

## Table of Contents

- [GPU Monitoring](#gpu-monitoring)
- [Conversation Management](#conversation-management)
- [Streaming Mode](#streaming-mode)
- [Model Configuration](#model-configuration)
- [Theme Customization](#theme-customization)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Data Export and Backup](#data-export-and-backup)

## GPU Monitoring

LocoLama includes a built-in GPU monitoring system that helps you track resource usage while running AI models.

### How to Use the GPU Monitor

1. The GPU monitor is displayed in the top-right corner of the interface
2. Click on the monitor to expand detailed statistics
3. The monitor shows:
   - CPU usage
   - Memory usage
   - GPU usage (if available)
   - GPU memory usage (if available)
   - Ollama running status

### Understanding the Metrics

- **Green bars** (0-30%): Low resource usage
- **Yellow bars** (30-70%): Moderate resource usage
- **Red bars** (70-100%): High resource usage

### Optimizing Performance

If you notice consistently high resource usage:

- Try using smaller models (7B instead of 13B)
- Reduce the number of concurrent conversations
- Close other resource-intensive applications
- Consider upgrading your hardware for better performance

## Conversation Management

LocoLama provides tools to manage your conversations effectively.

### Conversation Sidebar

1. Click the menu icon in the top-left corner to open the conversation sidebar
2. The sidebar shows all your saved conversations
3. Click on any conversation to load it
4. Use the search bar to find specific conversations

### Creating and Deleting Conversations

- Click "New Chat" to start a fresh conversation
- Each conversation is automatically saved to your browser's localStorage
- To delete a conversation, click the trash icon next to it in the sidebar
- Deleted conversations cannot be recovered

### Conversation Export

To export your conversations:

1. Open the conversation sidebar
2. Click "Export All" at the bottom
3. A JSON file containing all your conversations will be downloaded
4. This file can be used for backup or transferring conversations to another device

## Streaming Mode

LocoLama supports two modes of text generation: streaming and complete.

### Streaming Mode

In streaming mode:

1. The AI's response appears word-by-word in real-time
2. You can see the model's thinking process as it happens
3. Toggle streaming mode using the switch at the bottom of the interface

### Benefits of Streaming

- More interactive experience
- Faster perceived response time
- Ability to stop generation early if needed

For more details, see the [Streaming vs. Complete Generation](./streaming-vs-complete.md) guide.

## Model Configuration

LocoLama allows you to configure various aspects of the AI models.

### Selecting Models

1. Use the model dropdown in the top-right corner
2. All models available in your Ollama installation will be listed
3. Select any model to switch the current conversation to that model

### Advanced Model Options

Click "Advanced Options" under the model selector to access:

1. **Model Size**: Choose between 7B (faster) and 13B (more capable) versions
   - 7B models are faster and use less resources
   - 13B models generally produce better quality responses but require more GPU memory

2. **Temperature**: Adjust from 0.0 to 1.0
   - Lower values (0.0-0.3): More deterministic, focused responses
   - Medium values (0.4-0.7): Balanced creativity and coherence
   - Higher values (0.8-1.0): More creative, varied responses

### Model Compatibility

Not all models support all sizes. Common compatible models include:

- llama2 (7B, 13B)
- mistral (7B)
- codellama (7B, 13B)

## Theme Customization

LocoLama supports both light and dark themes.

### Switching Themes

1. Click the sun/moon icon in the top-right corner to toggle between light and dark mode
2. Your preference is saved and will be remembered when you return

### Theme Variables

LocoLama uses CSS variables for theming, which can be customized in the source code:

- `--background`: Main background color
- `--cardBackground`: Background for cards and panels
- `--primaryText`: Main text color
- `--secondaryText`: Secondary text color
- `--tertiaryText`: Subtle text color
- `--primary`: Primary accent color
- `--border`: Border color
- `--shadow`, `--shadowMedium`, `--shadowLarge`: Shadow levels

## Keyboard Shortcuts

LocoLama supports several keyboard shortcuts for efficient usage:

- `Enter`: Send message
- `Shift + Enter`: Add a new line in the input field
- `Esc`: Close the sidebar if open
- `Ctrl/Cmd + N`: Start a new chat

## Data Export and Backup

All conversations in LocoLama are stored in your browser's localStorage.

### Exporting Data

1. Open the conversation sidebar
2. Click "Export All" at the bottom
3. A JSON file with all conversations will be downloaded

### Importing Data (Manual)

Currently, LocoLama doesn't have a direct import feature, but you can manually import data:

1. Open your browser's Developer Tools (F12 or Right-click > Inspect)
2. Go to the "Application" or "Storage" tab
3. Find "localStorage" and the LocoLama domain
4. You can manually edit the values to import conversations

### Clearing Data

To clear all LocoLama data from your browser:

1. Open your browser's settings
2. Go to Privacy & Security > Clear browsing data
3. Select "Cookies and site data"
4. Specify the LocoLama domain
5. Click "Clear data"

**Note**: This will delete all your conversations and settings.
