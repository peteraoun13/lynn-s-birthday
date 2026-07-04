import { useEffect, useState } from "react";

// This is the letter that writes itself after Lynn opens the surprise.
// Edit only the words inside the backticks if you want to personalize it.
const birthdayLetter = `I've been trying to figure out how to put into words what you mean to me, and honestly, I don't think any words could be enough.

You're my cousin, but that word has never really felt like enough. You're my best friend. You're my sister. You're the one I trust most in this entire world, and you have been since we were kids. When I think back on my childhood, all of my favorite memories have you in them the silly moments, the deep conversations, the times we laughed so hard we couldn't breathe, and even the quiet ordinary days that somehow became special just because we were together. Every single memory with you is one I hold onto tightly.

I want you to know how proud I am of you. Watching you grow up, become the woman you are today, and continue to grow more and more every year it's honestly one of the greatest joys of my life. I wish for you everything your heart desires. Every dream you're chasing, every goal you've set, every little thing that makes you smile I hope it all comes true for you, because you deserve nothing less.

And I can't help but get excited thinking about our future together. We already dream about the day we get to go on vacation as families and our kids running around, playing, laughing, making their own memories together the way we did. I can picture it so clearly: all of us together, older, but still just as close, still best friends.

Lynn, thank you for being who you are. Thank you for every year of friendship, every memory, every moment of just being there. I love you more than words can really say, and I'm so grateful my cousin, my best friend, my sister.

I pray that God keeps you safe, blesses you with health, happiness, and peace, and fills every year ahead of you with more joy than the last. I pray He watches over you always, and that He keeps our bond just as strong as it's always been.

Happy birthday, Lynn. Here's to many more years of us.

I love you.`;

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

      timer = window.setTimeout(
        writeNextCharacter,
        typingDelay(birthdayLetter[currentLength - 1]),
      );
    };

    timer = window.setTimeout(writeNextCharacter, 1100);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isRevealed, replayKey]);

  const replayLetter = () => {
    setReplayKey((key) => key + 1);
    document.querySelector(".letter-card")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <article className={`birthday-page ${isRevealed ? "birthday-page--revealed" : ""}`}>
      <div className="floating-hearts" aria-hidden="true">
        <span>♡</span>
        <span>✦</span>
        <span>♡</span>
        <span>✧</span>
      </div>

      <header className="birthday-header">
        <h1>happy birthday, Lynno</h1>
      </header>

      <div className="portrait-moment" aria-hidden="true">
        <img src="/assets/stars-left.png" alt="" />
        <img className="portrait-moment__photo" src="/assets/top-photo.png" alt="" />
        <img src="/assets/stars-right.png" alt="" />
      </div>

      <section className="letter-card" aria-label="A birthday letter for Lynn">
        <span className="letter-card__tape" aria-hidden="true" />
        <p className="letter-card__greeting">my dearest Lynn,</p>
        <p className="letter-card__body" aria-live="polite">
          {birthdayLetter.slice(0, letterLength)}
          {!isFinished && isRevealed && (
            <span className="typing-cursor" aria-hidden="true" />
          )}
        </p>

        <div className={`letter-signature ${isFinished ? "letter-signature--visible" : ""}`}>
          <span>with all my love ♡</span>
        </div>
      </section>

      <div className={`ending ${isFinished ? "ending--visible" : ""}`}>
        <p>here’s to you, today and always.</p>
        <button type="button" onClick={replayLetter}>read it again</button>
      </div>

      <footer>made with all my love · 2026</footer>
    </article>
  );
}
