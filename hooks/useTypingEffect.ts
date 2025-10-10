import { useState, useEffect } from 'react';

/**
 * A custom hook for creating a typing animation effect with simulated typos and backspacing.
 * @param textToType The full string to be typed out.
 * @param start A boolean to trigger the animation.
 * @param delay An optional delay in milliseconds before the animation starts.
 * @param speed The base speed of typing in milliseconds per character.
 * @param backspaceSpeed The speed of backspacing to correct typos.
 * @param typoChance The probability (0 to 1) of a typo occurring on any given character.
 * @returns An object containing the currently displayed text and a boolean indicating if typing is in progress.
 */
export const useTypingEffect = (textToType: string, start: boolean, delay: number = 0, speed = 60, backspaceSpeed = 40, typoChance = 0.04) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    const startTypingTimer = window.setTimeout(() => {
        setDisplayedText('');
        setIsTyping(true);
        let i = 0;
        let currentText = '';
        let timeoutId: number;
    
        const type = () => {
          if (i < textToType.length) {
            // Decide if we should make a typo
            if (Math.random() < typoChance && textToType[i] !== ' ' && i > 0 && textToType[i-1] !== ' ') {
              const wrongChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // random lowercase letter
              currentText += wrongChar;
              setDisplayedText(currentText);
    
              timeoutId = window.setTimeout(() => {
                currentText = currentText.slice(0, -1);
                setDisplayedText(currentText);
                // After backspacing, proceed to type the correct character
                timeoutId = window.setTimeout(type, backspaceSpeed + Math.random() * 50);
              }, speed + Math.random() * 150); // Pause before correcting
            } else {
              // Type the correct character
              currentText += textToType[i];
              setDisplayedText(currentText);
              i++;
              timeoutId = window.setTimeout(type, speed + Math.random() * 80);
            }
          } else {
            setIsTyping(false); // Typing is complete
          }
        };
    
        timeoutId = window.setTimeout(type, speed);
    
        // Cleanup function for the typing effect
        return () => {
          clearTimeout(timeoutId);
          setIsTyping(false);
        };
    }, delay);

    // Cleanup function for the initial delay timer
    return () => {
        clearTimeout(startTypingTimer);
    };

  }, [textToType, start, delay, speed, backspaceSpeed, typoChance]);

  return { displayedText, isTyping };
};
