import { useState } from "react";
import Countdown from "./Countdown";
import DateCard from "./DateCard";

// Replace these labels if the date choices change.
const dateOptions = [
  { day: "SAT", date: "JULY 4" },
  { day: "SUN", date: "JULY 5" },
  { day: "MON", date: "JULY 6" },
];

export default function BirthdayPage({ isRevealed }) {
  const [selectedDate, setSelectedDate] = useState(1);
  const [submitMessage, setSubmitMessage] = useState("");

  const submitDateChoice = async () => {
    const choice = dateOptions[selectedDate];
    const message = `Lynn chose ${choice.day}, ${choice.date} for our day together ♡`;

    window.localStorage.setItem("birthday-date-choice", message);

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Our birthday date ♡",
          text: message,
        });
        setSubmitMessage("your choice was shared ♡");
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          setSubmitMessage("tap submit when you’re ready to send it ♡");
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(message);
      setSubmitMessage("choice copied — send it to me ♡");
    } catch {
      setSubmitMessage(`chosen: ${choice.day}, ${choice.date} ♡`);
    }
  };

  return (
    <article className={`birthday-page ${isRevealed ? "birthday-page--revealed" : ""}`}>
      {/* Replace any image path below when you have revised artwork. */}
      <div className="decorations" aria-hidden="true">
        <img className="decoration top-photo" src="/assets/top-photo.png" alt="" />
        <img className="decoration stars-left" src="/assets/stars-left.png" alt="" />
        <img className="decoration stars-right" src="/assets/stars-right.png" alt="" />
        <img className="decoration polaroid-line" src="/assets/polaroid-line.png" alt="" />
      </div>

      <header className="birthday-header">
        {/* Replace this heading with your preferred birthday message. */}
        <p className="script-title">happy birthday</p>

      </header>

      <div className="collage-space" />

      <section className="countdown-section">
        {/* Replace this line with your preferred countdown copy. */}
        <p className="eyebrow">until your birthday ♡</p>
        <Countdown />
      </section>

      <section className="date-section">
        {/* Replace these lines with your preferred date invitation. */}
        <p className="date-section__title">LET’S SPEND A DAY TOGETHER ✧</p>
        <p className="date-section__subtitle">you choose ♡</p>
        <div className="date-cards" aria-label="Choose a date">
          {dateOptions.map((option, index) => (
            <DateCard
              key={option.date}
              {...option}
              selected={selectedDate === index}
              onSelect={() => setSelectedDate(index)}
            />
          ))}
        </div>
        <button className="submit-date" type="button" onClick={submitDateChoice}>
          submit &amp; send my choice ♡
        </button>
        <p className="submit-message" role="status" aria-live="polite">
          {submitMessage}
        </p>
      </section>

      <section className="love-note">
        {/* Replace this romantic note with your own text. */}
        <img className="love-decoration love-bouquet" src="/assets/bouquet.png" alt="" aria-hidden="true" />
        <div className="love-note__copy">
          <p>i love you so much.</p>
          <span aria-hidden="true">♡</span>
        </div>
        <img className="love-decoration love-baby" src="/assets/baby.png" alt="" aria-hidden="true" />
      </section>

      <footer className="birthday-footer">made with all my love · 2026</footer>
    </article>
  );
}
