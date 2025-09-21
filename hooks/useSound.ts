import { useCallback, useRef, useEffect } from 'react';

// Custom hook to manage and play audio sounds (base64 or URL).
export const useSound = (sound: string, volume: number = 0.2) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Always create a new Audio element on sound/volume change.
      const audio = new Audio(sound);
      audio.volume = volume;
      audioRef.current = audio;
      // Cleanup on unmount or sound/volume change
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
        }
      };
    }
  }, [sound, volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        // "void" is to silence Promise warning for play()
        void audioRef.current.play();
      } catch (error: any) {
        if (error.name !== 'NotAllowedError') {
          console.error("Audio playback error:", error);
        }
      }
    }
  }, []);

  return play;
};
