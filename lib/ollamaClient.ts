/**
 * Ollama API Client
 * 
 * This module provides functions to interact with a local Ollama instance.
 * Ollama is a local LLM runtime that can run models like LLaMA2, Mistral, etc.
 */

// Types for Ollama API
export interface OllamaMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OllamaCompletionRequest {
  model: string;
  messages: OllamaMessage[];
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
    num_predict?: number;
  };
}

export interface OllamaCompletionResponse {
  model: string;
  created_at: string;
  message: {
    role: 'assistant';
    content: string;
  };
  done: boolean;
}

export interface OllamaModelInfo {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: {
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
}

// Default Ollama API URL
const OLLAMA_API_URL = 'http://localhost:11434';

/**
 * Get a list of available models from Ollama
 */
export async function getModels(): Promise<string[]> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/tags`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.models.map((model: OllamaModelInfo) => model.name);
  } catch (error) {
    console.error('Error fetching models from Ollama:', error);
    return [];
  }
}

/**
 * Generate a completion from Ollama
 */
export async function generateCompletion(
  model: string,
  messages: OllamaMessage[],
  options = {}
): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options,
      } as OllamaCompletionRequest),
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Error generating completion from Ollama:', error);
    throw error;
  }
}

/**
 * Generate a streaming completion from Ollama
 * Returns a ReadableStream that can be consumed by the client
 */
export async function generateStreamingCompletion(
  model: string,
  messages: OllamaMessage[],
  options = {}
): Promise<ReadableStream<Uint8Array>> {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        options,
      } as OllamaCompletionRequest),
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }
    
    return response.body as ReadableStream<Uint8Array>;
  } catch (error) {
    console.error('Error generating streaming completion from Ollama:', error);
    throw error;
  }
}
