# Frequently Asked Questions (FAQ)

This document answers common questions about LocoLama, its features, and how to use it effectively.

## Table of Contents

- [General Questions](#general-questions)
- [Installation and Setup](#installation-and-setup)
- [Using LocoLama](#using-locolama)
- [Models and Performance](#models-and-performance)
- [Privacy and Security](#privacy-and-security)
- [Troubleshooting](#troubleshooting)
- [Development and Contributing](#development-and-contributing)
- [Comparison with Other Tools](#comparison-with-other-tools)

## General Questions

### What is LocoLama?

LocoLama is a web-based chat interface for interacting with large language models (LLMs) running locally on your machine through Ollama. It provides a user-friendly way to chat with AI models without sending your data to external servers.

### Why use LocoLama instead of cloud-based AI chat services?

LocoLama offers several advantages over cloud-based alternatives:
- **Privacy**: Your conversations never leave your device
- **No cost**: No subscription fees or API costs
- **Full control**: You decide which models to use and how to configure them
- **No internet required**: Works offline once set up
- **No rate limits**: Use it as much as you want

### Is LocoLama free to use?

Yes, LocoLama is completely free and open-source under the Flame Public Use License v1.0. There are no subscription fees, usage limits, or hidden costs.

### What models can I use with LocoLama?

LocoLama works with any model supported by Ollama, including:
- LLaMA 2 (various sizes and variants)
- Mistral
- CodeLlama
- Phi-2
- Vicuna
- And many others

### Do I need an internet connection to use LocoLama?

You need an internet connection to:
1. Initially download and install LocoLama
2. Download models through Ollama (one-time per model)

After that, LocoLama can run completely offline.

## Installation and Setup

### What are the system requirements for LocoLama?

**Minimum requirements**:
- Modern multi-core CPU
- 8GB RAM
- 5GB free storage space
- Any operating system that supports Node.js and Ollama

**Recommended for better performance**:
- Modern multi-core CPU (Intel i5/AMD Ryzen 5 or better)
- 16GB+ RAM
- NVIDIA GPU with 8GB+ VRAM
- 20GB+ free storage space

### How do I install LocoLama?

Follow these steps:
1. Install Node.js (v18+) from [nodejs.org](https://nodejs.org/)
2. Install Ollama from [ollama.ai](https://ollama.ai/)
3. Clone the LocoLama repository: `git clone https://github.com/GodsIMiJ1/LocoLama.git`
4. Navigate to the directory: `cd LocoLama`
5. Install dependencies: `npm install`
6. Start the application: `npm run dev`
7. Open [http://localhost:3030](http://localhost:3030) in your browser

For detailed instructions, see the [Installation Guide](./installation-guide.md).

### Do I need to install Ollama separately?

Yes, Ollama is a separate program that handles the actual running of AI models. LocoLama is a user interface that connects to Ollama. You need to install and run Ollama before using LocoLama.

### How do I update LocoLama?

To update LocoLama to the latest version:
1. Navigate to your LocoLama directory
2. Pull the latest changes: `git pull`
3. Install any new dependencies: `npm install`
4. Restart the application: `npm run dev`

### Can I run LocoLama on mobile devices?

LocoLama's interface is responsive and works on mobile browsers, but you need Ollama running on the same network. Currently, Ollama doesn't run natively on mobile devices, so you would need to:
1. Run Ollama on a desktop/server
2. Configure it to accept network connections
3. Connect to it from your mobile device

A fully mobile solution is on our roadmap.

## Using LocoLama

### How do I start a new conversation?

Click the "New Chat" button at the bottom of the interface or in the sidebar. This will create a fresh conversation with no message history.

### How do I save my conversations?

Conversations are automatically saved to your browser's localStorage. You don't need to manually save them. They will persist even if you close the browser or restart your computer.

### Can I export my conversations?

Yes, you can export all your conversations:
1. Open the conversation sidebar (menu icon in top-left)
2. Click "Export All" at the bottom of the sidebar
3. A JSON file containing all your conversations will be downloaded

### How do I switch between different AI models?

Use the model dropdown in the top-right corner of the interface. All models available in your Ollama installation will be listed there.

### What is streaming mode?

Streaming mode shows the AI's response word-by-word as it's being generated, rather than waiting for the complete response. This provides a more interactive experience and faster perceived response time. Toggle streaming mode using the switch at the bottom of the interface.

### Can I use LocoLama for coding tasks?

Yes, LocoLama works well for coding tasks, especially when using specialized coding models like CodeLlama. The interface properly formats and displays code blocks with syntax highlighting.

### How do I clear my conversation history?

To delete a single conversation:
1. Open the conversation sidebar
2. Click the trash icon next to the conversation you want to delete

To delete all data:
1. Open your browser's settings
2. Go to Privacy & Security > Clear browsing data
3. Select "Cookies and site data"
4. Specify the LocoLama domain
5. Click "Clear data"

## Models and Performance

### Which model should I choose for general use?

For general-purpose chat, we recommend:
- **Mistral 7B**: Good balance of quality and speed, works on most hardware
- **LLaMA 2 13B Chat**: Better quality but requires more powerful hardware
- **LLaMA 2 7B Chat**: Faster alternative that works on most systems

### How do I install models in Ollama?

To install a model in Ollama, use the command line:
```bash
ollama pull modelname
```

For example:
```bash
ollama pull llama2
ollama pull mistral
ollama pull codellama
```

See the [Ollama Setup Guide](./ollama-setup.md) for more details.

### Why is the AI generating responses slowly?

Response generation speed depends on several factors:
1. **Model size**: Larger models (13B+) are slower than smaller ones (7B)
2. **Hardware**: Generation is faster with a GPU than CPU-only
3. **System load**: Other applications using resources can slow generation
4. **Prompt length**: Longer conversation history takes longer to process

To improve speed:
- Use smaller models (7B instead of 13B)
- Use quantized models (e.g., q4_0 versions)
- Close other resource-intensive applications
- Enable streaming mode for better perceived performance
- Upgrade your hardware (especially adding a compatible GPU)

### How much VRAM do I need for different models?

Approximate VRAM requirements:
- **7B models**: 8-10GB VRAM
- **13B models**: 16-20GB VRAM
- **34B models**: 32-40GB VRAM
- **70B models**: 70-80GB VRAM

Quantized models (q4_0, q4_1, etc.) require less VRAM.

### Can I run models without a GPU?

Yes, all models can run on CPU, but they will be significantly slower. For CPU-only systems:
- Stick to 7B models or smaller
- Use quantized versions (q4_0)
- Enable streaming mode
- Expect 1-5 tokens per second (vs. 20-100+ with a GPU)

### What are quantized models?

Quantization reduces the precision of the model's weights to save memory and increase speed, with some trade-off in quality. Ollama supports several quantization levels:
- **Q4_0**: Highest compression, lowest quality
- **Q4_1**: Good balance of compression and quality
- **Q5_0/Q5_1**: Less compression, better quality
- **Q8_0**: Minimal compression, highest quality

Example: `ollama pull llama2:7b-q4_0`

## Privacy and Security

### Is my conversation data private?

Yes, LocoLama is designed with privacy as a core principle:
1. All processing happens locally on your device
2. No data is sent to external servers
3. Conversations are stored only in your browser's localStorage
4. No analytics or telemetry is collected

### Where is my data stored?

Your conversations are stored in your browser's localStorage, which is:
1. Specific to your browser profile
2. Stored on your local device
3. Not synchronized to the cloud (unless you use browser sync features)
4. Accessible only to websites from the same domain

### Can LocoLama work offline?

Yes, once you have:
1. Installed LocoLama
2. Downloaded the models you want to use
3. Started the LocoLama server

You can disconnect from the internet and continue using LocoLama without any limitations.

### Is LocoLama secure?

LocoLama follows security best practices:
1. No external API calls or data transmission
2. Local-only processing
3. Proper input sanitization
4. Content Security Policy implementation

However, remember that:
1. The security of your conversations depends on the security of your device
2. Anyone with access to your browser profile can access your conversations
3. Exported conversation files are not encrypted by default

## Troubleshooting

### LocoLama can't connect to Ollama

If you see "Could not connect to Ollama" or similar errors:
1. Ensure Ollama is running (check Task Manager/Activity Monitor)
2. Restart Ollama
3. Check if Ollama is running on the default port (11434)
4. Verify no firewall is blocking the connection
5. Try restarting LocoLama

### No models appear in the dropdown

If no models appear in the model selector:
1. Verify you have models installed in Ollama:
   ```bash
   ollama list
   ```
2. If no models are installed, pull one:
   ```bash
   ollama pull llama2
   ```
3. Restart Ollama and refresh LocoLama

### The application is very slow

If LocoLama is running slowly:
1. Check system resource usage (CPU, RAM, GPU)
2. Close other resource-intensive applications
3. Try a smaller model or quantized version
4. Enable streaming mode for better perceived performance
5. Consider hardware upgrades if you frequently use larger models

### I'm getting "Out of memory" errors

If you see out of memory errors:
1. Try a smaller model (7B instead of 13B)
2. Use a quantized model version (e.g., q4_0)
3. Close other applications to free up memory
4. Reduce the context length if possible
5. Upgrade your RAM or GPU if you need larger models

## Development and Contributing

### How can I contribute to LocoLama?

We welcome contributions! You can:
1. Report bugs and suggest features on GitHub
2. Improve documentation
3. Submit pull requests for bug fixes or features
4. Help test new releases
5. Share your use cases and feedback

See the [Developer Guide](./developer-guide.md) and [Roadmap](./roadmap.md) for more information.

### What technologies does LocoLama use?

LocoLama is built with:
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **State Management**: React hooks and context
- **Storage**: Browser localStorage
- **AI Runtime**: Ollama

### Is there an API for LocoLama?

Currently, LocoLama doesn't expose its own API. It communicates with Ollama's API. If you need programmatic access to LLMs, you can:
1. Use Ollama's API directly
2. Use LocoLama's code as a reference for your implementation
3. Wait for our planned API features in future releases

## Comparison with Other Tools

### How does LocoLama compare to ChatGPT?

**LocoLama**:
- Runs 100% locally on your device
- Complete privacy with no data sharing
- Free to use with no limits
- Works offline
- Supports multiple open-source models
- Requires local hardware resources

**ChatGPT**:
- Cloud-based service
- Data sent to OpenAI servers
- Subscription cost for premium features
- Requires internet connection
- Limited to OpenAI's models
- No local hardware requirements

### How does LocoLama compare to other Ollama UIs?

LocoLama differentiates itself with:
1. Modern, clean interface with dark/light themes
2. Comprehensive conversation management
3. GPU monitoring and system stats
4. Streaming word-by-word responses
5. Advanced model configuration options
6. Responsive design for all devices
7. Extensive documentation

### Can I use LocoLama with other local AI runtimes?

Currently, LocoLama is designed specifically for Ollama. Support for other runtimes like LM Studio, LocalAI, or direct model loading may be added in future versions.
