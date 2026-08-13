import { useEffect, useState } from "react";

const letter = `Happy birthday, Randall.

Today is for celebrating you — the person you are, the moments you have made, and all the good still ahead of you.

I hope this next year brings you happiness, peace, and every opportunity you deserve. May it be filled with good people, unforgettable memories, and reasons to be proud of yourself.

Here’s to you, to new memories, and to a beautiful year ahead.`;

export default function BirthdayPage({ videoRef, videoComplete, onVideoComplete, onVideoReplay }) {
  const [letterLength, setLetterLength] = useState(0);

  useEffect(() => {
    if (!videoComplete) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLetterLength(letter.length);
      return undefined;
    }

    setLetterLength(0);
    let currentLength = 0;
    let timer;
    const typeNext = () => {
      currentLength += 1;
      setLetterLength(currentLength);
      if (currentLength < letter.length) {
        const character = letter[currentLength - 1];
        timer = window.setTimeout(typeNext, character === "\n" ? 180 : ".,!".includes(character) ? 85 : 19);
      }
    };
    timer = window.setTimeout(typeNext, 500);
    return () => window.clearTimeout(timer);
  }, [videoComplete]);

  const replayFromFrame = () => {
    if (!videoComplete) return;
    onVideoReplay();
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const scrollToLetter = () => {
    document.querySelector(".letter-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className={`birthday-page ${videoComplete ? "birthday-page--unlocked" : ""}`}>
      <section className={`video-moment ${videoComplete ? "video-moment--finished" : ""}`} aria-label="A birthday video for Randall">
        <div className={`video-frame ${videoComplete ? "video-frame--finished" : ""}`}>
          <video ref={videoRef} src="/assets/randall-birthday-video.mp4" playsInline onClick={replayFromFrame} onEnded={onVideoComplete} />
        </div>
        {videoComplete && (
          <>
            <button className="video-replay" type="button" onClick={replayFromFrame} aria-label="Play the birthday video again">
              <span className="video-replay__icon" aria-hidden="true">↻</span>
              <span>Play again</span>
            </button>
            <button className="scroll-cue" type="button" onClick={scrollToLetter}>
              <span>Scroll</span>
              <b aria-hidden="true">↓</b>
            </button>
          </>
        )}
      </section>

      <section className="letter-section" aria-label="Birthday letter for Randall">
        <article className="letter-card">
          <p className="letter-card__greeting">dear Randall,</p>
          <p className="letter-card__body">
            {letter.slice(0, letterLength)}
            {letterLength < letter.length && <span className="typing-cursor" aria-hidden="true" />}
          </p>
          <p className={`letter-card__signature ${letterLength === letter.length ? "letter-card__signature--visible" : ""}`}>with warm wishes</p>
        </article>
        <section className="memory-gallery" aria-label="Photo memories">
          <p className="memory-gallery__title">a few memories</p>
          <div className="memory-gallery__track">
            <figure className="polaroid polaroid--one"><span aria-hidden="true" /></figure>
            <figure className="polaroid polaroid--two"><span aria-hidden="true" /></figure>
            <figure className="polaroid polaroid--three"><span aria-hidden="true" /></figure>
          </div>
          <p className="memory-gallery__hint">swipe through</p>
        </section>
        <footer>made especially for Randall</footer>
      </section>
    </article>
  );
}
