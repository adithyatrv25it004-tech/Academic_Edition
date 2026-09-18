self.importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

let pyodide = null;
let loadedPackages = new Set();

async function loadPyodideEnvironment() {
  if (!pyodide) {
    pyodide = await loadPyodide();
  }
}

self.onmessage = async (event) => {
  const { id, code, files } = event.data;

  try {
    await loadPyodideEnvironment();
    
    // Check if code requires numpy
    if (code && (code.includes('import numpy') || code.includes('from numpy')) && !loadedPackages.has('numpy')) {
      self.postMessage({ id, status: 'loading_package', package: 'numpy', message: 'Preparing NumPy...' });
      await pyodide.loadPackage('numpy');
      loadedPackages.add('numpy');
    }

    // Handle virtual files if supplied (for multi-file module execution like Labs 16 & 17)
    if (files && typeof files === 'object') {
      for (const [filename, content] of Object.entries(files)) {
        pyodide.FS.writeFile(filename, content);
      }
      // Ensure current working directory is on sys.path
      await pyodide.runPythonAsync("import sys; '.' not in sys.path and sys.path.insert(0, '.')");
    }
    
    // Set up stdout capture
    let stdoutBuffer = [];
    pyodide.setStdout({
      batched: (msg) => {
        stdoutBuffer.push(msg);
      }
    });

    // Run the Python code
    await pyodide.runPythonAsync(code);
    
    // Send success result
    self.postMessage({ id, success: true, output: stdoutBuffer.join('\n') });
  } catch (error) {
    self.postMessage({ id, success: false, error: error.message });
  }
};
