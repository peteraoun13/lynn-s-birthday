import { useEffect, useState } from "react";

const birthdayLetter = `
I don't say this enough, but I'm really proud of you. You've been through a lot, more than people probably realize, and you never let it stop you. Life threw things your way that could've broken a lot of people, but you just kept going, kept fighting, and look at who you became because of it. Not everyone could've handled what you did and come out the other side like this stronger, wiser, and still you.

I pray that God keeps guiding you every step of the way, in everything you do and everywhere life takes you. And I want you to know, no matter what happens, I'll always be there for you. Through the good times and the hard ones, you can always count on me. I love you a lot, man, more than I probably show.

Genuinely grateful to have you in my life. You deserve every good thing coming your way, and I hope this year brings you peace, success, and happiness.

Happy birthday 🎂`;

function typingDelay(character) {
  if (character === "\n") return 260;
  if (".!?".includes(character)) return 115;
  if (",—".includes(character)) return 65;
  return 24;
}

export default function BirthdayPage({ isRevealed }) {
  const [letterLength, setLetterLength] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (!isRevealed) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLetterLength(birthdayLetter.length);
      setIsFinished(true);
      return undefined;
    }
    let timer;
    let currentLength = 0;
    let cancelled = false;
    setLetterLength(0);
    setIsFinished(false);
    const writeNextCharacter = () => {
      if (cancelled) return;
      currentLength += 1;
      setLetterLength(currentLength);
      if (currentLength >= birthdayLetter.length) {
        setIsFinished(true);
        return;
      }
      timer = window.setTimeout(writeNextCharacter, typingDelay(birthdayLetter[currentLength - 1]));
    };
    timer = window.setTimeout(writeNextCharacter, 1100);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [isRevealed, replayKey]);

  const replayLetter = () => {
    setReplayKey((key) => key + 1);
    document.querySelector(".letter-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className={`birthday-page ${isRevealed ? "birthday-page--revealed" : ""}`}>
      <div className="floating-details" aria-hidden="true"><span>✦</span><span>+</span><span>✦</span><span>+</span></div>
      <header className="birthday-header"><h1>happy birthday, Joe</h1></header>
      <div className="portrait-moment" aria-label="Memories with Joe">
        <span className="portrait-moment__line" aria-hidden="true" />
        <div className="photo-stack">
          <img className="polaroid polaroid--friends" src="/assets/joe-polaroid-friends.png" alt="Joe with a friend" />
          <img className="polaroid polaroid--graduation" src="/assets/joe-polaroid-graduation.png" alt="Joe at graduation with a friend" />
        </div>
        <span className="portrait-moment__line" aria-hidden="true" />
      </div>
      <section className="letter-card" aria-label="A birthday letter for Joe">
        <span className="letter-card__tape" aria-hidden="true" />
        <p className="letter-card__greeting">happy birthday Brother,</p>
        <p className="letter-card__body" aria-live="polite">{birthdayLetter.slice(0, letterLength)}{!isFinished && isRevealed && <span className="typing-cursor" aria-hidden="true" />}</p>
        <div className={`letter-signature ${isFinished ? "letter-signature--visible" : ""}`}><span>with love, always</span></div>
      </section>
      <div className={`ending ${isFinished ? "ending--visible" : ""}`}><p>happy birthday, Joe.</p><button type="button" onClick={replayLetter}>read it again</button></div>
      <footer>made for Joe · 2026</footer>
    </article>
  );
}
