import { useEffect, useState } from "react";

const letter = `Happy birthday, Randall.

Today is for celebrating you — the person you are, the moments you have made, and all the good still ahead of you.

I hope this next year brings you happiness, peace, and every opportunity you deserve. May it be filled with good people, unforgettable memories, and reasons to be proud of yourself.

Here’s to you, to new memories, and to a beautiful year ahead.`;

function BackButton({ onClick }) {
  return <button className="back-button" type="button" onClick={onClick}>← Back</button>;
}

export default function BirthdayPage({ activeView, videoRef, videoComplete, onVideoComplete, onReplay, onNavigate }) {
  const [letterLength, setLetterLength] = useState(0);
  const [wishMade, setWishMade] = useState(false);
  const memoryCaptions = ["summer days", "by the sea", "a good adventure", "golden hour", "the little moments", "always a view"];

  useEffect(() => {
    if (activeView !== "letter") return undefined;
    setLetterLength(0);
    let currentLength = 0;
    let timer;
    const typeNext = () => {
      currentLength += 1;
      setLetterLength(currentLength);
      if (currentLength < letter.length) timer = window.setTimeout(typeNext, letter[currentLength - 1] === "\n" ? 180 : 19);
    };
    timer = window.setTimeout(typeNext, 360);
    return () => window.clearTimeout(timer);
  }, [activeView]);

  if (activeView === "video") {
    return (
      <article className={`birthday-page video-page ${videoComplete ? "video-page--finished" : ""}`}>
        <section className="video-moment" aria-label="A birthday video">
          <div className={`video-frame ${videoComplete ? "video-frame--finished" : ""}`}>
            <video ref={videoRef} src="/assets/randall-birthday-video.mp4" playsInline onEnded={onVideoComplete} />
          </div>
          <BackButton onClick={() => onNavigate("menu")} />
          {videoComplete && <button className="video-replay" type="button" onClick={onReplay}>↻&nbsp; Play again</button>}
          {videoComplete && <button className="scroll-cue" type="button" onClick={() => onNavigate("letter")}>View letter <b aria-hidden="true">→</b></button>}
        </section>
      </article>
    );
  }

  if (activeView === "memories") {
    return (
      <article className="birthday-page content-page">
        <BackButton onClick={() => onNavigate("menu")} />
        <section className="memory-gallery memory-gallery--page" aria-label="Photo memories">
          <p className="memory-gallery__title">a few memories</p>
          <div className="memory-gallery__track">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <figure className={`polaroid polaroid--memory-${number}`} key={number}>
                <img src={`/assets/randall-memory-${number}.jpeg`} alt={`A memory with Randall ${number}`} />
                <figcaption>{memoryCaptions[number - 1]}</figcaption>
              </figure>
            ))}
          </div>
          <section className="memory-celebration" aria-label="A birthday wish">
            <span className="birthday-stamp" aria-hidden="true">HB<br /><small>2026</small></span>
            <div className={`wish-cake ${wishMade ? "wish-cake--made" : ""}`}>
              <span className="wish-cake__flame" aria-hidden="true" />
              <span className="wish-cake__candle" aria-hidden="true" />
              <span className="wish-cake__icing" aria-hidden="true" />
              <span className="wish-cake__base" aria-hidden="true" />
              <span className="wish-cake__berry wish-cake__berry--one" aria-hidden="true" />
              <span className="wish-cake__berry wish-cake__berry--two" aria-hidden="true" />
            </div>
            <div className="memory-celebration__words">
              <p>{wishMade ? "wish granted" : "one more wish for you"}</p>
              <button type="button" onClick={() => setWishMade(true)}>{wishMade ? "happy birthday" : "make a wish"}</button>
            </div>
          </section>
          <p className="memory-closing">Here’s to all the places you’ve been — and every good memory still waiting ahead.</p>
        </section>
      </article>
    );
  }

  return (
    <article className="birthday-page content-page">
      <BackButton onClick={() => onNavigate("menu")} />
      <section className="letter-section letter-section--open" aria-label="Birthday letter">
        <article className="letter-card">
          <p className="letter-card__greeting">dear Randall,</p>
          <p className="letter-card__body">{letter.slice(0, letterLength)}{letterLength < letter.length && <span className="typing-cursor" aria-hidden="true" />}</p>
          <p className={`letter-card__signature ${letterLength === letter.length ? "letter-card__signature--visible" : ""}`}>with warm wishes</p>
        </article>
        <button className="content-link" type="button" onClick={() => onNavigate("memories")}>View memories →</button>
      </section>
    </article>
  );
}
