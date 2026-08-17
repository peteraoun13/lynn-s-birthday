import { useEffect, useState } from "react";

const letter = `Dear Randall,

I don’t even know where I should start. Should I start with Happy Birthday? Or with telling you that you are my favorite human? Or that I thank God for you every single day? Or that you are such an example of what it means to be a real man? Or that I love you so much? Or that you will always be my one and only best friend?

And still, all of these words could never describe who you are in my heart.

I was searching for the right words to write to you, but I realized that there probably aren’t enough words to explain what you mean to me. You became such an important part of my life that sometimes I don’t even remember what life felt like before having you in it.

You are not only my best friend. You are someone I look up to, someone I trust with all my heart, someone I can laugh with, talk to about anything, and simply be myself around. You have shown me through your actions what kindness, loyalty, strength, generosity, and love really look like.

I thank God for every conversation, every laugh, every memory, every piece of advice, every stupid moment, and even every disagreement, because every single one of them became part of a friendship that I would never trade for anything.

You have a heart that is so rare, Randall. You give so much of yourself to the people you love, and sometimes I wonder if you even realize how much you mean to everyone around you. I hope you always remember how loved, appreciated, and important you are.

May God protect you wherever you go and keep you safe from every harm. May He give you health, peace, strength, and many beautiful years ahead. May He bless every step you take, every decision you make, and every dream you carry in your heart. May He always surround you with people who love you genuinely and give back to you even a little of the love and goodness that you give to everyone else.

I pray that God never lets sadness stay in your heart for too long, that He gives you strength whenever life becomes heavy, and that He always reminds you that you are never alone. May He open beautiful doors for you, protect your heart, fill your days with happiness, and grant you everything you secretly pray for.

No matter how much time passes or where life takes us, I hope you always know that you have me. Always.

You are my best friend, my favorite human, one of the greatest blessings God has ever put in my life, and someone I will forever be grateful for.

Happy Birthday, Randall.`;

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
          <p className="letter-card__body">{letter.slice(0, letterLength)}{letterLength < letter.length && <span className="typing-cursor" aria-hidden="true" />}</p>
          <p className={`letter-card__signature ${letterLength === letter.length ? "letter-card__signature--visible" : ""}`}>with warm wishes</p>
        </article>
        <button className="content-link" type="button" onClick={() => onNavigate("memories")}>View memories →</button>
      </section>
    </article>
  );
}
