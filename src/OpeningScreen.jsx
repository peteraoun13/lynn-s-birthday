export default function OpeningScreen({ isFading, onStart }) {
  return (
    <button
      className={`opening-screen ${isFading ? "opening-screen--fading" : ""}`}
      onClick={onStart}
      type="button"
      aria-label="Tap to open Lynn's birthday surprise"
    >
      {/* Replace this path if you update the complete opening artwork. */}
      <img
        className="opening-screen__art"
        src="/assets/opening-page.png"
        alt="A pink birthday collage made for Lynn"
      />
      {/* Replace this text with your preferred opening instruction. */}
      <span className="opening-screen__prompt">tap to start ♡</span>
    </button>
  );
}
