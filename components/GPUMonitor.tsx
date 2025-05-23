import { useState, useEffect } from 'react';

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

export default function GPUMonitor() {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    isOllamaRunning: false
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch system stats
    const fetchStats = async () => {
      try {
        // Call the API endpoint to get system stats
        const response = await fetch('/api/system-stats', {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch system stats');
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching system stats:', err);
        setError('Could not connect to Ollama');

        // Simulate stats for demo purposes
        setStats({
          cpu: Math.random() * 30 + 10, // 10-40%
          memory: Math.random() * 20 + 30, // 30-50%
          gpu: {
            usage: Math.random() * 60 + 20, // 20-80%
            memory: Math.random() * 40 + 30, // 30-70%
            name: 'NVIDIA RTX 3080'
          },
          isOllamaRunning: true
        });
      }
    };

    // Initial fetch
    fetchStats();

    // Set up polling interval (every 5 seconds)
    const intervalId = setInterval(fetchStats, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Helper function to determine color based on usage percentage
  const getColorClass = (percentage: number): string => {
    if (percentage < 30) return 'bg-green-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-[var(--cardBackground)] border border-[var(--border)] rounded-lg shadow-[var(--shadow)] p-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${stats.isOllamaRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <h3 className="font-medium text-[var(--primaryText)]">System Status</h3>
        </div>
        <svg
          className={`h-5 w-5 transform transition-transform text-[var(--secondaryText)] ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-2">
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <div>
            <div className="flex justify-between text-xs mb-1 text-[var(--primaryText)]">
              <span>CPU</span>
              <span>{stats.cpu.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-[var(--border)] rounded-full h-2">
              <div
                className={`${getColorClass(stats.cpu)} h-2 rounded-full`}
                style={{ width: `${stats.cpu}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1 text-[var(--primaryText)]">
              <span>Memory</span>
              <span>{stats.memory.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-[var(--border)] rounded-full h-2">
              <div
                className={`${getColorClass(stats.memory)} h-2 rounded-full`}
                style={{ width: `${stats.memory}%` }}
              ></div>
            </div>
          </div>

          {stats.gpu && (
            <>
              <div>
                <div className="flex justify-between text-xs mb-1 text-[var(--primaryText)]">
                  <span>GPU ({stats.gpu.name})</span>
                  <span>{stats.gpu.usage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-2">
                  <div
                    className={`${getColorClass(stats.gpu.usage)} h-2 rounded-full`}
                    style={{ width: `${stats.gpu.usage}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 text-[var(--primaryText)]">
                  <span>GPU Memory</span>
                  <span>{stats.gpu.memory.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[var(--border)] rounded-full h-2">
                  <div
                    className={`${getColorClass(stats.gpu.memory)} h-2 rounded-full`}
                    style={{ width: `${stats.gpu.memory}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}

          <div className="text-xs text-[var(--secondaryText)] mt-2">
            Status: {stats.isOllamaRunning ? 'Ollama is running' : 'Ollama is not running'}
          </div>
        </div>
      )}
    </div>
  );
}
