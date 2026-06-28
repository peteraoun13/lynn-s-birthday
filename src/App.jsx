import { useEffect, useRef, useState } from "react";
import OpeningScreen from "./OpeningScreen";
import BirthdayPage from "./BirthdayPage";

export default function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const fadeTimer = useRef(null);
  const audioRef = useRef(null);

  const startSurprise = () => {
    if (isFading) return;

    // Audio playback begins inside the tap event so it works on iPhone/Android.
    if (audioRef.current) {
      audioRef.current.volume = 0.72;
      audioRef.current.play().catch(() => {
        // Some browsers may still block playback when the device is muted.
      });
    }

    setIsFading(true);
    fadeTimer.current = window.setTimeout(() => setShowOpening(false), 800);
  };

  useEffect(() => () => window.clearTimeout(fadeTimer.current), []);

  return (
    <main className={`app-shell ${showOpening ? "opening-active" : ""}`}>
      <BirthdayPage isRevealed={isFading || !showOpening} />
      {showOpening && (
        <OpeningScreen isFading={isFading} onStart={startSurprise} />
      )}
      {/* Replace this path if you change the birthday song. */}
      <audio ref={audioRef} src="/assets/song.mp3" preload="auto" loop />
    </main>
  );
}
