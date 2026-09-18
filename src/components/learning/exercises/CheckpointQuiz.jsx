import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function CheckpointQuiz({ questions, lessonId, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIdx];

  const handleSelect = (idx) => {
    if (showExplanation) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    
    const isCorrect = selectedOpt === question.correctAnswer;
    if (isCorrect) setScore(score + 1);
    
    setShowExplanation(true);
  };

  const handleNext = async () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
      const finalScore = Math.round(((score + (selectedOpt === question.correctAnswer ? 1 : 0)) / questions.length) * 100);
      
      // Save progress to Supabase
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          await supabase.from('python_learning_progress').upsert({
            user_id: userData.user.id,
            lesson_id: lessonId,
            status: finalScore >= 70 ? 'completed' : 'in_progress',
            best_score: finalScore,
            updated_at: new Date().toISOString(),
            completed_at: finalScore >= 70 ? new Date().toISOString() : null
          }, { onConflict: 'user_id, lesson_id' });
        }
      } catch (err) {
        console.error('Progress sync failed:', err);
      }

      if (onComplete) onComplete(finalScore);
    }
  };

  if (finished) return null; // Parent component will show results

  return (
    <div style={{ border: '2px solid var(--border)', borderRadius: '8px', padding: '24px', background: '#fff' }}>
      <h3 style={{ margin: '0 0 16px 0', color: 'var(--text)', fontSize: '1.2rem' }}>
        Checkpoint {currentIdx + 1} of {questions.length}
      </h3>
      <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>{question.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {question.options.map((opt, idx) => {
          let bg = '#f6f8fa';
          let border = '2px solid transparent';
          
          if (showExplanation) {
            if (idx === question.correctAnswer) {
              bg = '#dafbe1'; border = '2px solid #238636';
            } else if (idx === selectedOpt) {
              bg = '#ffebe9'; border = '2px solid #da3633';
            }
          } else if (idx === selectedOpt) {
            bg = '#e6f1ff'; border = '2px solid #0969da';
          }

          return (
            <div 
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: bg,
                border: border,
                cursor: showExplanation ? 'default' : 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s'
              }}
            >
              {opt}
            </div>
          );
        })}
      </div>

      {showExplanation && (
        <div style={{ marginTop: '20px', padding: '16px', background: '#f6f8fa', borderRadius: '8px', borderLeft: '4px solid #0969da' }}>
          <strong>{selectedOpt === question.correctAnswer ? '✓ Correct!' : '✗ Not quite.'}</strong>
          <p style={{ margin: '8px 0 0 0' }}>{question.explanation}</p>
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        {!showExplanation ? (
          <button className="btn-primary" onClick={handleSubmit} disabled={selectedOpt === null} style={{ padding: '10px 24px' }}>
            Check Answer
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext} style={{ padding: '10px 24px' }}>
            {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Checkpoint'}
          </button>
        )}
      </div>
    </div>
  );
}
