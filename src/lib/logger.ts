// Simple logger utility for production debugging
export const logger = {
  log: (message: string, data?: any) => {
    if (typeof window !== 'undefined') {
      console.log(`[Quiz App] ${message}`, data);
    }
  },
  
  error: (message: string, error?: any) => {
    if (typeof window !== 'undefined') {
      console.error(`[Quiz App Error] ${message}`, error);
    }
  },
  
  warn: (message: string, data?: any) => {
    if (typeof window !== 'undefined') {
      console.warn(`[Quiz App Warning] ${message}`, data);
    }
  }
};

// Store debug information in sessionStorage for debugging
export const debugStore = {
  set: (key: string, value: any) => {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`quiz_debug_${key}`, JSON.stringify(value));
      }
    } catch (error) {
      logger.warn('Could not store debug info', error);
    }
  },
  
  get: (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        const item = sessionStorage.getItem(`quiz_debug_${key}`);
        return item ? JSON.parse(item) : null;
      }
    } catch (error) {
      logger.warn('Could not retrieve debug info', error);
    }
    return null;
  }
};
