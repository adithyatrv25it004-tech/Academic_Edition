import React from 'react';
import ATPTeacher from './ATPTeacher';

export default function TeacherExplanation({ content, title, topic, note, quote, codeSnippet, onContinue }) {
  return (
    <ATPTeacher
      title={title || "ATP Teacher"}
      topic={topic}
      content={content}
      note={note}
      quote={quote}
      codeSnippet={codeSnippet}
      onContinue={onContinue}
    />
  );
}

