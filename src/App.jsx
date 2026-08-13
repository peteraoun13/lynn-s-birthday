import { useRef, useState } from "react";
import OpeningScreen from "./OpeningScreen";
import BirthdayPage from "./BirthdayPage";

export default function App() {
  const [activeView, setActiveView] = useState("menu");
  const [videoComplete, setVideoComplete] = useState(false);
  const videoRef = useRef(null);
  const musicRef = useRef(null);

  const openView = (view) => {
    musicRef.current?.play().catch(() => {});
    setActiveView(view);
    if (view === "video") {
      setVideoComplete(false);
      window.setTimeout(() => videoRef.current?.play().catch(() => {}), 180);
    }
  };

  const replayVideo = () => {
    setVideoComplete(false);
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  return (
    <main className="app-shell">
      <audio ref={musicRef} src="/assets/randall-song.mp3" loop preload="auto" />
      {activeView === "menu" ? (
        <OpeningScreen onSelect={openView} />
      ) : (
        <BirthdayPage
          activeView={activeView}
          videoRef={videoRef}
          videoComplete={videoComplete}
          onVideoComplete={() => setVideoComplete(true)}
          onReplay={replayVideo}
          onNavigate={openView}
        />
      )}
    </main>
  );
}
