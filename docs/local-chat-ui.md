# Local Chat UI Guide

This guide explains how to use LocoLama's chat interface, model selection, and local storage features.

## Chat Interface

LocoLama provides a simple and intuitive chat interface:

1. **Message Input**: Type your message in the input field at the bottom of the screen
2. **Send Button**: Click the send button or press Enter to send your message
3. **Chat Window**: Your conversation with the AI appears in the main window
4. **Model Selector**: Choose which local LLM to use from the dropdown in the top-right corner

## Model Selection

LocoLama automatically detects which models you have installed in Ollama and makes them available in the model selector dropdown.

To change models:

1. Click the dropdown in the top-right corner
2. Select the model you want to use
3. Your next message will be processed using the selected model

If a model you want to use isn't listed, you'll need to install it using Ollama:

```bash
ollama pull <model-name>
```

Then refresh LocoLama to see the new model in the dropdown.

## Local Storage

LocoLama automatically saves your chat history to your browser's localStorage. This means:

- Your conversations persist even if you close the browser or refresh the page
- No data is sent to external servers
- Your chat history is limited to the storage capacity of your browser (typically 5-10MB)

### Limitations of Local Storage

- Local storage is browser-specific, so your chats won't sync across different browsers or devices
- If you clear your browser data, your chat history will be deleted
- There's a size limit to localStorage (typically 5-10MB), so very long chat histories may eventually be truncated

## Privacy Features

LocoLama is designed with privacy in mind:

- All processing happens locally on your device
- No data is sent to external servers (except to download the web application itself)
- Your conversations are stored only in your browser's localStorage
- You can clear your chat history at any time by clearing your browser's localStorage

## Keyboard Shortcuts

- **Enter**: Send a message
- **Shift+Enter**: Add a new line in the message input

## Next Steps

To learn more about the different generation modes available in LocoLama, check out the [Streaming vs. Complete Generation](./streaming-vs-complete.md) guide.
