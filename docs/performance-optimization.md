# Performance Optimization Guide

This guide provides detailed information on optimizing LocoLama and Ollama for the best performance on your system.

## Table of Contents

- [Understanding Performance Factors](#understanding-performance-factors)
- [Hardware Optimization](#hardware-optimization)
- [Model Selection and Configuration](#model-selection-and-configuration)
- [Ollama Optimization](#ollama-optimization)
- [LocoLama Application Optimization](#locolama-application-optimization)
- [System-Level Optimization](#system-level-optimization)
- [Measuring and Monitoring Performance](#measuring-and-monitoring-performance)
- [Performance Troubleshooting](#performance-troubleshooting)

## Understanding Performance Factors

Several factors affect the performance of LocoLama and the underlying AI models:

### Key Performance Metrics

1. **Tokens Per Second (TPS)**: The speed at which the model generates text
2. **Time to First Token (TTFT)**: How quickly the model starts generating
3. **Memory Usage**: RAM and VRAM consumption
4. **UI Responsiveness**: How smoothly the interface operates

### What Impacts Performance

1. **Model Size**: Larger models (more parameters) require more resources
2. **Hardware Capabilities**: CPU, GPU, RAM specifications
3. **Quantization Level**: How compressed the model is
4. **Context Length**: Amount of conversation history being processed
5. **System Load**: Other applications running simultaneously
6. **Prompt Complexity**: Some prompts require more computation

## Hardware Optimization

### CPU Considerations

- **Cores and Threads**: More cores help with parallel processing
- **Clock Speed**: Higher frequencies improve single-thread performance
- **Cache Size**: Larger cache improves data access speeds
- **Instruction Sets**: Modern CPUs with AVX2/AVX512 perform better

**Recommendations**:
- For CPU-only: Intel i7/i9 or AMD Ryzen 7/9 with high core count
- Enable all performance cores if using hybrid architecture (e.g., Intel 12th gen+)
- Ensure adequate cooling for sustained performance

### GPU Optimization

- **VRAM Capacity**: Determines which models you can run
- **Compute Capability**: Affects compatibility and performance
- **Memory Bandwidth**: Impacts data transfer speeds
- **CUDA Cores/Tensor Cores**: More cores = faster processing

**Recommendations**:
- NVIDIA GPUs work best with Ollama (RTX 3060 or better recommended)
- Ensure latest GPU drivers are installed
- For serious use: RTX 3080/3090/4080/4090 with 10GB+ VRAM
- AMD GPU support is improving but still less optimized

### Memory (RAM)

- **Capacity**: More RAM allows for larger models and contexts
- **Speed**: Faster RAM improves data transfer rates
- **Channels**: Dual/quad channel configurations improve bandwidth

**Recommendations**:
- Minimum: 16GB RAM
- Recommended: 32GB+ RAM
- Use the fastest RAM your system supports (DDR4-3200 or better)

### Storage

- **Type**: SSD vs HDD affects model loading times
- **Speed**: Faster storage improves swapping performance
- **Capacity**: Sufficient space for multiple models

**Recommendations**:
- Use SSD storage for Ollama models
- NVMe SSD preferred for best performance
- Allocate at least 20GB for model storage

## Model Selection and Configuration

### Choosing the Right Model Size

| Model Size | VRAM Required | Performance | Use Case |
|------------|---------------|-------------|----------|
| 7B         | 8-10GB        | Fastest     | General use, less complex tasks |
| 13B        | 16-20GB       | Medium      | Better quality, reasonable speed |
| 34B        | 32-40GB       | Slow        | High quality, complex reasoning |
| 70B        | 70-80GB       | Slowest     | Best quality, research purposes |

**Recommendations**:
- Start with 7B models and only move up if needed
- Match model size to your hardware capabilities
- Consider task complexity when choosing model size

### Quantization Options

Quantization reduces precision to save memory and increase speed:

| Quantization | VRAM Savings | Quality Impact | Speed Improvement |
|--------------|--------------|----------------|-------------------|
| Q4_0         | Highest      | Noticeable     | Significant       |
| Q4_1         | High         | Slight         | Good              |
| Q5_0/Q5_1    | Medium       | Minimal        | Moderate          |
| Q8_0         | Low          | Negligible     | Minimal           |
| F16          | None         | None           | Baseline          |

**Recommendations**:
- For most users: Q4_1 offers the best balance
- For maximum speed: Q4_0
- For highest quality: Q8_0 or F16 (if VRAM allows)

**Example**:
```bash
ollama pull llama2:7b-q4_1
```

### Context Length Considerations

Longer contexts require more memory and processing time:

- **Default**: Most models use 2048-4096 tokens
- **Extended**: Some models support 8K, 16K, or 32K+ tokens
- **Impact**: Each doubling of context can significantly increase resource usage

**Recommendations**:
- Use the shortest context length that meets your needs
- Consider clearing conversation history for long sessions
- For long documents, use chunking strategies

## Ollama Optimization

### Ollama Configuration

Ollama can be configured for better performance:

1. **GPU Layers**: Control how much of the model runs on GPU vs CPU
   ```bash
   OLLAMA_GPU_LAYERS=35 ollama run llama2
   ```

2. **Context Size**: Adjust the maximum context window
   ```bash
   OLLAMA_CONTEXT_SIZE=2048 ollama run llama2
   ```

3. **Custom Model Configuration**: Create a Modelfile with optimized settings
   ```
   FROM llama2
   PARAMETER num_gpu 1
   PARAMETER num_thread 4
   ```

### Ollama Runtime Options

When running models, you can specify parameters:

```bash
ollama run llama2 --gpu 1 --threads 4
```

**Key parameters**:
- `--gpu`: Number of GPUs to use
- `--threads`: CPU threads for computation
- `--context`: Context window size

### Ollama Caching

Ollama caches models and computation:

- **Model Cache**: Located at `~/.ollama/models`
- **Computation Cache**: Reuses calculations for repeated prompts

**Recommendations**:
- Ensure sufficient disk space for model cache
- For repeated tasks, use consistent prompting to leverage computation cache

## LocoLama Application Optimization

### Browser Optimization

- **Use a Modern Browser**: Chrome, Firefox, or Edge for best performance
- **Limit Extensions**: Disable unnecessary browser extensions
- **Dedicated Window**: Run LocoLama in its own window or profile

### UI Performance Settings

- **Enable Streaming**: Reduces perceived latency
- **Manage Conversation Length**: Delete or archive old conversations
- **Limit Active Tabs**: Close unused browser tabs

### Development Server vs Production Build

- **Development**: `npm run dev` is convenient but less optimized
- **Production**: For best performance, use a production build:
  ```bash
  npm run build
  npm run start
  ```

## System-Level Optimization

### Operating System Tuning

#### Windows

- **Power Plan**: Set to "High Performance"
- **Background Apps**: Disable unnecessary startup programs
- **Virtual Memory**: Increase page file size if RAM is limited
- **GPU Scheduling**: Enable hardware-accelerated GPU scheduling

#### macOS

- **Activity Monitor**: Close high-resource background processes
- **Login Items**: Reduce startup applications
- **Memory Pressure**: Monitor in Activity Monitor

#### Linux

- **CPU Governor**: Set to "performance"
  ```bash
  echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
  ```
- **Swappiness**: Reduce for better RAM utilization
  ```bash
  echo 10 | sudo tee /proc/sys/vm/swappiness
  ```
- **I/O Scheduler**: Use "deadline" for SSDs
- **Process Priority**: Run Ollama with higher priority
  ```bash
  nice -n -10 ollama run llama2
  ```

### Resource Allocation

- **Close Resource-Intensive Applications**: Video editors, games, etc.
- **Limit Background Services**: Disable unnecessary services
- **Dedicated Resources**: Consider dedicating a machine for AI tasks

## Measuring and Monitoring Performance

### Using the GPU Monitor

LocoLama includes a built-in GPU monitor that shows:
- CPU usage
- Memory usage
- GPU usage (if available)
- GPU memory usage (if available)

Use this to identify resource bottlenecks.

### External Monitoring Tools

- **Windows**: Task Manager, GPU-Z, HWiNFO
- **macOS**: Activity Monitor, iStat Menus
- **Linux**: htop, nvidia-smi, glances

### Benchmarking

To benchmark model performance:

1. **Tokens Per Second**:
   - Use a consistent prompt
   - Measure generation time for a fixed output length
   - Calculate: (tokens generated) ÷ (seconds elapsed)

2. **Memory Usage**:
   - Monitor VRAM usage during generation
   - Note peak usage vs. idle usage

3. **Comparative Testing**:
   - Test different models on the same hardware
   - Test the same model with different settings

## Performance Troubleshooting

### Common Issues and Solutions

#### Slow Generation Speed

**Symptoms**: Very low tokens per second, long wait times

**Possible causes and solutions**:
1. **CPU-only operation**: Check if the model is running on CPU instead of GPU
   - Solution: Verify GPU is detected by Ollama
   - Solution: Update GPU drivers

2. **Insufficient resources**: System struggling with model size
   - Solution: Try a smaller model or quantized version
   - Solution: Close other applications

3. **Background processes**: Other processes consuming resources
   - Solution: Check for high CPU/GPU usage from other applications
   - Solution: Restart computer to clear background processes

#### Out of Memory Errors

**Symptoms**: Generation fails with OOM errors, system becomes unresponsive

**Possible causes and solutions**:
1. **Model too large for hardware**: Model requires more VRAM than available
   - Solution: Use a smaller model (7B instead of 13B)
   - Solution: Try a more aggressive quantization (Q4_0)

2. **Context window too large**: Too much conversation history
   - Solution: Start a new conversation
   - Solution: Reduce context size in Ollama settings

3. **Memory fragmentation**: Long-running processes causing fragmentation
   - Solution: Restart Ollama and LocoLama

#### UI Lag or Freezing

**Symptoms**: Interface becomes unresponsive during generation

**Possible causes and solutions**:
1. **Browser resource limits**: Browser struggling with JavaScript execution
   - Solution: Use a different browser
   - Solution: Close other tabs and extensions

2. **Rendering issues**: Large responses causing rendering problems
   - Solution: Enable streaming mode
   - Solution: Break long prompts into smaller chunks

### Advanced Troubleshooting

For persistent performance issues:

1. **Check Ollama logs**:
   ```bash
   # Linux/macOS
   tail -f ~/.ollama/logs/ollama.log
   
   # Windows
   type %USERPROFILE%\.ollama\logs\ollama.log
   ```

2. **Monitor GPU utilization during generation**:
   ```bash
   # NVIDIA
   watch -n 0.5 nvidia-smi
   
   # Windows
   nvidia-smi -l 1
   ```

3. **Test Ollama directly** (bypassing LocoLama):
   ```bash
   time ollama run llama2 "Write a short poem about performance optimization."
   ```

## Conclusion

Optimizing LocoLama involves a combination of hardware selection, model configuration, system tuning, and application settings. By following the recommendations in this guide, you can achieve the best possible performance for your specific hardware and use cases.

Remember that the field of local AI is rapidly evolving, with continuous improvements in models, quantization techniques, and runtime optimizations. Stay updated with the latest Ollama and LocoLama releases for performance enhancements.
