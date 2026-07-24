export default function OpeningScreen({ isFading, onStart }) {
  return (
    <button
      className={`opening-screen ${isFading ? "opening-screen--fading" : ""}`}
      onClick={onStart}
      type="button"
      aria-label="Open Joe's birthday letter"
    >
      <img
        className="opening-screen__art"
        src="/assets/joe-entrance.png"
        alt="A blue birthday collage for Joe"
      />
      <span className="opening-screen__prompt">tap to open</span>
    </button>
  );
}
