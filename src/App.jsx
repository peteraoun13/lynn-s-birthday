import { useRef, useState } from "react";
import OpeningScreen from "./OpeningScreen";
import BirthdayPage from "./BirthdayPage";

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [videoComplete, setVideoComplete] = useState(false);
  const videoRef = useRef(null);

  const openSurprise = () => {
    setHasOpened(true);
    window.setTimeout(() => videoRef.current?.play().catch(() => {}), 250);
  };

  return (
    <main className={`app-shell ${hasOpened ? "app-shell--opened" : ""}`}>
      {!hasOpened && <OpeningScreen onStart={openSurprise} />}
      {hasOpened && (
        <BirthdayPage
          videoRef={videoRef}
          videoComplete={videoComplete}
          onVideoComplete={() => setVideoComplete(true)}
          onVideoReplay={() => setVideoComplete(false)}
        />
      )}
    </main>
  );
}
