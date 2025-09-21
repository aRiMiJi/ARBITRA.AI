import React, { useState, useEffect } from 'react';

const LOGO_FONT = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 700,
  textTransform: 'uppercase',
  fontSize: 48,
  color: '#EAEAEA',
  letterSpacing: '0.11em',
};

const MAIN_TEXT = ['A', 'R', 'B', 'I', 'T', 'R', 'A'];

const Preloader: React.FC = () => {
  const [shown, setShown] = useState(Array(MAIN_TEXT.length).fill(false));
  const [scanLineY, setScanLineY] = useState(0);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    // Slower letter-by-letter appearance for drama
    MAIN_TEXT.forEach((_, i) => {
      timers.push(setTimeout(() => setShown(s => {
        let arr = [...s];
        arr[i] = true;
        return arr;
      }), 550 + i * 40)); // much slower than before
    });
    // Slower scanline/fade-out for max premium
    let start = 0;
    function moveScan() {
      setScanLineY(y => {
        if (y < 60) {
          start = requestAnimationFrame(moveScan);
          return y + 0.8; // slow
        } else {
          cancelAnimationFrame(start);
          setTimeout(() => setAnimDone(true), 2200); // long hold/fade
          return 30;
        }
      });
    }
    moveScan();
    return () => { timers.forEach(clearTimeout); cancelAnimationFrame(start); };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark"
      style={{
        transition: "opacity 600ms cubic-bezier(.65,.06,.2,1.08)",
        opacity: animDone ? 0 : 1,
        pointerEvents: animDone ? 'none' : 'auto'
      }}
    >
      <div className="relative">
        <span
          style={{
            ...LOGO_FONT,
            display: 'inline-flex',
            alignItems: 'center',
            filter: 'drop-shadow(0 0 22px #00f6ffbb)',
            textShadow: '0 2px 24px #00f2ff42, 0 1px #00333b',
          }}
        >
          {MAIN_TEXT.map((char, i) => (
            <span
              key={i}
              className="relative"
              style={{
                opacity: shown[i] ? 1 : 0,
                transform: shown[i]
                  ? 'none'
                  : `translateY(${(Math.random() - 0.5) * 28}px) skew(-10deg,0deg) scaleY(.88)`,
                filter: shown[i]
                  ? 'none'
                  : 'blur(2.2px) brightness(1.4)',
                color: '#EAEAEA',
                textShadow: shown[i]
                  ? '0 0 30px #00f6ffb6, 0 1px 3px #00f6fc70'
                  : 'none',
                transition: `
                  opacity 330ms cubic-bezier(.21,.11,.27,1.05) ${i * 119 + 78}ms,
                  transform 1000ms cubic-bezier(.19,.53,.54,1.21) ${i * 77 + 32}ms,
                  text-shadow 600ms cubic-bezier(.35,.16,.41,.93) ${i * 87}ms
                `
              }}
            >
              {char}
              {/* Glitch overlay */}
              {shown[i] && (
                <span style={{
                  position: 'absolute',
                  left: -2,
                  top: 0,
                  width: '120%',
                  height: '22%',
                  background: 'linear-gradient(90deg,#00fff2b6,rgba(0,0,0,0.01))',
                  opacity: Math.random() > 0.9 ? 1 : 0,
                  filter: 'blur(1.1px)'
                }}></span>
              )}
            </span>
          ))}
        </span>
        {/* Neon scanline */}
        <span
          style={{
            position: 'absolute',
            left: '-10%',
            right: '-10%',
            top: `${scanLineY}%`,
            height: '13px',
            background: 'linear-gradient(93deg,#00f6ff 11%,#fff0 71%)',
            opacity: 0.31,
            filter: 'blur(3.2px)',
            zIndex: 9,
            pointerEvents: 'none',
            borderRadius: 14,
            transition: 'top 70ms'
          }}
        />
      </div>
      <p className="mt-5 font-mono text-sm uppercase tracking-widest text-brand-cyan animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Preloader;
