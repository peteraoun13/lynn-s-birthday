import { useEffect, useState } from "react";

// Replace this value whenever you need to change the birthday date.
export const birthdayDate = new Date("2026-07-05T00:00:00+03:00");

function getTimeLeft() {
  const difference = Math.max(0, birthdayDate.getTime() - Date.now());

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

const units = [
  ["days", "DAYS"],
  ["hours", "HRS"],
  ["minutes", "MINS"],
  ["seconds", "SECS"],
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label="Countdown until Lynn's birthday">
      {units.map(([key, label], index) => (
        <div className="countdown__item" key={key}>
          <span className="countdown__number">
            {String(timeLeft[key]).padStart(2, "0")}
          </span>
          <span className="countdown__label">{label}</span>
          {index < units.length - 1 && (
            <span className="countdown__divider" aria-hidden="true">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
