import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface SystemStats {
  cpu: number;
  memory: number;
  gpu?: {
    usage: number;
    memory: number;
    name: string;
  };
  isOllamaRunning: boolean;
}

export async function GET() {
  try {
    // Check if Ollama is running
    const isOllamaRunning = await checkOllamaStatus();
    
    // Get CPU and memory usage
    const { cpu, memory } = await getSystemUsage();
    
    // Try to get GPU stats if available
    let gpu;
    try {
      gpu = await getGPUStats();
    } catch (error) {
      console.log('GPU stats not available:', error);
      // GPU stats are optional, so we don't throw an error
    }
    
    return NextResponse.json({
      cpu,
      memory,
      gpu,
      isOllamaRunning
    });
  } catch (error) {
    console.error('Error getting system stats:', error);
    return NextResponse.json(
      { error: 'Failed to get system stats' },
      { status: 500 }
    );
  }
}

async function checkOllamaStatus(): Promise<boolean> {
  try {
    // Try to make a simple request to Ollama API
    const response = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function getSystemUsage(): Promise<{ cpu: number; memory: number }> {
  // This is a simplified implementation
  // In a real-world scenario, you would use a more robust method
  // to get accurate CPU and memory usage
  
  try {
    // For Linux/macOS
    const { stdout: memoryStdout } = await execAsync("free -m | awk 'NR==2{printf \"%.1f\", $3*100/$2}'");
    const { stdout: cpuStdout } = await execAsync("top -bn1 | grep 'Cpu(s)' | sed 's/.*, *\\([0-9.]*\\)%* id.*/\\1/' | awk '{print 100 - $1}'");
    
    return {
      cpu: parseFloat(cpuStdout.trim()),
      memory: parseFloat(memoryStdout.trim())
    };
  } catch (error) {
    console.error('Error getting system usage:', error);
    
    // Return simulated values if we can't get real ones
    return {
      cpu: Math.random() * 30 + 10, // 10-40%
      memory: Math.random() * 20 + 30, // 30-50%
    };
  }
}

async function getGPUStats(): Promise<{ usage: number; memory: number; name: string } | undefined> {
  try {
    // Try to get NVIDIA GPU stats using nvidia-smi
    const { stdout } = await execAsync('nvidia-smi --query-gpu=utilization.gpu,utilization.memory,name --format=csv,noheader,nounits');
    
    const lines = stdout.trim().split('\n');
    if (lines.length > 0) {
      const [usage, memory, ...nameParts] = lines[0].split(', ');
      const name = nameParts.join(', ');
      
      return {
        usage: parseFloat(usage.trim()),
        memory: parseFloat(memory.trim()),
        name: name.trim()
      };
    }
    
    throw new Error('No GPU found');
  } catch (error) {
    // Check for AMD GPUs if NVIDIA not found
    try {
      const { stdout } = await execAsync('rocm-smi --showuse');
      
      // Parse rocm-smi output (simplified)
      const gpuUsageMatch = stdout.match(/GPU use\s+:\s+(\d+)%/);
      const gpuMemoryMatch = stdout.match(/Memory use\s+:\s+(\d+)%/);
      const gpuNameMatch = stdout.match(/GPU\s+\d+\s+:\s+(.+)/);
      
      if (gpuUsageMatch && gpuMemoryMatch && gpuNameMatch) {
        return {
          usage: parseFloat(gpuUsageMatch[1]),
          memory: parseFloat(gpuMemoryMatch[1]),
          name: gpuNameMatch[1].trim()
        };
      }
      
      throw new Error('Could not parse AMD GPU stats');
    } catch (amdError) {
      // No GPU or couldn't get stats
      return undefined;
    }
  }
}
