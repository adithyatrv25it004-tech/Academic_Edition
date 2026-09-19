import React, { useState } from 'react';
import { usePython } from '../../../lib/pythonRunner/usePython';
import { playUiBubbleSound } from '../../../lib/uiBubbleSound';

/**
 * Pedagogical explanation for Python runtime and syntax errors
 */
const explainError = (errorMsg = '') => {
  if (errorMsg.includes('SyntaxError')) {
    return "Python couldn't understand the structure of this line. Check brackets, quotes and colons.";
  }
  if (errorMsg.includes('NameError')) {
    return "Python does not know this name yet. Check whether you created the variable and spelled it correctly.";
  }
  if (errorMsg.includes('TypeError')) {
    return "These values cannot be used together in this operation without conversion.";
  }
  if (errorMsg.includes('IndentationError')) {
    return "Python uses indentation to identify blocks. Check the lines inside your if, loop or function.";
  }
  if (errorMsg.includes('ZeroDivisionError')) {
    return "Python cannot divide by zero.";
  }
  if (errorMsg.includes('IndexError')) {
    return "That position is outside the sequence.";
  }
  if (errorMsg.includes('KeyError')) {
    return "That key does not exist in the dictionary.";
  }
  if (errorMsg.includes('RecursionError')) {
    return "Your function kept calling itself without reaching its stopping condition. Check the base case.";
  }
  return "Python encountered an issue while executing your code. Check the highlighted line carefully.";
};

