# LocoLama Documentation

Welcome to the LocoLama documentation! LocoLama is a local-first AI chat interface that uses Ollama to run LLM models directly on your device.

## What is LocoLama?

LocoLama is a web application that provides a user-friendly interface for interacting with large language models (LLMs) running locally on your machine through Ollama. It's designed to be:

- **100% Local**: All processing happens on your device, with no data sent to external servers
- **Privacy-Focused**: Your conversations stay on your machine
- **Flexible**: Works with various models supported by Ollama (LLaMA2, Mistral, CodeLLama, etc.)
- **Persistent**: Saves your chat history in your browser's localStorage

## Getting Started

To use LocoLama, you'll need to:

1. [Install and set up Ollama](./ollama-setup.md) on your machine
2. Start the LocoLama application
3. Select a model and start chatting!

## Documentation Sections

- [Ollama Setup Guide](./ollama-setup.md) - How to install and run Ollama with models
- [Local Chat UI Guide](./local-chat-ui.md) - How to use the chat interface
- [Streaming vs. Complete Generation](./streaming-vs-complete.md) - Details on different generation modes

## Technical Details

LocoLama is built with:

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Local API routes that proxy requests to Ollama
- **Storage**: Browser's localStorage for chat persistence
- **Runtime**: Ollama for running LLM models locally

## License

LocoLama is licensed under the Flame Public Use License v1.0. See the [LICENSE.md](../LICENSE.md) file for details.
