# LocoLama Installation Guide

This guide provides detailed instructions for installing and setting up LocoLama on different operating systems.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux](#linux)
- [Verifying Installation](#verifying-installation)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Prerequisites

Before installing LocoLama, ensure you have the following:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Ollama**: Latest version installed and running
- **Git**: For cloning the repository
- **A modern web browser**: Chrome, Firefox, Safari, or Edge

## Installation Steps

### Windows

1. **Install Node.js and npm**:
   - Download the installer from [Node.js official website](https://nodejs.org/)
   - Run the installer and follow the prompts
   - Verify installation by opening Command Prompt and running:
     ```
     node --version
     npm --version
     ```

2. **Install Git**:
   - Download Git from [git-scm.com](https://git-scm.com/download/win)
   - Run the installer with default options
   - Verify installation by running:
     ```
     git --version
     ```

3. **Install Ollama**:
   - Follow the [Ollama Setup Guide](./ollama-setup.md) for Windows

4. **Clone and Set Up LocoLama**:
   - Open Command Prompt
   - Navigate to your desired installation directory:
     ```
     cd C:\path\to\your\projects
     ```
   - Clone the repository:
     ```
     git clone https://github.com/GodsIMiJ1/LocoLama.git
     cd LocoLama
     ```
   - Install dependencies:
     ```
     npm install
     ```

5. **Start LocoLama**:
   ```
   npm run dev
   ```
   - Open your browser and navigate to [http://localhost:3030](http://localhost:3030)

### macOS

1. **Install Node.js and npm**:
   - Option 1: Download the installer from [Node.js official website](https://nodejs.org/)
   - Option 2: Use Homebrew:
     ```
     brew install node
     ```
   - Verify installation:
     ```
     node --version
     npm --version
     ```

2. **Install Git** (if not already installed):
   - macOS may already have Git installed. Check with:
     ```
     git --version
     ```
   - If not installed, use Homebrew:
     ```
     brew install git
     ```

3. **Install Ollama**:
   - Follow the [Ollama Setup Guide](./ollama-setup.md) for macOS

4. **Clone and Set Up LocoLama**:
   - Open Terminal
   - Navigate to your desired installation directory:
     ```
     cd ~/Documents/projects
     ```
   - Clone the repository:
     ```
     git clone https://github.com/GodsIMiJ1/LocoLama.git
     cd LocoLama
     ```
   - Install dependencies:
     ```
     npm install
     ```

5. **Start LocoLama**:
   ```
   npm run dev
   ```
   - Open your browser and navigate to [http://localhost:3030](http://localhost:3030)

### Linux

1. **Install Node.js and npm**:
   - Using apt (Ubuntu/Debian):
     ```
     sudo apt update
     sudo apt install nodejs npm
     ```
   - Using dnf (Fedora):
     ```
     sudo dnf install nodejs
     ```
   - Verify installation:
     ```
     node --version
     npm --version
     ```

2. **Install Git** (if not already installed):
   - Using apt:
     ```
     sudo apt install git
     ```
   - Using dnf:
     ```
     sudo dnf install git
     ```

3. **Install Ollama**:
   - Follow the [Ollama Setup Guide](./ollama-setup.md) for Linux

4. **Clone and Set Up LocoLama**:
   - Open Terminal
   - Navigate to your desired installation directory:
     ```
     cd ~/projects
     ```
   - Clone the repository:
     ```
     git clone https://github.com/GodsIMiJ1/LocoLama.git
     cd LocoLama
     ```
   - Install dependencies:
     ```
     npm install
     ```

5. **Start LocoLama**:
   ```
   npm run dev
   ```
   - Open your browser and navigate to [http://localhost:3030](http://localhost:3030)

## Verifying Installation

To verify that LocoLama is installed and running correctly:

1. Ensure Ollama is running in the background
2. Navigate to [http://localhost:3030](http://localhost:3030) in your browser
3. You should see the LocoLama interface with the FlameOS logo
4. The System Status indicator should show "Ollama is running"
5. Try selecting a model and sending a test message

## Troubleshooting

### Common Issues

1. **"Cannot connect to Ollama" error**:
   - Ensure Ollama is running
   - Check if Ollama is running on the default port (11434)
   - Restart Ollama and try again

2. **"npm install" fails**:
   - Ensure you have the latest version of npm:
     ```
     npm install -g npm@latest
     ```
   - Clear npm cache:
     ```
     npm cache clean --force
     ```
   - Try installing again

3. **Application doesn't start**:
   - Check if port 3030 is already in use
   - Try changing the port in package.json if needed
   - Check console for error messages

4. **Models not showing up**:
   - Ensure you've pulled at least one model in Ollama
   - Restart Ollama and refresh LocoLama

## Next Steps

After successful installation:

1. [Pull some models in Ollama](./ollama-setup.md#pulling-models)
2. [Learn how to use the chat interface](./local-chat-ui.md)
3. [Understand streaming vs. complete generation](./streaming-vs-complete.md)

For more advanced usage, check out the [Advanced Features Guide](./advanced-features.md).
