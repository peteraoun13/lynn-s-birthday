export default function OpeningScreen({ isFading, onStart }) {
  return (
    <button
      className={`opening-screen ${isFading ? "opening-screen--fading" : ""}`}
      onClick={onStart}
      type="button"
      aria-label="Open Lynn's birthday letter"
    >
      <img
        className="opening-screen__art"
        src="/assets/opening-page.png"
        alt="A pink birthday collage made for Lynn"
      />
      <span className="opening-screen__prompt">tap to open your letter ♡</span>
    </button>
  );
}
