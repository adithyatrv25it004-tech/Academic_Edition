import React, { useState } from 'react';
import { usePython } from '../../../lib/pythonRunner/usePython';

const explainError = (errorMsg) => {
  if (errorMsg.includes('SyntaxError')) {
    return "Python couldn't understand the structure of this line. Check brackets, quotes, and ':' characters.";
  }
  if (errorMsg.includes('NameError')) {
    return "Python cannot find that name. Check the spelling or make sure the variable was created first.";
  }
  if (errorMsg.includes('TypeError')) {
    return "Python received a type of value that does not work with this operation.";
  }
  if (errorMsg.includes('IndentationError')) {
    return "Python uses indentation to understand blocks. Check the spaces before this line.";
  }
  if (errorMsg.includes('ZeroDivisionError')) {
    return "A number cannot be divided by zero.";
  }
  return null;
};

export default function CodePractice({ instruction, prefill, expectedOutput, onComplete }) {
  const { runCode, isReady, isRunning } = usePython();
  const [code, setCode] = useState(prefill || '');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect, error
  const [errorExpl, setErrorExpl] = useState(null);
  const [showTechnicalError, setShowTechnicalError] = useState(false);

  const execute = async () => {
    setOutput('Running...');
    setStatus('idle');
    setErrorExpl(null);
    setShowTechnicalError(false);
    try {
      const result = await runCode(code);
      const cleanResult = result.trim();
      setOutput(cleanResult);
      return cleanResult;
    } catch (err) {
      setOutput(err.message);
      setStatus('error');
      const expl = explainError(err.message);
      if (expl) setErrorExpl(expl);
      return null;
    }
  };

  const handleRun = async () => {
    await execute();
  };

  const handleCheck = async () => {
    const res = await execute();
    if (res !== null) {
      if (expectedOutput && expectedOutput.length > 0) {
        const isMatch = expectedOutput.some(exp => res === exp);
        if (isMatch) {
          setStatus('correct');
          if (onComplete) onComplete(true);
        } else {
          setStatus('incorrect');
        }
      }
    }
  };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', background: '#0d1117' }}>
      <p style={{ color: '#fff', marginBottom: '12px', fontWeight: 500 }}>{instruction}</p>
      
      {!isReady && <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Loading interactive environment...</p>}

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          width: '100%',
          minHeight: '120px',
          fontFamily: 'monospace',
          padding: '12px',
          background: '#161b22',
          color: '#e6edf3',
          border: '1px solid #30363d',
          borderRadius: '6px',
          marginBottom: '12px'
        }}
      />

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button 
          onClick={handleRun} 
          disabled={!isReady || isRunning}
          style={{ background: '#30363d', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>

        {expectedOutput && expectedOutput.length > 0 && (
          <button 
            onClick={handleCheck} 
            disabled={!isReady || isRunning}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            Check Answer
          </button>
        )}

        {status === 'correct' && <span style={{ color: '#238636', fontWeight: 600 }}>✓ Correct</span>}
        {status === 'incorrect' && <span style={{ color: '#da3633', fontWeight: 600 }}>✗ Output doesn't match expected.</span>}
      </div>

      {status === 'error' && errorExpl && (
        <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(218, 54, 51, 0.1)', borderRadius: '4px', borderLeft: '3px solid #da3633' }}>
          <p style={{ margin: '0 0 8px 0', color: '#ff7b72', fontWeight: 600 }}>Friendly Explanation</p>
          <p style={{ margin: '0 0 12px 0', color: '#e6edf3' }}>{errorExpl}</p>
          <button onClick={() => setShowTechnicalError(!showTechnicalError)} style={{ background: 'transparent', border: 'none', color: '#58a6ff', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
            {showTechnicalError ? 'Hide' : 'View'} Technical Error
          </button>
        </div>
      )}

      {output && (status !== 'error' || showTechnicalError || !errorExpl) && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#010409', borderRadius: '4px', borderLeft: '3px solid #30363d' }}>
          <pre style={{ margin: 0, color: status === 'error' ? '#ff7b72' : '#e6edf3', whiteSpace: 'pre-wrap' }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
