import { useRef, useCallback, useEffect, useState } from 'react';

let globalWorker = null;

export function usePython() {
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const resolversRef = useRef(new Map());

  // Initialize worker once
  useEffect(() => {
    if (!globalWorker && typeof window !== 'undefined') {
      globalWorker = new Worker('/pyodideWorker.js');
    }

    const handleMessage = (e) => {
      const { id, success, output, error } = e.data;
      if (id === 'init') {
        setIsReady(true);
        return;
      }

      if (resolversRef.current.has(id)) {
        const { resolve, reject } = resolversRef.current.get(id);
        if (success) {
          resolve(output);
        } else {
          reject(new Error(error));
        }
        resolversRef.current.delete(id);
      }
    };

    if (globalWorker) {
      globalWorker.addEventListener('message', handleMessage);
      // Pre-warm the worker
      globalWorker.postMessage({ id: 'init', code: 'print("ready")' });
    }

    return () => {
      if (globalWorker) {
        globalWorker.removeEventListener('message', handleMessage);
      }
    };
  }, []);

  const runCode = useCallback((code, input = [], files = null) => {
    if (!globalWorker) throw new Error('Worker not initialized');
    setIsRunning(true);
    
    return new Promise((resolve, reject) => {
      const id = Date.now().toString() + Math.random().toString();
      resolversRef.current.set(id, {
        resolve: (val) => {
          setIsRunning(false);
          resolve(val);
        },
        reject: (err) => {
          setIsRunning(false);
          reject(err);
        }
      });
      globalWorker.postMessage({ id, code, input, files });
    });
  }, []);

  return { runCode, isReady, isRunning };
}
