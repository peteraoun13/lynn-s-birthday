export default function DateCard({ day, date, selected, onSelect }) {
  return (
    <button
      className={`date-card ${selected ? "date-card--selected" : ""}`}
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="date-card__day">{day}</span>
      <span className="date-card__date">{date}</span>
      <span className="date-card__heart" aria-hidden="true">
        {selected ? "♥" : "♡"}
      </span>
    </button>
  );
}
