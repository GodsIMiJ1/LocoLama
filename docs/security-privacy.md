# Security and Privacy Guide

LocoLama is designed with privacy and security as core principles. This guide explains the security model, privacy features, and best practices for using LocoLama securely.

## Table of Contents

- [Privacy Architecture](#privacy-architecture)
- [Data Storage](#data-storage)
- [Network Security](#network-security)
- [Model Security](#model-security)
- [Best Practices](#best-practices)
- [Security FAQ](#security-faq)
- [Privacy Policy](#privacy-policy)

## Privacy Architecture

### Local-First Design

LocoLama is built on a local-first architecture, which means:

1. **No Remote Servers**: All processing happens on your device
2. **No Data Collection**: Your conversations never leave your machine
3. **No Account Required**: No login, no user tracking
4. **No Telemetry**: No usage statistics are collected

### Data Flow

Here's how data flows through LocoLama:

1. You type a message in the LocoLama interface
2. The message is sent to the local Ollama instance running on your machine
3. Ollama processes the message using the selected LLM
4. The response is returned to LocoLama and displayed
5. The conversation is saved to your browser's localStorage

At no point does your data travel over the internet or to any external servers.

## Data Storage

### Local Storage

LocoLama stores all data in your browser's localStorage, which means:

- Data is stored only on your device
- Data persists between sessions
- Data is isolated to your browser profile
- Data can be cleared through browser settings

### What's Stored

The following data is stored in localStorage:

1. **Chat History**: All messages in all conversations
2. **Model Preferences**: Your selected models and settings
3. **UI Preferences**: Theme selection and UI state
4. **System Settings**: Streaming mode toggle state

### Data Retention

Data is retained until you:

1. Manually delete conversations
2. Clear your browser's localStorage
3. Clear site data for the LocoLama domain

### Data Export

You can export your data at any time:

1. Open the conversation sidebar
2. Click "Export All" at the bottom
3. A JSON file with all your conversations will be downloaded

This file is not encrypted, so handle it according to the sensitivity of your conversations.

## Network Security

### Local Network Only

LocoLama communicates only with the local Ollama instance:

- All API calls are to `localhost` or `127.0.0.1`
- No external API calls are made
- No data is sent over the internet

### API Security

Communication with Ollama happens over HTTP:

- Ollama runs on port 11434 by default
- LocoLama connects to Ollama via Next.js API routes
- All communication stays within your device

### CORS and CSP

LocoLama implements security headers:

- Content Security Policy (CSP) to prevent XSS attacks
- CORS headers to restrict API access
- Referrer Policy to control information leakage

## Model Security

### Model Isolation

Ollama runs models in an isolated environment:

- Models don't have access to your file system
- Models can't execute code on your machine
- Models are limited to the conversation context

### Model Verification

When pulling models with Ollama:

- Model checksums are verified
- Models are downloaded from trusted sources
- You can inspect model details with `ollama show modelname`

## Best Practices

### Secure Usage Guidelines

For maximum security when using LocoLama:

1. **Keep Ollama Updated**: Always use the latest version of Ollama
2. **Verify Models**: Use official models from trusted sources
3. **Sensitive Data**: Avoid sharing highly sensitive information with any AI model
4. **Regular Exports**: Export your data regularly if you want to preserve it
5. **Clear Data**: Periodically clear old conversations you no longer need

### Browser Security

To enhance browser security:

1. **Use a Modern Browser**: Keep your browser updated
2. **Private Browsing**: Consider using private/incognito mode if sharing a device
3. **Extensions**: Be cautious of browser extensions that might access localStorage
4. **Clear Data**: Learn how to clear site data for specific domains

### System Security

For overall system security:

1. **Firewall**: Ensure your firewall is active
2. **Updates**: Keep your operating system updated
3. **Antivirus**: Use reputable antivirus software
4. **User Accounts**: Use a separate user account for sensitive work

## Security FAQ

### Is LocoLama 100% Private?

**Yes**. LocoLama processes all data locally and doesn't send any information to external servers. Your conversations stay on your device.

### Can Others See My Conversations?

**No**, unless:
- They have physical access to your device
- They can access your browser profile
- You export conversations and share the file

### Does LocoLama Collect Any Data?

**No**. LocoLama doesn't collect any telemetry, analytics, or user data.

### Are My Conversations Encrypted?

**Locally**: Conversations are stored in localStorage, which has the same security level as your browser profile.

**Exports**: Exported conversation files are not encrypted by default. If sharing these files, consider encrypting them.

### Can I Use LocoLama for Sensitive Information?

While LocoLama is designed for privacy, we recommend:
- Not sharing highly sensitive personal information (SSNs, financial details, etc.)
- Not sharing confidential business information
- Using common sense about what you'd want stored in your browser

### What Happens If Someone Gets Access to My Computer?

If someone gains access to your computer and browser profile, they could potentially:
- View your LocoLama conversations
- Export your conversation data
- Delete your conversations

This is true for any locally stored browser data.

## Privacy Policy

### Data Collection

LocoLama does not collect, transmit, or store any user data on remote servers. All data is stored locally on your device using browser localStorage.

### Third-Party Services

LocoLama does not use any third-party services, analytics, or tracking tools.

### Changes to Privacy Policy

Any changes to this privacy policy will be documented in the project repository.

### Contact

For privacy-related questions, please open an issue on the GitHub repository.
