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

### Getting Started
- [Installation Guide](./installation-guide.md) - Detailed installation instructions for all platforms
- [Ollama Setup Guide](./ollama-setup.md) - How to install and run Ollama with models
- [Local Chat UI Guide](./local-chat-ui.md) - How to use the chat interface
- [Frequently Asked Questions (FAQ)](./faq.md) - Answers to common questions

### Features and Usage
- [Advanced Features Guide](./advanced-features.md) - Detailed explanation of LocoLama's advanced features
- [Streaming vs. Complete Generation](./streaming-vs-complete.md) - Details on different generation modes
- [Model Compatibility Guide](./model-compatibility.md) - Information about compatible models and their requirements
- [Use Cases Guide](./use-cases.md) - Practical applications and workflows for LocoLama

### Optimization and Troubleshooting
- [Performance Optimization Guide](./performance-optimization.md) - Tips for maximizing performance
- [Troubleshooting Guide](./troubleshooting.md) - Solutions for common issues
- [Security and Privacy Guide](./security-privacy.md) - Information about LocoLama's privacy features

### Advanced Topics
- [Prompt Engineering Guide](./prompt-engineering.md) - Techniques for crafting effective prompts
- [Developer Guide](./developer-guide.md) - Information for developers who want to contribute
- [Roadmap](./roadmap.md) - Future development plans and contribution opportunities

## Technical Details

LocoLama is built with:

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Local API routes that proxy requests to Ollama
- **Storage**: Browser's localStorage for chat persistence
- **Runtime**: Ollama for running LLM models locally

## License

LocoLama is licensed under the Flame Public Use License v1.0. See the [LICENSE.md](../LICENSE.md) file for details.
