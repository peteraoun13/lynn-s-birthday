export default function OpeningScreen({ onSelect }) {
  return (
    <section className="opening-screen" aria-label="Birthday surprise menu">
      <span className="opening-screen__paper" aria-hidden="true" />
      <p className="opening-screen__eyebrow">A LITTLE SOMETHING FOR YOU</p>
      <div className="opening-screen__gallery">
        <button className="opening-screen__photo-frame opening-screen__photo-frame--one" type="button" onClick={() => onSelect("video")}>
          <img src="/assets/randall-menu-video.jpeg" alt="A memory with Randall" /><small>the video</small>
        </button>
        <button className="opening-screen__photo-frame opening-screen__photo-frame--two" type="button" onClick={() => onSelect("letter")}>
          <img src="/assets/randall-menu-letter.jpeg" alt="A memory with Randall" /><small>the letter</small>
        </button>
        <button className="opening-screen__photo-frame opening-screen__photo-frame--three" type="button" onClick={() => onSelect("memories")}>
          <img src="/assets/randall-menu-memories.jpeg" alt="A memory with Randall" /><small>memories</small>
        </button>
      </div>
      <span className="opening-screen__ornament" aria-hidden="true"><i /></span>
      <p className="opening-screen__prompt">Choose a Polaroid</p>
    </section>
  );
}
