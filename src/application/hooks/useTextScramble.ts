import { useState, useEffect, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const useTextScramble = (text: string, active: boolean = true) => {
  const [displayText, setDisplayText] = useState('');
  
  const scramble = useCallback(async () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(_prev => 
        text.split('')
          .map((_char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  }, [text]);

  useEffect(() => {
    if (active) {
      scramble();
    }
  }, [active, scramble]);

  return displayText;
};
