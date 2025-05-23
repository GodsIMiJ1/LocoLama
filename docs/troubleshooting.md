# Troubleshooting Guide

This guide helps you diagnose and resolve common issues you might encounter when using LocoLama.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Connection Problems](#connection-problems)
- [Model Issues](#model-issues)
- [Performance Problems](#performance-problems)
- [UI and Display Issues](#ui-and-display-issues)
- [Data and Storage Issues](#data-and-storage-issues)
- [Common Error Messages](#common-error-messages)
- [Getting Help](#getting-help)

## Installation Issues

### Node.js Errors During Installation

**Problem**: Errors when running `npm install` related to Node.js version.

**Solution**:
1. Ensure you have Node.js v18.0.0 or higher installed:
   ```bash
   node --version
   ```
2. If needed, update Node.js from [nodejs.org](https://nodejs.org/)
3. Clear npm cache and try again:
   ```bash
   npm cache clean --force
   npm install
   ```

### Port Already in Use

**Problem**: Error message about port 3030 already being in use.

**Solution**:
1. Find and close the application using port 3030, or
2. Change the port in `package.json`:
   ```json
   "dev": "next dev -p 3031 --turbopack",
   "start": "next start -p 3031",
   ```

### Build Errors

**Problem**: Errors when running `npm run build`.

**Solution**:
1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```
2. Check for TypeScript errors:
   ```bash
   npm run lint
   ```
3. Clear Next.js cache:
   ```bash
   rm -rf .next
   ```
4. Try building again

## Connection Problems

### Cannot Connect to Ollama

**Problem**: "Could not connect to Ollama" error message.

**Solution**:
1. Verify Ollama is running:
   ```bash
   # On macOS/Linux
   ps aux | grep ollama
   
   # On Windows
   tasklist | findstr ollama
   ```
2. Start Ollama if it's not running
3. Check if Ollama is running on the default port (11434)
4. Ensure no firewall is blocking the connection
5. Restart Ollama and LocoLama

### API Connection Errors

**Problem**: Errors in the console about API connection failures.

**Solution**:
1. Check browser console (F12) for specific error messages
2. Verify Ollama API is responding:
   ```bash
   curl http://localhost:11434/api/tags
   ```
3. Restart Ollama service
4. Check if another application is using port 11434

## Model Issues

### Models Not Appearing

**Problem**: No models show up in the model selector dropdown.

**Solution**:
1. Verify you have models installed in Ollama:
   ```bash
   ollama list
   ```
2. If no models are installed, pull one:
   ```bash
   ollama pull llama2
   ```
3. Restart Ollama and refresh LocoLama

### Model Loading Errors

**Problem**: Error when selecting a model or "Failed to load model" message.

**Solution**:
1. Check if the model is properly installed:
   ```bash
   ollama show modelname
   ```
2. Try re-pulling the model:
   ```bash
   ollama pull modelname --force
   ```
3. Check system resources (RAM/GPU memory) to ensure you have enough for the model
4. Try a smaller model or quantized version

### Poor Quality Responses

**Problem**: Model generates gibberish or low-quality responses.

**Solution**:
1. Try adjusting the temperature (lower for more focused responses)
2. Use a larger model if your hardware supports it
3. Try a different model that might be better suited for your task
4. Re-pull the model in case it's corrupted:
   ```bash
   ollama pull modelname --force
   ```

## Performance Problems

### Slow Response Times

**Problem**: Model takes a very long time to generate responses.

**Solution**:
1. Check if the model is running on GPU or CPU:
   - Look at the GPU monitor in LocoLama
   - Check system resource usage
2. Try a smaller model (7B instead of 13B)
3. Use a quantized model version (e.g., q4_0)
4. Close other resource-intensive applications
5. Enable streaming mode for better perceived performance

### High Resource Usage

**Problem**: System becomes slow or unresponsive when using LocoLama.

**Solution**:
1. Monitor resource usage with the GPU monitor
2. Try a smaller model or quantized version
3. Reduce the context length if possible
4. Close other applications to free up resources
5. Consider hardware upgrades if you frequently use larger models

### Browser Freezing

**Problem**: Browser becomes unresponsive when generating long responses.

**Solution**:
1. Enable streaming mode for more efficient processing
2. Limit the length of your prompts
3. Try a different browser
4. Update your browser to the latest version
5. Disable browser extensions that might interfere

## UI and Display Issues

### Display Rendering Problems

**Problem**: UI elements appear broken or misaligned.

**Solution**:
1. Try refreshing the page
2. Clear browser cache and reload
3. Try a different browser
4. Ensure you're using a supported browser (Chrome, Firefox, Safari, Edge)
5. Check if any browser extensions might be interfering

### Theme Issues

**Problem**: Dark/light theme not working properly or showing incorrect colors.

**Solution**:
1. Toggle the theme button multiple times
2. Refresh the page
3. Clear browser cache and local storage:
   - Open DevTools (F12)
   - Go to Application > Storage > Clear Site Data
4. Check if your browser or OS has forced dark/light mode settings

### Responsive Design Issues

**Problem**: UI doesn't display properly on mobile or different screen sizes.

**Solution**:
1. Ensure you're using the latest version of LocoLama
2. Try zooming in/out to adjust the view
3. Rotate your device if on mobile
4. Report specific responsive design issues on GitHub

## Data and Storage Issues

### Lost Conversations

**Problem**: Previously saved conversations are missing.

**Solution**:
1. Check if you're using the same browser and profile
2. Verify localStorage hasn't been cleared:
   - Open DevTools (F12)
   - Go to Application > Storage > Local Storage
   - Look for LocoLama data
3. If you have a backup (exported JSON), you can try manually importing it

### Storage Full Errors

**Problem**: Errors about localStorage being full.

**Solution**:
1. Delete old or unnecessary conversations
2. Export conversations as backup, then delete some
3. Clear other site data to free up localStorage space
4. In some browsers, you can increase localStorage quota in settings

### Export/Import Issues

**Problem**: Cannot export conversations or exported file is corrupted.

**Solution**:
1. Try exporting again
2. Check if your browser is blocking downloads
3. Ensure you have sufficient disk space
4. Try a different browser for exporting

## Common Error Messages

### "Failed to fetch"

**Cause**: Connection to Ollama API failed.

**Solution**:
1. Ensure Ollama is running
2. Check network connection
3. Verify no firewall is blocking the connection
4. Restart Ollama and refresh LocoLama

### "Model not found"

**Cause**: The selected model is not installed in Ollama.

**Solution**:
1. Install the model:
   ```bash
   ollama pull modelname
   ```
2. Check for typos in the model name
3. Verify the model exists in Ollama's library

### "Out of memory"

**Cause**: Not enough RAM or VRAM to run the selected model.

**Solution**:
1. Try a smaller model
2. Use a quantized version
3. Close other applications
4. Reduce context length
5. Upgrade hardware if possible

## Getting Help

If you've tried the solutions in this guide and still have issues:

1. **Check GitHub Issues**: Search existing issues to see if your problem has been reported
2. **Create a New Issue**: If your problem is new, create a detailed issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - System information (OS, browser, hardware)
   - Screenshots if applicable
   - Console logs if available

3. **Community Support**: Look for community discussions on:
   - GitHub Discussions
   - Ollama community channels
   - Related AI/ML forums

Remember to provide as much detail as possible when seeking help, as this makes it easier for others to assist you.
