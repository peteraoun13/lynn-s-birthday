export default function OpeningScreen({ onStart }) {
  return (
    <button className="opening-screen" onClick={onStart} type="button" aria-label="Open Randall's birthday surprise">
      <span className="opening-screen__paper" aria-hidden="true" />
      <span className="opening-screen__eyebrow">A LITTLE SOMETHING FOR YOU</span>
      <span className="opening-screen__gallery" aria-label="Photo memories">
        <span className="opening-screen__photo-frame opening-screen__photo-frame--one"><span /></span>
        <span className="opening-screen__photo-frame opening-screen__photo-frame--two"><span /></span>
        <span className="opening-screen__photo-frame opening-screen__photo-frame--three"><span /></span>
      </span>
      <span className="opening-screen__ornament" aria-hidden="true"><i /></span>
      <span className="opening-screen__prompt">Tap to begin</span>
    </button>
  );
}