export default function CodePractice({
  instruction,
  prefill,
  starterCode,
  solutionCode,
  solutionExplanation,
  expectedOutput,
  testCases,
  hint,
  hints,
  virtualFiles,
  onComplete
}) {
  const { runCode, isReady, isRunning } = usePython();
  const initialCode = starterCode || prefill || '';
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [lastMode, setLastMode] = useState('idle'); // 'run' | 'check' | 'idle'
  const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'incorrect' | 'error'
  const [errorExpl, setErrorExpl] = useState(null);
  const [rawError, setRawError] = useState('');
  const [showTechnicalError, setShowTechnicalError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Normalize hints
  const hintList = [];
  if (Array.isArray(hints)) {
    hintList.push(...hints);
  } else if (typeof hint === 'string' && hint.trim() !== '') {
    hintList.push(hint);
  }

  // Normalize expected outputs
  const targets = [];
  if (Array.isArray(expectedOutput)) {
    targets.push(...expectedOutput);
  } else if (typeof expectedOutput === 'string' && expectedOutput.trim() !== '') {
    targets.push(expectedOutput);
  }
  if (Array.isArray(testCases)) {
    testCases.forEach(tc => {
      if (tc.expectedOutput) targets.push(tc.expectedOutput);
    });
  }

  const executeCode = async () => {
    setOutput('Executing in Python...');
    setErrorExpl(null);
    setRawError('');
    setShowTechnicalError(false);

    try {
      const result = await runCode(code, [], virtualFiles);
      const cleanResult = (result || '').trim();
      setOutput(cleanResult);
      return { success: true, output: cleanResult };
    } catch (err) {
      const msg = err.message || 'Execution error';
      setRawError(msg);
      setOutput(msg);
      setStatus('error');
      const expl = explainError(msg);
      setErrorExpl(expl);
      return { success: false, error: msg };
    }
  };

  /**
   * RUN CODE - Experimentation only
   * Executes code, shows output/errors, does NOT increment evaluation attempts
   */
  const handleRunCode = async () => {
    setLastMode('run');
    setStatus('idle');
    await executeCode();
  };

  /**
   * CHECK MY WORK - Deterministic evaluation
   * Checks against expected output, increments attempts, gives teaching feedback
   */
  const handleCheckMyWork = async () => {
    setLastMode('check');
    setAttempts(prev => prev + 1);

    const res = await executeCode();
    if (!res.success) {
      // Error handled in executeCode
      return;
    }

    const cleanResult = res.output;

    if (targets.length > 0) {
      const isMatch = targets.some(exp => {
        const cleanExpected = exp.trim();
        return cleanResult === cleanExpected || cleanResult.replace(/\r\n/g, '\n') === cleanExpected.replace(/\r\n/g, '\n');
      });

      if (isMatch) {
        setStatus('correct');
        playUiBubbleSound();
        if (onComplete) onComplete(true);
      } else {
        setStatus('incorrect');
      }
    } else {
      // If no explicit targets specified, clean execution counts as completion
      setStatus('correct');
      playUiBubbleSound();
      if (onComplete) onComplete(true);
    }
  };

  const handleResetCode = () => {
    setCode(initialCode);
    setOutput('');
    setStatus('idle');
    setLastMode('idle');
    setErrorExpl(null);
    setRawError('');
    setShowTechnicalError(false);
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2DACB',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '28px',
        boxShadow: '0 4px 16px rgba(23, 32, 51, 0.04)'
      }}
    >
      {/* Title & Instruction */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>💻</span>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#172033', fontWeight: 700 }}>
              Live Python Practice
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {attempts > 0 && (
              <span style={{ fontSize: '0.8rem', color: '#687588', background: '#F7F3EA', padding: '2px 8px', borderRadius: '4px', border: '1px solid #E2DACB' }}>
                Attempts: {attempts}
              </span>
            )}
            <button
              onClick={handleResetCode}
              title="Reset code to starter code"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#687588',
                fontSize: '0.8rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Reset Code
            </button>
          </div>
        </div>
        <p style={{ margin: 0, color: '#2B3545', fontSize: '1.02rem', lineHeight: '1.6' }}>
          {instruction}
        </p>
      </div>

      {/* Interactive Environment Status */}
      {!isReady && (
        <div style={{ padding: '8px 12px', background: '#F7F3EA', border: '1px solid #E2DACB', borderRadius: '6px', fontSize: '0.85rem', color: '#687588', marginBottom: '12px' }}>
          ⏳ Initializing local Python sandbox (Pyodide)...
        </div>
      )}

      {/* Code Editor Area */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <div
          style={{
            background: '#121824',
            color: '#8C96A5',
            padding: '6px 14px',
            borderRadius: '8px 8px 0 0',
            fontSize: '0.78rem',
            fontFamily: 'Consolas, Monaco, monospace',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #232D3F',
            borderBottom: 'none'
          }}
        >
          <span>main.py</span>
          <span>Python 3.11</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (status !== 'idle') setStatus('idle');
          }}
          spellCheck={false}
          style={{
            width: '100%',
            minHeight: '140px',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.95rem',
            lineHeight: '1.5',
            padding: '14px',
            background: '#172033',
            color: '#F7F3EA',
            border: '1px solid #232D3F',
            borderRadius: '0 0 8px 8px',
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Action Controls: Run Code and Check My Work */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
        {/* Run Code Button (Experimentation Only) */}
        <button
          onClick={handleRunCode}
          disabled={!isReady || isRunning}
          style={{
            background: '#2B3545',
            color: '#F7F3EA',
            border: '1px solid #3E4B5E',
            padding: '9px 18px',
            borderRadius: '6px',
            cursor: !isReady || isRunning ? 'not-allowed' : 'pointer',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background 0.2s'
          }}
        >
          <span>▶</span>
          <span>{isRunning && lastMode === 'run' ? 'Running...' : 'Run Code'}</span>
        </button>

        {/* Check My Work Button (Evaluation & Score) */}
        <button
          onClick={handleCheckMyWork}
          disabled={!isReady || isRunning}
          style={{
            background: '#315C8C',
            color: '#FFFFFF',
            border: 'none',
            padding: '9px 20px',
            borderRadius: '6px',
            cursor: !isReady || isRunning ? 'not-allowed' : 'pointer',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(49, 92, 140, 0.25)',
            transition: 'background 0.2s'
          }}
        >
          <span>✓</span>
          <span>{isRunning && lastMode === 'check' ? 'Checking...' : 'Check My Work'}</span>
        </button>

        {/* Progressive Hint Toggle */}
        {hintList.length > 0 && (
          <button
            onClick={() => setShowHint(!showHint)}
            style={{
              background: 'transparent',
              border: '1px dashed #C79A45',
              color: '#8C6718',
              padding: '8px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.88rem'
            }}
          >
            {showHint ? 'Hide Hints' : `💡 Need a Hint? (${hintList.length})`}
          </button>
        )}

        {/* View Reference Solution (Available after attempt or completion) */}
        {solutionCode && (attempts > 0 || status === 'correct' || status === 'incorrect') && (
          <button
            onClick={() => setShowSolution(!showSolution)}
            style={{
              background: showSolution ? '#e2e8f0' : 'transparent',
              border: '1px solid #94a3b8',
              color: '#334155',
              padding: '8px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 500
            }}
          >
            {showSolution ? 'Hide Reference Solution' : '👁️ View Reference Solution'}
          </button>
        )}

        {/* Status Indicators */}
        {status === 'correct' && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#1B6A3B', fontWeight: 600, fontSize: '0.95rem' }}>
            <span style={{ fontSize: '1.1rem' }}>✓</span> Correct! Requirement verified.
          </div>
        )}

        {status === 'incorrect' && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#B42318', fontWeight: 600, fontSize: '0.95rem' }}>
            <span>✗</span> Output does not match required goal. Look at the output below or check hints.
          </div>
        )}
      </div>

      {/* Hints Box */}
      {showHint && hintList.length > 0 && (
        <div style={{ marginBottom: '16px', padding: '14px 18px', background: '#FDFBF7', border: '1px solid #E8DECE', borderRadius: '8px', fontSize: '0.92rem', color: '#554735' }}>
          <strong style={{ color: '#C79A45', display: 'block', marginBottom: '8px' }}>Progressive Hints:</strong>
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {hintList.map((h, hIdx) => (
              <li key={hIdx}><strong>Hint {hIdx + 1}:</strong> {h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Reference Solution Box */}
      {showSolution && solutionCode && (
        <div style={{ marginBottom: '16px', padding: '16px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', borderLeft: '4px solid #315C8C' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <strong style={{ color: '#1e293b', fontSize: '0.95rem' }}>📖 Official Reference Solution</strong>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>KTU UCEST105 Standard</span>
          </div>
          <pre style={{ margin: '0 0 12px 0', padding: '12px', background: '#0f172a', color: '#38d9a9', borderRadius: '6px', fontFamily: 'Consolas, Monaco, monospace', fontSize: '0.88rem', overflowX: 'auto' }}>
            {solutionCode}
          </pre>
          {solutionExplanation && (
            <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, background: '#ffffff', padding: '10px 14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <strong>💡 Solution Explanation: </strong>{solutionExplanation}
            </div>
          )}
        </div>
      )}

      {/* Friendly Error Teaching Card */}
      {status === 'error' && errorExpl && (
        <div
          style={{
            marginBottom: '16px',
            padding: '16px',
            background: '#FDF2F2',
            borderRadius: '8px',
            border: '1px solid #F8D7DA',
            borderLeft: '4px solid #D9383A'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ color: '#D9383A', fontWeight: 'bold' }}>⚠️</span>
            <strong style={{ color: '#901D1E', fontSize: '0.98rem' }}>ATP Teacher Explanation</strong>
          </div>
          <p style={{ margin: '0 0 10px 0', color: '#2B3545', fontSize: '0.95rem', lineHeight: 1.5 }}>
            {errorExpl}
          </p>
          <button
            onClick={() => setShowTechnicalError(!showTechnicalError)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#315C8C',
              cursor: 'pointer',
              padding: 0,
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'underline'
            }}
          >
            {showTechnicalError ? 'Hide Technical Error' : 'View Technical Error'}
          </button>
        </div>
      )}

      {/* Technical Python Error Traceback (expandable) */}
      {showTechnicalError && rawError && (
        <div style={{ marginBottom: '16px', padding: '12px', background: '#221115', border: '1px solid #5A2028', borderRadius: '6px' }}>
          <div style={{ fontSize: '0.78rem', color: '#FF9A9C', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '6px' }}>
            Python Traceback
          </div>
          <pre style={{ margin: 0, color: '#FFB8BA', fontSize: '0.85rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {rawError}
          </pre>
        </div>
      )}

      {/* Live Output Console */}
      {output && (status !== 'error' || !errorExpl || showTechnicalError) && (
        <div
          style={{
            background: '#121824',
            borderRadius: '8px',
            border: '1px solid #232D3F',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              background: '#172033',
              color: '#8C96A5',
              padding: '6px 14px',
              fontSize: '0.78rem',
              fontFamily: 'monospace',
              borderBottom: '1px solid #232D3F',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>Output Console (stdout)</span>
            <span style={{ color: lastMode === 'check' ? '#C79A45' : '#8C96A5' }}>
              Mode: {lastMode === 'check' ? 'Evaluation' : 'Run'}
            </span>
          </div>
          <pre
            style={{
              margin: 0,
              padding: '14px',
              color: status === 'error' ? '#FF8585' : '#85E89D',
              fontSize: '0.92rem',
              fontFamily: 'Consolas, Monaco, monospace',
              whiteSpace: 'pre-wrap',
              maxHeight: '180px',
              overflowY: 'auto'
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

