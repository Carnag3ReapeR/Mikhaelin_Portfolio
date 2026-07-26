// Fixed full-screen animated gradient backdrop that sits behind all content.
// 
// Mount this once near the root (see App.jsx). Uses position: fixed so it stays
// put while the page scrolls. The three blob divs are animated via CSS keyframes
// to create the aurora effect.

function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-blob aurora-blob--1" />
      <div className="aurora-blob aurora-blob--2" />
      <div className="aurora-blob aurora-blob--3" />
    </div>
  );
}

export default AuroraBackground;
