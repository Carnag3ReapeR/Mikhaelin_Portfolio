// Typewriter effect: types, pauses, deletes, and cycles through an array of words.
// 
// Used by the hero terminal to animate role text from profile.json#terminal.roles.
// Respects prefers-reduced-motion by showing the first word statically (no animation).

import { useEffect, useState } from 'react';

const TYPE_SPEED_MS = 70;
const DELETE_SPEED_MS = 40;
const PAUSE_AFTER_TYPE_MS = 1400;
const PAUSE_AFTER_DELETE_MS = 300;

export function useTypewriter(words = []) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (words.length === 0) return undefined;

    if (prefersReducedMotion) {
      setText(words[0]);
      return undefined;
    }

    const currentWord = words[wordIndex % words.length];
    let timeoutId;

    if (!isDeleting && text === currentWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE_MS);
    } else if (isDeleting && text === '') {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }, PAUSE_AFTER_DELETE_MS);
    } else {
      const nextLength = isDeleting ? text.length - 1 : text.length + 1;
      const speed = isDeleting ? DELETE_SPEED_MS : TYPE_SPEED_MS;
      timeoutId = setTimeout(() => {
        setText(currentWord.slice(0, nextLength));
      }, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, words, prefersReducedMotion]);

  return text;
}
