import React, { useState, useRef } from 'react';
import { SYMBOL_DEFINITIONS, KTU_PRESETS } from './flowchartSymbols';
import FlowchartToolbar from './FlowchartToolbar';

export { SYMBOL_DEFINITIONS, FlowchartToolbar };

/**
 * SVG Shape Renderer for all 8 syllabus symbols
 */
function FlowchartShape({ shapeType, text, isSelected, width = 260, height = 70 }) {
  const def = SYMBOL_DEFINITIONS[shapeType] || SYMBOL_DEFINITIONS.PROCESS;
  const strokeColor = def.colorBorder;
  const fillColor = def.colorBg;
  const textColor = def.colorText;

  switch (shapeType) {
    case 'START_END':
    case 'TERMINAL':
      // Capsule / Oval (rx = height/2)
      return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <rect
            x="3"
            y="3"
            width={width - 6}
            height={height - 6}
            rx={(height - 6) / 2}
            ry={(height - 6) / 2}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 3 : 2}
          />
          <text
            x={width / 2}
            y={height / 2 + 5}
            textAnchor="middle"
            fill={textColor}
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {text}
          </text>
        </svg>
      );

    case 'PROCESS':
      // Clean Rectangle
      return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <rect
            x="3"
            y="3"
            width={width - 6}
            height={height - 6}
            rx="4"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 3 : 2}
          />
          <text
            x={width / 2}
            y={height / 2 + 5}
            textAnchor="middle"
            fill={textColor}
            fontSize="14"
            fontWeight="600"
            fontFamily="monospace"
          >
            {text}
          </text>
        </svg>
      );

    case 'INPUT_OUTPUT':
      // Parallelogram (slanted)
      const slant = 24;
      return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <polygon
            points={`${slant},3 ${width - 3},3 ${width - slant},${height - 3} 3,${height - 3}`}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 3 : 2}
          />
          <text
            x={width / 2}
            y={height / 2 + 5}
            textAnchor="middle"
            fill={textColor}
            fontSize="14"
            fontWeight="600"
            fontFamily="monospace"
          >
            {text}
          </text>
        </svg>
      );

    case 'DECISION':
      // Diamond / Rhombus with Yes/No pathway indicators
      return (
        <svg width={width} height={height + 20} viewBox={`0 0 ${width} ${height + 20}`}>
          <polygon
            points={`${width / 2},3 ${width - 6},${(height + 20) / 2} ${width / 2},${height + 17} 6,${(height + 20) / 2}`}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 3 : 2}
          />
          <text
            x={width / 2}
            y={(height + 20) / 2 + 5}
            textAnchor="middle"
            fill={textColor}
            fontSize="13"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {text}
          </text>
          {/* True / False Branch Flow Guides */}
          <text
            x={width - 32}
            y={(height + 20) / 2 - 8}
            fill="#E11D48"
            fontSize="9"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            Yes →
          </text>
          <text
            x={width / 2 + 10}
            y={height + 15}
            fill="#64748b"
            fontSize="9"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            ↓ No
          </text>
        </svg>
      );

    case 'MODULE':
    case 'PREDEFINED_PROCESS':
      // Rectangle with double vertical lines on left and right
      const sideInset = 16;
      return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <rect
            x="3"
            y="3"
            width={width - 6}
            height={height - 6}
            rx="4"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 3 : 2}
          />
          {/* Double vertical interior lines */}
          <line
            x1={sideInset}
            y1="3"
            x2={sideInset}
            y2={height - 3}
            stroke={strokeColor}
            strokeWidth="2"
          />
          <line
            x1={width - sideInset}
            y1="3"
            x2={width - sideInset}
            y2={height - 3}
            stroke={strokeColor}
            strokeWidth="2"
          />
          <text
            x={width / 2}
            y={height / 2 + 5}
            textAnchor="middle"
            fill={textColor}
            fontSize="14"
            fontWeight="600"
            fontFamily="monospace"
          >
            {text}
          </text>
        </svg>
      );

    case 'HEXAGON':
    case 'PREPARATION':
      // Pointed elongated hexagon
      const hexPoint = 26;
      return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <polygon
            points={`${hexPoint},3 ${width - hexPoint},3 ${width - 3},${height / 2} ${width - hexPoint},${height - 3} ${hexPoint},${height - 3} 3,${height / 2}`}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 3 : 2}
          />
          <text
            x={width / 2}
            y={height / 2 + 5}
            textAnchor="middle"
            fill={textColor}
            fontSize="13"
            fontWeight="600"
            fontFamily="monospace"
          >
            {text}
          </text>
        </svg>
      );

    case 'ON_PAGE_CONNECTOR':
    case 'CONNECTOR':
      // Circle
      const radius = 24;
      return (
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r={radius}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 3 : 2}
          />
          <text
            x="30"
            y="35"
            textAnchor="middle"
            fill={textColor}
            fontSize="14"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {text}
          </text>
        </svg>
      );

    case 'OFF_PAGE_CONNECTOR':
      // Pentagon pointing downward
      return (
        <svg width="70" height="60" viewBox="0 0 70 60">
          <polygon
            points="5,5 65,5 65,36 35,55 5,36"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isSelected ? 3 : 2}
          />
          <text
            x="35"
            y="28"
            textAnchor="middle"
            fill={textColor}
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {text}
          </text>
        </svg>
      );

    default:
      return null;
  }
}

