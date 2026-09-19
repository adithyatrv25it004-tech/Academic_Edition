import React, { useState } from 'react';
import { SYMBOL_DEFINITIONS, SYMBOL_KEYS } from './flowchartSymbols';

/**
 * FlowchartToolbar
 * APJ Abdul Kalam Technological University (KTU) S1 UCEST105
 * 8 Official Syllabus Symbols Toolbar with Drag-and-Drop & Touch Support
 */
export default function FlowchartToolbar({
  onAddSymbol,
  onSelectSymbol,
  selectedSymbolType,
  customText,
  setCustomText,
  className = '',
  compact = false
}) {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'BASIC' | 'CONTROL' | 'CONNECTORS'
  const [draggedSymbol, setDraggedSymbol] = useState(null);
  const [hoveredSymbol, setHoveredSymbol] = useState(null);

  const filterSymbols = () => {
    switch (activeTab) {
      case 'BASIC':
        return ['START_END', 'PROCESS', 'INPUT_OUTPUT'];
      case 'CONTROL':
        return ['DECISION', 'MODULE', 'HEXAGON'];
      case 'CONNECTORS':
        return ['ON_PAGE_CONNECTOR', 'OFF_PAGE_CONNECTOR'];
      default:
        return SYMBOL_KEYS;
    }
  };

  const currentSymbols = filterSymbols();

  const handleDragStart = (e, symKey) => {
    const sym = SYMBOL_DEFINITIONS[symKey];
    setDraggedSymbol(symKey);
    e.dataTransfer.effectAllowed = 'copy';
    const payload = JSON.stringify({
      shape: sym.type,
      text: selectedSymbolType === sym.type && customText ? customText : sym.defaultText
    });
    e.dataTransfer.setData('application/flowchart-toolbox', payload);
    e.dataTransfer.setData('text/plain', sym.defaultText);
  };

  const handleDragEnd = () => {
    setDraggedSymbol(null);
  };

  const renderSymbolMiniSvg = (type) => {
    const w = 48;
    const h = 28;
    switch (type) {
      case 'START_END':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <rect x="2" y="4" width={w - 4} height={h - 8} rx={(h - 8) / 2} fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <text x={w / 2} y={h / 2 + 3} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#78350F">START</text>
          </svg>
        );
      case 'PROCESS':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <rect x="2" y="4" width={w - 4} height={h - 8} rx="2" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2" />
            <text x={w / 2} y={h / 2 + 3} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#312E81">a + b</text>
          </svg>
        );
      case 'INPUT_OUTPUT':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <polygon points={`7,4 ${w - 2},4 ${w - 7},${h - 4} 2,${h - 4}`} fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
            <text x={w / 2} y={h / 2 + 3} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#064E3B">I / O</text>
          </svg>
        );
      case 'DECISION':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <polygon points={`${w / 2},2 ${w - 2},${h / 2} ${w / 2},${h - 2} 2,${h / 2}`} fill="#FFF1F2" stroke="#E11D48" strokeWidth="2" />
            <text x={w / 2} y={h / 2 + 3} textAnchor="middle" fontSize="7" fontWeight="bold" fill="#881337">?</text>
          </svg>
        );
      case 'MODULE':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <rect x="2" y="4" width={w - 4} height={h - 8} rx="2" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />
            <line x1="10" y1="4" x2="10" y2={h - 4} stroke="#0284C7" strokeWidth="1.5" />
            <line x1={w - 10} y1="4" x2={w - 10} y2={h - 4} stroke="#0284C7" strokeWidth="1.5" />
            <text x={w / 2} y={h / 2 + 3} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0C4A6E">CALL</text>
          </svg>
        );
      case 'HEXAGON':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <polygon points={`10,4 ${w - 10},4 ${w - 2},${h / 2} ${w - 10},${h - 4} 10,${h - 4} 2,${h / 2}`} fill="#FAF5FF" stroke="#9333EA" strokeWidth="2" />
            <text x={w / 2} y={h / 2 + 3} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#581C87">FOR</text>
          </svg>
        );
      case 'ON_PAGE_CONNECTOR':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <circle cx={w / 2} cy={h / 2} r="10" fill="#F0FDFA" stroke="#0D9488" strokeWidth="2" />
            <text x={w / 2} y={h / 2 + 3.5} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#134E4A">A</text>
          </svg>
        );
      case 'OFF_PAGE_CONNECTOR':
        return (
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            <polygon points={`12,4 ${w - 12},4 ${w - 12},16 ${w / 2},${h - 2} 12,16`} fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
            <text x={w / 2} y={h / 2} textAnchor="middle" fontSize="7" fontWeight="bold" fill="#7C2D12">P.2</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="flowchart-syllabus-toolbar"
      className={`flowchart-toolbar bg-slate-900 border border-slate-700/80 rounded-xl p-3.5 text-slate-100 ${className}`}
      role="toolbar"
      aria-label="KTU S1 UCEST105 Flowchart Symbols Toolbar"
    >
      {/* Header with Title and Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs uppercase tracking-wider font-bold text-slate-300">
            Syllabus Flowchart Symbols (8 Required)
          </span>
          <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full font-mono border border-indigo-800/60">
            KTU UCEST105
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800 text-xs">
          {[
            { id: 'ALL', label: 'All 8' },
            { id: 'BASIC', label: 'Basic I/O & Process' },
            { id: 'CONTROL', label: 'Control & Loops' },
            { id: 'CONNECTORS', label: 'Connectors' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded transition-colors text-xs font-medium ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drag & Drop Guidance Banner */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2.5 px-1">
        <span className="flex items-center gap-1.5">
          <span className="text-indigo-400">↕ Drag</span> any symbol directly to canvas or click to add
        </span>
        {hoveredSymbol && (
          <span className="text-amber-300 truncate max-w-[280px]">
            {SYMBOL_DEFINITIONS[hoveredSymbol]?.academicUsage}
          </span>
        )}
      </div>

      {/* Grid of 8 Required Syllabus Symbols with Drag-and-Drop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {currentSymbols.map((key) => {
          const sym = SYMBOL_DEFINITIONS[key];
          const isSelected = selectedSymbolType === key;
          const isDragging = draggedSymbol === key;

          return (
            <div
              key={key}
              id={`symbol-tool-${key.toLowerCase()}`}
              draggable
              onDragStart={(e) => handleDragStart(e, key)}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => setHoveredSymbol(key)}
              onMouseLeave={() => setHoveredSymbol(null)}
              onClick={() => {
                if (onSelectSymbol) onSelectSymbol(key);
                if (setCustomText && !isSelected) {
                  setCustomText(sym.defaultText);
                }
              }}
              title={`${sym.name}: ${sym.academicUsage} (Drag to canvas or click)`}
              className={`group relative flex flex-col items-center justify-between p-2 rounded-lg border text-center transition-all cursor-grab active:cursor-grabbing select-none ${
                isSelected
                  ? 'bg-indigo-950/80 border-indigo-400 shadow-md ring-1 ring-indigo-400'
                  : 'bg-slate-800/90 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
              } ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}`}
              style={{ minHeight: compact ? '64px' : '92px' }}
            >
              {/* Category mini-tag */}
              <span className="text-[9px] uppercase font-bold tracking-tight text-slate-400 mb-1">
                {sym.syllabusCategory}
              </span>

              {/* Graphical Symbol Miniature */}
              <div className="my-1 flex items-center justify-center pointer-events-none">
                {renderSymbolMiniSvg(sym.type)}
              </div>

              {/* Label */}
              <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white leading-tight">
                {sym.shortName}
              </span>

              {/* Add Button for mobile / quick addition */}
              {onAddSymbol && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const text = isSelected && customText ? customText : sym.defaultText;
                    onAddSymbol(sym.type, text);
                  }}
                  className="mt-1.5 w-full py-0.5 px-1 text-[10px] font-medium bg-slate-700/80 hover:bg-indigo-600 text-slate-300 hover:text-white rounded border border-slate-600/50 transition-colors"
                  aria-label={`Add ${sym.name} to flowchart`}
                >
                  + Add
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Symbol Custom Text Editor & Quick Insert Bar */}
      {selectedSymbolType && setCustomText && onAddSymbol && (
        <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">
            Customize <strong>{SYMBOL_DEFINITIONS[selectedSymbolType]?.shortName}</strong>:
          </span>
          <input
            id="flowchart-toolbar-custom-text"
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && customText.trim()) {
                onAddSymbol(selectedSymbolType, customText.trim());
              }
            }}
            placeholder={`e.g. ${SYMBOL_DEFINITIONS[selectedSymbolType]?.defaultText}`}
            className="flex-1 min-w-[160px] bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <button
            type="button"
            onClick={() => onAddSymbol(selectedSymbolType, customText || SYMBOL_DEFINITIONS[selectedSymbolType]?.defaultText)}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold shadow transition-colors flex items-center gap-1"
          >
            <span>+ Add Block to Flowchart</span>
          </button>
        </div>
      )}
    </div>
  );
}
