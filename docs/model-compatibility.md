# Model Compatibility and Performance Guide

This guide provides detailed information about the various AI models compatible with LocoLama, their performance characteristics, and hardware requirements.

## Table of Contents

- [Supported Models](#supported-models)
- [Model Size Comparison](#model-size-comparison)
- [Hardware Requirements](#hardware-requirements)
- [Performance Optimization](#performance-optimization)
- [Model-Specific Tips](#model-specific-tips)
- [Troubleshooting Model Issues](#troubleshooting-model-issues)

## Supported Models

LocoLama works with any model supported by Ollama. Here are the most common models and their characteristics:

### LLaMA 2

- **Sizes**: 7B, 13B, 70B
- **Variants**: 
  - `llama2`: Base model
  - `llama2-uncensored`: Less filtered version
  - `llama2-chat`: Optimized for conversation
- **Strengths**: General knowledge, reasoning, instruction following
- **Limitations**: Knowledge cutoff in training data

### Mistral

- **Sizes**: 7B
- **Variants**:
  - `mistral`: Base model
  - `mistral-openorca`: Fine-tuned on diverse data
- **Strengths**: Strong performance despite smaller size, good instruction following
- **Limitations**: Fewer parameter sizes available

### CodeLlama

- **Sizes**: 7B, 13B, 34B
- **Variants**:
  - `codellama`: Base code model
  - `codellama-python`: Optimized for Python
  - `codellama-instruct`: Better at following coding instructions
- **Strengths**: Code generation, understanding technical concepts
- **Limitations**: Less strong on general knowledge topics

### Other Compatible Models

- **Phi-2**: Smaller but efficient model
- **Orca-2**: Research-focused model
- **Vicuna**: Conversation-tuned model
- **Wizard**: Instruction-following focused

## Model Size Comparison

| Model Size | Parameters | Typical VRAM Required | Relative Speed | Quality |
|------------|------------|----------------------|----------------|---------|
| 7B         | 7 billion  | 8-10 GB              | Fastest        | Good    |
| 13B        | 13 billion | 16-20 GB             | Medium         | Better  |
| 34B        | 34 billion | 32-40 GB             | Slow           | Great   |
| 70B        | 70 billion | 70-80 GB             | Slowest        | Best    |

### Size Selection Guidelines

- **7B models**: Good for most casual use cases, faster responses
- **13B models**: Better quality responses, reasonable speed on good hardware
- **34B+ models**: Highest quality but require powerful GPUs and run slower

## Hardware Requirements

### Minimum Requirements

- **CPU**: Modern multi-core processor (Intel i5/AMD Ryzen 5 or better)
- **RAM**: 16GB
- **Storage**: 10GB free space for application and models
- **GPU**: Not required, but recommended

### Recommended Requirements

- **CPU**: Intel i7/AMD Ryzen 7 or better
- **RAM**: 32GB
- **Storage**: 50GB+ SSD storage
- **GPU**: NVIDIA GPU with 8GB+ VRAM (RTX 3060 or better)

### GPU VRAM Requirements by Model Size

| Model Size | Minimum VRAM | Recommended VRAM | Notes                                |
|------------|--------------|------------------|--------------------------------------|
| 7B         | 6GB          | 8GB              | Can run on most modern GPUs          |
| 13B        | 12GB         | 16GB             | Requires mid to high-end GPU         |
| 34B        | 24GB         | 32GB             | Requires high-end GPU                |
| 70B        | 40GB         | 80GB             | Requires professional/datacenter GPU |

### CPU-Only Performance

When running without a GPU:

- Expect 1-5 tokens per second on 7B models
- Larger models may be impractically slow
- Consider using smaller models or quantized versions

## Performance Optimization

### Quantization

Ollama supports quantized models which use less memory:

- **Q4_0**: Highest compression, lowest quality
- **Q4_1**: Good balance of compression and quality
- **Q5_0**: Less compression, better quality
- **Q5_1**: Minimal compression, near-original quality
- **Q8_0**: Minimal compression, highest quality

Example: `ollama pull llama2:7b-q4_0`

### Other Optimization Tips

1. **Close other applications** when running larger models
2. **Use streaming mode** for better perceived performance
3. **Adjust context length** in Ollama if needed
4. **Restart Ollama** periodically to free up memory
5. **Update GPU drivers** to the latest version

## Model-Specific Tips

### LLaMA 2

- Best for general conversation and knowledge tasks
- The chat variant is better for dialogue
- Works well with both streaming and complete generation

### Mistral

- Excellent performance-to-size ratio
- Good default choice for most users
- Works particularly well with streaming generation

### CodeLlama

- Use the Python variant specifically for Python code
- Provide detailed context when asking for code
- Consider using complete generation mode for code tasks

## Troubleshooting Model Issues

### Common Issues and Solutions

1. **Model loads but generates gibberish**:
   - The model may be corrupted
   - Try re-pulling the model: `ollama pull modelname --force`

2. **"Out of memory" errors**:
   - Try a smaller model or quantized version
   - Close other applications using GPU memory
   - Reduce the context length in Ollama settings

3. **Very slow generation**:
   - Check if the model is running on GPU or CPU
   - Try a smaller model size
   - Ensure your GPU drivers are up to date

4. **Model not found in LocoLama**:
   - Ensure Ollama is running
   - Verify you've pulled the model in Ollama
   - Restart LocoLama and refresh the model list

5. **Poor quality responses**:
   - Try adjusting the temperature
   - Consider using a larger model if hardware permits
   - Provide more detailed prompts

### Checking Model Status in Ollama

To verify your models in Ollama:

```bash
ollama list
```

To get detailed information about a specific model:

```bash
ollama show modelname
```

## Additional Resources

- [Ollama Model Library](https://ollama.ai/library)
- [LLaMA 2 Technical Report](https://ai.meta.com/research/publications/llama-2-open-foundation-and-fine-tuned-chat-models/)
- [Mistral AI Documentation](https://mistral.ai/)
