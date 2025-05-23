# Ollama Setup Guide

This guide will help you install and set up Ollama, which is required to run LocoLama.

## What is Ollama?

[Ollama](https://ollama.ai/) is an open-source tool that lets you run large language models (LLMs) locally on your machine. It provides a simple API for interacting with these models, which LocoLama uses to power its chat interface.

## Installation

### macOS

1. Download the Ollama app from [ollama.ai](https://ollama.ai/)
2. Open the downloaded file and drag Ollama to your Applications folder
3. Launch Ollama from your Applications folder

### Linux

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

After installation, start the Ollama service:

```bash
ollama serve
```

### Windows

1. Download the Ollama installer from [ollama.ai](https://ollama.ai/)
2. Run the installer and follow the prompts
3. Launch Ollama from the Start menu

## Installing Models

Ollama needs to download the LLM models you want to use. You can do this through the command line:

```bash
# Install the Llama 2 model (7B parameters)
ollama pull llama2

# Install the Mistral model
ollama pull mistral

# Install the CodeLlama model
ollama pull codellama
```

You can also install models through LocoLama's interface, which will prompt you to install a model if it's not already available.

## Verifying Installation

To verify that Ollama is running correctly, you can run:

```bash
ollama list
```

This should show you a list of installed models.

## Troubleshooting

### Ollama Not Running

If LocoLama can't connect to Ollama, make sure the Ollama service is running:

```bash
# Check if Ollama is running
ps aux | grep ollama

# Start Ollama if it's not running
ollama serve
```

### Model Not Found

If you select a model in LocoLama but get an error that the model is not found, you need to install it:

```bash
ollama pull <model-name>
```

Replace `<model-name>` with the name of the model you want to use (e.g., `llama2`, `mistral`).

### Performance Issues

LLMs can be resource-intensive. If you're experiencing slow responses:

1. Try using a smaller model (e.g., `llama2` instead of `llama2:13b`)
2. Close other resource-intensive applications
3. Make sure your computer meets the minimum requirements for running LLMs locally

## Next Steps

Once you have Ollama set up and running with at least one model, you're ready to use LocoLama! Check out the [Local Chat UI Guide](./local-chat-ui.md) to learn how to use the chat interface.