export default function FlowchartBuilder({
  availableBlocks,
  correctOrder,
  title = 'Flowchart Builder & Logic Verification',
  goal,
  onComplete
}) {
  const [builtSequence, setBuiltSequence] = useState([]);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [paletteMode, setPaletteMode] = useState(availableBlocks ? 'exercise' : 'all'); // 'exercise' | 'all'
  const [selectedSymbolType, setSelectedSymbolType] = useState('START_END');
  const [customText, setCustomText] = useState('START');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  const nextIdRef = useRef(1);

  // Load standard syllabus algorithm template
  const handleLoadPreset = (presetId) => {
    if (!presetId) return;
    const found = KTU_PRESETS.find(p => p.id === presetId);
    if (!found) return;
    const loaded = found.blocks.map(b => {
      const id = nextIdRef.current++;
      return {
        ...b,
        instanceId: `fb_node_${id}`,
        id: `preset_${id}`
      };
    });
    setBuiltSequence(loaded);
    setStatus(null);
    setFeedbackMsg(`Loaded syllabus template: ${found.label}`);
  };

  // Update default custom text when symbol changes in palette
  const handleSelectSymbol = (type) => {
    setSelectedSymbolType(type);
    const def = SYMBOL_DEFINITIONS[type];
    if (def) setCustomText(def.defaultText);
  };

  // Add block to flowchart
  const handleAddBlock = (blockData) => {
    const id = nextIdRef.current++;
    const newBlock = {
      ...blockData,
      instanceId: `fb_node_${id}`,
      id: blockData.id || `custom_${id}`
    };
    setBuiltSequence(prev => [...prev, newBlock]);
    setStatus(null);
    setFeedbackMsg('');
  };

  // Remove block
  const handleRemoveBlock = (index) => {
    const updated = [...builtSequence];
    updated.splice(index, 1);
    setBuiltSequence(updated);
    setStatus(null);
    setFeedbackMsg('');
  };

  // Move block up or down
  const handleMoveBlock = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= builtSequence.length) return;
    const updated = [...builtSequence];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setBuiltSequence(updated);
    setStatus(null);
    setFeedbackMsg('');
  };

  // Start inline edit
  const handleStartEdit = (index) => {
    setEditingId(builtSequence[index].instanceId);
    setEditText(builtSequence[index].text);
  };

  // Save inline edit
  const handleSaveEdit = (index) => {
    const updated = [...builtSequence];
    updated[index] = { ...updated[index], text: editText.trim() || updated[index].text };
    setBuiltSequence(updated);
    setEditingId(null);
  };

  // Desktop Drag and Drop Handlers for canvas reordering
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    // Check if dragging from toolbox palette
    const toolboxData = e.dataTransfer.getData('application/flowchart-toolbox');
    if (toolboxData) {
      try {
        const parsed = JSON.parse(toolboxData);
        const id = nextIdRef.current++;
        const newBlock = {
          ...parsed,
          instanceId: `fb_node_${id}`,
          id: parsed.id || `custom_${id}`
        };
        const updated = [...builtSequence];
        updated.splice(targetIndex, 0, newBlock);
        setBuiltSequence(updated);
        setStatus(null);
        return;
      } catch {
        // Fallback to standard index
      }
    }

    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }

    const updated = [...builtSequence];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);
    setBuiltSequence(updated);
    setDraggedIndex(null);
    setStatus(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Toolbox drag start
  const handleToolboxDragStart = (e, blockData) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/flowchart-toolbox', JSON.stringify(blockData));
  };

  // Verification Logic
  const handleVerify = () => {
    if (builtSequence.length === 0) {
      setStatus('error');
      setFeedbackMsg('Your flowchart is empty. Add symbols from the toolbox to build your diagram.');
      return;
    }

    // If an explicit correctOrder is provided
    if (correctOrder && Array.isArray(correctOrder) && correctOrder.length > 0) {
      const currentIds = builtSequence.map(b => b.id);
      const isCorrect = currentIds.join(',') === correctOrder.join(',');

      if (isCorrect) {
        setStatus('success');
        setFeedbackMsg('Flowchart verified! The sequence follows the correct academic algorithmic structure.');
        if (onComplete) onComplete(true);
      } else {
        setStatus('error');
        // Provide targeted KTU pedagogical diagnostic
        if (builtSequence[0].shape !== 'START_END' && builtSequence[0].shape !== 'TERMINAL') {
          setFeedbackMsg('Incorrect sequence: Every flowchart must begin with a Terminal (Start) symbol.');
        } else if (builtSequence[builtSequence.length - 1].shape !== 'START_END' && builtSequence[builtSequence.length - 1].shape !== 'TERMINAL') {
          setFeedbackMsg('Incorrect sequence: Every flowchart must conclude with a Terminal (Stop/End) symbol.');
        } else if (builtSequence.length !== correctOrder.length) {
          setFeedbackMsg(`Flowchart has ${builtSequence.length} blocks, but this algorithm requires exactly ${correctOrder.length} steps.`);
        } else {
          setFeedbackMsg('The sequence has misplaced steps. Review the order of inputs, processing, and outputs.');
        }
      }
      return;
    }

    // General Structural Verification for Custom Mode
    const firstBlock = builtSequence[0];
    const lastBlock = builtSequence[builtSequence.length - 1];
    const hasStart = firstBlock.shape === 'START_END' || firstBlock.shape === 'TERMINAL';
    const hasEnd = (lastBlock.shape === 'START_END' || lastBlock.shape === 'TERMINAL') && builtSequence.length > 1;

    if (!hasStart) {
      setStatus('error');
      setFeedbackMsg('Structural Defect: A standard flowchart must start with a Terminal (START) oval symbol.');
      return;
    }

    if (!hasEnd) {
      setStatus('error');
      setFeedbackMsg('Structural Defect: A standard flowchart must conclude with a Terminal (STOP/END) symbol.');
      return;
    }

    setStatus('success');
    setFeedbackMsg('Valid Flowchart Structure! Includes valid terminal boundary symbols and sequential control flow.');
    if (onComplete) onComplete(true);
  };

  // Step-by-Step Simulation / Flow Trace
  const handleSimulateFlow = () => {
    if (builtSequence.length === 0) return;
    setIsSimulating(true);
    setActiveStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= builtSequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setActiveStepIndex(-1);
        }, 1200);
      } else {
        setActiveStepIndex(step);
      }
    }, 1000);
  };

  return (
    <div
      id="flowchart-builder-container"
      style={{
        border: '1px solid #cbd5e1',
        borderRadius: '12px',
        background: '#ffffff',
        margin: '24px 0',
        overflow: 'hidden',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: '#172033',
          color: '#f8fafc',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>📐</span>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff', fontWeight: 600 }}>{title}</h3>
          </div>
          {goal && (
            <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>{goal}</p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Syllabus Preset Selector */}
          <select
            defaultValue=""
            onChange={(e) => {
              handleLoadPreset(e.target.value);
              e.target.value = "";
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #475569',
              background: '#1e293b',
              color: '#f8fafc',
              fontSize: '0.82rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            <option value="" disabled>Load Syllabus Example...</option>
            {KTU_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>

          {/* Mode Switcher */}
          {availableBlocks && (
            <div style={{ display: 'flex', background: '#233044', borderRadius: '6px', padding: '2px' }}>
              <button
                onClick={() => setPaletteMode('exercise')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  background: paletteMode === 'exercise' ? '#315C8C' : 'transparent',
                  color: paletteMode === 'exercise' ? '#ffffff' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                Exercise Blocks
              </button>
              <button
                onClick={() => setPaletteMode('all')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  background: paletteMode === 'all' ? '#315C8C' : 'transparent',
                  color: paletteMode === 'all' ? '#ffffff' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                All 8 Syllabus Symbols
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SYMBOL TOOLBOX */}
      <div style={{ background: '#f8fafc', padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {paletteMode === 'exercise' ? 'Exercise Toolbox' : 'KTU Official 8-Symbol Palette'}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Tap button or drag onto canvas
          </span>
        </div>

        {/* Mode A: Exercise predefined blocks */}
        {paletteMode === 'exercise' && availableBlocks && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {availableBlocks.map((block) => (
              <button
                key={block.id}
                draggable
                onDragStart={(e) => handleToolboxDragStart(e, block)}
                onClick={() => handleAddBlock(block)}
                style={{
                  minHeight: '44px',
                  padding: '8px 16px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ color: '#315C8C', fontWeight: 'bold' }}>+</span>
                <span>{block.text}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                  {SYMBOL_DEFINITIONS[block.shape]?.shortName || block.shape}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Mode B: Full 8 Required Syllabus Symbols Toolbar with Drag-and-Drop */}
        {paletteMode === 'all' && (
          <FlowchartToolbar
            onAddSymbol={(type, text) => {
              const id = nextIdRef.current++;
              setBuiltSequence(prev => [...prev, {
                id: `node_${id}`,
                instanceId: `inst_${id}`,
                shape: type,
                text: text || SYMBOL_DEFINITIONS[type]?.defaultText || 'Block'
              }]);
              setStatus(null);
            }}
            onSelectSymbol={(type) => handleSelectSymbol(type)}
            selectedSymbolType={selectedSymbolType}
            customText={customText}
            setCustomText={setCustomText}
          />
        )}
      </div>

      {/* FLOWCHART CANVAS */}
      <div
        style={{
          padding: '32px 20px',
          background: '#fcfcfd',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {builtSequence.length === 0 ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
            }}
            onDrop={(e) => {
              e.preventDefault();
              const toolboxData = e.dataTransfer.getData('application/flowchart-toolbox');
              if (toolboxData) {
                try {
                  const parsed = JSON.parse(toolboxData);
                  handleAddBlock(parsed);
                } catch {
                  // ignore
                }
              }
            }}
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#94a3b8',
              maxWidth: '420px',
              border: '2px dashed #cbd5e1',
              borderRadius: '10px',
              width: '100%',
              background: '#f8fafc'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📐</div>
            <strong style={{ color: '#475569', display: 'block', marginBottom: '4px' }}>Canvas is Empty</strong>
            <span style={{ fontSize: '0.9rem' }}>
              Tap items from the toolbox above or drag symbols directly here to assemble your flowchart.
            </span>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {builtSequence.map((block, idx) => {
              const isEditing = editingId === block.instanceId;
              const isBeingDragged = draggedIndex === idx;
              const isOver = dragOverIndex === idx;
              const isCurrentStep = activeStepIndex === idx;

              return (
                <React.Fragment key={block.instanceId}>
                  {/* Drop Indicator before node */}
                  {isOver && (
                    <div
                      style={{
                        width: '80%',
                        height: '4px',
                        background: '#315C8C',
                        borderRadius: '2px',
                        margin: '4px 0',
                        boxShadow: '0 0 6px rgba(49, 92, 140, 0.5)'
                      }}
                    />
                  )}

                  {/* Flowchart Node Container */}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, idx)}
                    onDragEnd={handleDragEnd}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      opacity: isBeingDragged ? 0.4 : 1,
                      transform: isCurrentStep ? 'scale(1.05)' : 'none',
                      transition: 'transform 0.2s, opacity 0.2s',
                      position: 'relative',
                      padding: '4px 0'
                    }}
                  >
                    {/* Node Visual Shape (Center) */}
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'grab',
                        filter: isCurrentStep ? 'drop-shadow(0 0 8px #38d9a9)' : 'none'
                      }}
                    >
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '6px', width: '100%', maxWidth: '280px' }}>
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            style={{
                              flex: 1,
                              minHeight: '44px',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              border: '2px solid #315C8C',
                              fontSize: '0.9rem',
                              fontFamily: 'monospace'
                            }}
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(idx)}
                            style={{
                              minHeight: '44px',
                              minWidth: '44px',
                              background: '#16A34A',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: 'bold'
                            }}
                          >
                            ✓
                          </button>
                        </div>
                      ) : (
                        <div onClick={() => handleStartEdit(idx)} title="Click to edit text">
                          <FlowchartShape
                            shapeType={block.shape}
                            text={block.text}
                            isSelected={isCurrentStep}
                          />
                        </div>
                      )}
                    </div>

                    {/* Touch-Optimized Mobile Control Actions (Min Target 44px) */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <button
                        onClick={() => handleMoveBlock(idx, -1)}
                        disabled={idx === 0}
                        title="Move Up"
                        style={{
                          ...touchBtnStyle,
                          opacity: idx === 0 ? 0.3 : 1,
                          cursor: idx === 0 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleMoveBlock(idx, 1)}
                        disabled={idx === builtSequence.length - 1}
                        title="Move Down"
                        style={{
                          ...touchBtnStyle,
                          opacity: idx === builtSequence.length - 1 ? 0.3 : 1,
                          cursor: idx === builtSequence.length - 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleStartEdit(idx)}
                        title="Edit text"
                        style={{ ...touchBtnStyle, color: '#315C8C' }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleRemoveBlock(idx)}
                        title="Remove block"
                        style={{ ...touchBtnStyle, color: '#ef4444' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Directional Flow Arrow between sequential nodes */}
                  {idx < builtSequence.length - 1 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: '2px 0'
                      }}
                    >
                      <div
                        style={{
                          width: '2px',
                          height: '22px',
                          background: isCurrentStep ? '#38d9a9' : '#64748b'
                        }}
                      />
                      {/* Arrowhead */}
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderTop: `7px solid ${isCurrentStep ? '#38d9a9' : '#64748b'}`
                        }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Drop zone to append at end of flowchart */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                setDragOverIndex(builtSequence.length);
              }}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, builtSequence.length)}
              style={{
                width: '100%',
                maxWidth: '280px',
                padding: '10px',
                marginTop: '12px',
                border: dragOverIndex === builtSequence.length ? '2px dashed #315C8C' : '1px dashed #cbd5e1',
                borderRadius: '6px',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '0.8rem',
                background: dragOverIndex === builtSequence.length ? '#f0f9ff' : '#f8fafc',
                transition: 'all 0.15s'
              }}
            >
              + Drop symbol here to append
            </div>
          </div>
        )}
      </div>

      {/* Action Footer & Verification */}
      <div
        style={{
          background: '#f8fafc',
          padding: '16px 20px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={handleVerify}
            style={{
              minHeight: '44px',
              padding: '10px 28px',
              background: '#315C8C',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>✓</span>
            <span>Verify Flowchart</span>
          </button>

          <button
            onClick={handleSimulateFlow}
            disabled={builtSequence.length === 0 || isSimulating}
            style={{
              minHeight: '44px',
              padding: '10px 20px',
              background: '#172033',
              color: '#f8fafc',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: builtSequence.length === 0 || isSimulating ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>▶</span>
            <span>{isSimulating ? 'Tracing Flow...' : 'Trace Algorithm Flow'}</span>
          </button>

          <button
            onClick={() => {
              setBuiltSequence([]);
              setStatus(null);
              setFeedbackMsg('');
            }}
            style={{
              minHeight: '44px',
              padding: '10px 18px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              color: '#475569',
              fontWeight: 500,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>

        {/* Feedback Alert Card */}
        {status === 'success' && (
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              padding: '12px 16px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderLeft: '4px solid #16a34a',
              borderRadius: '6px',
              color: '#166534',
              fontSize: '0.92rem',
              fontWeight: 500,
              textAlign: 'center'
            }}
          >
            ✓ {feedbackMsg}
          </div>
        )}

        {status === 'error' && (
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              padding: '12px 16px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderLeft: '4px solid #dc2626',
              borderRadius: '6px',
              color: '#991b1b',
              fontSize: '0.92rem',
              fontWeight: 500,
              textAlign: 'center'
            }}
          >
            ⚠️ {feedbackMsg}
          </div>
        )}
      </div>
    </div>
  );
}

const touchBtnStyle = {
  minWidth: '44px',
  minHeight: '44px',
  background: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.95rem',
  color: '#334155',
  cursor: 'pointer',
  userSelect: 'none',
  touchAction: 'manipulation'
};
