import { useState, useEffect } from 'react';
import { getModels } from '../lib/ollamaClient';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  showAdvancedOptions?: boolean;
}

export default function ModelSelector({
  selectedModel,
  onModelChange,
  showAdvancedOptions = false
}: ModelSelectorProps) {
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [modelSize, setModelSize] = useState<'7B' | '13B'>('7B');
  const [temperature, setTemperature] = useState(0.7);

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch models from Ollama
        const models = await getModels();

        if (models.length > 0) {
          setAvailableModels(models);
        } else {
          // Fallback models if none are found
          setAvailableModels(['llama2', 'mistral', 'codellama']);
          setError('Could not fetch models from Ollama. Using default models.');
        }
      } catch (err) {
        console.error('Error fetching models:', err);
        setAvailableModels(['llama2', 'mistral', 'codellama']);
        setError('Could not connect to Ollama. Using default models.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
  }, []);

  // Helper function to get model with size
  const getModelWithSize = (baseModel: string, size: string): string => {
    // If the model already has a size specification, don't add it
    if (baseModel.includes(':')) return baseModel;

    // For models that support different sizes
    if (['llama2', 'mistral', 'codellama'].includes(baseModel.toLowerCase())) {
      return `${baseModel}:${size}`;
    }

    return baseModel;
  };

  // Handle model change with size
  const handleModelChange = (model: string) => {
    const modelWithSize = getModelWithSize(model, modelSize);
    onModelChange(modelWithSize);
  };

  // Handle size change
  const handleSizeChange = (size: '7B' | '13B') => {
    setModelSize(size);
    const modelWithSize = getModelWithSize(selectedModel.split(':')[0], size);
    onModelChange(modelWithSize);
  };

  return (
    <div>
      <div className="relative">
        <select
          value={selectedModel.split(':')[0]} // Extract base model name
          onChange={(e) => handleModelChange(e.target.value)}
          className="appearance-none bg-[var(--cardBackground)] border border-[var(--border)] rounded-lg py-2 pl-3 pr-10 text-sm shadow-[var(--shadow)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--primaryText)]"
          disabled={isLoading}
        >
          {isLoading ? (
            <option>Loading models...</option>
          ) : (
            availableModels.map(model => (
              <option key={model} value={model.split(':')[0]}>
                {model.split(':')[0]}
              </option>
            ))
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--secondaryText)]">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}

      {showAdvancedOptions && (
        <div className="mt-2">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-xs text-[var(--primary)] hover:text-[var(--primaryHover)] flex items-center font-medium"
          >
            <span>Advanced Options</span>
            <svg
              className={`h-4 w-4 ml-1 transform transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isAdvancedOpen && (
            <div className="mt-2 p-4 bg-[var(--cardBackground)] rounded-lg border border-[var(--border)] shadow-[var(--shadow)]">
              <div className="mb-3">
                <label className="block text-xs font-medium text-[var(--primaryText)] mb-1">Model Size</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSizeChange('7B')}
                    className={`px-3 py-1 text-xs rounded-md border shadow-sm ${
                      modelSize === '7B'
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                        : 'bg-[var(--cardBackground)] text-[var(--primaryText)] border-[var(--border)] hover:bg-[var(--border)]'
                    }`}
                  >
                    7B
                  </button>
                  <button
                    onClick={() => handleSizeChange('13B')}
                    className={`px-3 py-1 text-xs rounded-md border shadow-sm ${
                      modelSize === '13B'
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                        : 'bg-[var(--cardBackground)] text-[var(--primaryText)] border-[var(--border)] hover:bg-[var(--border)]'
                    }`}
                  >
                    13B
                  </button>
                </div>
                <p className="text-xs text-[var(--secondaryText)] mt-1">
                  7B is faster, 13B is more capable but requires more resources
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--primaryText)] mb-1">
                  Temperature: {temperature.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-[var(--primary)]"
                />
                <div className="flex justify-between text-xs text-[var(--secondaryText)]">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
